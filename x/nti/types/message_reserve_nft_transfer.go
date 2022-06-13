package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgReserveNftTransfer = "reserve_nft_transfer"

var _ sdk.Msg = &MsgReserveNftTransfer{}

func NewMsgReserveNftTransfer(creator string, srcNftHash string, srcChain string, srcAddr string, destNftHash string, destChain string, destAddr string, blockHeight int32) *MsgReserveNftTransfer {
	return &MsgReserveNftTransfer{
		Creator:     creator,
		SrcNftHash:  srcNftHash,
		SrcChain:    srcChain,
		SrcAddr:     srcAddr,
		DestNftHash: destNftHash,
		DestChain:   destChain,
		DestAddr:    destAddr,
		BlockHeight: blockHeight,
	}
}

func (msg *MsgReserveNftTransfer) Route() string {
	return RouterKey
}

func (msg *MsgReserveNftTransfer) Type() string {
	return TypeMsgReserveNftTransfer
}

func (msg *MsgReserveNftTransfer) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgReserveNftTransfer) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgReserveNftTransfer) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
