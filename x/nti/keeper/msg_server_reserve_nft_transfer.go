package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"strconv"
	"strings"
	"time"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ReserveNftTransfer(goCtx context.Context, msg *types.MsgReserveNftTransfer) (*types.MsgReserveNftTransferResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Generate reserved key.
	elems := []string{
		msg.SrcNftHash,
		msg.SrcChain,
		msg.SrcAddr,
		msg.DestChain,
		msg.DestAddr,
		// Convert block height into string.
		strconv.FormatInt(int64(msg.BlockHeight), 10),
	}
	joined := strings.Join(elems, ",")
	sum := sha256.Sum256([]byte(joined))
	reservedKey := hex.EncodeToString(sum[:])

	createdAt := time.Now().Unix()

	reservedNftTransfer := types.ReservedNftTransfer{
		ReservedKey:   reservedKey,
		SrcNftHash:    msg.SrcNftHash,
		SrcChain:      msg.SrcChain,
		SrcAddr:       msg.SrcAddr,
		DestChain:     msg.DestChain,
		DestAddr:      msg.DestAddr,
		BlockHeight:   msg.BlockHeight,
		FungibleToken: msg.FungibleToken,
		CreatedAt:     int32(int(createdAt)),
	}

	k.Keeper.SetReservedNftTransfer(ctx, reservedNftTransfer)

	return &types.MsgReserveNftTransferResponse{}, nil
}
