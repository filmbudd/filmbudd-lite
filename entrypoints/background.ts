import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

import * as configs from "@/src/configs";
import { installFeatureQuickSearchContextMenus } from "@/src/quickSearch";
import { composeExtensionTitleCaseName } from "@/src/utilManifest";
import { installFeatureMessageListener } from "@/src/messageListener";

function main() {
  const manifest = browser.runtime.getManifest();

  installFeatureQuickSearchContextMenus(composeExtensionTitleCaseName(manifest));

  installFeatureMessageListener([configs.Action.ProxyRequest]);
}

export default defineBackground(main);
