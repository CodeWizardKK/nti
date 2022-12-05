package check

import (
	"context"
	"fmt"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
	"os/exec"
	"reflect"
	"strconv"
)

const fees = "16000000000stake"

func GetReservedKeysOf(status keeper.TransferStatus, queryClient types.QueryClient) ([]string, error) {
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

func GetReservedNftTransfer(reservedKey string, queryClient types.QueryClient) (types.ReservedNftTransfer, error) {
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

func ChangeStatus(reservedKey string, to keeper.TransferStatus) error {
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
