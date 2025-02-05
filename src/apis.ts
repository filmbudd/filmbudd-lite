import { Client, createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { DescService } from "@bufbuild/protobuf";
import { useMemo } from "react";

import { FilmbuddLiteService } from "./gen/filmbudd_lite/v24/filmbudd_lite_pb";
import * as configs from "./configs";

const transport = createConnectTransport({
  baseUrl: configs.BASE_URL_FILMBUDD_LITE,
  jsonOptions: {
    ignoreUnknownFields: true,
    alwaysEmitImplicit: false,
    enumAsInteger: false,
    useProtoFieldName: false,
    // registry: createRegistry(MyMessageSchema),
  },
});

export function createConnectRpcClient<T extends DescService>(service: T): Client<T> {
  return createClient(service, transport);
}

/**
 * Get a promise client for the given service.
 */
export function useClient<T extends DescService>(service: T): Client<T> {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(() => createClient(service, transport), [service]);
}

export { FilmbuddLiteService };
