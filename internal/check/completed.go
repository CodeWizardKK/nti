package check

import (
	"fmt"
	"os"
	"os/exec"

	"google.golang.org/grpc"

	"nti/internal/util"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

func getMintResult(nftMint types.NftMint) (string, error) {
	fmt.Println("Get mint result...")

	out, err := exec.Command(
		"node",
		getMintResultPath(),
		os.Getenv("ETH_DEST_CONTRACT_ADDRESS"),
		nftMint.TokenUri,
	).Output()
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return util.OutToString(out), nil
}

func addNftMintResult(reservedKey, tokenId string) error {
	fmt.Println("Add NFT mint result...")

	err := exec.Command(
		"ntid",
		"tx",
		"nti",
		"add-nft-mint-result",
		reservedKey,
		tokenId,
		"--fees",
		fees(),
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

func CheckIsCompleted() {
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

	// Check waiting keys.
	fmt.Println("Check waiting keys...")
	waitingKeys, err := getReservedKeysOf(keeper.Waiting, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range waitingKeys {
		nftMint, err := getNftMint(reservedKey, queryClient)
		if err != nil {
			fmt.Println(err)
			continue
		}

		tokenId, err := getMintResult(nftMint)
		if err != nil {
			fmt.Println(err)
			continue
		}

		if tokenId != "" {
			fmt.Printf("The NFT successfully minted! Token ID is %v.\n", tokenId)

			err = addNftMintResult(reservedKey, tokenId)
			if err != nil {
				fmt.Println(err)
				continue
			}

			err = changeStatus(reservedKey, keeper.Completed)
			if err != nil {
				fmt.Println(err)
				continue
			}
		}
	}
}
