package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
	"nti/x/nti/types"
)

var _ = strconv.Itoa(0)

func CmdReserveNftTransfer() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reserve-nft-transfer [src-nft-hash] [src-chain] [src-addr] [dest-nft-hash] [dest-chain] [dest-addr] [block-height]",
		Short: "Broadcast message reserveNftTransfer",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argSrcNftHash := args[0]
			argSrcChain := args[1]
			argSrcAddr := args[2]
			argDestNftHash := args[3]
			argDestChain := args[4]
			argDestAddr := args[5]
			argBlockHeight, err := cast.ToInt32E(args[6])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgReserveNftTransfer(
				clientCtx.GetFromAddress().String(),
				argSrcNftHash,
				argSrcChain,
				argSrcAddr,
				argDestNftHash,
				argDestChain,
				argDestAddr,
				argBlockHeight,
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
