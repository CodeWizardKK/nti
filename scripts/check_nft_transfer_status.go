package main

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/types/tx"
	"google.golang.org/grpc"

	"nti/x/nti/types"
)

func checkReservedList(grpcConn *grpc.ClientConn) error {
	// This creates a gRPC client to query the x/nti service.
	queryClient := types.NewQueryClient(grpcConn)
	params := &types.QueryGetNftTransferStatusRequest{}
	res, err := queryClient.NftTransferStatus(context.Background(), params)
	if err != nil {
		return err
	}

	reservedKeys := res.GetNftTransferStatus().Reserved
	fmt.Println(reservedKeys)

	// TODO: AlchemyでNFTを受信済みか確認
	confirmedKeys := []string{}
	fmt.Println(confirmedKeys)

	return nil
}

func changeStatus(grpcConn *grpc.ClientConn) error {
	// Broadcast the tx via gRPC. We create a new client for the Protobuf Tx
	// service.
	txClient := tx.NewServiceClient(grpcConn)
	// We then call the BroadcastTx method on this client.
	grpcRes, err := txClient.BroadcastTx(
		context.Background(),
		&tx.BroadcastTxRequest{
			Mode:    tx.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes, // Proto-binary of the signed transaction, see previous step.
		},
	)
	if err != nil {
		return err
	}

	fmt.Println(grpcRes.TxResponse.Code) // Should be `0` if the tx is successful
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

	err = checkReservedList(grpcConn)
	if err != nil {
		fmt.Println(err)
	}

	err = changeStatus(grpcConn)
	if err != nil {
		fmt.Println(err)
	}
}
