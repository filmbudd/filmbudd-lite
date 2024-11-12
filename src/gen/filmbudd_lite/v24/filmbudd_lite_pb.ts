// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file filmbudd_lite/v24/filmbudd_lite.proto (package filmbudd_lite.v24, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";

/**
 * @generated from message filmbudd_lite.v24.Pager
 */
export class Pager extends Message<Pager> {
  /**
   * @generated from field: string order_by = 1;
   */
  orderBy = "";

  /**
   * @generated from field: uint32 page_no = 2;
   */
  pageNo = 0;

  /**
   * @generated from field: uint32 page_size = 3;
   */
  pageSize = 0;

  constructor(data?: PartialMessage<Pager>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.Pager";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "order_by", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "page_no", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 3, name: "page_size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Pager {
    return new Pager().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Pager {
    return new Pager().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Pager {
    return new Pager().fromJsonString(jsonString, options);
  }

  static equals(a: Pager | PlainMessage<Pager> | undefined, b: Pager | PlainMessage<Pager> | undefined): boolean {
    return proto3.util.equals(Pager, a, b);
  }
}

/**
 * @generated from message filmbudd_lite.v24.EchoRequest
 */
export class EchoRequest extends Message<EchoRequest> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<EchoRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.EchoRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EchoRequest {
    return new EchoRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EchoRequest {
    return new EchoRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EchoRequest {
    return new EchoRequest().fromJsonString(jsonString, options);
  }

  static equals(a: EchoRequest | PlainMessage<EchoRequest> | undefined, b: EchoRequest | PlainMessage<EchoRequest> | undefined): boolean {
    return proto3.util.equals(EchoRequest, a, b);
  }
}

/**
 * @generated from message filmbudd_lite.v24.EchoResponse
 */
export class EchoResponse extends Message<EchoResponse> {
  /**
   * @generated from field: string data = 1;
   */
  data = "";

  constructor(data?: PartialMessage<EchoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.EchoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "data", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EchoResponse {
    return new EchoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EchoResponse {
    return new EchoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EchoResponse {
    return new EchoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: EchoResponse | PlainMessage<EchoResponse> | undefined, b: EchoResponse | PlainMessage<EchoResponse> | undefined): boolean {
    return proto3.util.equals(EchoResponse, a, b);
  }
}

/**
 * @generated from message filmbudd_lite.v24.Work
 */
export class Work extends Message<Work> {
  /**
   * @generated from field: fixed64 id = 1;
   */
  id = protoInt64.zero;

  /**
   * @generated from field: string cn = 2;
   */
  cn = "";

  /**
   * @generated from field: float cn_rating = 3;
   */
  cnRating = 0;

  /**
   * @generated from field: string im = 4;
   */
  im = "";

  /**
   * @generated from field: float im_rating = 5;
   */
  imRating = 0;

  constructor(data?: PartialMessage<Work>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.Work";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 6 /* ScalarType.FIXED64 */ },
    { no: 2, name: "cn", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "cn_rating", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "im", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "im_rating", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Work {
    return new Work().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Work {
    return new Work().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Work {
    return new Work().fromJsonString(jsonString, options);
  }

  static equals(a: Work | PlainMessage<Work> | undefined, b: Work | PlainMessage<Work> | undefined): boolean {
    return proto3.util.equals(Work, a, b);
  }
}

/**
 * @generated from message filmbudd_lite.v24.GetWorkRequest
 */
export class GetWorkRequest extends Message<GetWorkRequest> {
  /**
   * @generated from field: string source = 1;
   */
  source = "";

  /**
   * @generated from field: string key = 2;
   */
  key = "";

  constructor(data?: PartialMessage<GetWorkRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.GetWorkRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "source", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetWorkRequest {
    return new GetWorkRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetWorkRequest {
    return new GetWorkRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetWorkRequest {
    return new GetWorkRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetWorkRequest | PlainMessage<GetWorkRequest> | undefined, b: GetWorkRequest | PlainMessage<GetWorkRequest> | undefined): boolean {
    return proto3.util.equals(GetWorkRequest, a, b);
  }
}

/**
 * @generated from message filmbudd_lite.v24.GetWorkResponse
 */
export class GetWorkResponse extends Message<GetWorkResponse> {
  /**
   * @generated from field: filmbudd_lite.v24.Work work = 1;
   */
  work?: Work;

  constructor(data?: PartialMessage<GetWorkResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "filmbudd_lite.v24.GetWorkResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "work", kind: "message", T: Work },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetWorkResponse {
    return new GetWorkResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetWorkResponse {
    return new GetWorkResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetWorkResponse {
    return new GetWorkResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetWorkResponse | PlainMessage<GetWorkResponse> | undefined, b: GetWorkResponse | PlainMessage<GetWorkResponse> | undefined): boolean {
    return proto3.util.equals(GetWorkResponse, a, b);
  }
}
