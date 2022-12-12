package nti

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"nti/testutil/sample"
	ntisimulation "nti/x/nti/simulation"
	"nti/x/nti/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = ntisimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgReserveNftTransfer = "op_weight_msg_reserve_nft_transfer"
	// TODO: Determine the simulation weight value
	defaultWeightMsgReserveNftTransfer int = 100

	opWeightMsgTransferNft = "op_weight_msg_transfer_nft"
	// TODO: Determine the simulation weight value
	defaultWeightMsgTransferNft int = 100

	opWeightMsgChangeStatus = "op_weight_msg_change_status"
	// TODO: Determine the simulation weight value
	defaultWeightMsgChangeStatus int = 100

	opWeightMsgCreateNftMint = "op_weight_msg_nft_mint"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateNftMint int = 100

	opWeightMsgUpdateNftMint = "op_weight_msg_nft_mint"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateNftMint int = 100

	opWeightMsgDeleteNftMint = "op_weight_msg_nft_mint"
	// TODO: Determine the simulation weight value
	defaultWeightMsgDeleteNftMint int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	ntiGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		NftMintList: []types.NftMint{
			{
				Creator:     sample.AccAddress(),
				ReservedKey: "0",
			},
			{
				Creator:     sample.AccAddress(),
				ReservedKey: "1",
			},
		},
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&ntiGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgReserveNftTransfer int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgReserveNftTransfer, &weightMsgReserveNftTransfer, nil,
		func(_ *rand.Rand) {
			weightMsgReserveNftTransfer = defaultWeightMsgReserveNftTransfer
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgReserveNftTransfer,
		ntisimulation.SimulateMsgReserveNftTransfer(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgTransferNft int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgTransferNft, &weightMsgTransferNft, nil,
		func(_ *rand.Rand) {
			weightMsgTransferNft = defaultWeightMsgTransferNft
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgTransferNft,
		ntisimulation.SimulateMsgTransferNft(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgChangeStatus int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgChangeStatus, &weightMsgChangeStatus, nil,
		func(_ *rand.Rand) {
			weightMsgChangeStatus = defaultWeightMsgChangeStatus
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgChangeStatus,
		ntisimulation.SimulateMsgChangeStatus(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCreateNftMint int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateNftMint, &weightMsgCreateNftMint, nil,
		func(_ *rand.Rand) {
			weightMsgCreateNftMint = defaultWeightMsgCreateNftMint
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateNftMint,
		ntisimulation.SimulateMsgCreateNftMint(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateNftMint int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateNftMint, &weightMsgUpdateNftMint, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateNftMint = defaultWeightMsgUpdateNftMint
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateNftMint,
		ntisimulation.SimulateMsgUpdateNftMint(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgDeleteNftMint int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgDeleteNftMint, &weightMsgDeleteNftMint, nil,
		func(_ *rand.Rand) {
			weightMsgDeleteNftMint = defaultWeightMsgDeleteNftMint
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgDeleteNftMint,
		ntisimulation.SimulateMsgDeleteNftMint(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
