package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nti/x/nti/types"
)

func (k Keeper) NftTransferStatusOfAddress(goCtx context.Context, req *types.QueryNftTransferStatusOfAddressRequest) (*types.QueryNftTransferStatusOfAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx

	return &types.QueryNftTransferStatusOfAddressResponse{}, nil
}
