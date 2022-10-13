/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface NftTransferStatus {
  reserved: string[];
  confirmed: string[];
  expired: string[];
  waiting: string[];
  completed: string[];
}

const baseNftTransferStatus: object = {
  reserved: "",
  confirmed: "",
  expired: "",
  waiting: "",
  completed: "",
};

export const NftTransferStatus = {
  encode(message: NftTransferStatus, writer: Writer = Writer.create()): Writer {
    for (const v of message.reserved) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.confirmed) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.expired) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.waiting) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.completed) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): NftTransferStatus {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNftTransferStatus } as NftTransferStatus;
    message.reserved = [];
    message.confirmed = [];
    message.expired = [];
    message.waiting = [];
    message.completed = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserved.push(reader.string());
          break;
        case 2:
          message.confirmed.push(reader.string());
          break;
        case 3:
          message.expired.push(reader.string());
          break;
        case 4:
          message.waiting.push(reader.string());
          break;
        case 5:
          message.completed.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): NftTransferStatus {
    const message = { ...baseNftTransferStatus } as NftTransferStatus;
    message.reserved = [];
    message.confirmed = [];
    message.expired = [];
    message.waiting = [];
    message.completed = [];
    if (object.reserved !== undefined && object.reserved !== null) {
      for (const e of object.reserved) {
        message.reserved.push(String(e));
      }
    }
    if (object.confirmed !== undefined && object.confirmed !== null) {
      for (const e of object.confirmed) {
        message.confirmed.push(String(e));
      }
    }
    if (object.expired !== undefined && object.expired !== null) {
      for (const e of object.expired) {
        message.expired.push(String(e));
      }
    }
    if (object.waiting !== undefined && object.waiting !== null) {
      for (const e of object.waiting) {
        message.waiting.push(String(e));
      }
    }
    if (object.completed !== undefined && object.completed !== null) {
      for (const e of object.completed) {
        message.completed.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: NftTransferStatus): unknown {
    const obj: any = {};
    if (message.reserved) {
      obj.reserved = message.reserved.map((e) => e);
    } else {
      obj.reserved = [];
    }
    if (message.confirmed) {
      obj.confirmed = message.confirmed.map((e) => e);
    } else {
      obj.confirmed = [];
    }
    if (message.expired) {
      obj.expired = message.expired.map((e) => e);
    } else {
      obj.expired = [];
    }
    if (message.waiting) {
      obj.waiting = message.waiting.map((e) => e);
    } else {
      obj.waiting = [];
    }
    if (message.completed) {
      obj.completed = message.completed.map((e) => e);
    } else {
      obj.completed = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<NftTransferStatus>): NftTransferStatus {
    const message = { ...baseNftTransferStatus } as NftTransferStatus;
    message.reserved = [];
    message.confirmed = [];
    message.expired = [];
    message.waiting = [];
    message.completed = [];
    if (object.reserved !== undefined && object.reserved !== null) {
      for (const e of object.reserved) {
        message.reserved.push(e);
      }
    }
    if (object.confirmed !== undefined && object.confirmed !== null) {
      for (const e of object.confirmed) {
        message.confirmed.push(e);
      }
    }
    if (object.expired !== undefined && object.expired !== null) {
      for (const e of object.expired) {
        message.expired.push(e);
      }
    }
    if (object.waiting !== undefined && object.waiting !== null) {
      for (const e of object.waiting) {
        message.waiting.push(e);
      }
    }
    if (object.completed !== undefined && object.completed !== null) {
      for (const e of object.completed) {
        message.completed.push(e);
      }
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
