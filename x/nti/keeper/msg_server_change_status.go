package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

func (k msgServer) ChangeStatus(goCtx context.Context, msg *types.MsgChangeStatus) (*types.MsgChangeStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgChangeStatusResponse{}, nil
}
