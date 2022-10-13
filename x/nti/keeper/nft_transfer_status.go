package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

// SetNftTransferStatus set nftTransferStatus in the store
func (k Keeper) SetNftTransferStatus(ctx sdk.Context, nftTransferStatus types.NftTransferStatus) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferStatusKey))
	b := k.cdc.MustMarshal(&nftTransferStatus)
	store.Set([]byte{0}, b)
}

// GetNftTransferStatus returns nftTransferStatus
func (k Keeper) GetNftTransferStatus(ctx sdk.Context) (val types.NftTransferStatus, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferStatusKey))

	b := store.Get([]byte{0})
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveNftTransferStatus removes nftTransferStatus from the store
func (k Keeper) RemoveNftTransferStatus(ctx sdk.Context) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferStatusKey))
	store.Delete([]byte{0})
}
