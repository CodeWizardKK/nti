package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nti/x/nti/types"
)

func CmdListNftMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-nft-mint",
		Short: "list all nftMint",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllNftMintRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.NftMintAll(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddPaginationFlagsToCmd(cmd, cmd.Use)
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

func CmdShowNftMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-nft-mint [reserved-key]",
		Short: "shows a nftMint",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argReservedKey := args[0]

			params := &types.QueryGetNftMintRequest{
				ReservedKey: argReservedKey,
			}

			res, err := queryClient.NftMint(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
