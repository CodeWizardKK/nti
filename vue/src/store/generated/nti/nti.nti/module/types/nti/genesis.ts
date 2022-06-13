/* eslint-disable */
import { Params } from "../nti/params";
import { NftTransfer } from "../nti/nft_transfer";
import { ReservedNftTransfer } from "../nti/reserved_nft_transfer";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "nti.nti";

/** GenesisState defines the nti module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  nftTransferList: NftTransfer[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  reservedNftTransferList: ReservedNftTransfer[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.nftTransferList) {
      NftTransfer.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.reservedNftTransferList) {
      ReservedNftTransfer.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.nftTransferList = [];
    message.reservedNftTransferList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.nftTransferList.push(
            NftTransfer.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.reservedNftTransferList.push(
            ReservedNftTransfer.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.nftTransferList = [];
    message.reservedNftTransferList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (
      object.nftTransferList !== undefined &&
      object.nftTransferList !== null
    ) {
      for (const e of object.nftTransferList) {
        message.nftTransferList.push(NftTransfer.fromJSON(e));
      }
    }
    if (
      object.reservedNftTransferList !== undefined &&
      object.reservedNftTransferList !== null
    ) {
      for (const e of object.reservedNftTransferList) {
        message.reservedNftTransferList.push(ReservedNftTransfer.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.nftTransferList) {
      obj.nftTransferList = message.nftTransferList.map((e) =>
        e ? NftTransfer.toJSON(e) : undefined
      );
    } else {
      obj.nftTransferList = [];
    }
    if (message.reservedNftTransferList) {
      obj.reservedNftTransferList = message.reservedNftTransferList.map((e) =>
        e ? ReservedNftTransfer.toJSON(e) : undefined
      );
    } else {
      obj.reservedNftTransferList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.nftTransferList = [];
    message.reservedNftTransferList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (
      object.nftTransferList !== undefined &&
      object.nftTransferList !== null
    ) {
      for (const e of object.nftTransferList) {
        message.nftTransferList.push(NftTransfer.fromPartial(e));
      }
    }
    if (
      object.reservedNftTransferList !== undefined &&
      object.reservedNftTransferList !== null
    ) {
      for (const e of object.reservedNftTransferList) {
        message.reservedNftTransferList.push(
          ReservedNftTransfer.fromPartial(e)
        );
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
