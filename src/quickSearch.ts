import { browser, Menus } from "wxt/browser";

export interface SearchLink {
  name: string;
  url: string;
}

type LinksComposer = (keyword: string) => SearchLink[];

export const showQuickSearchPopup = (keyword: string, links: SearchLink[]) => {
  // Create the blur background
  const blurBackground = document.createElement("div");
  blurBackground.id = "foo";
  blurBackground.style.position = "fixed";
  blurBackground.style.top = "0";
  blurBackground.style.right = "0";
  blurBackground.style.bottom = "0";
  blurBackground.style.left = "0";
  blurBackground.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  blurBackground.style.backdropFilter = "blur(10px)";
  blurBackground.style.display = "flex";
  blurBackground.style.justifyContent = "center";
  blurBackground.style.alignItems = "center";
  blurBackground.style.zIndex = "999999";

  const handlerMouseClick = (e: MouseEvent) => {
    // If the user clicks on the blur background (not on the popup div), remove the blur background
    if (e.target === blurBackground) {
      document.body.removeChild(blurBackground);
      blurBackground.removeEventListener("click", handlerMouseClick);
    }
  };
  blurBackground.addEventListener("click", handlerMouseClick);

  const handlerPressEsc = (e: KeyboardEvent) => {
    // If the user presses the ESC key, remove the blur background
    if (e.key === "Escape") {
      document.body.removeChild(blurBackground);
      document.body.removeEventListener("keydown", handlerPressEsc);
    }
  };
  document.addEventListener("keydown", handlerPressEsc);

  document.body.appendChild(blurBackground);

  const popupDiv = document.createElement("div");
  popupDiv.style.backgroundColor = "white";
  popupDiv.style.padding = "2em";
  popupDiv.style.textAlign = "center";
  blurBackground.appendChild(popupDiv);

  links.forEach((item: SearchLink) => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.href = item.url;
    link.textContent = `search ' ${keyword} ' on ${item.name}`;
    link.style.lineHeight = "2em";
    link.style.color = "#000";
    link.addEventListener("mouseover", () => {
      link.style.color = "#000";
    });
    popupDiv.appendChild(link);

    const lineBreak = document.createElement("br");
    popupDiv.appendChild(lineBreak);
  });

  const hint = document.createElement("p");
  hint.textContent = "Click on the background or press ESC to close this view.";
  hint.style.color = "#777";
  hint.style.marginTop = "2em";
  popupDiv.appendChild(hint);
};

export function installFeatureQuickSearchContextMenus(extensionName: string, linksComposer: LinksComposer) {
  const contexts: Menus.ContextType[] = ["selection"];
  const contextMenuId = `${browser.runtime.id}.${contexts[0]}`;

  browser.runtime.onInstalled.addListener(() => {
    const title = `${extensionName} QuickSearch ' %s '`;

    browser.contextMenus.create({
      title: title,
      contexts: contexts,
      id: contextMenuId,
    });
  });

  // Open a search popup instead of a new tab when the user clicks a context menu.
  // We don't open a tab since it is not possible show more than two top level context menu items.
  //
  // reference: https://developer.chrome.com/docs/extensions/reference/api/contextMenus
  // > You can create as many context menu items as you need, but if more than one from your extension is visible at once,
  // > Google Chrome automatically collapses them into a single parent menu.
  //
  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (!tab || info.menuItemId !== contextMenuId) {
      return;
    }

    const keyword = info.selectionText;
    if (!keyword) {
      return;
    }

    const links = linksComposer(keyword);
    if (!links || links.length == 0) {
      return;
    }

    try {
      await browser.scripting.executeScript({
        target: {
          tabId: tab.id!,
        },

        args: [keyword, links],
        func: showQuickSearchPopup,
      });
    } catch (err) {
      console.error(`executeScript failed: ${err}`);
    }
  });
}
