package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "nti/testutil/keeper"
	"nti/testutil/nullify"
	"nti/x/nti/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestReservedNftTransferQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNReservedNftTransfer(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetReservedNftTransferRequest
		response *types.QueryGetReservedNftTransferResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetReservedNftTransferRequest{
				ReservedKey: msgs[0].ReservedKey,
			},
			response: &types.QueryGetReservedNftTransferResponse{ReservedNftTransfer: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetReservedNftTransferRequest{
				ReservedKey: msgs[1].ReservedKey,
			},
			response: &types.QueryGetReservedNftTransferResponse{ReservedNftTransfer: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetReservedNftTransferRequest{
				ReservedKey: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.ReservedNftTransfer(wctx, tc.request)
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

func TestReservedNftTransferQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.NtiKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNReservedNftTransfer(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllReservedNftTransferRequest {
		return &types.QueryAllReservedNftTransferRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.ReservedNftTransferAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.ReservedNftTransfer), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.ReservedNftTransfer),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.ReservedNftTransferAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.ReservedNftTransfer), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.ReservedNftTransfer),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.ReservedNftTransferAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.ReservedNftTransfer),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.ReservedNftTransferAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
