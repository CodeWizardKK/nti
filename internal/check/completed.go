package check

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"

	"google.golang.org/grpc"

	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

func checkIsNftMinted(nftMint types.NftMint) (bool, error) {
	fmt.Println("Check whether the NFT is minted...")

	out, err := exec.Command(
		"node",
		isNftMintedPath(),
		nftMint.TransactionHash,
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

		isCompleted, err := checkIsNftMinted(nftMint)
		if err != nil {
			fmt.Println(err)
			continue
		}
		fmt.Printf("Check result is %v.\n", isCompleted)

		if isCompleted {
			err = changeStatus(reservedKey, keeper.Completed)
			if err != nil {
				fmt.Println(err)
				continue
			}
		}
	}
}
