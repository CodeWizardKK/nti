package cli

import (
	"strconv"

	"nti/x/nti/types"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNftTransferStatusOfAddress() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "nft-transfer-status-of-address [chain] [wallet-addr]",
		Short: "Query nftTransferStatusOfAddress",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqChain, err := cast.ToInt32E(args[0])
			if err != nil {
				return err
			}
			reqWalletAddr := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryNftTransferStatusOfAddressRequest{

				Chain:      reqChain,
				WalletAddr: reqWalletAddr,
			}

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			params.Pagination = pageReq

			res, err := queryClient.NftTransferStatusOfAddress(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
