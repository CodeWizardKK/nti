package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

// SetNftTransfer set a specific nftTransfer in the store from its index
func (k Keeper) SetNftTransfer(ctx sdk.Context, nftTransfer types.NftTransfer) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferKeyPrefix))
	b := k.cdc.MustMarshal(&nftTransfer)
	store.Set(types.NftTransferKey(
		nftTransfer.Index,
	), b)
}

// GetNftTransfer returns a nftTransfer from its index
func (k Keeper) GetNftTransfer(
	ctx sdk.Context,
	index string,

) (val types.NftTransfer, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferKeyPrefix))

	b := store.Get(types.NftTransferKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveNftTransfer removes a nftTransfer from the store
func (k Keeper) RemoveNftTransfer(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferKeyPrefix))
	store.Delete(types.NftTransferKey(
		index,
	))
}

// GetAllNftTransfer returns all nftTransfer
func (k Keeper) GetAllNftTransfer(ctx sdk.Context) (list []types.NftTransfer) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftTransferKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.NftTransfer
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
