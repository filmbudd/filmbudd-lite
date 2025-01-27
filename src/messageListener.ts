import { browser } from "wxt/browser";
import { ConnectError } from "@connectrpc/connect";

import * as configs from "./configs";
import { FilmbuddLiteService, createConnectRpcClient } from "./apis";
import { GetWorkRequest, GetWorkResponse } from "./gen/filmbudd_lite/v24/filmbudd_lite_pb";

// Fixed 'TypeError: Do not know how to serialize a BigInt'.
// See also: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/BigInt_not_serializable
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export interface IMessageResponse {
  err?: string;
  body?: any;
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
          .catch((err: ConnectError | Error) => {
            let errorMessage = "";

            if (err instanceof ConnectError) {
              const connectErr = err as ConnectError;
              errorMessage = connectErr.rawMessage;
            } else {
              console.error({ err });
              errorMessage = err.message;
            }

            return sendResponse({ err: errorMessage, body: null });
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
