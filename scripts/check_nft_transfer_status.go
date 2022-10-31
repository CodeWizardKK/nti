package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	"nti/x/nti/types"
)

func getReservedKeys(queryClient types.QueryClient) ([]string, error) {
	fmt.Println("Get reserved keys...")

	params := &types.QueryGetNftTransferStatusRequest{}
	res, err := queryClient.NftTransferStatus(context.Background(), params)
	if err != nil {
		return nil, err
	}

	reservedKeys := res.GetNftTransferStatus().Reserved
	return reservedKeys, nil
}

func getReservedNftTransfer(reservedKey string, queryClient types.QueryClient) (types.ReservedNftTransfer, error) {
	fmt.Println("Get the reserved NFT transfer...")

	params := &types.QueryGetReservedNftTransferRequest{
		ReservedKey: reservedKey,
	}
	res, err := queryClient.ReservedNftTransfer(context.Background(), params)
	if err != nil {
		return types.ReservedNftTransfer{}, err
	}

	return res.GetReservedNftTransfer(), nil
}

func checkIsNftRecieved(reservedNftTransfer types.ReservedNftTransfer) (bool, error) {
	fmt.Println("Check is the NFT recieved...")

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

	// This creates a gRPC client to query the x/nti service.
	queryClient := types.NewQueryClient(grpcConn)

	reservedKeys, err := getReservedKeys(queryClient)
	if err != nil {
		fmt.Println(err)
	}

	for _, reservedKey := range reservedKeys {
		reservedNftTransfer, err := getReservedNftTransfer(reservedKey, queryClient)
		if err != nil {
			fmt.Println(err)
		}

		isConfirmed, err := checkIsNftRecieved(reservedNftTransfer)
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
