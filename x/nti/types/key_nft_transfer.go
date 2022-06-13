package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// NftTransferKeyPrefix is the prefix to retrieve all NftTransfer
	NftTransferKeyPrefix = "NftTransfer/value/"
)

// NftTransferKey returns the store key to retrieve a NftTransfer from the index fields
func NftTransferKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
