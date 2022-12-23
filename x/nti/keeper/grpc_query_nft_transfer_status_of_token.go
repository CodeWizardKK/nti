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
	nftTransferStatusValue := reflect.ValueOf(&nftTransferStatus).Elem()

	// 各ステータス（Reserved, ... , Completed）のリストから検索
	for ts := int(Reserved); ts < int(Completed)+1; ts++ {
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
	nftTransferStatus, found := k.GetNftTransferStatus(ctx)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	// リクエストのトークンIDと一致する予約を探す
	// TODO: Check req.Chain, req.ContractAddr
	for _, reservedNftTransfer := range reservedNftTransferList {
		// トークンIDが一致した場合
		if reservedNftTransfer.NftTokenId == req.TokenId {
			reservedKey := reservedNftTransfer.ReservedKey

			// 予約のステータスを検索する
			transferStatus := getTransferStatus(reservedKey, nftTransferStatus)

			// NFTミント後の場合は、トランザクションハッシュを取得
			transactionHash := ""
			if int(transferStatus) >= int(Waiting) {
				nftMint, found := k.GetNftMint(ctx, reservedKey)
				if !found {
					return nil, status.Error(codes.NotFound, "not found")
				}

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
