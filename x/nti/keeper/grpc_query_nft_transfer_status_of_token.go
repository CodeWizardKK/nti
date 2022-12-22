package keeper

import (
	"context"
	"reflect"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getTransferStatus(reservedKey string, nftTransferStatus types.NftTransferStatus) TransferStatus {
	var transferStatus TransferStatus
	nftTransferStatusValue := reflect.ValueOf(&nftTransferStatus)

	// 各ステータスのリストから検索
	for ts := 0; ts < int(Completed); ts++ {
		targetStatus := TransferStatus(ts).String()
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
			transferStatus = TransferStatus(ts)
			break
		}
	}

	return transferStatus
}

func (k Keeper) NftTransferStatusOfToken(goCtx context.Context, req *types.QueryNftTransferStatusOfTokenRequest) (*types.QueryNftTransferStatusOfTokenResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: pagination
	// 検索条件に該当する移転予約のステータスリスト
	var nftTransferStatusList []types.NftTransferStatusDetail

	// 全予約を取得
	reservedNftTransferList := k.GetAllReservedNftTransfer(ctx)
	// ステータスリストを取得
	nftTransferStatus, _ := k.GetNftTransferStatus(ctx)

	for _, reservedNftTransfer := range reservedNftTransferList {
		// TODO: Check req.Chain, req.ContractAddr
		if reservedNftTransfer.NftTokenId == req.TokenId {
			reservedKey := reservedNftTransfer.ReservedKey

			transferStatus := getTransferStatus(reservedKey, nftTransferStatus)

			// トランザクションハッシュを取得
			transactionHash := ""
			if transferStatus >= Waiting {
				nftMint, _ := k.GetNftMint(ctx, reservedKey)
				transactionHash = nftMint.TransactionHash
			}

			nftTransferStatusDetail := types.NftTransferStatusDetail{
				ReservedKey:     reservedKey,
				ReservedData:    &reservedNftTransfer,
				TransferStatus:  int32(transferStatus),
				TransactionHash: transactionHash,
			}
			nftTransferStatusList = append(nftTransferStatusList, nftTransferStatusDetail)
		}
	}

	return &types.QueryNftTransferStatusOfTokenResponse{
		NftTransferStatusDetail: nftTransferStatusList,
	}, nil
}
