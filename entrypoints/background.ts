import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

import * as configs from "@/src/configs";
import { installFeatureQuickSearchContextMenus, SearchLink } from "@/src/quickSearch";
import { composeExtensionTitleCaseName } from "@/src/utilManifest";

interface ProxyRequestPayload {
  url: string;
  init: RequestInit;
}

export function installFeatureMessageListener(actions: string[]) {
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
  });
}

function main() {
  const manifest = browser.runtime.getManifest();

  const linksComposer = (keyword: string): SearchLink[] => {
    return [
      {
        name: configs.SITE_NAME_DOUBAN,
        url: `https://search.douban.com/movie/subject_search?cat=1002&search_text=${keyword}`,
      },

      {
        name: configs.SITE_NAME_IMDB,
        url: `https://www.imdb.com/find/?q=${keyword}`,
      },
    ];
  };

  installFeatureQuickSearchContextMenus(composeExtensionTitleCaseName(manifest), linksComposer);

  installFeatureMessageListener([configs.Action.ProxyRequest]);
}

export default defineBackground(main);
