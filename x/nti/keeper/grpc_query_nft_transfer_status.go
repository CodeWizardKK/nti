package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nti/x/nti/types"
)

func (k Keeper) NftTransferStatus(c context.Context, req *types.QueryGetNftTransferStatusRequest) (*types.QueryGetNftTransferStatusResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetNftTransferStatus(ctx)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetNftTransferStatusResponse{NftTransferStatus: val}, nil
}
