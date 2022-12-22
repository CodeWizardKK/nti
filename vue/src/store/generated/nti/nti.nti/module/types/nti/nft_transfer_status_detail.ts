/* eslint-disable */
import { ReservedNftTransfer } from "../nti/reserved_nft_transfer";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftTransferStatusDetail {
  reservedKey: string;
  reservedData: ReservedNftTransfer | undefined;
  transferStatus: number;
  transactionHash: string;
}

const baseNftTransferStatusDetail: object = {
  reservedKey: "",
  transferStatus: 0,
  transactionHash: "",
};

export const NftTransferStatusDetail = {
  encode(
    message: NftTransferStatusDetail,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    if (message.reservedData !== undefined) {
      ReservedNftTransfer.encode(
        message.reservedData,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.transferStatus !== 0) {
      writer.uint32(24).int32(message.transferStatus);
    }
    if (message.transactionHash !== "") {
      writer.uint32(34).string(message.transactionHash);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NftTransferStatusDetail {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseNftTransferStatusDetail,
    } as NftTransferStatusDetail;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedKey = reader.string();
          break;
        case 2:
          message.reservedData = ReservedNftTransfer.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.transferStatus = reader.int32();
          break;
        case 4:
          message.transactionHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NftTransferStatusDetail {
    const message = {
      ...baseNftTransferStatusDetail,
    } as NftTransferStatusDetail;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
    }
    if (object.reservedData !== undefined && object.reservedData !== null) {
      message.reservedData = ReservedNftTransfer.fromJSON(object.reservedData);
    } else {
      message.reservedData = undefined;
    }
    if (object.transferStatus !== undefined && object.transferStatus !== null) {
      message.transferStatus = Number(object.transferStatus);
    } else {
      message.transferStatus = 0;
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = String(object.transactionHash);
    } else {
      message.transactionHash = "";
    }
    return message;
  },

  toJSON(message: NftTransferStatusDetail): unknown {
    const obj: any = {};
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    message.reservedData !== undefined &&
      (obj.reservedData = message.reservedData
        ? ReservedNftTransfer.toJSON(message.reservedData)
        : undefined);
    message.transferStatus !== undefined &&
      (obj.transferStatus = message.transferStatus);
    message.transactionHash !== undefined &&
      (obj.transactionHash = message.transactionHash);
    return obj;
  },

  fromPartial(
    object: DeepPartial<NftTransferStatusDetail>
  ): NftTransferStatusDetail {
    const message = {
      ...baseNftTransferStatusDetail,
    } as NftTransferStatusDetail;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = object.reservedKey;
    } else {
      message.reservedKey = "";
    }
    if (object.reservedData !== undefined && object.reservedData !== null) {
      message.reservedData = ReservedNftTransfer.fromPartial(
        object.reservedData
      );
    } else {
      message.reservedData = undefined;
    }
    if (object.transferStatus !== undefined && object.transferStatus !== null) {
      message.transferStatus = object.transferStatus;
    } else {
      message.transferStatus = 0;
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = object.transactionHash;
    } else {
      message.transactionHash = "";
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
