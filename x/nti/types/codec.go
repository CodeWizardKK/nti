package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgReserveNftTransfer{}, "nti/ReserveNftTransfer", nil)
	cdc.RegisterConcrete(&MsgTransferNft{}, "nti/TransferNft", nil)
	cdc.RegisterConcrete(&MsgChangeStatus{}, "nti/ChangeStatus", nil)
	cdc.RegisterConcrete(&MsgCreateNftMint{}, "nti/CreateNftMint", nil)
	cdc.RegisterConcrete(&MsgUpdateNftMint{}, "nti/UpdateNftMint", nil)
	cdc.RegisterConcrete(&MsgDeleteNftMint{}, "nti/DeleteNftMint", nil)
	cdc.RegisterConcrete(&MsgAddNftMintResult{}, "nti/AddNftMintResult", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgReserveNftTransfer{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgTransferNft{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgChangeStatus{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateNftMint{},
		&MsgUpdateNftMint{},
		&MsgDeleteNftMint{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgAddNftMintResult{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
