package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		NftTransferList:         []NftTransfer{},
		ReservedNftTransferList: []ReservedNftTransfer{},
		NftTransferStatus:       nil,
		NftMintList:             []NftMint{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated index in nftTransfer
	nftTransferIndexMap := make(map[string]struct{})

	for _, elem := range gs.NftTransferList {
		index := string(NftTransferKey(elem.Index))
		if _, ok := nftTransferIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for nftTransfer")
		}
		nftTransferIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in reservedNftTransfer
	reservedNftTransferIndexMap := make(map[string]struct{})

	for _, elem := range gs.ReservedNftTransferList {
		index := string(ReservedNftTransferKey(elem.ReservedKey))
		if _, ok := reservedNftTransferIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for reservedNftTransfer")
		}
		reservedNftTransferIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in nftMint
	nftMintIndexMap := make(map[string]struct{})

	for _, elem := range gs.NftMintList {
		index := string(NftMintKey(elem.ReservedKeys))
		if _, ok := nftMintIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for nftMint")
		}
		nftMintIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
