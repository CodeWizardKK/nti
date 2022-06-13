package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "nti/testutil/keeper"
	"nti/x/nti/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.NtiKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
