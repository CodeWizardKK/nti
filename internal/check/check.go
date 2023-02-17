package check

import (
	"context"
	"fmt"
	"os/exec"
	"reflect"
	"strconv"

	"nti/internal/enum"
	"nti/x/nti/types"
)

type ResultBool int

const (
	False ResultBool = iota
	True
)

func getReservedKeysOf(status enum.TransferStatus, queryClient types.QueryClient) ([]string, error) {
	fmt.Println("Get reserved keys of status xx...")

	// Get NFT transfer status.
	params := &types.QueryGetNftTransferStatusRequest{}
	res, err := queryClient.NftTransferStatus(context.Background(), params)
	if err != nil {
		return nil, err
	}

	nftTransferStatusValue := reflect.ValueOf(res.GetNftTransferStatus())
	reservedKeysValue := nftTransferStatusValue.FieldByName(status.String())

	reservedKeys := []string{}
	keysLen := reservedKeysValue.Len()
	for i := 0; i < keysLen; i++ {
		reservedKey := reservedKeysValue.Index(i).String()
		reservedKeys = append(reservedKeys, reservedKey)
		fmt.Println(reservedKey)
	}

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

func getNftMint(reservedKey string, queryClient types.QueryClient) (types.NftMint, error) {
	fmt.Println("Get the NFT mint...")

	params := &types.QueryGetNftMintRequest{
		ReservedKey: reservedKey,
	}
	res, err := queryClient.NftMint(context.Background(), params)
	if err != nil {
		return types.NftMint{}, err
	}

	return res.GetNftMint(), nil
}

func changeStatus(reservedKey string, to enum.TransferStatus) error {
	fmt.Println("Change status...")

	err := exec.Command(
		"ntid",
		"tx",
		"nti",
		"change-status",
		reservedKey,
		strconv.Itoa(int(to)),
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
