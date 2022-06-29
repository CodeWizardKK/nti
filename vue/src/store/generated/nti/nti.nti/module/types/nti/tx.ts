/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

export interface MsgReserveNftTransfer {
  creator: string;
  srcNftHash: string;
  srcChain: string;
  srcAddr: string;
  destChain: string;
  destAddr: string;
  blockHeight: number;
  fungibleToken: number;
}

export interface MsgReserveNftTransferResponse {}

export interface MsgTransferNft {
  creator: string;
  srcNftHash: string;
  srcChain: string;
  srcAddr: string;
  destNftHash: string;
  destChain: string;
  destAddr: string;
}

export interface MsgTransferNftResponse {}

const baseMsgReserveNftTransfer: object = {
  creator: "",
  srcNftHash: "",
  srcChain: "",
  srcAddr: "",
  destChain: "",
  destAddr: "",
  blockHeight: 0,
  fungibleToken: 0,
};

export const MsgReserveNftTransfer = {
  encode(
    message: MsgReserveNftTransfer,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    if (message.blockHeight !== 0) {
      writer.uint32(56).int32(message.blockHeight);
    }
    if (message.fungibleToken !== 0) {
      writer.uint32(64).int32(message.fungibleToken);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgReserveNftTransfer {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgReserveNftTransfer } as MsgReserveNftTransfer;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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
          message.blockHeight = reader.int32();
          break;
        case 8:
          message.fungibleToken = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgReserveNftTransfer {
    const message = { ...baseMsgReserveNftTransfer } as MsgReserveNftTransfer;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
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
    return message;
  },

  toJSON(message: MsgReserveNftTransfer): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.srcNftHash !== undefined && (obj.srcNftHash = message.srcNftHash);
    message.srcChain !== undefined && (obj.srcChain = message.srcChain);
    message.srcAddr !== undefined && (obj.srcAddr = message.srcAddr);
    message.destChain !== undefined && (obj.destChain = message.destChain);
    message.destAddr !== undefined && (obj.destAddr = message.destAddr);
    message.blockHeight !== undefined &&
      (obj.blockHeight = message.blockHeight);
    message.fungibleToken !== undefined &&
      (obj.fungibleToken = message.fungibleToken);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgReserveNftTransfer>
  ): MsgReserveNftTransfer {
    const message = { ...baseMsgReserveNftTransfer } as MsgReserveNftTransfer;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
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
    return message;
  },
};

const baseMsgReserveNftTransferResponse: object = {};

export const MsgReserveNftTransferResponse = {
  encode(
    _: MsgReserveNftTransferResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgReserveNftTransferResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgReserveNftTransferResponse,
    } as MsgReserveNftTransferResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgReserveNftTransferResponse {
    const message = {
      ...baseMsgReserveNftTransferResponse,
    } as MsgReserveNftTransferResponse;
    return message;
  },

  toJSON(_: MsgReserveNftTransferResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgReserveNftTransferResponse>
  ): MsgReserveNftTransferResponse {
    const message = {
      ...baseMsgReserveNftTransferResponse,
    } as MsgReserveNftTransferResponse;
    return message;
  },
};

const baseMsgTransferNft: object = {
  creator: "",
  srcNftHash: "",
  srcChain: "",
  srcAddr: "",
  destNftHash: "",
  destChain: "",
  destAddr: "",
};

export const MsgTransferNft = {
  encode(message: MsgTransferNft, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferNft {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTransferNft } as MsgTransferNft;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTransferNft {
    const message = { ...baseMsgTransferNft } as MsgTransferNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
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
    return message;
  },

  toJSON(message: MsgTransferNft): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.srcNftHash !== undefined && (obj.srcNftHash = message.srcNftHash);
    message.srcChain !== undefined && (obj.srcChain = message.srcChain);
    message.srcAddr !== undefined && (obj.srcAddr = message.srcAddr);
    message.destNftHash !== undefined &&
      (obj.destNftHash = message.destNftHash);
    message.destChain !== undefined && (obj.destChain = message.destChain);
    message.destAddr !== undefined && (obj.destAddr = message.destAddr);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgTransferNft>): MsgTransferNft {
    const message = { ...baseMsgTransferNft } as MsgTransferNft;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
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
    return message;
  },
};

const baseMsgTransferNftResponse: object = {};

export const MsgTransferNftResponse = {
  encode(_: MsgTransferNftResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgTransferNftResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgTransferNftResponse } as MsgTransferNftResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgTransferNftResponse {
    const message = { ...baseMsgTransferNftResponse } as MsgTransferNftResponse;
    return message;
  },

  toJSON(_: MsgTransferNftResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgTransferNftResponse>): MsgTransferNftResponse {
    const message = { ...baseMsgTransferNftResponse } as MsgTransferNftResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  ReserveNftTransfer(
    request: MsgReserveNftTransfer
  ): Promise<MsgReserveNftTransferResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  TransferNft(request: MsgTransferNft): Promise<MsgTransferNftResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  ReserveNftTransfer(
    request: MsgReserveNftTransfer
  ): Promise<MsgReserveNftTransferResponse> {
    const data = MsgReserveNftTransfer.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Msg", "ReserveNftTransfer", data);
    return promise.then((data) =>
      MsgReserveNftTransferResponse.decode(new Reader(data))
    );
  }

  TransferNft(request: MsgTransferNft): Promise<MsgTransferNftResponse> {
    const data = MsgTransferNft.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Msg", "TransferNft", data);
    return promise.then((data) =>
      MsgTransferNftResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
