import * as utilXpath from "./utilXpath.js";
import * as imdb from "./imdb.js";

export function installFeatureMakeIMDbPrimaryKeysClickableOnDouban(doc: Document) {
  window.location.href.indexOf("movie.douban.com/subject") > 0 && makeIMDbTitleIdClickable(doc);

  (window.location.href.indexOf("www.douban.com/personage") > 0 || window.location.href.indexOf("movie.douban.com/celebrity") > 0) &&
    makeImdbNameIdClickable(doc);
}

function makeIMDbTitleIdClickable(doc: Document) {
  const rs = utilXpath.getNodeByPath(doc, '//span[@class="pl" and contains(text(), "IMDb:")]/following-sibling::text()');
  if (!rs) {
    return;
  }

  const oldTextNode = rs;
  if (!oldTextNode || oldTextNode.nodeType != Node.TEXT_NODE) {
    return;
  }

  const pk = oldTextNode.nodeValue!.trim();
  if (imdb.isFakeTitlePk(pk)) {
    return;
  }

  const newLinkNode = doc.createElement("a");
  newLinkNode.target = "_blank";
  newLinkNode.href = `https://www.imdb.com/title/${pk}`;
  newLinkNode.textContent = `${pk}`;

  oldTextNode.parentNode && oldTextNode.parentNode.replaceChild(newLinkNode, oldTextNode);
}

function makeImdbNameIdClickable(doc: Document) {
  const rs = utilXpath.getNodeByPath(doc, '//span[@class="label" and contains(text(), "IMDb编号:")]/following-sibling::span/text()');
  if (!rs) {
    return;
  }

  const oldTextNode = rs;
  if (!oldTextNode || oldTextNode.nodeType != Node.TEXT_NODE) {
    return;
  }

  const pk = oldTextNode.nodeValue!.trim();
  if (imdb.isFakeNamePk(pk)) {
    return;
  }

  const newLinkNode = doc.createElement("a");
  newLinkNode.target = "_blank";
  newLinkNode.href = `https://www.imdb.com/name/${pk}`;
  newLinkNode.textContent = `${pk}`;

  oldTextNode.parentNode && oldTextNode.parentNode.replaceChild(newLinkNode, oldTextNode);
}
