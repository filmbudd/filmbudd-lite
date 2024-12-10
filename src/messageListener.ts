import { browser } from "wxt/browser";
import { ConnectError } from "@connectrpc/connect";

import * as configs from "./configs.js";
import { FilmbuddLiteService, createConnectRpcClient } from "./apis";
import { GetWorkRequest, GetWorkResponse } from "./gen/filmbudd_lite/v24/filmbudd_lite_pb";

export interface GrpcResponse {
  code: string;
  message: string;
}

export interface ProxyRequestPayload {
  url: string;
  init: RequestInit;
}

export function installFeatureMessageListener(actions: string[]) {
  let matched = false;
  const watchActions = new Set();
  watchActions.add(configs.Action.ProxyRequest);
  watchActions.add(configs.Action.GetWorkRequest);
  for (const action of actions) {
    if (watchActions.has(action)) {
      matched = true;
      break;
    }
  }

  matched &&
    browser.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
      if (message.action == configs.Action.GetWorkRequest) {
        const rq = message.payload as GetWorkRequest;

        createConnectRpcClient(FilmbuddLiteService)
          .getWork(rq)
          .then((rs: GetWorkResponse) => {
            return sendResponse({ err: null, body: rs });
          })
          .catch((err) => {
            if (err instanceof ConnectError) {
              const connectErr = ConnectError.from(err);
              return sendResponse({ err: connectErr.message, body: null });
            } else {
              console.error(err);
              return sendResponse({ err: err.toString(), body: null });
            }
          })
          .finally(() => {});

        return true;
      }

      if (message.action == configs.Action.ProxyRequest) {
        const { url, init } = message.payload as ProxyRequestPayload;
        fetch(url, init)
          .then((rs) => rs.json())
          .then((rsInJson) => {
            return sendResponse({ err: null, body: rsInJson });
          })
          .catch((err) => {
            console.error(err);
            return sendResponse({ err: err.toString(), body: null });
          });

        return true;
      }

      sendResponse();
      return;
    });
}
