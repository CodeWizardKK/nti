package cli

import (
	"nti/x/nti/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

func CmdCreateNftMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-nft-mint [reserved-key] [transaction-hash] [token-uri]",
		Short: "Create a new nftMint",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			indexReservedKey := args[0]

			// Get value arguments
			argTransactionHash := args[1]
			argTokenUri := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateNftMint(
				clientCtx.GetFromAddress().String(),
				indexReservedKey,
				argTransactionHash,
				argTokenUri,
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

func CmdUpdateNftMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-nft-mint [reserved-key] [transaction-hash]",
		Short: "Update a nftMint",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			// Get indexes
			indexReservedKey := args[0]

			// Get value arguments
			argTransactionHash := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateNftMint(
				clientCtx.GetFromAddress().String(),
				indexReservedKey,
				argTransactionHash,
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

func CmdDeleteNftMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "delete-nft-mint [reserved-key]",
		Short: "Delete a nftMint",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			indexReservedKey := args[0]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgDeleteNftMint(
				clientCtx.GetFromAddress().String(),
				indexReservedKey,
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
