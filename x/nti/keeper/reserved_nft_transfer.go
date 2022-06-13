package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

// SetReservedNftTransfer set a specific reservedNftTransfer in the store from its index
func (k Keeper) SetReservedNftTransfer(ctx sdk.Context, reservedNftTransfer types.ReservedNftTransfer) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReservedNftTransferKeyPrefix))
	b := k.cdc.MustMarshal(&reservedNftTransfer)
	store.Set(types.ReservedNftTransferKey(
		reservedNftTransfer.ReservedKey,
	), b)
}

// GetReservedNftTransfer returns a reservedNftTransfer from its index
func (k Keeper) GetReservedNftTransfer(
	ctx sdk.Context,
	reservedKey string,

) (val types.ReservedNftTransfer, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReservedNftTransferKeyPrefix))

	b := store.Get(types.ReservedNftTransferKey(
		reservedKey,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveReservedNftTransfer removes a reservedNftTransfer from the store
func (k Keeper) RemoveReservedNftTransfer(
	ctx sdk.Context,
	reservedKey string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReservedNftTransferKeyPrefix))
	store.Delete(types.ReservedNftTransferKey(
		reservedKey,
	))
}

// GetAllReservedNftTransfer returns all reservedNftTransfer
func (k Keeper) GetAllReservedNftTransfer(ctx sdk.Context) (list []types.ReservedNftTransfer) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.ReservedNftTransferKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.ReservedNftTransfer
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
