package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgChangeStatus = "change_status"

var _ sdk.Msg = &MsgChangeStatus{}

func NewMsgChangeStatus(creator string, reservedKey string, to int32) *MsgChangeStatus {
	return &MsgChangeStatus{
		Creator:     creator,
		ReservedKey: reservedKey,
		To:          to,
	}
}

func (msg *MsgChangeStatus) Route() string {
	return RouterKey
}

func (msg *MsgChangeStatus) Type() string {
	return TypeMsgChangeStatus
}

func (msg *MsgChangeStatus) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgChangeStatus) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgChangeStatus) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
