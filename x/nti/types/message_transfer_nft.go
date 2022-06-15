package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgTransferNft = "transfer_nft"

var _ sdk.Msg = &MsgTransferNft{}

func NewMsgTransferNft(creator string, srcNftHash string, srcChain string, srcAddr string, destNftHash string, destChain string, destAddr string) *MsgTransferNft {
	return &MsgTransferNft{
		Creator:     creator,
		SrcNftHash:  srcNftHash,
		SrcChain:    srcChain,
		SrcAddr:     srcAddr,
		DestNftHash: destNftHash,
		DestChain:   destChain,
		DestAddr:    destAddr,
	}
}

func (msg *MsgTransferNft) Route() string {
	return RouterKey
}

func (msg *MsgTransferNft) Type() string {
	return TypeMsgTransferNft
}

func (msg *MsgTransferNft) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgTransferNft) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgTransferNft) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
