/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftTransfer {
  index: string;
  srcNftHash: string;
  srcChain: string;
  srcAddr: string;
  destNftHash: string;
  destChain: string;
  destAddr: string;
  createdAt: number;
}

const baseNftTransfer: object = {
  index: "",
  srcNftHash: "",
  srcChain: "",
  srcAddr: "",
  destNftHash: "",
  destChain: "",
  destAddr: "",
  createdAt: 0,
};

export const NftTransfer = {
  encode(message: NftTransfer, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.srcNftHash !== "") {
      writer.uint32(18).string(message.srcNftHash);
    }
    if (message.srcChain !== "") {
      writer.uint32(26).string(message.srcChain);
    }
    if (message.srcAddr !== "") {
      writer.uint32(34).string(message.srcAddr);
    }
    if (message.destNftHash !== "") {
      writer.uint32(42).string(message.destNftHash);
    }
    if (message.destChain !== "") {
      writer.uint32(50).string(message.destChain);
    }
    if (message.destAddr !== "") {
      writer.uint32(58).string(message.destAddr);
    }
    if (message.createdAt !== 0) {
      writer.uint32(64).int32(message.createdAt);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NftTransfer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNftTransfer } as NftTransfer;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.srcNftHash = reader.string();
          break;
        case 3:
          message.srcChain = reader.string();
          break;
        case 4:
          message.srcAddr = reader.string();
          break;
        case 5:
          message.destNftHash = reader.string();
          break;
        case 6:
          message.destChain = reader.string();
          break;
        case 7:
          message.destAddr = reader.string();
          break;
        case 8:
          message.createdAt = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NftTransfer {
    const message = { ...baseNftTransfer } as NftTransfer;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.srcNftHash !== undefined && object.srcNftHash !== null) {
      message.srcNftHash = String(object.srcNftHash);
    } else {
      message.srcNftHash = "";
    }
    if (object.srcChain !== undefined && object.srcChain !== null) {
      message.srcChain = String(object.srcChain);
    } else {
      message.srcChain = "";
    }
    if (object.srcAddr !== undefined && object.srcAddr !== null) {
      message.srcAddr = String(object.srcAddr);
    } else {
      message.srcAddr = "";
    }
    if (object.destNftHash !== undefined && object.destNftHash !== null) {
      message.destNftHash = String(object.destNftHash);
    } else {
      message.destNftHash = "";
    }
    if (object.destChain !== undefined && object.destChain !== null) {
      message.destChain = String(object.destChain);
    } else {
      message.destChain = "";
    }
    if (object.destAddr !== undefined && object.destAddr !== null) {
      message.destAddr = String(object.destAddr);
    } else {
      message.destAddr = "";
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Number(object.createdAt);
    } else {
      message.createdAt = 0;
    }
    return message;
  },

  toJSON(message: NftTransfer): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.srcNftHash !== undefined && (obj.srcNftHash = message.srcNftHash);
    message.srcChain !== undefined && (obj.srcChain = message.srcChain);
    message.srcAddr !== undefined && (obj.srcAddr = message.srcAddr);
    message.destNftHash !== undefined &&
      (obj.destNftHash = message.destNftHash);
    message.destChain !== undefined && (obj.destChain = message.destChain);
    message.destAddr !== undefined && (obj.destAddr = message.destAddr);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    return obj;
  },

  fromPartial(object: DeepPartial<NftTransfer>): NftTransfer {
    const message = { ...baseNftTransfer } as NftTransfer;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.srcNftHash !== undefined && object.srcNftHash !== null) {
      message.srcNftHash = object.srcNftHash;
    } else {
      message.srcNftHash = "";
    }
    if (object.srcChain !== undefined && object.srcChain !== null) {
      message.srcChain = object.srcChain;
    } else {
      message.srcChain = "";
    }
    if (object.srcAddr !== undefined && object.srcAddr !== null) {
      message.srcAddr = object.srcAddr;
    } else {
      message.srcAddr = "";
    }
    if (object.destNftHash !== undefined && object.destNftHash !== null) {
      message.destNftHash = object.destNftHash;
    } else {
      message.destNftHash = "";
    }
    if (object.destChain !== undefined && object.destChain !== null) {
      message.destChain = object.destChain;
    } else {
      message.destChain = "";
    }
    if (object.destAddr !== undefined && object.destAddr !== null) {
      message.destAddr = object.destAddr;
    } else {
      message.destAddr = "";
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
