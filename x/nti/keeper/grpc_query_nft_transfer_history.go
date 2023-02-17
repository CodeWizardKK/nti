package keeper

import (
	"context"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) NftTransferHistory(goCtx context.Context, req *types.QueryNftTransferHistoryRequest) (*types.QueryNftTransferHistoryResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Get token URI
	tokenUri := "qhthyuomatggfidx"

	// 全mint結果を取得
	nftMintList := k.GetAllNftMint(ctx)

	// 検索条件のトークンURIと一致するreservedKeyのリスト
	var reservedKeyList []string
	for _, nftMint := range nftMintList {
		if nftMint.TokenUri == tokenUri {
			reservedKeyList = append(reservedKeyList, nftMint.ReservedKey)
		}
	}

	// ステータスリストを取得
	nftTransferStatus, found := k.GetNftTransferStatus(ctx)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	// 検索条件に該当する移転予約のステータスリスト
	var nftTransferStatusList []types.NftTransferStatusDetail
	for _, reservedKey := range reservedKeyList {
		reservedNftTransfer, found := k.GetReservedNftTransfer(ctx, reservedKey)
		if !found {
			continue
		}

		nftTransferStatusDetail, err := getTransferStatusDetail(k, ctx, reservedNftTransfer, nftTransferStatus)
		if err != nil {
			return nil, err
		}

		nftTransferStatusList = append(nftTransferStatusList, nftTransferStatusDetail)
	}

	nftTransferStatusList = sortTransferStatusList(nftTransferStatusList)

	return &types.QueryNftTransferHistoryResponse{
		NftTransferStatusDetail: nftTransferStatusList,
	}, nil
}
