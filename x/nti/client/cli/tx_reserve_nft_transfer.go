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
		Use: `reserve-nft-transfer [nft-token-id]
			[nft-src-chain]
			[nft-src-addr]
			[nft-dest-chain]
			[nft-dest-addr]
			[ft-chain]
			[ft-src-addr]
			[ft-dest-addr]
			[fungible-token]
			[block-height]`,
		Short: "Broadcast message reserveNftTransfer",
		Args:  cobra.ExactArgs(10),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argNftTokenId := args[0]
			argNftSrcChain, err := cast.ToInt32E(args[1])
			argNftSrcAddr := args[2]
			argNftDestChain, err := cast.ToInt32E(args[3])
			argNftDestAddr := args[4]
			argFtChain, err := cast.ToInt32E(args[5])
			argFtSrcAddr := args[6]
			argFtDestAddr := args[7]
			argFungibleToken, err := cast.ToInt32E(args[8])
			argBlockHeight, err := cast.ToInt32E(args[9])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgReserveNftTransfer(
				clientCtx.GetFromAddress().String(),
				argNftTokenId,
				argNftSrcChain,
				argNftSrcAddr,
				argNftDestChain,
				argNftDestAddr,
				argFtChain,
				argFtSrcAddr,
				argFtDestAddr,
				argFungibleToken,
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
