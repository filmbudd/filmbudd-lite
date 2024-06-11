import { defineContentScript } from "wxt/sandbox";

import { installFeatureMakeIMDbPrimaryKeysClickableOnDouban } from "@/src/imdbPkClickable";

function main() {
  installFeatureMakeIMDbPrimaryKeysClickableOnDouban(document);
}

export default defineContentScript({
  matches: ["*://movie.douban.com/subject/*", "*://www.douban.com/personage/*", "*://movie.douban.com/celebrity/*"],
  runAt: "document_end",
  main,
});
