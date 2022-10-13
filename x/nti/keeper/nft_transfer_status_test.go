package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "nti/testutil/keeper"
	"nti/testutil/nullify"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

func createTestNftTransferStatus(keeper *keeper.Keeper, ctx sdk.Context) types.NftTransferStatus {
	item := types.NftTransferStatus{}
	keeper.SetNftTransferStatus(ctx, item)
	return item
}

func TestNftTransferStatusGet(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	item := createTestNftTransferStatus(keeper, ctx)
	rst, found := keeper.GetNftTransferStatus(ctx)
	require.True(t, found)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}

func TestNftTransferStatusRemove(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	createTestNftTransferStatus(keeper, ctx)
	keeper.RemoveNftTransferStatus(ctx)
	_, found := keeper.GetNftTransferStatus(ctx)
	require.False(t, found)
}
