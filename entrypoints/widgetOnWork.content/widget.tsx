import ReactDOM from "react-dom/client";
import React, { useEffect, useRef, useState } from "react";
import { browser } from "wxt/browser";
import { ContentScriptContext, createShadowRootUi } from "wxt/client";
import { Work, newWidget, MidLineEllipsis } from "@filmbuddllc/filmbudd-lite-widget";
import * as classes from "@filmbuddllc/filmbudd-lite-widget/src/widget.module.css";

import * as utilManifest from "@/src/utilManifest";
import * as configs from "@/src/configs";
import { GetWorkRequest, GetWorkResponse } from "@/src/gen/filmbudd_lite/v24/filmbudd_lite_pb";

const manifest = browser.runtime.getManifest();
const errorMsgSignature = ` (${manifest.name})`;

export async function installFeatureInjectRatingWidget(ctx: ContentScriptContext, extensionName: string, doc: Document, tabUrl: string) {
  const name = utilManifest.toGoogleStyleCssClassName(extensionName);

  const ui = await createShadowRootUi(ctx, {
    name,
    position: "inline",

    append: (anchor: Element, root: Element) => {
      if (tabUrl.indexOf("movie.douban.com") > 0) {
        anchor.appendChild(root);
      } else if (tabUrl.indexOf("imdb.com") > 0) {
        anchor.prepend(root);
      } else {
        // insert the slot node after root
        anchor.parentElement?.insertBefore(root, anchor.nextElementSibling);
      }
    },

    anchor: () => {
      let slot: Element | null = null;

      if (tabUrl.indexOf("movie.douban.com") > 0) {
        slot = doc.querySelector("#interest_sectl") as Element;
      } else if (tabUrl.indexOf("imdb.com") > 0) {
        slot = doc.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]')?.parentNode?.parentNode as Element;
      }

      if (!slot) {
        console.warn(`The slot node not found on ${tabUrl}.`);
        return "body";
      }

      return slot;
    },

    onRemove: (root) => {
      root?.unmount();
    },

    onMount: (uiContainer: HTMLElement, shadow: ShadowRoot) => {
      // Container is a body, and React warns when creating a root on the body, so create a wrapper div.
      const app = document.createElement("div");
      app.id = name;
      uiContainer.append(app);

      const root = ReactDOM.createRoot(app);
      root.render(
        <App shadow={shadow}>
          <Widget doc={document} tabUrl={tabUrl} name={name} />
        </App>
      );

      return root;
    },
  });

  ui.mount();
}

export interface WidgetProps {
  doc: Document;
  name: string;
  tabUrl: string;
}

export function Widget({ tabUrl, doc, name }: WidgetProps) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const containerRef = useRef(null);

  const fetchData = () => {
    setLoading(true);

    const { source, key } = parseTabUrl(tabUrl);
    if (source == "" || key == "") {
      console.error(`parse tab url failed, ${tabUrl}`);
      return;
    }

    const payload = { source, key } as GetWorkRequest;
    browser.runtime
      .sendMessage({ action: configs.Action.GetWorkRequest, payload })
      .then((rs) => {
        const { err, body } = rs;

        if (err) {
          const message = err;
          console.error(message);
          setMsg(message + errorMsgSignature);
        } else {
          const { work } = body as GetWorkResponse;
          if (!work) {
            console.error("The work field is empty.");
            return;
          }
          setMsg("");

          const widgetWork = {} as Work;

          if (source === configs.SOURCE_CN) {
            widgetWork.im_rating = work.imRating ? work.imRating.toString() : MidLineEllipsis;

            widgetWork.im_url = work.im ?? "";
            // TODO: Change the link to feedback page if there is no linked record/404”
          } else if (source === configs.SOURCE_IM) {
            widgetWork.cn_rating = work.cnRating ? work.cnRating.toString() : MidLineEllipsis;

            widgetWork.cn_url = work.cn ?? "";
            // TODO: Change the link to feedback page if there is no linked record/404”
          }

          if (containerRef.current) {
            const parent = containerRef.current as HTMLElement;

            if (!document.querySelector('*[data-testid="fb-lite-widget"]')) {
              const _widget = newWidget(doc, widgetWork, classes);
              _widget.setAttribute("data-testid", "fb-lite-widget");
              parent.appendChild(_widget);
            }
          }
        }
      })
      .catch((err: Error) => {
        const message = err.message;
        console.error(message);
        setMsg(message + errorMsgSignature);
      })
      .finally(() => setLoading(false));

    return;
  };

  useEffect(() => {
    fetchData();
  }, [containerRef && containerRef.current]);

  return (
    <>
      {loading ? (
        <span>...</span>
      ) : (
        <>
          <div ref={containerRef}></div>
          {msg.length > 0 && <span>{msg}</span>}
        </>
      )}
    </>
  );
}

interface AppProps {
  shadow: ShadowRoot;
  children: React.ReactNode;
}

export function App({ children }: AppProps) {
  return <React.StrictMode>{children}</React.StrictMode>;
}

export interface TabUrl {
  source: string;
  key: string;
}

const patternDoubanMovieSubject = /movie\.douban\.com\/subject\/(\d+)\/$/;
const reDoubanMovieSubject = new RegExp(patternDoubanMovieSubject, "m");

const patternImdbTitle = /www\.imdb\.com\/title\/(tt\d+)\/$/;
const reImdbTitle = new RegExp(patternImdbTitle, "m");

export function parseTabUrl(s: string): TabUrl {
  const rs: TabUrl = { source: "", key: "" };
  const bare = s.split("?")[0];

  const mDoubanMovie = reDoubanMovieSubject.exec(bare);
  const mImdbTitle = reImdbTitle.exec(bare);
  if (mDoubanMovie && mDoubanMovie.length == 2) {
    rs.key = mDoubanMovie[1];
    rs.source = configs.SOURCE_CN;
  } else if (mImdbTitle && mImdbTitle.length == 2) {
    rs.key = mImdbTitle[1];
    rs.source = configs.SOURCE_IM;
  }

  return rs;
}
