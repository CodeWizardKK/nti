package cli

import (
	"strconv"

	"nti/x/nti/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdReserveNftTransfer() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reserve-nft-transfer [src-nft-hash] [src-chain] [src-addr] [dest-nft-hash] [dest-chain] [dest-addr] [dest-reservation-addr] [block-height]",
		Short: "Broadcast message reserveNftTransfer",
		Args:  cobra.ExactArgs(7),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argSrcNftHash := args[0]
			argSrcChain := args[1]
			argSrcAddr := args[2]
			argDestChain := args[3]
			argDestAddr := args[4]
			argDestReservationAddr := args[5]
			argBlockHeight, err := cast.ToInt32E(args[6])
			argFungibleToken, err := cast.ToInt32E(args[7])
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
				argDestChain,
				argDestAddr,
				argDestReservationAddr,
				argBlockHeight,
				argFungibleToken,
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
