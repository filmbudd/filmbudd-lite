import { defineContentScript } from "wxt/sandbox";
import { ContentScriptContext } from "wxt/client";
import { browser } from "wxt/browser";

import { installFeatureInjectRatingWidget } from "@/entrypoints/widgetOnWork.content/widget";
import { composeExtensionTitleCaseName } from "@/src/utilManifest";

function main(ctx: ContentScriptContext) {
  const manifest = browser.runtime.getManifest();
  const tabUrl = window.location.href;
  installFeatureInjectRatingWidget(ctx, composeExtensionTitleCaseName(manifest), document, tabUrl);
}

// It mounts a UI inside a content script with Shadow Root method.
export default defineContentScript({
  matches: ["*://movie.douban.com/subject/*", "*://www.imdb.com/title/*"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  main,
});
