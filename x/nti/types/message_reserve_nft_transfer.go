package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgReserveNftTransfer = "reserve_nft_transfer"

var _ sdk.Msg = &MsgReserveNftTransfer{}

func NewMsgReserveNftTransfer(
	creator string,
	nftSrcHash string,
	nftSrcChain int32,
	nftSrcAddr string,
	nftDestChain int32,
	nftDestAddr string,
	ftChain int32,
	ftSrcAddr string,
	ftDestAddr string,
	fungibleToken int32,
	blockHeight int32) *MsgReserveNftTransfer {
	return &MsgReserveNftTransfer{
		Creator:       creator,
		NftSrcHash:    nftSrcHash,
		NftSrcChain:   nftSrcChain,
		NftSrcAddr:    nftSrcAddr,
		NftDestChain:  nftDestChain,
		NftDestAddr:   nftDestAddr,
		FtChain:       ftChain,
		FtSrcAddr:     ftSrcAddr,
		FtDestAddr:    ftDestAddr,
		FungibleToken: fungibleToken,
		BlockHeight:   blockHeight,
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
