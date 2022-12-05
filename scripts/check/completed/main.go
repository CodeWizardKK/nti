package main

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"

	"google.golang.org/grpc"

	"nti/scripts/check"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

const checkIsNftMintedPath = "/Users/rika/work/src/adon/nti/alchemy/check-is-nft-minted.js"

type IsConfirmed int

const (
	False IsConfirmed = iota
	True
)

func checkIsNftMinted(reservedNftTransfer types.ReservedNftTransfer) (bool, error) {
	fmt.Println("Check whether the NFT is minted...")

	out, err := exec.Command(
		"node",
		checkIsNftMintedPath,
		reservedNftTransfer.NftSrcAddr,
		reservedNftTransfer.NftTokenId,
	).Output()
	if err != nil {
		fmt.Println(err)
		return false, err
	}

	outString := strings.TrimRight(string(out), "\n")
	outInt, err := strconv.Atoi(outString)
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

	// Check waiting keys.
	fmt.Println("Check waiting keys...")
	waitingKeys, err := check.GetReservedKeysOf(keeper.Waiting, queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range waitingKeys {
		reservedNftTransfer, err := check.GetReservedNftTransfer(reservedKey, queryClient)
		if err != nil {
			fmt.Println(err)
			continue
		}

		isCompleted, err := checkIsNftMinted(reservedNftTransfer)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Printf("Check result is %v.\n", isCompleted)

		if isCompleted {
			err = check.ChangeStatus(reservedKey, keeper.Completed)
			if err != nil {
				fmt.Println(err)
				continue
			}
		}
	}
}
