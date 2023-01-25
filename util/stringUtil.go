package util

import (
	"strings"
)

func OutToString(out []byte) string {
	return strings.TrimRight(string(out), "\n")
}
