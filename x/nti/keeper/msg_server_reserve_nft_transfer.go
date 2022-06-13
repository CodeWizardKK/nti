package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

func (k msgServer) ReserveNftTransfer(goCtx context.Context, msg *types.MsgReserveNftTransfer) (*types.MsgReserveNftTransferResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgReserveNftTransferResponse{}, nil
}
