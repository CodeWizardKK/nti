/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftMint {
  reservedKey: string;
  transactionHash: string;
  tokenUri: string;
}

const baseNftMint: object = {
  reservedKey: "",
  transactionHash: "",
  tokenUri: "",
};

export const NftMint = {
  encode(message: NftMint, writer: Writer = Writer.create()): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    if (message.transactionHash !== "") {
      writer.uint32(18).string(message.transactionHash);
    }
    if (message.tokenUri !== "") {
      writer.uint32(26).string(message.tokenUri);
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
          message.reservedKey = reader.string();
          break;
        case 2:
          message.transactionHash = reader.string();
          break;
        case 3:
          message.tokenUri = reader.string();
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
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = String(object.transactionHash);
    } else {
      message.transactionHash = "";
    }
    if (object.tokenUri !== undefined && object.tokenUri !== null) {
      message.tokenUri = String(object.tokenUri);
    } else {
      message.tokenUri = "";
    }
    return message;
  },

  toJSON(message: NftMint): unknown {
    const obj: any = {};
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    message.transactionHash !== undefined &&
      (obj.transactionHash = message.transactionHash);
    message.tokenUri !== undefined && (obj.tokenUri = message.tokenUri);
    return obj;
  },

  fromPartial(object: DeepPartial<NftMint>): NftMint {
    const message = { ...baseNftMint } as NftMint;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = object.reservedKey;
    } else {
      message.reservedKey = "";
    }
    if (
      object.transactionHash !== undefined &&
      object.transactionHash !== null
    ) {
      message.transactionHash = object.transactionHash;
    } else {
      message.transactionHash = "";
    }
    if (object.tokenUri !== undefined && object.tokenUri !== null) {
      message.tokenUri = object.tokenUri;
    } else {
      message.tokenUri = "";
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
