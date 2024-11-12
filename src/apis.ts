import { Client, createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ServiceType } from "@bufbuild/protobuf";
import { useMemo } from "react";

import { FilmbuddLiteService } from "./gen/filmbudd_lite/v24/filmbudd_lite_connect";
import * as config from "./configs";

const transport = createConnectTransport({
  baseUrl: config.BASE_URL_FILMBUDD_LITE,

export function createConnectRpcClient<T extends ServiceType>(service: T): Client<T> {
  return createClient(service, transport);
}

/**
 * Get a promise client for the given service.
 */
export function useClient<T extends ServiceType>(service: T): Client<T> {
  // We memoize the client, so that we only create one instance per service.
  return useMemo(() => createClient(service, transport), [service]);
}

export { FilmbuddLiteService };
