package main

import (
	"context"
	"fmt"

	"google.golang.org/grpc"

	"nti/x/nti/types"
)

func checkReservedList() error {
	// Create a connection to the gRPC server.
	grpcConn, err := grpc.Dial(
		"127.0.0.1:9090",    // your gRPC server address.
		grpc.WithInsecure(), // The Cosmos SDK doesn't support any transport security mechanism.
		// This instantiates a general gRPC codec which handles proto bytes. We pass in a nil interface registry
		// if the request/response types contain interface instead of 'nil' you should pass the application specific codec.
		// grpc.WithDefaultCallOptions(grpc.ForceCodec(codec.NewProtoCodec(nil).GRPCCodec())),
	)
	if err != nil {
		return err
	}
	defer grpcConn.Close()

	// This creates a gRPC client to query the x/nti service.
	queryClient := types.NewQueryClient(grpcConn)
	params := &types.QueryGetNftTransferStatusRequest{}
	res, err := queryClient.NftTransferStatus(context.Background(), params)
	if err != nil {
		return err
	}

	reservedKeys := res.GetNftTransferStatus().Reserved
	fmt.Println(reservedKeys)

	return nil
}

func main() {
	err := checkReservedList()
	if err != nil {
		fmt.Println(err)
	}
}
