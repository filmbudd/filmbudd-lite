import { browser } from "wxt/browser";

import * as configs from "./configs.js";

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
  for (const action of actions) {
    if (watchActions.has(action)) {
      matched = true;
      break;
    }
  }

  matched &&
    browser.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
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
