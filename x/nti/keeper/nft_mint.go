package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"nti/x/nti/types"
)

// SetNftMint set a specific nftMint in the store from its index
func (k Keeper) SetNftMint(ctx sdk.Context, nftMint types.NftMint) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftMintKeyPrefix))
	b := k.cdc.MustMarshal(&nftMint)
	store.Set(types.NftMintKey(
		nftMint.ReservedKeys,
	), b)
}

// GetNftMint returns a nftMint from its index
func (k Keeper) GetNftMint(
	ctx sdk.Context,
	reservedKeys string,

) (val types.NftMint, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftMintKeyPrefix))

	b := store.Get(types.NftMintKey(
		reservedKeys,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveNftMint removes a nftMint from the store
func (k Keeper) RemoveNftMint(
	ctx sdk.Context,
	reservedKeys string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftMintKeyPrefix))
	store.Delete(types.NftMintKey(
		reservedKeys,
	))
}

// GetAllNftMint returns all nftMint
func (k Keeper) GetAllNftMint(ctx sdk.Context) (list []types.NftMint) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.NftMintKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.NftMint
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
