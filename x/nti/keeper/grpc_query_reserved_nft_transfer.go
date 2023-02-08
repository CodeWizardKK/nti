package keeper

import (
	"context"

	"nti/x/nti/types"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ReservedNftTransferAll(c context.Context, req *types.QueryAllReservedNftTransferRequest) (*types.QueryAllReservedNftTransferResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var reservedNftTransfers []types.ReservedNftTransfer
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	reservedNftTransferStore := prefix.NewStore(store, types.KeyPrefix(types.ReservedNftTransferKeyPrefix))

	pageRes, err := query.Paginate(reservedNftTransferStore, req.Pagination, func(key []byte, value []byte) error {
		var reservedNftTransfer types.ReservedNftTransfer
		if err := k.cdc.Unmarshal(value, &reservedNftTransfer); err != nil {
			return err
		}

		reservedNftTransfers = append(reservedNftTransfers, reservedNftTransfer)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	reservedNftTransfers = sortReservedNftTransfers(reservedNftTransfers)

	return &types.QueryAllReservedNftTransferResponse{ReservedNftTransfer: reservedNftTransfers, Pagination: pageRes}, nil
}

func (k Keeper) ReservedNftTransfer(c context.Context, req *types.QueryGetReservedNftTransferRequest) (*types.QueryGetReservedNftTransferResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetReservedNftTransfer(
		ctx,
		req.ReservedKey,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetReservedNftTransferResponse{ReservedNftTransfer: val}, nil
}
