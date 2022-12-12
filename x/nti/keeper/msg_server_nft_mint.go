package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"nti/x/nti/types"
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
		Creator:         msg.Creator,
		ReservedKey:     msg.ReservedKey,
		TransactionHash: msg.TransactionHash,
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
	valFound, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	var nftMint = types.NftMint{
		Creator:         msg.Creator,
		ReservedKey:     msg.ReservedKey,
		TransactionHash: msg.TransactionHash,
	}

	k.SetNftMint(ctx, nftMint)

	return &types.MsgUpdateNftMintResponse{}, nil
}

func (k msgServer) DeleteNftMint(goCtx context.Context, msg *types.MsgDeleteNftMint) (*types.MsgDeleteNftMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value exists
	valFound, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, "index not set")
	}

	// Checks if the the msg creator is the same as the current owner
	if msg.Creator != valFound.Creator {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}

	k.RemoveNftMint(
		ctx,
		msg.ReservedKey,
	)

	return &types.MsgDeleteNftMintResponse{}, nil
}
