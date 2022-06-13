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

func createNReservedNftTransfer(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.ReservedNftTransfer {
	items := make([]types.ReservedNftTransfer, n)
	for i := range items {
		items[i].ReservedKey = strconv.Itoa(i)

		keeper.SetReservedNftTransfer(ctx, items[i])
	}
	return items
}

func TestReservedNftTransferGet(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNReservedNftTransfer(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetReservedNftTransfer(ctx,
			item.ReservedKey,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestReservedNftTransferRemove(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNReservedNftTransfer(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveReservedNftTransfer(ctx,
			item.ReservedKey,
		)
		_, found := keeper.GetReservedNftTransfer(ctx,
			item.ReservedKey,
		)
		require.False(t, found)
	}
}

func TestReservedNftTransferGetAll(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	items := createNReservedNftTransfer(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllReservedNftTransfer(ctx)),
	)
}
