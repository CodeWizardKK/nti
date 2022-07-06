/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface ReservedNftTransfer {
  reservedKey: string;
  srcNftHash: string;
  srcChain: string;
  srcAddr: string;
  destChain: string;
  destAddr: string;
  destReservationAddr: string;
  blockHeight: number;
  fungibleToken: number;
  createdAt: number;
}

const baseReservedNftTransfer: object = {
  reservedKey: "",
  srcNftHash: "",
  srcChain: "",
  srcAddr: "",
  destChain: "",
  destAddr: "",
  destReservationAddr: "",
  blockHeight: 0,
  fungibleToken: 0,
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
    if (message.srcNftHash !== "") {
      writer.uint32(18).string(message.srcNftHash);
    }
    if (message.srcChain !== "") {
      writer.uint32(26).string(message.srcChain);
    }
    if (message.srcAddr !== "") {
      writer.uint32(34).string(message.srcAddr);
    }
    if (message.destChain !== "") {
      writer.uint32(42).string(message.destChain);
    }
    if (message.destAddr !== "") {
      writer.uint32(50).string(message.destAddr);
    }
    if (message.destReservationAddr !== "") {
      writer.uint32(58).string(message.destReservationAddr);
    }
    if (message.blockHeight !== 0) {
      writer.uint32(64).int32(message.blockHeight);
    }
    if (message.fungibleToken !== 0) {
      writer.uint32(72).int32(message.fungibleToken);
    }
    if (message.createdAt !== 0) {
      writer.uint32(80).int32(message.createdAt);
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
          message.srcNftHash = reader.string();
          break;
        case 3:
          message.srcChain = reader.string();
          break;
        case 4:
          message.srcAddr = reader.string();
          break;
        case 5:
          message.destChain = reader.string();
          break;
        case 6:
          message.destAddr = reader.string();
          break;
        case 7:
          message.destReservationAddr = reader.string();
          break;
        case 8:
          message.blockHeight = reader.int32();
          break;
        case 9:
          message.fungibleToken = reader.int32();
          break;
        case 10:
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
    if (
      object.destReservationAddr !== undefined &&
      object.destReservationAddr !== null
    ) {
      message.destReservationAddr = String(object.destReservationAddr);
    } else {
      message.destReservationAddr = "";
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = Number(object.blockHeight);
    } else {
      message.blockHeight = 0;
    }
    if (object.fungibleToken !== undefined && object.fungibleToken !== null) {
      message.fungibleToken = Number(object.fungibleToken);
    } else {
      message.fungibleToken = 0;
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
    message.srcNftHash !== undefined && (obj.srcNftHash = message.srcNftHash);
    message.srcChain !== undefined && (obj.srcChain = message.srcChain);
    message.srcAddr !== undefined && (obj.srcAddr = message.srcAddr);
    message.destChain !== undefined && (obj.destChain = message.destChain);
    message.destAddr !== undefined && (obj.destAddr = message.destAddr);
    message.destReservationAddr !== undefined &&
      (obj.destReservationAddr = message.destReservationAddr);
    message.blockHeight !== undefined &&
      (obj.blockHeight = message.blockHeight);
    message.fungibleToken !== undefined &&
      (obj.fungibleToken = message.fungibleToken);
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
    if (
      object.destReservationAddr !== undefined &&
      object.destReservationAddr !== null
    ) {
      message.destReservationAddr = object.destReservationAddr;
    } else {
      message.destReservationAddr = "";
    }
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    } else {
      message.blockHeight = 0;
    }
    if (object.fungibleToken !== undefined && object.fungibleToken !== null) {
      message.fungibleToken = object.fungibleToken;
    } else {
      message.fungibleToken = 0;
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
