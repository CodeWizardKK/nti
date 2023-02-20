package keeper

import (
	"reflect"
	"sort"

	"nti/internal/enum"
	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func sortReservedNftTransfers(reservedNftTransfers []types.ReservedNftTransfer) []types.ReservedNftTransfer {
	sort.Slice(reservedNftTransfers, func(i, j int) bool {
		return reservedNftTransfers[i].CreatedAt > reservedNftTransfers[j].CreatedAt
	})
	return reservedNftTransfers
}

func sortTransferStatusList(nftTransferStatusList []types.NftTransferStatusDetail) []types.NftTransferStatusDetail {
	sort.Slice(nftTransferStatusList, func(i, j int) bool {
		return nftTransferStatusList[i].ReservedAt > nftTransferStatusList[j].ReservedAt
	})
	return nftTransferStatusList
}

func getTransferStatus(reservedKey string, nftTransferStatus types.NftTransferStatus) enum.TransferStatus {
	var transferStatus enum.TransferStatus
	nftTransferStatusValue := reflect.ValueOf(&nftTransferStatus).Elem()

	// 各ステータス（Reserved, ... , Completed）のリストから検索
	for ts := int(enum.Reserved); ts < int(enum.Completed)+1; ts++ {
		targetStatus := enum.TransferStatus(ts).String()
		reservedKeyList := nftTransferStatusValue.FieldByName(targetStatus)

		found := false
		len := reservedKeyList.Len()
		for i := 0; i < len; i++ {
			if reservedKeyList.Index(i).String() == reservedKey {
				found = true
				break
			}
		}

		if found {
			transferStatus = enum.TransferStatus(ts)
			break
		}
	}

	return transferStatus
}

func getTransferStatusDetail(k Keeper, ctx sdk.Context, reservedNftTransfer types.ReservedNftTransfer, nftTransferStatus types.NftTransferStatus) (types.NftTransferStatusDetail, error) {
	reservedKey := reservedNftTransfer.ReservedKey

	// 予約のステータスを検索する
	transferStatus := getTransferStatus(reservedKey, nftTransferStatus)

	// NFTミント後の場合は、トランザクションハッシュを取得
	transactionHash := ""
	if int(transferStatus) >= int(enum.Waiting) {
		nftMint, found := k.GetNftMint(ctx, reservedKey)
		if !found {
			return types.NftTransferStatusDetail{}, status.Error(codes.NotFound, "not found")
		}

		transactionHash = nftMint.TransactionHash
	}

	return types.NftTransferStatusDetail{
		ReservedKey:     reservedKey,
		TransferStatus:  int32(transferStatus),
		TransactionHash: transactionHash,
		NftTokenId:      reservedNftTransfer.NftTokenId,
		NftSrcChain:     reservedNftTransfer.NftSrcChain,
		NftSrcAddr:      reservedNftTransfer.NftSrcAddr,
		NftDestChain:    reservedNftTransfer.NftDestChain,
		NftDestAddr:     reservedNftTransfer.NftDestAddr,
		ReservedAt:      reservedNftTransfer.CreatedAt,
	}, nil
}
