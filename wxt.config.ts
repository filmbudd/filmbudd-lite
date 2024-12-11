import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

import * as pkgJson from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: false,

  manifest: () => {
    return {
      permissions: ["contextMenus", "activeTab", "scripting"],

      author: pkgJson.author,
      version: pkgJson.version,
      name: "__MSG_extName__",
      description: "__MSG_extDescription__",
      default_locale: "en",
      icons: {
        16: "/icon/icon16.png", // specify a 16-pixel icon for display next to context menu item
        24: "/icon/icon24.png",
        48: "/icon/icon48.png",
        96: "/icon/icon96.png",
        128: "/icon/icon128.png",
      },
    };
  },

  vite: ({ mode }) => {
    const isDev = mode === "development";
    console.log(` mode=${mode} isDev=${isDev}`);

    return {
      esbuild: {
        pure: !isDev ? ["console.log"] : [],
      },

      build: {
        sourcemap: isDev ? "inline" : false,
      },

      plugins: [react()],
    };
  },
});
