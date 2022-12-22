/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftTransferStatusDetail {
  srcChain: number;
  srcAddr: string;
  destChain: number;
  destAddr: string;
  status: number;
  transactionHash: string;
  transferredAt: number;
  reservedAt: number;
}

const baseNftTransferStatusDetail: object = {
  srcChain: 0,
  srcAddr: "",
  destChain: 0,
  destAddr: "",
  status: 0,
  transactionHash: "",
  transferredAt: 0,
  reservedAt: 0,
};

export const NftTransferStatusDetail = {
  encode(
    message: NftTransferStatusDetail,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.srcChain !== 0) {
      writer.uint32(8).int32(message.srcChain);
    }
    if (message.srcAddr !== "") {
      writer.uint32(18).string(message.srcAddr);
    }
    if (message.destChain !== 0) {
      writer.uint32(24).int32(message.destChain);
    }
    if (message.destAddr !== "") {
      writer.uint32(34).string(message.destAddr);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.transactionHash !== "") {
      writer.uint32(50).string(message.transactionHash);
    }
    if (message.transferredAt !== 0) {
      writer.uint32(56).int32(message.transferredAt);
    }
    if (message.reservedAt !== 0) {
      writer.uint32(64).int32(message.reservedAt);
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
          message.srcChain = reader.int32();
          break;
        case 2:
          message.srcAddr = reader.string();
          break;
        case 3:
          message.destChain = reader.int32();
          break;
        case 4:
          message.destAddr = reader.string();
          break;
        case 5:
          message.status = reader.int32();
          break;
        case 6:
          message.transactionHash = reader.string();
          break;
        case 7:
          message.transferredAt = reader.int32();
          break;
        case 8:
          message.reservedAt = reader.int32();
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
    if (object.srcChain !== undefined && object.srcChain !== null) {
      message.srcChain = Number(object.srcChain);
    } else {
      message.srcChain = 0;
    }
    if (object.srcAddr !== undefined && object.srcAddr !== null) {
      message.srcAddr = String(object.srcAddr);
    } else {
      message.srcAddr = "";
    }
    if (object.destChain !== undefined && object.destChain !== null) {
      message.destChain = Number(object.destChain);
    } else {
      message.destChain = 0;
    }
    if (object.destAddr !== undefined && object.destAddr !== null) {
      message.destAddr = String(object.destAddr);
    } else {
      message.destAddr = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Number(object.status);
    } else {
      message.status = 0;
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = String(object.transactionHash);
    } else {
      message.transactionHash = "";
    }
    if (object.transferredAt !== undefined && object.transferredAt !== null) {
      message.transferredAt = Number(object.transferredAt);
    } else {
      message.transferredAt = 0;
    }
    if (object.reservedAt !== undefined && object.reservedAt !== null) {
      message.reservedAt = Number(object.reservedAt);
    } else {
      message.reservedAt = 0;
    }
    return message;
  },

  toJSON(message: NftTransferStatusDetail): unknown {
    const obj: any = {};
    message.srcChain !== undefined && (obj.srcChain = message.srcChain);
    message.srcAddr !== undefined && (obj.srcAddr = message.srcAddr);
    message.destChain !== undefined && (obj.destChain = message.destChain);
    message.destAddr !== undefined && (obj.destAddr = message.destAddr);
    message.status !== undefined && (obj.status = message.status);
    message.transactionHash !== undefined &&
      (obj.transactionHash = message.transactionHash);
    message.transferredAt !== undefined &&
      (obj.transferredAt = message.transferredAt);
    message.reservedAt !== undefined && (obj.reservedAt = message.reservedAt);
    return obj;
  },

  fromPartial(
    object: DeepPartial<NftTransferStatusDetail>
  ): NftTransferStatusDetail {
    const message = {
      ...baseNftTransferStatusDetail,
    } as NftTransferStatusDetail;
    if (object.srcChain !== undefined && object.srcChain !== null) {
      message.srcChain = object.srcChain;
    } else {
      message.srcChain = 0;
    }
    if (object.srcAddr !== undefined && object.srcAddr !== null) {
      message.srcAddr = object.srcAddr;
    } else {
      message.srcAddr = "";
    }
    if (object.destChain !== undefined && object.destChain !== null) {
      message.destChain = object.destChain;
    } else {
      message.destChain = 0;
    }
    if (object.destAddr !== undefined && object.destAddr !== null) {
      message.destAddr = object.destAddr;
    } else {
      message.destAddr = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = object.transactionHash;
    } else {
      message.transactionHash = "";
    }
    if (object.transferredAt !== undefined && object.transferredAt !== null) {
      message.transferredAt = object.transferredAt;
    } else {
      message.transferredAt = 0;
    }
    if (object.reservedAt !== undefined && object.reservedAt !== null) {
      message.reservedAt = object.reservedAt;
    } else {
      message.reservedAt = 0;
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
