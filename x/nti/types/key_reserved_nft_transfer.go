package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// ReservedNftTransferKeyPrefix is the prefix to retrieve all ReservedNftTransfer
	ReservedNftTransferKeyPrefix = "ReservedNftTransfer/value/"
)

// ReservedNftTransferKey returns the store key to retrieve a ReservedNftTransfer from the index fields
func ReservedNftTransferKey(
	reservedKey string,
) []byte {
	var key []byte

	reservedKeyBytes := []byte(reservedKey)
	key = append(key, reservedKeyBytes...)
	key = append(key, []byte("/")...)

	return key
}
