package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	keepertest "nti/testutil/keeper"
	"nti/x/nti/keeper"
	"nti/x/nti/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestNftMintMsgServerCreate(t *testing.T) {
	k, ctx := keepertest.NtiKeeper(t)
	srv := keeper.NewMsgServerImpl(*k)
	wctx := sdk.WrapSDKContext(ctx)
	creator := "A"
	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateNftMint{Creator: creator,
			ReservedKey: strconv.Itoa(i),
		}
		_, err := srv.CreateNftMint(wctx, expected)
		require.NoError(t, err)
		_, found := k.GetNftMint(ctx,
			expected.ReservedKey,
		)
		require.True(t, found)
		// require.Equal(t, expected.Creator, rst.Creator)
	}
}

func TestNftMintMsgServerUpdate(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgUpdateNftMint
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgUpdateNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(0),
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgUpdateNftMint{Creator: "B",
				ReservedKey: strconv.Itoa(0),
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "KeyNotFound",
			request: &types.MsgUpdateNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(100000),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			k, ctx := keepertest.NtiKeeper(t)
			srv := keeper.NewMsgServerImpl(*k)
			wctx := sdk.WrapSDKContext(ctx)
			expected := &types.MsgCreateNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(0),
			}
			_, err := srv.CreateNftMint(wctx, expected)
			require.NoError(t, err)

			_, err = srv.UpdateNftMint(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				_, found := k.GetNftMint(ctx,
					expected.ReservedKey,
				)
				require.True(t, found)
				// require.Equal(t, expected.Creator, rst.Creator)
			}
		})
	}
}

func TestNftMintMsgServerDelete(t *testing.T) {
	creator := "A"

	for _, tc := range []struct {
		desc    string
		request *types.MsgDeleteNftMint
		err     error
	}{
		{
			desc: "Completed",
			request: &types.MsgDeleteNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(0),
			},
		},
		{
			desc: "Unauthorized",
			request: &types.MsgDeleteNftMint{Creator: "B",
				ReservedKey: strconv.Itoa(0),
			},
			err: sdkerrors.ErrUnauthorized,
		},
		{
			desc: "KeyNotFound",
			request: &types.MsgDeleteNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(100000),
			},
			err: sdkerrors.ErrKeyNotFound,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			k, ctx := keepertest.NtiKeeper(t)
			srv := keeper.NewMsgServerImpl(*k)
			wctx := sdk.WrapSDKContext(ctx)

			_, err := srv.CreateNftMint(wctx, &types.MsgCreateNftMint{Creator: creator,
				ReservedKey: strconv.Itoa(0),
			})
			require.NoError(t, err)
			_, err = srv.DeleteNftMint(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				_, found := k.GetNftMint(ctx,
					tc.request.ReservedKey,
				)
				require.False(t, found)
			}
		})
	}
}
