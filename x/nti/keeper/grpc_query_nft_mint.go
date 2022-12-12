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

func (k Keeper) NftMintAll(c context.Context, req *types.QueryAllNftMintRequest) (*types.QueryAllNftMintResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var nftMints []types.NftMint
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	nftMintStore := prefix.NewStore(store, types.KeyPrefix(types.NftMintKeyPrefix))

	pageRes, err := query.Paginate(nftMintStore, req.Pagination, func(key []byte, value []byte) error {
		var nftMint types.NftMint
		if err := k.cdc.Unmarshal(value, &nftMint); err != nil {
			return err
		}

		nftMints = append(nftMints, nftMint)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllNftMintResponse{NftMint: nftMints, Pagination: pageRes}, nil
}

func (k Keeper) NftMint(c context.Context, req *types.QueryGetNftMintRequest) (*types.QueryGetNftMintResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetNftMint(
		ctx,
		req.ReservedKey,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetNftMintResponse{NftMint: val}, nil
}
