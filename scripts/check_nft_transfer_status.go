package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	"nti/x/nti/types"
)

func getReservedKeys(grpcConn *grpc.ClientConn) ([]string, error) {
	fmt.Println("Get reserved keys...")
	// This creates a gRPC client to query the x/nti service.
	queryClient := types.NewQueryClient(grpcConn)
	params := &types.QueryGetNftTransferStatusRequest{}
	res, err := queryClient.NftTransferStatus(context.Background(), params)
	if err != nil {
		return nil, err
	}

	reservedKeys := res.GetNftTransferStatus().Reserved
	return reservedKeys, nil
}

func checkIsConfirmed(reservedKey string) (bool, error) {
	fmt.Println("Check is confirmed...")
	return true, nil
}

func changeStatus(reservedKey string, grpcConn *grpc.ClientConn) error {
	_ = grpcConn
	fmt.Println("Change status...")
	fmt.Println(reservedKey)
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

	reservedKeys, err := getReservedKeys(grpcConn)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range reservedKeys {
		isConfirmed, err := checkIsConfirmed(reservedKey)
		if err != nil {
			fmt.Println(err)
		}

		if isConfirmed {
			err = changeStatus(reservedKey, grpcConn)
			if err != nil {
				fmt.Println(err)
			}
		}
	}
}
