import * as utilXpath from "@/src/utilXpath";
import * as imdb from "@/src//imdb";

export function installFeatureMakeIMDbPrimaryKeysClickableOnDouban(extName: string, doc: Document) {
  window.location.href.indexOf("movie.douban.com/subject") > 0 && makeIMDbTitleIdClickable(extName, doc);

  (window.location.href.indexOf("www.douban.com/personage") > 0 || window.location.href.indexOf("movie.douban.com/celebrity") > 0) &&
    makeImdbNameIdClickable(extName, doc);
}

function makeIMDbTitleIdClickable(extName: string, doc: Document) {
  const rs = utilXpath.GetNodeByPath(doc, '//span[@class="pl" and contains(text(), "IMDb:")]/following-sibling::text()');

  if (rs.resultType !== XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
    return;
  }

  const oldTextNode = rs.iterateNext();
  if (!oldTextNode || oldTextNode.nodeType != Node.TEXT_NODE) {
    return;
  }

  const pk = oldTextNode.nodeValue!.trim();
  if (imdb.IsFakeTitlePk(pk)) {
    return;
  }

  const newLinkNode = doc.createElement("a");
  newLinkNode.target = "_blank";
  newLinkNode.href = `https://www.imdb.com/title/${pk}`;
  newLinkNode.textContent = `${pk} (${extName})`;

  oldTextNode.parentNode && oldTextNode.parentNode.replaceChild(newLinkNode, oldTextNode);
}

function makeImdbNameIdClickable(extName: string, doc: Document) {
  const rs = utilXpath.GetNodeByPath(doc, '//span[@class="label" and contains(text(), "IMDb编号:")]/following-sibling::span/text()');

  if (rs.resultType !== XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
    return;
  }

  const oldTextNode = rs.iterateNext();
  if (!oldTextNode || oldTextNode.nodeType != Node.TEXT_NODE) {
    return;
  }

  const pk = oldTextNode.nodeValue!.trim();
  if (imdb.IsFakeNamePk(pk)) {
    return;
  }

  const newLinkNode = doc.createElement("a");
  newLinkNode.target = "_blank";
  newLinkNode.href = `https://www.imdb.com/name/${pk}`;
  newLinkNode.textContent = `${pk} (${extName})`;

  oldTextNode.parentNode && oldTextNode.parentNode.replaceChild(newLinkNode, oldTextNode);
}
