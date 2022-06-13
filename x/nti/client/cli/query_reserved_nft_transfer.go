package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"nti/x/nti/types"
)

func CmdListReservedNftTransfer() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "list-reserved-nft-transfer",
		Short: "list all reservedNftTransfer",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryAllReservedNftTransferRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.ReservedNftTransferAll(context.Background(), params)
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

func CmdShowReservedNftTransfer() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-reserved-nft-transfer [reserved-key]",
		Short: "shows a reservedNftTransfer",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argReservedKey := args[0]

			params := &types.QueryGetReservedNftTransferRequest{
				ReservedKey: argReservedKey,
			}

			res, err := queryClient.ReservedNftTransfer(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
