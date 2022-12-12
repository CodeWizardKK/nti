package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	keepertest "nti/testutil/keeper"
	"nti/testutil/nullify"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNNftMint(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.NftMint {
	items := make([]types.NftMint, n)
	for i := range items {
		items[i].ReservedKeys = strconv.Itoa(i)

		keeper.SetNftMint(ctx, items[i])
	}
	return items
}

func TestNftMintGet(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftMint(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetNftMint(ctx,
			item.ReservedKeys,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestNftMintRemove(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftMint(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveNftMint(ctx,
			item.ReservedKeys,
		)
		_, found := keeper.GetNftMint(ctx,
			item.ReservedKeys,
		)
		require.False(t, found)
	}
}

func TestNftMintGetAll(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftMint(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllNftMint(ctx)),
	)
}
