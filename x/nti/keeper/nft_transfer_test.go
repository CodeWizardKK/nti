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

func createNNftTransfer(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.NftTransfer {
	items := make([]types.NftTransfer, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetNftTransfer(ctx, items[i])
	}
	return items
}

func TestNftTransferGet(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftTransfer(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetNftTransfer(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestNftTransferRemove(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftTransfer(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveNftTransfer(ctx,
			item.Index,
		)
		_, found := keeper.GetNftTransfer(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestNftTransferGetAll(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNNftTransfer(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllNftTransfer(ctx)),
	)
}
