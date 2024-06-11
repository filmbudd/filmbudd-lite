import { defineContentScript } from "wxt/sandbox";
import { browser } from "wxt/browser";

import { installFeatureMakeIMDbPrimaryKeysClickableOnDouban } from "@/src/imdbPkClickable";
import { composeExtensionTitleCaseName } from "@/src/utilManifest";

function main() {
  const manifest = browser.runtime.getManifest();
  installFeatureMakeIMDbPrimaryKeysClickableOnDouban(composeExtensionTitleCaseName(manifest), document);
}

export default defineContentScript({
  matches: ["*://movie.douban.com/subject/*", "*://www.douban.com/personage/*", "*://movie.douban.com/celebrity/*"],
  runAt: "document_end",
  main,
});
