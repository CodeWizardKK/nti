package nti_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "nti/testutil/keeper"
	"nti/testutil/nullify"
	"nti/x/nti"
	"nti/x/nti/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.NtiKeeper(t)
	nti.InitGenesis(ctx, *k, genesisState)
	got := nti.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
