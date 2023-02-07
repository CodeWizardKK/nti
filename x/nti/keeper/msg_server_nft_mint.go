package keeper

import (
	"context"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) CreateNftMint(goCtx context.Context, msg *types.MsgCreateNftMint) (*types.MsgCreateNftMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value already exists
	_, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "index already set")
	}

	var nftMint = types.NftMint{
		ReservedKey:     msg.ReservedKey,
		TransactionHash: msg.TransactionHash,
		TokenUri:        msg.TokenUri,
	}

	k.SetNftMint(
		ctx,
		nftMint,
	)
	return &types.MsgCreateNftMintResponse{}, nil
}

func (k msgServer) UpdateNftMint(goCtx context.Context, msg *types.MsgUpdateNftMint) (*types.MsgUpdateNftMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	_, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	var nftMint = types.NftMint{
		ReservedKey:     msg.ReservedKey,
		TransactionHash: msg.TransactionHash,
		TokenUri:        msg.TokenUri,
	}

	k.SetNftMint(ctx, nftMint)

	return &types.MsgUpdateNftMintResponse{}, nil
}

func (k msgServer) DeleteNftMint(goCtx context.Context, msg *types.MsgDeleteNftMint) (*types.MsgDeleteNftMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	_, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	k.RemoveNftMint(
		ctx,
		msg.ReservedKey,
	)

	return &types.MsgDeleteNftMintResponse{}, nil
}
