/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftMint {
  reservedKeys: string;
  transactionHash: string;
}

const baseNftMint: object = { reservedKeys: "", transactionHash: "" };

export const NftMint = {
  encode(message: NftMint, writer: Writer = Writer.create()): Writer {
    if (message.reservedKeys !== "") {
      writer.uint32(10).string(message.reservedKeys);
    }
    if (message.transactionHash !== "") {
      writer.uint32(18).string(message.transactionHash);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NftMint {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNftMint } as NftMint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedKeys = reader.string();
          break;
        case 2:
          message.transactionHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NftMint {
    const message = { ...baseNftMint } as NftMint;
    if (object.reservedKeys !== undefined && object.reservedKeys !== null) {
      message.reservedKeys = String(object.reservedKeys);
    } else {
      message.reservedKeys = "";
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

  toJSON(message: NftMint): unknown {
    const obj: any = {};
    message.reservedKeys !== undefined &&
      (obj.reservedKeys = message.reservedKeys);
    message.transactionHash !== undefined &&
      (obj.transactionHash = message.transactionHash);
    return obj;
  },

  fromPartial(object: DeepPartial<NftMint>): NftMint {
    const message = { ...baseNftMint } as NftMint;
    if (object.reservedKeys !== undefined && object.reservedKeys !== null) {
      message.reservedKeys = object.reservedKeys;
    } else {
      message.reservedKeys = "";
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
