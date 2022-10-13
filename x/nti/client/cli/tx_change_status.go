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

func CmdChangeStatus() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "change-status [reserved-key] [from] [to]",
		Short: "Broadcast message changeStatus",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argReservedKey := args[0]
			argFrom := args[1]
			argTo := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgChangeStatus(
				clientCtx.GetFromAddress().String(),
				argReservedKey,
				argFrom,
				argTo,
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
