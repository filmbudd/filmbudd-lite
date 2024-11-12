import { browser } from "wxt/browser";
import { ContentScriptContext, createShadowRootUi } from "wxt/client";

import { attachWidget, Work, MidLineEllipsis } from "@filmbuddllc/filmbudd-lite-widget";
import * as classes from "@filmbuddllc/filmbudd-lite-widget/src/widget.module.css";

import * as utilManifest from "./utilManifest";
import * as configs from "./configs";
import { GetWorkRequest, GetWorkResponse } from "./gen/filmbudd_lite/v24/filmbudd_lite_pb";

export async function installFeatureInjectRatingWidget(ctx: ContentScriptContext, extensionName: string, doc: Document, tabUrl: string) {
  const id = utilManifest.toGoogleStyleCssClassName(extensionName);
  const ui = await createShadowRootUi(ctx, {
    name: id,
    position: "inline",
    async onMount() {
      let attachPoint = null;

      if (tabUrl.indexOf("movie.douban.com") > 0) {
        attachPoint = doc.querySelector("#interest_sectl") as HTMLDivElement;
      } else if (tabUrl.indexOf("imdb.com") > 0) {
        attachPoint = doc.querySelector('[data-testid="hero-rating-bar__aggregate-rating"]')?.parentNode?.parentNode;
      }

      if (!attachPoint) {
        console.error("attach point not found");
        return;
      }

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
            attachInfo(id, doc, attachPoint, message);
          } else {
            const { work } = body as GetWorkResponse;
            if (!work) {
              console.error("The work field is empty.");
              return;
            }

            const widgetWork = {} as Work;

            if (source === configs.SOURCE_CN) {
              widgetWork.im_rating = work.imRating ? work.imRating.toString() : MidLineEllipsis;

              widgetWork.im_url = work.im ?? "";
              // TODO: Change the link to feedback page if there is no linked record/404”
            } else if (source === configs.SOURCE_IM) {
              widgetWork.cn_rating = work.cnRating ? work.cnRating.toString() : MidLineEllipsis;

              widgetWork.cn_url = work.im ?? "";
              // TODO: Change the link to feedback page if there is no linked record/404”
            }

            attachWidget(doc, attachPoint, widgetWork, classes, (_doc: Document, _root: Node, _node: Node) => {
              if (source === configs.SOURCE_CN) {
                _root.appendChild(_node);
              } else if (source === configs.SOURCE_IM) {
                // We hack to set the widget height to 66px to make it align vertically in the center,
                // since its parent - the injection point _root node is set to display=flex without align-items=center.
                (_node as HTMLElement).style.height = "66px";

                insertAsFirstChild(_root, _node);
              }
            });
          }
        })
        .catch((err: Error) => {
          console.error(err);
          attachInfo(id, doc, attachPoint, err.toString());
        });
    },
  });

  ui.mount();
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

function attachInfo(id: string, doc: Document, rootNode: Node, err: string) {
  const infoId = id + "-info";
  let p = (rootNode as Document).querySelector(`#${infoId}`);
  if (!p) {
    p = doc.createElement("p");
    p.id = infoId;
    p.textContent = err + " (Filmbudd Lite)";
    rootNode.appendChild(p);
  } else {
    p.textContent = err;
  }
}

function insertAsFirstChild(parentNode: Node, newNode: Node) {
  if (parentNode.firstChild) {
    parentNode.insertBefore(newNode, parentNode.firstChild);
  } else {
    parentNode.appendChild(newNode);
  }
}
