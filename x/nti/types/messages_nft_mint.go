package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateNftMint = "create_nft_mint"
	TypeMsgUpdateNftMint = "update_nft_mint"
	TypeMsgDeleteNftMint = "delete_nft_mint"
)

var _ sdk.Msg = &MsgCreateNftMint{}

func NewMsgCreateNftMint(
	creator string,
	reservedKey string,
	transactionHash string,
	tokenUri string,

) *MsgCreateNftMint {
	return &MsgCreateNftMint{
		Creator:         creator,
		ReservedKey:     reservedKey,
		TransactionHash: transactionHash,
		TokenUri:        tokenUri,
	}
}

func (msg *MsgCreateNftMint) Route() string {
	return RouterKey
}

func (msg *MsgCreateNftMint) Type() string {
	return TypeMsgCreateNftMint
}

func (msg *MsgCreateNftMint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCreateNftMint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateNftMint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgUpdateNftMint{}

func NewMsgUpdateNftMint(
	creator string,
	reservedKey string,
	transactionHash string,

) *MsgUpdateNftMint {
	return &MsgUpdateNftMint{
		Creator:         creator,
		ReservedKey:     reservedKey,
		TransactionHash: transactionHash,
	}
}

func (msg *MsgUpdateNftMint) Route() string {
	return RouterKey
}

func (msg *MsgUpdateNftMint) Type() string {
	return TypeMsgUpdateNftMint
}

func (msg *MsgUpdateNftMint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateNftMint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateNftMint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}

var _ sdk.Msg = &MsgDeleteNftMint{}

func NewMsgDeleteNftMint(
	creator string,
	reservedKey string,

) *MsgDeleteNftMint {
	return &MsgDeleteNftMint{
		Creator:     creator,
		ReservedKey: reservedKey,
	}
}
func (msg *MsgDeleteNftMint) Route() string {
	return RouterKey
}

func (msg *MsgDeleteNftMint) Type() string {
	return TypeMsgDeleteNftMint
}

func (msg *MsgDeleteNftMint) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgDeleteNftMint) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgDeleteNftMint) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
