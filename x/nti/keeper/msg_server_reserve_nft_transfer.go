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
		msg.NftSrcHash,
		strconv.FormatInt(int64(msg.NftSrcChain), 10),
		msg.NftSrcAddr,
		strconv.FormatInt(int64(msg.NftDestChain), 10),
		msg.NftDestAddr,
		// Convert block height into string.
		strconv.FormatInt(int64(msg.BlockHeight), 10),
	}
	joined := strings.Join(elems, ",")
	sum := sha256.Sum256([]byte(joined))
	reservedKey := hex.EncodeToString(sum[:])

	createdAt := time.Now().Unix()

	reservedNftTransfer := types.ReservedNftTransfer{
		ReservedKey:   reservedKey,
		NftSrcHash:    msg.NftSrcHash,
		NftSrcChain:   msg.NftSrcChain,
		NftSrcAddr:    msg.NftSrcAddr,
		NftDestChain:  msg.NftDestChain,
		NftDestAddr:   msg.NftDestAddr,
		FtChain:       msg.FtChain,
		FtSrcAddr:     msg.FtSrcAddr,
		FtDestAddr:    msg.FtDestAddr,
		FungibleToken: msg.FungibleToken,
		BlockHeight:   msg.BlockHeight,
		CreatedAt:     int32(int(createdAt)),
	}

	k.Keeper.SetReservedNftTransfer(ctx, reservedNftTransfer)

	return &types.MsgReserveNftTransferResponse{}, nil
}
