package keeper

import (
	"context"
	"reflect"

	"nti/x/nti/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

type TransferStatus int

const (
	Reserved TransferStatus = iota
	Confirmed
	Waiting
	Expired
	Completed
)

func (s TransferStatus) String() string {
	switch s {
	case Reserved:
		return "Reserved"
	case Confirmed:
		return "Confirmed"
	case Waiting:
		return "Waiting"
	case Expired:
		return "Expired"
	case Completed:
		return "Completed"
	default:
		return "Unknown"
	}
}

func (k msgServer) ChangeStatus(goCtx context.Context, msg *types.MsgChangeStatus) (*types.MsgChangeStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// 現在の移転ステータスリストを取得
	nftTransferStatus, _ := k.Keeper.GetNftTransferStatus(ctx)
	// 指定されたステータスを文字列に変換
	statusFrom := TransferStatus(int(msg.From)).String()
	statusTo := TransferStatus(int(msg.To)).String()

	nftTransferStatusPointer := reflect.ValueOf(&nftTransferStatus).Elem()
	keysFrom := nftTransferStatusPointer.FieldByName(statusFrom)
	keysTo := nftTransferStatusPointer.FieldByName(statusTo)

	// 現在のステータスから当該キーを削除
	for i := 0; i < keysFrom.Len(); i++ {
		if keysFrom.Index(i).String() == msg.ReservedKey {
			keysFromUpdated := reflect.AppendSlice(keysFrom.Slice(0, i), keysFrom.Slice(i+1, -1))
			keysFrom.Set(keysFromUpdated)
			break
		}
	}

	// 新しいステータスに当該キーを追加
	keysToUpdated := reflect.Append(keysTo, reflect.ValueOf(msg.ReservedKey))
	keysTo.Set(keysToUpdated)

	// 登録
	nftTransferStatus = nftTransferStatusPointer.Interface().(types.NftTransferStatus)
	k.Keeper.SetNftTransferStatus(ctx, nftTransferStatus)

	return &types.MsgChangeStatusResponse{}, nil
}
