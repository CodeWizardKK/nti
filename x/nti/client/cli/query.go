package cli

import (
	"fmt"
	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	// sdk "github.com/cosmos/cosmos-sdk/types"

	"nti/x/nti/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group nti queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdQueryParams())
	cmd.AddCommand(CmdListNftTransfer())
	cmd.AddCommand(CmdShowNftTransfer())
	cmd.AddCommand(CmdListReservedNftTransfer())
	cmd.AddCommand(CmdShowReservedNftTransfer())
	cmd.AddCommand(CmdShowNftTransferStatus())
	cmd.AddCommand(CmdListNftMint())
	cmd.AddCommand(CmdShowNftMint())
	cmd.AddCommand(CmdNftTransferStatusOfToken())

	cmd.AddCommand(CmdNftTransferStatusOfAddress())

	cmd.AddCommand(CmdNftTransferHistory())

	// this line is used by starport scaffolding # 1

	return cmd
}
