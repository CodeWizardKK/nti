package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAddNftMintResult = "add_nft_mint_result"

var _ sdk.Msg = &MsgAddNftMintResult{}

func NewMsgAddNftMintResult(creator string, reservedKey string, tokenId string) *MsgAddNftMintResult {
	return &MsgAddNftMintResult{
		Creator:     creator,
		ReservedKey: reservedKey,
		TokenId:     tokenId,
	}
}

func (msg *MsgAddNftMintResult) Route() string {
	return RouterKey
}

func (msg *MsgAddNftMintResult) Type() string {
	return TypeMsgAddNftMintResult
}

func (msg *MsgAddNftMintResult) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgAddNftMintResult) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgAddNftMintResult) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
