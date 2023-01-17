/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftTransferStatusDetail {
  reservedKey: string;
  transferStatus: number;
  transactionHash: string;
  nftTokenId: string;
  nftSrcChain: number;
  nftSrcAddr: string;
  nftDestChain: number;
  nftDestAddr: string;
  reservedAt: number;
}

const baseNftTransferStatusDetail: object = {
  reservedKey: "",
  transferStatus: 0,
  transactionHash: "",
  nftTokenId: "",
  nftSrcChain: 0,
  nftSrcAddr: "",
  nftDestChain: 0,
  nftDestAddr: "",
  reservedAt: 0,
};

export const NftTransferStatusDetail = {
  encode(
    message: NftTransferStatusDetail,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    if (message.transferStatus !== 0) {
      writer.uint32(16).int32(message.transferStatus);
    }
    if (message.transactionHash !== "") {
      writer.uint32(26).string(message.transactionHash);
    }
    if (message.nftTokenId !== "") {
      writer.uint32(34).string(message.nftTokenId);
    }
    if (message.nftSrcChain !== 0) {
      writer.uint32(40).int32(message.nftSrcChain);
    }
    if (message.nftSrcAddr !== "") {
      writer.uint32(50).string(message.nftSrcAddr);
    }
    if (message.nftDestChain !== 0) {
      writer.uint32(56).int32(message.nftDestChain);
    }
    if (message.nftDestAddr !== "") {
      writer.uint32(66).string(message.nftDestAddr);
    }
    if (message.reservedAt !== 0) {
      writer.uint32(72).int32(message.reservedAt);
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
          message.transferStatus = reader.int32();
          break;
        case 3:
          message.transactionHash = reader.string();
          break;
        case 4:
          message.nftTokenId = reader.string();
          break;
        case 5:
          message.nftSrcChain = reader.int32();
          break;
        case 6:
          message.nftSrcAddr = reader.string();
          break;
        case 7:
          message.nftDestChain = reader.int32();
          break;
        case 8:
          message.nftDestAddr = reader.string();
          break;
        case 9:
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
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
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
    if (object.nftTokenId !== undefined && object.nftTokenId !== null) {
      message.nftTokenId = String(object.nftTokenId);
    } else {
      message.nftTokenId = "";
    }
    if (object.nftSrcChain !== undefined && object.nftSrcChain !== null) {
      message.nftSrcChain = Number(object.nftSrcChain);
    } else {
      message.nftSrcChain = 0;
    }
    if (object.nftSrcAddr !== undefined && object.nftSrcAddr !== null) {
      message.nftSrcAddr = String(object.nftSrcAddr);
    } else {
      message.nftSrcAddr = "";
    }
    if (object.nftDestChain !== undefined && object.nftDestChain !== null) {
      message.nftDestChain = Number(object.nftDestChain);
    } else {
      message.nftDestChain = 0;
    }
    if (object.nftDestAddr !== undefined && object.nftDestAddr !== null) {
      message.nftDestAddr = String(object.nftDestAddr);
    } else {
      message.nftDestAddr = "";
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
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    message.transferStatus !== undefined &&
      (obj.transferStatus = message.transferStatus);
    message.transactionHash !== undefined &&
      (obj.transactionHash = message.transactionHash);
    message.nftTokenId !== undefined && (obj.nftTokenId = message.nftTokenId);
    message.nftSrcChain !== undefined &&
      (obj.nftSrcChain = message.nftSrcChain);
    message.nftSrcAddr !== undefined && (obj.nftSrcAddr = message.nftSrcAddr);
    message.nftDestChain !== undefined &&
      (obj.nftDestChain = message.nftDestChain);
    message.nftDestAddr !== undefined &&
      (obj.nftDestAddr = message.nftDestAddr);
    message.reservedAt !== undefined && (obj.reservedAt = message.reservedAt);
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
    if (object.nftTokenId !== undefined && object.nftTokenId !== null) {
      message.nftTokenId = object.nftTokenId;
    } else {
      message.nftTokenId = "";
    }
    if (object.nftSrcChain !== undefined && object.nftSrcChain !== null) {
      message.nftSrcChain = object.nftSrcChain;
    } else {
      message.nftSrcChain = 0;
    }
    if (object.nftSrcAddr !== undefined && object.nftSrcAddr !== null) {
      message.nftSrcAddr = object.nftSrcAddr;
    } else {
      message.nftSrcAddr = "";
    }
    if (object.nftDestChain !== undefined && object.nftDestChain !== null) {
      message.nftDestChain = object.nftDestChain;
    } else {
      message.nftDestChain = 0;
    }
    if (object.nftDestAddr !== undefined && object.nftDestAddr !== null) {
      message.nftDestAddr = object.nftDestAddr;
    } else {
      message.nftDestAddr = "";
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
