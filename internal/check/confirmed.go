package check

import (
	"fmt"
	"os/exec"
	"strconv"
	"time"

	"google.golang.org/grpc"

	"nti/internal/util"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

const appDir = ""
const apiProvider = "moralis"
const apiDir = "/Users/rika/work/src/adon/nti/nfts/" + apiProvider
const alchemyDir = "/Users/rika/work/src/adon/nti/alchemy"
const checkIsNftRecievedPath = alchemyDir + "/check-is-nft-recieved.js"
const getNftTokenUriPath = apiDir + "/get-nft-token-uri.js"
const mintNftDir = "/Users/rika/work/src/learn/eth/my-nft"
const mintNftPath = mintNftDir + "/scripts/mint-nft.js"
const validSecond = 60 * 60 * 1000

func isReserveExpired(reserveNftTransfer types.ReservedNftTransfer) bool {
	fmt.Println("Check whether the reserve is expired...")

	// 現在時刻が予約の有効期限を過ぎているか
	return int(time.Now().Unix()) > int(reserveNftTransfer.CreatedAt)+validSecond
}

func checkIsNftRecieved(reservedNftTransfer types.ReservedNftTransfer) (bool, error) {
	fmt.Println("Check whether the NFT is recieved...")

	out, err := exec.Command(
		"node",
		checkIsNftRecievedPath,
		reservedNftTransfer.NftSrcAddr,
		reservedNftTransfer.NftTokenId,
	).Output()
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	outInt, err := strconv.Atoi(util.OutToString(out))
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	switch ResultBool(outInt) {
	case False:
		return false, nil
	case True:
		return true, nil
	default:
		// TODO: エラーを生成
		return false, err
	}
}

func getTokenUri(reservedNftTransfer types.ReservedNftTransfer) (string, error) {
	fmt.Println("Get token URI...")

	out, err := exec.Command(
		"node",
		getNftTokenUriPath,
		reservedNftTransfer.NftTokenId,
	).Output()
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	tokenUri := util.OutToString(out)
	fmt.Printf("Token URI: %s\n", tokenUri)

	return tokenUri, nil
}

func mintNft(reservedNftTransfer types.ReservedNftTransfer, tokenUri string) (string, error) {
	fmt.Println("Mint NFT...")

	cmd := exec.Command(
		"node",
		mintNftPath,
		reservedNftTransfer.NftDestAddr,
		tokenUri,
		"1", // contract-address-type [ 0: source, 1: dest ]
	)
	cmd.Dir = mintNftDir
	out, err := cmd.Output()
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	transactionHash := util.OutToString(out)
	fmt.Printf("NFT Minted! Check it out at: https://goerli.etherscan.io/tx/%s\n", transactionHash)

	return transactionHash, nil
}

func createNftMint(reservedKey, transactionHash string) error {
	fmt.Println("Create NFT mint...")

	err := exec.Command(
		"ntid",
		"tx",
		"nti",
		"create-nft-mint",
		reservedKey,
		transactionHash,
		"--fees",
		Fees,
		"--from",
		"bob",
		"-y",
	).Run()
	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func CheckIsConfirmed() {
	// Create a connection to the gRPC server.
	grpcConn, err := grpc.Dial(
		"127.0.0.1:9090",    // your gRPC server address.
		grpc.WithInsecure(), // The Cosmos SDK doesn't support any transport security mechanism.
	)
	if err != nil {
		fmt.Println(err)
	}
	defer grpcConn.Close()

	// This creates a gRPC client to query the x/nti service.
	queryClient := types.NewQueryClient(grpcConn)

	// Check reserved keys.
	fmt.Println("Check reserved keys...")
	reservedKeys, err := getReservedKeysOf(keeper.Reserved, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range reservedKeys {
		reservedNftTransfer, err := getReservedNftTransfer(reservedKey, queryClient)
		if err != nil {
			fmt.Println(err)
			continue
		}

		isConfirmed, err := checkIsNftRecieved(reservedNftTransfer)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Printf("Check result is %v.\n", isConfirmed)

		if isConfirmed {
			err = changeStatus(reservedKey, keeper.Confirmed)
			if err != nil {
				fmt.Println(err)
				continue
			}
		} else {
			// 期限切れの場合
			isExpired := isReserveExpired(reservedNftTransfer)
			fmt.Printf("Check result is %v.\n", isExpired)

			if isExpired {
				err = changeStatus(reservedKey, keeper.Expired)
				if err != nil {
					fmt.Println(err)
					continue
				}
			}
		}
	}

	// Mint NFT for the confirmed reserves.
	fmt.Println("Mint NFTs...")
	confirmedKeys, err := getReservedKeysOf(keeper.Confirmed, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range confirmedKeys {
		reservedNftTransfer, err := getReservedNftTransfer(reservedKey, queryClient)
		if err != nil {
			fmt.Println(err)
			continue
		}

		tokenUri, err := getTokenUri(reservedNftTransfer)
		if err != nil {
			fmt.Println(err)
			continue
		}

		// Mint NFT
		transactionHash, err := mintNft(reservedNftTransfer, tokenUri)
		if err != nil {
			fmt.Println(err)
			continue
		}

		// Create NFT mint
		err = createNftMint(reservedKey, transactionHash)
		if err != nil {
			fmt.Println(err)
			continue
		}

		err = changeStatus(reservedKey, keeper.Waiting)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
}
