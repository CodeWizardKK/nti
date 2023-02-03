package check

import (
	"os"
	"path"
	"strconv"
)

func apiDir() string {
	return path.Join(os.Getenv("APP_DIR"), "pkg/nfts", os.Getenv("API_PROVIDER"))
}

func isNftMintedPath() string {
	return path.Join(apiDir(), "is-nft-minted.js")
}

func isNftRecievedPath() string {
	return path.Join(apiDir(), "is-nft-recieved.js")
}

func getNftTokenUriPath() string {
	return path.Join(apiDir(), "get-nft-token-uri.js")
}

func fees() string {
	return os.Getenv("FEES")
}

func validSecond() int {
	validSecond, err := strconv.Atoi(os.Getenv("RESERVATION_VALID_SECOND"))
	if err != nil {
		return 0
	}
	return validSecond
}
