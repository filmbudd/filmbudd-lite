import { defineContentScript } from "wxt/sandbox";
import { ContentScriptContext } from "wxt/client";
import { browser } from "wxt/browser";

import { installFeatureInjectRatingWidget } from "@/src/ratingWidget";
import { composeExtensionTitleCaseName } from "@/src/utilManifest";

// We have to customize transformManifest in wxt.config.ts as a workaround because the following does not work as expected.
import "@filmbuddllc/filmbudd-lite-widget/src/widget.module.css";

function main(ctx: ContentScriptContext) {
  const manifest = browser.runtime.getManifest();
  const tabUrl = window.location.href;
  installFeatureInjectRatingWidget(ctx, composeExtensionTitleCaseName(manifest), document, tabUrl);
}

// It mounts a UI inside a content script with Shadow Root method.
export default defineContentScript({
  matches: ["*://movie.douban.com/subject/*"],
  cssInjectionMode: "ui",
  runAt: "document_end",
  main,
});
