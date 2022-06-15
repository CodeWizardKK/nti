package keeper

import (
	"context"
	"strconv"
	"time"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) TransferNft(goCtx context.Context, msg *types.MsgTransferNft) (*types.MsgTransferNftResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	index := len(k.Keeper.GetAllNftTransfer(ctx))
	createdAt := time.Now().Unix()

	// TODO: Handling the message
	nftTransfer := types.NftTransfer{
		Index:       strconv.Itoa(index),
		SrcNftHash:  msg.SrcNftHash,
		SrcChain:    msg.SrcChain,
		SrcAddr:     msg.SrcAddr,
		DestNftHash: msg.DestNftHash,
		DestChain:   msg.DestChain,
		DestAddr:    msg.DestAddr,
		CreatedAt:   int32(int(createdAt)),
	}

	k.Keeper.SetNftTransfer(ctx, nftTransfer)

	return &types.MsgTransferNftResponse{}, nil
}
