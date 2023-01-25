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

func CmdNftTransferStatusOfToken() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "nft-transfer-status-of-token [chain] [contract-addr] [token-id]",
		Short: "Query nftTransferStatusOfToken",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqChain, err := cast.ToInt32E(args[0])
			if err != nil {
				return err
			}
			reqContractAddr := args[1]
			reqTokenId := args[2]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryNftTransferStatusOfTokenRequest{

				Chain:        reqChain,
				ContractAddr: reqContractAddr,
				TokenId:      reqTokenId,
			}

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}
			params.Pagination = pageReq

			res, err := queryClient.NftTransferStatusOfToken(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
