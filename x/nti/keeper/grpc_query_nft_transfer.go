package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"nti/x/nti/types"
)

func (k Keeper) NftTransferAll(c context.Context, req *types.QueryAllNftTransferRequest) (*types.QueryAllNftTransferResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var nftTransfers []types.NftTransfer
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	nftTransferStore := prefix.NewStore(store, types.KeyPrefix(types.NftTransferKeyPrefix))

	pageRes, err := query.Paginate(nftTransferStore, req.Pagination, func(key []byte, value []byte) error {
		var nftTransfer types.NftTransfer
		if err := k.cdc.Unmarshal(value, &nftTransfer); err != nil {
			return err
		}

		nftTransfers = append(nftTransfers, nftTransfer)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllNftTransferResponse{NftTransfer: nftTransfers, Pagination: pageRes}, nil
}

func (k Keeper) NftTransfer(c context.Context, req *types.QueryGetNftTransferRequest) (*types.QueryGetNftTransferResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetNftTransfer(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetNftTransferResponse{NftTransfer: val}, nil
}
