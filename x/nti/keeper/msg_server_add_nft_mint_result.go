package keeper

import (
	"context"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) AddNftMintResult(goCtx context.Context, msg *types.MsgAddNftMintResult) (*types.MsgAddNftMintResultResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	nftMint, isFound := k.GetNftMint(
		ctx,
		msg.ReservedKey,
	)
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "not found")
	}

	nftMint.TokenId = msg.TokenId

	k.SetNftMint(
		ctx,
		nftMint,
	)

	return &types.MsgAddNftMintResultResponse{}, nil
}
