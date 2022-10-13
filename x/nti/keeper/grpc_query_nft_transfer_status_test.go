package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "nti/testutil/keeper"
	"nti/testutil/nullify"
	"nti/x/nti/types"
)

func TestNftTransferStatusQuery(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	item := createTestNftTransferStatus(keeper, ctx)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetNftTransferStatusRequest
		response *types.QueryGetNftTransferStatusResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetNftTransferStatusRequest{},
			response: &types.QueryGetNftTransferStatusResponse{NftTransferStatus: item},
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.NftTransferStatus(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}
