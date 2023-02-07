package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"nti/x/nti/types"
)

var _ = strconv.Itoa(0)

func CmdAddNftMintResult() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-nft-mint-result [reserved-key] [token-id]",
		Short: "Broadcast message addNftMintResult",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argReservedKey := args[0]
			argTokenId := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddNftMintResult(
				clientCtx.GetFromAddress().String(),
				argReservedKey,
				argTokenId,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
