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

		NftTransferList: []types.NftTransfer{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		ReservedNftTransferList: []types.ReservedNftTransfer{
			{
				ReservedKey: "0",
			},
			{
				ReservedKey: "1",
			},
		},
		NftTransferStatus: &types.NftTransferStatus{
			Reserved:  []string{"93"},
			Confirmed: []string{"82"},
			Expired:   []string{"92"},
			Waiting:   []string{"83"},
			Completed: []string{"11"},
		},
		NftMintList: []types.NftMint{
			{
				ReservedKeys: "0",
			},
			{
				ReservedKeys: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.NtiKeeper(t)
	nti.InitGenesis(ctx, *k, genesisState)
	got := nti.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.NftTransferList, got.NftTransferList)
	require.ElementsMatch(t, genesisState.ReservedNftTransferList, got.ReservedNftTransferList)
	require.Equal(t, genesisState.NftTransferStatus, got.NftTransferStatus)
	require.ElementsMatch(t, genesisState.NftMintList, got.NftMintList)
	// this line is used by starport scaffolding # genesis/test/assert
}
