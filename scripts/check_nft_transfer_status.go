package main

import (
	"context"
	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"google.golang.org/grpc"

	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

const checkIsNftRecievedPath = "/Users/rika/work/src/adon/nti/alchemy/check-is-nft-recieved.js"
const fees = "16000000000stake"
const validSecond = 10 * 60

type IsConfirmed int

const (
	False IsConfirmed = iota
	True
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

func isReserveExpired(reserveNftTransfer types.ReservedNftTransfer) bool {
	fmt.Println("Check whether the reserve is expired...")

	// 現在時刻が予約の有効期限を過ぎているか
	return int(time.Now().Unix()) > int(reserveNftTransfer.CreatedAt)+validSecond
}

func changeStatus(reservedKey string, to keeper.TransferStatus) error {
	fmt.Println("Change status...")

	err := exec.Command(
		"ntid",
		"tx",
		"nti",
		"change-status",
		reservedKey,
		strconv.Itoa(int(to)),
		"--fees",
		fees,
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

	reservedKeys, err := getReservedKeys(queryClient)
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
}
