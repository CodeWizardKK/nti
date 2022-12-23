/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../nti/params";
import { NftTransfer } from "../nti/nft_transfer";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { ReservedNftTransfer } from "../nti/reserved_nft_transfer";
import { NftTransferStatus } from "../nti/nft_transfer_status";
import { NftMint } from "../nti/nft_mint";
import { NftTransferStatusDetail } from "../nti/nft_transfer_status_detail";

export const protobufPackage = "nti.nti";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetNftTransferRequest {
  index: string;
}

export interface QueryGetNftTransferResponse {
  nftTransfer: NftTransfer | undefined;
}

export interface QueryAllNftTransferRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllNftTransferResponse {
  nftTransfer: NftTransfer[];
  pagination: PageResponse | undefined;
}

export interface QueryGetReservedNftTransferRequest {
  reservedKey: string;
}

export interface QueryGetReservedNftTransferResponse {
  reservedNftTransfer: ReservedNftTransfer | undefined;
}

export interface QueryAllReservedNftTransferRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllReservedNftTransferResponse {
  reservedNftTransfer: ReservedNftTransfer[];
  pagination: PageResponse | undefined;
}

export interface QueryGetNftTransferStatusRequest {}

export interface QueryGetNftTransferStatusResponse {
  NftTransferStatus: NftTransferStatus | undefined;
}

export interface QueryGetNftMintRequest {
  reservedKey: string;
}

export interface QueryGetNftMintResponse {
  nftMint: NftMint | undefined;
}

export interface QueryAllNftMintRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllNftMintResponse {
  nftMint: NftMint[];
  pagination: PageResponse | undefined;
}

export interface QueryNftTransferStatusOfTokenRequest {
  chain: string;
  contractAddr: string;
  tokenId: string;
  pagination: PageRequest | undefined;
}

export interface QueryNftTransferStatusOfTokenResponse {
  nftTransferStatusDetail: NftTransferStatusDetail[];
  pagination: PageResponse | undefined;
}

export interface QueryNftTransferStatusOfAddressRequest {
  chain: string;
  walletAddr: string;
  pagination: PageRequest | undefined;
}

export interface QueryNftTransferStatusOfAddressResponse {
  nftTransferStatusDetail: NftTransferStatusDetail[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetNftTransferRequest: object = { index: "" };

export const QueryGetNftTransferRequest = {
  encode(
    message: QueryGetNftTransferRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNftTransferRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNftTransferRequest,
    } as QueryGetNftTransferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftTransferRequest {
    const message = {
      ...baseQueryGetNftTransferRequest,
    } as QueryGetNftTransferRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetNftTransferRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNftTransferRequest>
  ): QueryGetNftTransferRequest {
    const message = {
      ...baseQueryGetNftTransferRequest,
    } as QueryGetNftTransferRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetNftTransferResponse: object = {};

export const QueryGetNftTransferResponse = {
  encode(
    message: QueryGetNftTransferResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.nftTransfer !== undefined) {
      NftTransfer.encode(
        message.nftTransfer,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNftTransferResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNftTransferResponse,
    } as QueryGetNftTransferResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftTransfer = NftTransfer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftTransferResponse {
    const message = {
      ...baseQueryGetNftTransferResponse,
    } as QueryGetNftTransferResponse;
    if (object.nftTransfer !== undefined && object.nftTransfer !== null) {
      message.nftTransfer = NftTransfer.fromJSON(object.nftTransfer);
    } else {
      message.nftTransfer = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetNftTransferResponse): unknown {
    const obj: any = {};
    message.nftTransfer !== undefined &&
      (obj.nftTransfer = message.nftTransfer
        ? NftTransfer.toJSON(message.nftTransfer)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNftTransferResponse>
  ): QueryGetNftTransferResponse {
    const message = {
      ...baseQueryGetNftTransferResponse,
    } as QueryGetNftTransferResponse;
    if (object.nftTransfer !== undefined && object.nftTransfer !== null) {
      message.nftTransfer = NftTransfer.fromPartial(object.nftTransfer);
    } else {
      message.nftTransfer = undefined;
    }
    return message;
  },
};

const baseQueryAllNftTransferRequest: object = {};

export const QueryAllNftTransferRequest = {
  encode(
    message: QueryAllNftTransferRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllNftTransferRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllNftTransferRequest,
    } as QueryAllNftTransferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNftTransferRequest {
    const message = {
      ...baseQueryAllNftTransferRequest,
    } as QueryAllNftTransferRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftTransferRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllNftTransferRequest>
  ): QueryAllNftTransferRequest {
    const message = {
      ...baseQueryAllNftTransferRequest,
    } as QueryAllNftTransferRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllNftTransferResponse: object = {};

export const QueryAllNftTransferResponse = {
  encode(
    message: QueryAllNftTransferResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.nftTransfer) {
      NftTransfer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllNftTransferResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllNftTransferResponse,
    } as QueryAllNftTransferResponse;
    message.nftTransfer = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftTransfer.push(NftTransfer.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNftTransferResponse {
    const message = {
      ...baseQueryAllNftTransferResponse,
    } as QueryAllNftTransferResponse;
    message.nftTransfer = [];
    if (object.nftTransfer !== undefined && object.nftTransfer !== null) {
      for (const e of object.nftTransfer) {
        message.nftTransfer.push(NftTransfer.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftTransferResponse): unknown {
    const obj: any = {};
    if (message.nftTransfer) {
      obj.nftTransfer = message.nftTransfer.map((e) =>
        e ? NftTransfer.toJSON(e) : undefined
      );
    } else {
      obj.nftTransfer = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllNftTransferResponse>
  ): QueryAllNftTransferResponse {
    const message = {
      ...baseQueryAllNftTransferResponse,
    } as QueryAllNftTransferResponse;
    message.nftTransfer = [];
    if (object.nftTransfer !== undefined && object.nftTransfer !== null) {
      for (const e of object.nftTransfer) {
        message.nftTransfer.push(NftTransfer.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetReservedNftTransferRequest: object = { reservedKey: "" };

export const QueryGetReservedNftTransferRequest = {
  encode(
    message: QueryGetReservedNftTransferRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetReservedNftTransferRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetReservedNftTransferRequest,
    } as QueryGetReservedNftTransferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetReservedNftTransferRequest {
    const message = {
      ...baseQueryGetReservedNftTransferRequest,
    } as QueryGetReservedNftTransferRequest;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
    }
    return message;
  },

  toJSON(message: QueryGetReservedNftTransferRequest): unknown {
    const obj: any = {};
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetReservedNftTransferRequest>
  ): QueryGetReservedNftTransferRequest {
    const message = {
      ...baseQueryGetReservedNftTransferRequest,
    } as QueryGetReservedNftTransferRequest;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = object.reservedKey;
    } else {
      message.reservedKey = "";
    }
    return message;
  },
};

const baseQueryGetReservedNftTransferResponse: object = {};

export const QueryGetReservedNftTransferResponse = {
  encode(
    message: QueryGetReservedNftTransferResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedNftTransfer !== undefined) {
      ReservedNftTransfer.encode(
        message.reservedNftTransfer,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetReservedNftTransferResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetReservedNftTransferResponse,
    } as QueryGetReservedNftTransferResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedNftTransfer = ReservedNftTransfer.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetReservedNftTransferResponse {
    const message = {
      ...baseQueryGetReservedNftTransferResponse,
    } as QueryGetReservedNftTransferResponse;
    if (
      object.reservedNftTransfer !== undefined &&
      object.reservedNftTransfer !== null
    ) {
      message.reservedNftTransfer = ReservedNftTransfer.fromJSON(
        object.reservedNftTransfer
      );
    } else {
      message.reservedNftTransfer = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetReservedNftTransferResponse): unknown {
    const obj: any = {};
    message.reservedNftTransfer !== undefined &&
      (obj.reservedNftTransfer = message.reservedNftTransfer
        ? ReservedNftTransfer.toJSON(message.reservedNftTransfer)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetReservedNftTransferResponse>
  ): QueryGetReservedNftTransferResponse {
    const message = {
      ...baseQueryGetReservedNftTransferResponse,
    } as QueryGetReservedNftTransferResponse;
    if (
      object.reservedNftTransfer !== undefined &&
      object.reservedNftTransfer !== null
    ) {
      message.reservedNftTransfer = ReservedNftTransfer.fromPartial(
        object.reservedNftTransfer
      );
    } else {
      message.reservedNftTransfer = undefined;
    }
    return message;
  },
};

const baseQueryAllReservedNftTransferRequest: object = {};

export const QueryAllReservedNftTransferRequest = {
  encode(
    message: QueryAllReservedNftTransferRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllReservedNftTransferRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllReservedNftTransferRequest,
    } as QueryAllReservedNftTransferRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllReservedNftTransferRequest {
    const message = {
      ...baseQueryAllReservedNftTransferRequest,
    } as QueryAllReservedNftTransferRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllReservedNftTransferRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllReservedNftTransferRequest>
  ): QueryAllReservedNftTransferRequest {
    const message = {
      ...baseQueryAllReservedNftTransferRequest,
    } as QueryAllReservedNftTransferRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllReservedNftTransferResponse: object = {};

export const QueryAllReservedNftTransferResponse = {
  encode(
    message: QueryAllReservedNftTransferResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.reservedNftTransfer) {
      ReservedNftTransfer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllReservedNftTransferResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllReservedNftTransferResponse,
    } as QueryAllReservedNftTransferResponse;
    message.reservedNftTransfer = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedNftTransfer.push(
            ReservedNftTransfer.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllReservedNftTransferResponse {
    const message = {
      ...baseQueryAllReservedNftTransferResponse,
    } as QueryAllReservedNftTransferResponse;
    message.reservedNftTransfer = [];
    if (
      object.reservedNftTransfer !== undefined &&
      object.reservedNftTransfer !== null
    ) {
      for (const e of object.reservedNftTransfer) {
        message.reservedNftTransfer.push(ReservedNftTransfer.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllReservedNftTransferResponse): unknown {
    const obj: any = {};
    if (message.reservedNftTransfer) {
      obj.reservedNftTransfer = message.reservedNftTransfer.map((e) =>
        e ? ReservedNftTransfer.toJSON(e) : undefined
      );
    } else {
      obj.reservedNftTransfer = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllReservedNftTransferResponse>
  ): QueryAllReservedNftTransferResponse {
    const message = {
      ...baseQueryAllReservedNftTransferResponse,
    } as QueryAllReservedNftTransferResponse;
    message.reservedNftTransfer = [];
    if (
      object.reservedNftTransfer !== undefined &&
      object.reservedNftTransfer !== null
    ) {
      for (const e of object.reservedNftTransfer) {
        message.reservedNftTransfer.push(ReservedNftTransfer.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetNftTransferStatusRequest: object = {};

export const QueryGetNftTransferStatusRequest = {
  encode(
    _: QueryGetNftTransferStatusRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNftTransferStatusRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNftTransferStatusRequest,
    } as QueryGetNftTransferStatusRequest;
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

  fromJSON(_: any): QueryGetNftTransferStatusRequest {
    const message = {
      ...baseQueryGetNftTransferStatusRequest,
    } as QueryGetNftTransferStatusRequest;
    return message;
  },

  toJSON(_: QueryGetNftTransferStatusRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryGetNftTransferStatusRequest>
  ): QueryGetNftTransferStatusRequest {
    const message = {
      ...baseQueryGetNftTransferStatusRequest,
    } as QueryGetNftTransferStatusRequest;
    return message;
  },
};

const baseQueryGetNftTransferStatusResponse: object = {};

export const QueryGetNftTransferStatusResponse = {
  encode(
    message: QueryGetNftTransferStatusResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.NftTransferStatus !== undefined) {
      NftTransferStatus.encode(
        message.NftTransferStatus,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetNftTransferStatusResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNftTransferStatusResponse,
    } as QueryGetNftTransferStatusResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.NftTransferStatus = NftTransferStatus.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftTransferStatusResponse {
    const message = {
      ...baseQueryGetNftTransferStatusResponse,
    } as QueryGetNftTransferStatusResponse;
    if (
      object.NftTransferStatus !== undefined &&
      object.NftTransferStatus !== null
    ) {
      message.NftTransferStatus = NftTransferStatus.fromJSON(
        object.NftTransferStatus
      );
    } else {
      message.NftTransferStatus = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetNftTransferStatusResponse): unknown {
    const obj: any = {};
    message.NftTransferStatus !== undefined &&
      (obj.NftTransferStatus = message.NftTransferStatus
        ? NftTransferStatus.toJSON(message.NftTransferStatus)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNftTransferStatusResponse>
  ): QueryGetNftTransferStatusResponse {
    const message = {
      ...baseQueryGetNftTransferStatusResponse,
    } as QueryGetNftTransferStatusResponse;
    if (
      object.NftTransferStatus !== undefined &&
      object.NftTransferStatus !== null
    ) {
      message.NftTransferStatus = NftTransferStatus.fromPartial(
        object.NftTransferStatus
      );
    } else {
      message.NftTransferStatus = undefined;
    }
    return message;
  },
};

const baseQueryGetNftMintRequest: object = { reservedKey: "" };

export const QueryGetNftMintRequest = {
  encode(
    message: QueryGetNftMintRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.reservedKey !== "") {
      writer.uint32(10).string(message.reservedKey);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetNftMintRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetNftMintRequest } as QueryGetNftMintRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reservedKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftMintRequest {
    const message = { ...baseQueryGetNftMintRequest } as QueryGetNftMintRequest;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = String(object.reservedKey);
    } else {
      message.reservedKey = "";
    }
    return message;
  },

  toJSON(message: QueryGetNftMintRequest): unknown {
    const obj: any = {};
    message.reservedKey !== undefined &&
      (obj.reservedKey = message.reservedKey);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNftMintRequest>
  ): QueryGetNftMintRequest {
    const message = { ...baseQueryGetNftMintRequest } as QueryGetNftMintRequest;
    if (object.reservedKey !== undefined && object.reservedKey !== null) {
      message.reservedKey = object.reservedKey;
    } else {
      message.reservedKey = "";
    }
    return message;
  },
};

const baseQueryGetNftMintResponse: object = {};

export const QueryGetNftMintResponse = {
  encode(
    message: QueryGetNftMintResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.nftMint !== undefined) {
      NftMint.encode(message.nftMint, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetNftMintResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetNftMintResponse,
    } as QueryGetNftMintResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftMint = NftMint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetNftMintResponse {
    const message = {
      ...baseQueryGetNftMintResponse,
    } as QueryGetNftMintResponse;
    if (object.nftMint !== undefined && object.nftMint !== null) {
      message.nftMint = NftMint.fromJSON(object.nftMint);
    } else {
      message.nftMint = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetNftMintResponse): unknown {
    const obj: any = {};
    message.nftMint !== undefined &&
      (obj.nftMint = message.nftMint
        ? NftMint.toJSON(message.nftMint)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetNftMintResponse>
  ): QueryGetNftMintResponse {
    const message = {
      ...baseQueryGetNftMintResponse,
    } as QueryGetNftMintResponse;
    if (object.nftMint !== undefined && object.nftMint !== null) {
      message.nftMint = NftMint.fromPartial(object.nftMint);
    } else {
      message.nftMint = undefined;
    }
    return message;
  },
};

const baseQueryAllNftMintRequest: object = {};

export const QueryAllNftMintRequest = {
  encode(
    message: QueryAllNftMintRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllNftMintRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllNftMintRequest } as QueryAllNftMintRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNftMintRequest {
    const message = { ...baseQueryAllNftMintRequest } as QueryAllNftMintRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftMintRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllNftMintRequest>
  ): QueryAllNftMintRequest {
    const message = { ...baseQueryAllNftMintRequest } as QueryAllNftMintRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllNftMintResponse: object = {};

export const QueryAllNftMintResponse = {
  encode(
    message: QueryAllNftMintResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.nftMint) {
      NftMint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllNftMintResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllNftMintResponse,
    } as QueryAllNftMintResponse;
    message.nftMint = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftMint.push(NftMint.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllNftMintResponse {
    const message = {
      ...baseQueryAllNftMintResponse,
    } as QueryAllNftMintResponse;
    message.nftMint = [];
    if (object.nftMint !== undefined && object.nftMint !== null) {
      for (const e of object.nftMint) {
        message.nftMint.push(NftMint.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllNftMintResponse): unknown {
    const obj: any = {};
    if (message.nftMint) {
      obj.nftMint = message.nftMint.map((e) =>
        e ? NftMint.toJSON(e) : undefined
      );
    } else {
      obj.nftMint = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllNftMintResponse>
  ): QueryAllNftMintResponse {
    const message = {
      ...baseQueryAllNftMintResponse,
    } as QueryAllNftMintResponse;
    message.nftMint = [];
    if (object.nftMint !== undefined && object.nftMint !== null) {
      for (const e of object.nftMint) {
        message.nftMint.push(NftMint.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryNftTransferStatusOfTokenRequest: object = {
  chain: "",
  contractAddr: "",
  tokenId: "",
};

export const QueryNftTransferStatusOfTokenRequest = {
  encode(
    message: QueryNftTransferStatusOfTokenRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.chain !== "") {
      writer.uint32(10).string(message.chain);
    }
    if (message.contractAddr !== "") {
      writer.uint32(18).string(message.contractAddr);
    }
    if (message.tokenId !== "") {
      writer.uint32(26).string(message.tokenId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryNftTransferStatusOfTokenRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryNftTransferStatusOfTokenRequest,
    } as QueryNftTransferStatusOfTokenRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain = reader.string();
          break;
        case 2:
          message.contractAddr = reader.string();
          break;
        case 3:
          message.tokenId = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNftTransferStatusOfTokenRequest {
    const message = {
      ...baseQueryNftTransferStatusOfTokenRequest,
    } as QueryNftTransferStatusOfTokenRequest;
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = String(object.chain);
    } else {
      message.chain = "";
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = String(object.contractAddr);
    } else {
      message.contractAddr = "";
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = String(object.tokenId);
    } else {
      message.tokenId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryNftTransferStatusOfTokenRequest): unknown {
    const obj: any = {};
    message.chain !== undefined && (obj.chain = message.chain);
    message.contractAddr !== undefined &&
      (obj.contractAddr = message.contractAddr);
    message.tokenId !== undefined && (obj.tokenId = message.tokenId);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryNftTransferStatusOfTokenRequest>
  ): QueryNftTransferStatusOfTokenRequest {
    const message = {
      ...baseQueryNftTransferStatusOfTokenRequest,
    } as QueryNftTransferStatusOfTokenRequest;
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = object.chain;
    } else {
      message.chain = "";
    }
    if (object.contractAddr !== undefined && object.contractAddr !== null) {
      message.contractAddr = object.contractAddr;
    } else {
      message.contractAddr = "";
    }
    if (object.tokenId !== undefined && object.tokenId !== null) {
      message.tokenId = object.tokenId;
    } else {
      message.tokenId = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryNftTransferStatusOfTokenResponse: object = {};

export const QueryNftTransferStatusOfTokenResponse = {
  encode(
    message: QueryNftTransferStatusOfTokenResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.nftTransferStatusDetail) {
      NftTransferStatusDetail.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryNftTransferStatusOfTokenResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryNftTransferStatusOfTokenResponse,
    } as QueryNftTransferStatusOfTokenResponse;
    message.nftTransferStatusDetail = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftTransferStatusDetail.push(
            NftTransferStatusDetail.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNftTransferStatusOfTokenResponse {
    const message = {
      ...baseQueryNftTransferStatusOfTokenResponse,
    } as QueryNftTransferStatusOfTokenResponse;
    message.nftTransferStatusDetail = [];
    if (
      object.nftTransferStatusDetail !== undefined &&
      object.nftTransferStatusDetail !== null
    ) {
      for (const e of object.nftTransferStatusDetail) {
        message.nftTransferStatusDetail.push(
          NftTransferStatusDetail.fromJSON(e)
        );
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryNftTransferStatusOfTokenResponse): unknown {
    const obj: any = {};
    if (message.nftTransferStatusDetail) {
      obj.nftTransferStatusDetail = message.nftTransferStatusDetail.map((e) =>
        e ? NftTransferStatusDetail.toJSON(e) : undefined
      );
    } else {
      obj.nftTransferStatusDetail = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryNftTransferStatusOfTokenResponse>
  ): QueryNftTransferStatusOfTokenResponse {
    const message = {
      ...baseQueryNftTransferStatusOfTokenResponse,
    } as QueryNftTransferStatusOfTokenResponse;
    message.nftTransferStatusDetail = [];
    if (
      object.nftTransferStatusDetail !== undefined &&
      object.nftTransferStatusDetail !== null
    ) {
      for (const e of object.nftTransferStatusDetail) {
        message.nftTransferStatusDetail.push(
          NftTransferStatusDetail.fromPartial(e)
        );
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryNftTransferStatusOfAddressRequest: object = {
  chain: "",
  walletAddr: "",
};

export const QueryNftTransferStatusOfAddressRequest = {
  encode(
    message: QueryNftTransferStatusOfAddressRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.chain !== "") {
      writer.uint32(10).string(message.chain);
    }
    if (message.walletAddr !== "") {
      writer.uint32(18).string(message.walletAddr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryNftTransferStatusOfAddressRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryNftTransferStatusOfAddressRequest,
    } as QueryNftTransferStatusOfAddressRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain = reader.string();
          break;
        case 2:
          message.walletAddr = reader.string();
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNftTransferStatusOfAddressRequest {
    const message = {
      ...baseQueryNftTransferStatusOfAddressRequest,
    } as QueryNftTransferStatusOfAddressRequest;
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = String(object.chain);
    } else {
      message.chain = "";
    }
    if (object.walletAddr !== undefined && object.walletAddr !== null) {
      message.walletAddr = String(object.walletAddr);
    } else {
      message.walletAddr = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryNftTransferStatusOfAddressRequest): unknown {
    const obj: any = {};
    message.chain !== undefined && (obj.chain = message.chain);
    message.walletAddr !== undefined && (obj.walletAddr = message.walletAddr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryNftTransferStatusOfAddressRequest>
  ): QueryNftTransferStatusOfAddressRequest {
    const message = {
      ...baseQueryNftTransferStatusOfAddressRequest,
    } as QueryNftTransferStatusOfAddressRequest;
    if (object.chain !== undefined && object.chain !== null) {
      message.chain = object.chain;
    } else {
      message.chain = "";
    }
    if (object.walletAddr !== undefined && object.walletAddr !== null) {
      message.walletAddr = object.walletAddr;
    } else {
      message.walletAddr = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryNftTransferStatusOfAddressResponse: object = {};

export const QueryNftTransferStatusOfAddressResponse = {
  encode(
    message: QueryNftTransferStatusOfAddressResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.nftTransferStatusDetail) {
      NftTransferStatusDetail.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryNftTransferStatusOfAddressResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryNftTransferStatusOfAddressResponse,
    } as QueryNftTransferStatusOfAddressResponse;
    message.nftTransferStatusDetail = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftTransferStatusDetail.push(
            NftTransferStatusDetail.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNftTransferStatusOfAddressResponse {
    const message = {
      ...baseQueryNftTransferStatusOfAddressResponse,
    } as QueryNftTransferStatusOfAddressResponse;
    message.nftTransferStatusDetail = [];
    if (
      object.nftTransferStatusDetail !== undefined &&
      object.nftTransferStatusDetail !== null
    ) {
      for (const e of object.nftTransferStatusDetail) {
        message.nftTransferStatusDetail.push(
          NftTransferStatusDetail.fromJSON(e)
        );
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryNftTransferStatusOfAddressResponse): unknown {
    const obj: any = {};
    if (message.nftTransferStatusDetail) {
      obj.nftTransferStatusDetail = message.nftTransferStatusDetail.map((e) =>
        e ? NftTransferStatusDetail.toJSON(e) : undefined
      );
    } else {
      obj.nftTransferStatusDetail = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryNftTransferStatusOfAddressResponse>
  ): QueryNftTransferStatusOfAddressResponse {
    const message = {
      ...baseQueryNftTransferStatusOfAddressResponse,
    } as QueryNftTransferStatusOfAddressResponse;
    message.nftTransferStatusDetail = [];
    if (
      object.nftTransferStatusDetail !== undefined &&
      object.nftTransferStatusDetail !== null
    ) {
      for (const e of object.nftTransferStatusDetail) {
        message.nftTransferStatusDetail.push(
          NftTransferStatusDetail.fromPartial(e)
        );
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a NftTransfer by index. */
  NftTransfer(
    request: QueryGetNftTransferRequest
  ): Promise<QueryGetNftTransferResponse>;
  /** Queries a list of NftTransfer items. */
  NftTransferAll(
    request: QueryAllNftTransferRequest
  ): Promise<QueryAllNftTransferResponse>;
  /** Queries a ReservedNftTransfer by index. */
  ReservedNftTransfer(
    request: QueryGetReservedNftTransferRequest
  ): Promise<QueryGetReservedNftTransferResponse>;
  /** Queries a list of ReservedNftTransfer items. */
  ReservedNftTransferAll(
    request: QueryAllReservedNftTransferRequest
  ): Promise<QueryAllReservedNftTransferResponse>;
  /** Queries a NftTransferStatus by index. */
  NftTransferStatus(
    request: QueryGetNftTransferStatusRequest
  ): Promise<QueryGetNftTransferStatusResponse>;
  /** Queries a NftMint by index. */
  NftMint(request: QueryGetNftMintRequest): Promise<QueryGetNftMintResponse>;
  /** Queries a list of NftMint items. */
  NftMintAll(request: QueryAllNftMintRequest): Promise<QueryAllNftMintResponse>;
  /** Queries a list of NftTransferStatusOfToken items. */
  NftTransferStatusOfToken(
    request: QueryNftTransferStatusOfTokenRequest
  ): Promise<QueryNftTransferStatusOfTokenResponse>;
  /** Queries a list of NftTransferStatusOfAddress items. */
  NftTransferStatusOfAddress(
    request: QueryNftTransferStatusOfAddressRequest
  ): Promise<QueryNftTransferStatusOfAddressResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  NftTransfer(
    request: QueryGetNftTransferRequest
  ): Promise<QueryGetNftTransferResponse> {
    const data = QueryGetNftTransferRequest.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Query", "NftTransfer", data);
    return promise.then((data) =>
      QueryGetNftTransferResponse.decode(new Reader(data))
    );
  }

  NftTransferAll(
    request: QueryAllNftTransferRequest
  ): Promise<QueryAllNftTransferResponse> {
    const data = QueryAllNftTransferRequest.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Query", "NftTransferAll", data);
    return promise.then((data) =>
      QueryAllNftTransferResponse.decode(new Reader(data))
    );
  }

  ReservedNftTransfer(
    request: QueryGetReservedNftTransferRequest
  ): Promise<QueryGetReservedNftTransferResponse> {
    const data = QueryGetReservedNftTransferRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nti.nti.Query",
      "ReservedNftTransfer",
      data
    );
    return promise.then((data) =>
      QueryGetReservedNftTransferResponse.decode(new Reader(data))
    );
  }

  ReservedNftTransferAll(
    request: QueryAllReservedNftTransferRequest
  ): Promise<QueryAllReservedNftTransferResponse> {
    const data = QueryAllReservedNftTransferRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nti.nti.Query",
      "ReservedNftTransferAll",
      data
    );
    return promise.then((data) =>
      QueryAllReservedNftTransferResponse.decode(new Reader(data))
    );
  }

  NftTransferStatus(
    request: QueryGetNftTransferStatusRequest
  ): Promise<QueryGetNftTransferStatusResponse> {
    const data = QueryGetNftTransferStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nti.nti.Query",
      "NftTransferStatus",
      data
    );
    return promise.then((data) =>
      QueryGetNftTransferStatusResponse.decode(new Reader(data))
    );
  }

  NftMint(request: QueryGetNftMintRequest): Promise<QueryGetNftMintResponse> {
    const data = QueryGetNftMintRequest.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Query", "NftMint", data);
    return promise.then((data) =>
      QueryGetNftMintResponse.decode(new Reader(data))
    );
  }

  NftMintAll(
    request: QueryAllNftMintRequest
  ): Promise<QueryAllNftMintResponse> {
    const data = QueryAllNftMintRequest.encode(request).finish();
    const promise = this.rpc.request("nti.nti.Query", "NftMintAll", data);
    return promise.then((data) =>
      QueryAllNftMintResponse.decode(new Reader(data))
    );
  }

  NftTransferStatusOfToken(
    request: QueryNftTransferStatusOfTokenRequest
  ): Promise<QueryNftTransferStatusOfTokenResponse> {
    const data = QueryNftTransferStatusOfTokenRequest.encode(request).finish();
    const promise = this.rpc.request(
      "nti.nti.Query",
      "NftTransferStatusOfToken",
      data
    );
    return promise.then((data) =>
      QueryNftTransferStatusOfTokenResponse.decode(new Reader(data))
    );
  }

  NftTransferStatusOfAddress(
    request: QueryNftTransferStatusOfAddressRequest
  ): Promise<QueryNftTransferStatusOfAddressResponse> {
    const data = QueryNftTransferStatusOfAddressRequest.encode(
      request
    ).finish();
    const promise = this.rpc.request(
      "nti.nti.Query",
      "NftTransferStatusOfAddress",
      data
    );
    return promise.then((data) =>
      QueryNftTransferStatusOfAddressResponse.decode(new Reader(data))
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
