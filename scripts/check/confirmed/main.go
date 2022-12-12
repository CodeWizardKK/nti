package main

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"google.golang.org/grpc"

	"nti/scripts/check"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

const alchemyDir = "/Users/rika/work/src/adon/nti/alchemy"
const checkIsNftRecievedPath = alchemyDir + "/check-is-nft-recieved.js"
const getNftTokenUriPath = alchemyDir + "/get-nft-token-uri.js"
const mintNftDir = "/Users/rika/work/src/learn/eth/my-nft"
const mintNftPath = mintNftDir + "/scripts/mint-nft.js"
const validSecond = 10 * 60

type IsConfirmed int

const (
	False IsConfirmed = iota
	True
)

func isReserveExpired(reserveNftTransfer types.ReservedNftTransfer) bool {
	fmt.Println("Check whether the reserve is expired...")

	// 現在時刻が予約の有効期限を過ぎているか
	return int(time.Now().Unix()) > int(reserveNftTransfer.CreatedAt)+validSecond
}

func outToString(out []byte) string {
	return strings.TrimRight(string(out), "\n")
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

	outInt, err := strconv.Atoi(outToString(out))
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	switch IsConfirmed(outInt) {
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

	tokenUri := outToString(out)
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
	)
	cmd.Dir = mintNftDir
	out, err := cmd.Output()
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	transactionHash := outToString(out)
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
		check.Fees,
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

func main() {
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
	reservedKeys, err := check.GetReservedKeysOf(keeper.Reserved, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range reservedKeys {
		reservedNftTransfer, err := check.GetReservedNftTransfer(reservedKey, queryClient)
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
			err = check.ChangeStatus(reservedKey, keeper.Confirmed)
			if err != nil {
				fmt.Println(err)
				continue
			}
		} else {
			// 期限切れの場合
			isExpired := isReserveExpired(reservedNftTransfer)
			fmt.Printf("Check result is %v.\n", isExpired)

			if isExpired {
				err = check.ChangeStatus(reservedKey, keeper.Expired)
				if err != nil {
					fmt.Println(err)
					continue
				}
			}
		}
	}

	// Mint NFT for the confirmed reserves.
	fmt.Println("Mint NFTs...")
	confirmedKeys, err := check.GetReservedKeysOf(keeper.Confirmed, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range confirmedKeys {
		reservedNftTransfer, err := check.GetReservedNftTransfer(reservedKey, queryClient)
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

		err = check.ChangeStatus(reservedKey, keeper.Waiting)
		if err != nil {
			fmt.Println(err)
			continue
		}
	}
}
