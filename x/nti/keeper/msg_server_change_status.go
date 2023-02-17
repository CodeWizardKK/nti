package keeper

import (
	"context"
	"reflect"

	"nti/internal/enum"
	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ChangeStatus(goCtx context.Context, msg *types.MsgChangeStatus) (*types.MsgChangeStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// 現在の移転ステータスリストを取得
	nftTransferStatus, _ := k.Keeper.GetNftTransferStatus(ctx)
	// 指定されたステータスを文字列に変換
	statusTo := enum.TransferStatus(int(msg.To))
	// 一つ前のステータスを取得
	statusFrom, ok := enum.PrevTransferStatus[statusTo]
	// Toの値が無効の場合、終了
	// TODO: エラーの返し方
	if !ok {
		return &types.MsgChangeStatusResponse{}, nil
	}

	// セット可能なポインターに変換
	nftTransferStatusPointer := reflect.ValueOf(&nftTransferStatus).Elem()
	// 各ステータスにある予約キーリストを取得
	keysFrom := nftTransferStatusPointer.FieldByName(statusFrom.String())
	keysTo := nftTransferStatusPointer.FieldByName(statusTo.String())

	// 一つ前のステータスから予約キーを削除
	keysFromLen := keysFrom.Len()
	keyExists := false
	for i := 0; i < keysFromLen; i++ {
		if keysFrom.Index(i).String() == msg.ReservedKey {
			keysFromUpdated := reflect.AppendSlice(
				keysFrom.Slice(0, i),
				keysFrom.Slice(i+1, keysFromLen),
			)
			keysFrom.Set(keysFromUpdated)
			keyExists = true
			break
		}
	}
	// 一つ前のステータスに予約キーがない場合、終了
	if !keyExists {
		return &types.MsgChangeStatusResponse{}, nil
	}

	// 新しいステータスに予約キーを追加
	keysToUpdated := reflect.Append(keysTo, reflect.ValueOf(msg.ReservedKey))
	keysTo.Set(keysToUpdated)

	// 登録
	nftTransferStatus = nftTransferStatusPointer.Interface().(types.NftTransferStatus)
	k.Keeper.SetNftTransferStatus(ctx, nftTransferStatus)

	return &types.MsgChangeStatusResponse{}, nil
}
