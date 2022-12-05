package main

import (
	"fmt"

	"github.com/tendermint/tendermint/crypto"
	"github.com/tendermint/tendermint/crypto/ed25519"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func keyPubAddr() (crypto.PrivKey, crypto.PubKey, sdk.AccAddress) {
	key := ed25519.GenPrivKey()
	pub := key.PubKey()
	addr := sdk.AccAddress(pub.Address())
	return key, pub, addr
}

func main() {
	fmt.Println("create a new account")

	key, pub, addr := keyPubAddr()
	fmt.Println(key)
	fmt.Println(pub)
	fmt.Println(addr)
}
