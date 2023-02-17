/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type NtiMsgAddNftMintResultResponse = object;

export type NtiMsgChangeStatusResponse = object;

export type NtiMsgCreateNftMintResponse = object;

export type NtiMsgDeleteNftMintResponse = object;

export type NtiMsgReserveNftTransferResponse = object;

export type NtiMsgTransferNftResponse = object;

export type NtiMsgUpdateNftMintResponse = object;

export interface NtiNftMint {
  reservedKey?: string;
  transactionHash?: string;
  tokenUri?: string;
  tokenId?: string;
}

export interface NtiNftTransfer {
  index?: string;
  srcNftHash?: string;
  srcChain?: string;
  srcAddr?: string;
  destNftHash?: string;
  destChain?: string;
  destAddr?: string;

  /** @format int32 */
  createdAt?: number;
}

export interface NtiNftTransferStatus {
  reserved?: string[];
  confirmed?: string[];
  expired?: string[];
  waiting?: string[];
  completed?: string[];
}

export interface NtiNftTransferStatusDetail {
  reservedKey?: string;

  /** @format int32 */
  transferStatus?: number;
  transactionHash?: string;
  nftTokenId?: string;

  /** @format int32 */
  nftSrcChain?: number;
  nftSrcAddr?: string;

  /** @format int32 */
  nftDestChain?: number;
  nftDestAddr?: string;

  /** @format int32 */
  reservedAt?: number;
}

/**
 * Params defines the parameters for the module.
 */
export type NtiParams = object;

export interface NtiQueryAllNftMintResponse {
  nftMint?: NtiNftMint[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface NtiQueryAllNftTransferResponse {
  nftTransfer?: NtiNftTransfer[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface NtiQueryAllReservedNftTransferResponse {
  reservedNftTransfer?: NtiReservedNftTransfer[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface NtiQueryGetNftMintResponse {
  nftMint?: NtiNftMint;
}

export interface NtiQueryGetNftTransferResponse {
  nftTransfer?: NtiNftTransfer;
}

export interface NtiQueryGetNftTransferStatusResponse {
  NftTransferStatus?: NtiNftTransferStatus;
}

export interface NtiQueryGetReservedNftTransferResponse {
  reservedNftTransfer?: NtiReservedNftTransfer;
}

export interface NtiQueryNftTransferHistoryResponse {
  nftTransferStatusDetail?: string;

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface NtiQueryNftTransferStatusOfAddressResponse {
  nftTransferStatusDetail?: NtiNftTransferStatusDetail[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface NtiQueryNftTransferStatusOfTokenResponse {
  nftTransferStatusDetail?: NtiNftTransferStatusDetail[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

/**
 * QueryParamsResponse is response type for the Query/Params RPC method.
 */
export interface NtiQueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: NtiParams;
}

export interface NtiReservedNftTransfer {
  reservedKey?: string;
  nftTokenId?: string;

  /** @format int32 */
  nftSrcChain?: number;
  nftSrcAddr?: string;

  /** @format int32 */
  nftDestChain?: number;
  nftDestAddr?: string;

  /** @format int32 */
  ftChain?: number;
  ftSrcAddr?: string;
  ftDestAddr?: string;

  /** @format int32 */
  fungibleToken?: number;

  /** @format int32 */
  blockHeight?: number;

  /** @format int32 */
  createdAt?: number;
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title nti/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryNftMintAll
   * @summary Queries a list of NftMint items.
   * @request GET:/nti/nti/nft_mint
   */
  queryNftMintAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryAllNftMintResponse, RpcStatus>({
      path: `/nti/nti/nft_mint`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftMint
   * @summary Queries a NftMint by index.
   * @request GET:/nti/nti/nft_mint/{reservedKey}
   */
  queryNftMint = (reservedKey: string, params: RequestParams = {}) =>
    this.request<NtiQueryGetNftMintResponse, RpcStatus>({
      path: `/nti/nti/nft_mint/${reservedKey}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransferAll
   * @summary Queries a list of NftTransfer items.
   * @request GET:/nti/nti/nft_transfer
   */
  queryNftTransferAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryAllNftTransferResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransfer
   * @summary Queries a NftTransfer by index.
   * @request GET:/nti/nti/nft_transfer/{index}
   */
  queryNftTransfer = (index: string, params: RequestParams = {}) =>
    this.request<NtiQueryGetNftTransferResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer/${index}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransferHistory
   * @summary Queries a list of NftTransferHistory items.
   * @request GET:/nti/nti/nft_transfer_history/{chain}/{contractAddr}/{tokenId}
   */
  queryNftTransferHistory = (
    chain: number,
    contractAddr: string,
    tokenId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryNftTransferHistoryResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer_history/${chain}/${contractAddr}/${tokenId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransferStatus
   * @summary Queries a NftTransferStatus by index.
   * @request GET:/nti/nti/nft_transfer_status
   */
  queryNftTransferStatus = (params: RequestParams = {}) =>
    this.request<NtiQueryGetNftTransferStatusResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer_status`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransferStatusOfAddress
   * @summary Queries a list of NftTransferStatusOfAddress items.
   * @request GET:/nti/nti/nft_transfer_status_of_address/{chain}/{walletAddr}
   */
  queryNftTransferStatusOfAddress = (
    chain: number,
    walletAddr: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryNftTransferStatusOfAddressResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer_status_of_address/${chain}/${walletAddr}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryNftTransferStatusOfToken
   * @summary Queries a list of NftTransferStatusOfToken items.
   * @request GET:/nti/nti/nft_transfer_status_of_token/{chain}/{contractAddr}/{tokenId}
   */
  queryNftTransferStatusOfToken = (
    chain: number,
    contractAddr: string,
    tokenId: string,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryNftTransferStatusOfTokenResponse, RpcStatus>({
      path: `/nti/nti/nft_transfer_status_of_token/${chain}/${contractAddr}/${tokenId}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @summary Parameters queries the parameters of the module.
   * @request GET:/nti/nti/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<NtiQueryParamsResponse, RpcStatus>({
      path: `/nti/nti/params`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReservedNftTransferAll
   * @summary Queries a list of ReservedNftTransfer items.
   * @request GET:/nti/nti/reserved_nft_transfer
   */
  queryReservedNftTransferAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NtiQueryAllReservedNftTransferResponse, RpcStatus>({
      path: `/nti/nti/reserved_nft_transfer`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryReservedNftTransfer
   * @summary Queries a ReservedNftTransfer by index.
   * @request GET:/nti/nti/reserved_nft_transfer/{reservedKey}
   */
  queryReservedNftTransfer = (reservedKey: string, params: RequestParams = {}) =>
    this.request<NtiQueryGetReservedNftTransferResponse, RpcStatus>({
      path: `/nti/nti/reserved_nft_transfer/${reservedKey}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
