package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

func (k msgServer) TransferNft(goCtx context.Context, msg *types.MsgTransferNft) (*types.MsgTransferNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgTransferNftResponse{}, nil
}
