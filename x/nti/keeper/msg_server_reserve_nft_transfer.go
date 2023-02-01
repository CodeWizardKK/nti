package keeper

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"nti/internal/util"
	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

const transferFee = 10

func getAdminAddr() (string, error) {
	out, err := exec.Command("ntid", "keys", "show", "admin", "-a").Output()
	if err != nil {
		return "", err
	}
	return util.OutToString(out), nil
}

func (k msgServer) ReserveNftTransfer(goCtx context.Context, msg *types.MsgReserveNftTransfer) (*types.MsgReserveNftTransferResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Convert transfer fee to sdk.Coins
	fee := sdk.Coins{sdk.NewInt64Coin("token", transferFee)}

	// Convert owner and buyer address strings to sdk.AccAddress
	adminAddr, err := getAdminAddr()
	if err != nil {
		return nil, err
	}
	admin, _ := sdk.AccAddressFromBech32(adminAddr)
	creator, _ := sdk.AccAddressFromBech32(msg.Creator)

	// Send tokens from the creator to the admin
	err = k.bankKeeper.SendCoins(ctx, creator, admin, fee)
	if err != nil {
		return nil, err
	}

	// Generate reserved key.
	elems := []string{
		msg.NftTokenId,
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
		NftTokenId:    msg.NftTokenId,
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

	// ステータスリストに追加
	nftTransferStatus, _ := k.Keeper.GetNftTransferStatus(ctx)
	nftTransferStatus.Reserved = append(nftTransferStatus.Reserved, reservedKey)
	k.Keeper.SetNftTransferStatus(ctx, nftTransferStatus)

	return &types.MsgReserveNftTransferResponse{}, nil
}
