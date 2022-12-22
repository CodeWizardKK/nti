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

	// TODO: Process the query
	var nftTransferStatusList []types.NftTransferStatusDetail
	_ = ctx

	// reservedKey := ""

	// status := ""

	return &types.QueryNftTransferStatusOfTokenResponse{
		NftTransferStatusDetail: nftTransferStatusList,
	}, nil
}
