package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// NftMintKeyPrefix is the prefix to retrieve all NftMint
	NftMintKeyPrefix = "NftMint/value/"
)

// NftMintKey returns the store key to retrieve a NftMint from the index fields
func NftMintKey(
	reservedKeys string,
) []byte {
	var key []byte

	reservedKeysBytes := []byte(reservedKeys)
	key = append(key, reservedKeysBytes...)
	key = append(key, []byte("/")...)

	return key
}
