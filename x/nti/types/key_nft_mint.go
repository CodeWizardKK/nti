package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// NftMintKeyPrefix is the prefix to retrieve all NftMint
	NftMintKeyPrefix = "NftMint/value/"
)

// NftMintKey returns the store key to retrieve a NftMint from the index fields
func NftMintKey(
	reservedKey string,
) []byte {
	var key []byte

	reservedKeyBytes := []byte(reservedKey)
	key = append(key, reservedKeyBytes...)
	key = append(key, []byte("/")...)

	return key
}
