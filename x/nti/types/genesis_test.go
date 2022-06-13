package types_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	"nti/x/nti/types"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{

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
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated nftTransfer",
			genState: &types.GenesisState{
				NftTransferList: []types.NftTransfer{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated reservedNftTransfer",
			genState: &types.GenesisState{
				ReservedNftTransferList: []types.ReservedNftTransfer{
					{
						ReservedKey: "0",
					},
					{
						ReservedKey: "0",
					},
				},
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
