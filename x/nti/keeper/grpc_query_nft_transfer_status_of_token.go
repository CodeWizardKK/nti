package keeper

import (
	"context"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

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
			nftTransferStatusDetail, err := getTransferStatusDetail(k, ctx, reservedNftTransfer, nftTransferStatus)
			if err != nil {
				return nil, err
			}

			nftTransferStatusList = append(nftTransferStatusList, nftTransferStatusDetail)
		}
	}

	return &types.QueryNftTransferStatusOfTokenResponse{
		NftTransferStatusDetail: nftTransferStatusList,
	}, nil
}
