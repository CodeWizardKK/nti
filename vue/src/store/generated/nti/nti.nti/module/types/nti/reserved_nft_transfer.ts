/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface ReservedNftTransfer {
  reservedKey: string;
  nftSrcHash: string;
  nftSrcChain: string;
  nftSrcAddr: string;
  nftDestChain: string;
  nftDestAddr: string;
  ftChain: string;
  ftSrcAddr: string;
  ftDestAddr: string;
  fungibleToken: number;
  blockHeight: number;
  createdAt: number;
}

const baseReservedNftTransfer: object = {
  reservedKey: "",
  nftSrcHash: "",
  nftSrcChain: "",
  nftSrcAddr: "",
  nftDestChain: "",
  nftDestAddr: "",
  ftChain: "",
  ftSrcAddr: "",
  ftDestAddr: "",
  fungibleToken: 0,
  blockHeight: 0,
  createdAt: 0,
};

export const ReservedNftTransfer = {
  encode(
    message: ReservedNftTransfer,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    if (message.nftSrcHash !== "") {
      writer.uint32(18).string(message.nftSrcHash);
    }
    if (message.nftSrcChain !== "") {
      writer.uint32(26).string(message.nftSrcChain);
    }
    if (message.nftSrcAddr !== "") {
      writer.uint32(34).string(message.nftSrcAddr);
    }
    if (message.nftDestChain !== "") {
      writer.uint32(42).string(message.nftDestChain);
    }
    if (message.nftDestAddr !== "") {
      writer.uint32(50).string(message.nftDestAddr);
    }
    if (message.ftChain !== "") {
      writer.uint32(58).string(message.ftChain);
    }
    if (message.ftSrcAddr !== "") {
      writer.uint32(66).string(message.ftSrcAddr);
    }
    if (message.ftDestAddr !== "") {
      writer.uint32(74).string(message.ftDestAddr);
    }
    if (message.fungibleToken !== 0) {
      writer.uint32(80).int32(message.fungibleToken);
    }
    if (message.blockHeight !== 0) {
      writer.uint32(88).int32(message.blockHeight);
    }
    if (message.createdAt !== 0) {
      writer.uint32(96).int32(message.createdAt);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ReservedNftTransfer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseReservedNftTransfer } as ReservedNftTransfer;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedKey = reader.string();
          break;
        case 2:
          message.nftSrcHash = reader.string();
          break;
        case 3:
          message.nftSrcChain = reader.string();
          break;
        case 4:
          message.nftSrcAddr = reader.string();
          break;
        case 5:
          message.nftDestChain = reader.string();
          break;
        case 6:
          message.nftDestAddr = reader.string();
          break;
        case 7:
          message.ftChain = reader.string();
          break;
        case 8:
          message.ftSrcAddr = reader.string();
          break;
        case 9:
          message.ftDestAddr = reader.string();
          break;
        case 10:
          message.fungibleToken = reader.int32();
          break;
        case 11:
          message.blockHeight = reader.int32();
          break;
        case 12:
          message.createdAt = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReservedNftTransfer {
    const message = { ...baseReservedNftTransfer } as ReservedNftTransfer;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
    }
    if (object.nftSrcHash !== undefined && object.nftSrcHash !== null) {
      message.nftSrcHash = String(object.nftSrcHash);
    } else {
      message.nftSrcHash = "";
    }
    if (object.nftSrcChain !== undefined && object.nftSrcChain !== null) {
      message.nftSrcChain = String(object.nftSrcChain);
    } else {
      message.nftSrcChain = "";
    }
    if (object.nftSrcAddr !== undefined && object.nftSrcAddr !== null) {
      message.nftSrcAddr = String(object.nftSrcAddr);
    } else {
      message.nftSrcAddr = "";
    }
    if (object.nftDestChain !== undefined && object.nftDestChain !== null) {
      message.nftDestChain = String(object.nftDestChain);
    } else {
      message.nftDestChain = "";
    }
    if (object.nftDestAddr !== undefined && object.nftDestAddr !== null) {
      message.nftDestAddr = String(object.nftDestAddr);
    } else {
      message.nftDestAddr = "";
    }
    if (object.ftChain !== undefined && object.ftChain !== null) {
      message.ftChain = String(object.ftChain);
    } else {
      message.ftChain = "";
    }
    if (object.ftSrcAddr !== undefined && object.ftSrcAddr !== null) {
      message.ftSrcAddr = String(object.ftSrcAddr);
    } else {
      message.ftSrcAddr = "";
    }
    if (object.ftDestAddr !== undefined && object.ftDestAddr !== null) {
      message.ftDestAddr = String(object.ftDestAddr);
    } else {
      message.ftDestAddr = "";
    }
    if (object.fungibleToken !== undefined && object.fungibleToken !== null) {
      message.fungibleToken = Number(object.fungibleToken);
    } else {
      message.fungibleToken = 0;
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = Number(object.blockHeight);
    } else {
      message.blockHeight = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    return message;
  },

  toJSON(message: ReservedNftTransfer): unknown {
    const obj: any = {};
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    message.nftSrcHash !== undefined && (obj.nftSrcHash = message.nftSrcHash);
    message.nftSrcChain !== undefined &&
      (obj.nftSrcChain = message.nftSrcChain);
    message.nftSrcAddr !== undefined && (obj.nftSrcAddr = message.nftSrcAddr);
    message.nftDestChain !== undefined &&
      (obj.nftDestChain = message.nftDestChain);
    message.nftDestAddr !== undefined &&
      (obj.nftDestAddr = message.nftDestAddr);
    message.ftChain !== undefined && (obj.ftChain = message.ftChain);
    message.ftSrcAddr !== undefined && (obj.ftSrcAddr = message.ftSrcAddr);
    message.ftDestAddr !== undefined && (obj.ftDestAddr = message.ftDestAddr);
    message.fungibleToken !== undefined &&
      (obj.fungibleToken = message.fungibleToken);
    message.blockHeight !== undefined &&
      (obj.blockHeight = message.blockHeight);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    return obj;
  },

  fromPartial(object: DeepPartial<ReservedNftTransfer>): ReservedNftTransfer {
    const message = { ...baseReservedNftTransfer } as ReservedNftTransfer;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = object.reservedKey;
    } else {
      message.reservedKey = "";
    }
    if (object.nftSrcHash !== undefined && object.nftSrcHash !== null) {
      message.nftSrcHash = object.nftSrcHash;
    } else {
      message.nftSrcHash = "";
    }
    if (object.nftSrcChain !== undefined && object.nftSrcChain !== null) {
      message.nftSrcChain = object.nftSrcChain;
    } else {
      message.nftSrcChain = "";
    }
    if (object.nftSrcAddr !== undefined && object.nftSrcAddr !== null) {
      message.nftSrcAddr = object.nftSrcAddr;
    } else {
      message.nftSrcAddr = "";
    }
    if (object.nftDestChain !== undefined && object.nftDestChain !== null) {
      message.nftDestChain = object.nftDestChain;
    } else {
      message.nftDestChain = "";
    }
    if (object.nftDestAddr !== undefined && object.nftDestAddr !== null) {
      message.nftDestAddr = object.nftDestAddr;
    } else {
      message.nftDestAddr = "";
    }
    if (object.ftChain !== undefined && object.ftChain !== null) {
      message.ftChain = object.ftChain;
    } else {
      message.ftChain = "";
    }
    if (object.ftSrcAddr !== undefined && object.ftSrcAddr !== null) {
      message.ftSrcAddr = object.ftSrcAddr;
    } else {
      message.ftSrcAddr = "";
    }
    if (object.ftDestAddr !== undefined && object.ftDestAddr !== null) {
      message.ftDestAddr = object.ftDestAddr;
    } else {
      message.ftDestAddr = "";
    }
    if (object.fungibleToken !== undefined && object.fungibleToken !== null) {
      message.fungibleToken = object.fungibleToken;
    } else {
      message.fungibleToken = 0;
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    } else {
      message.blockHeight = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = 0;
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
