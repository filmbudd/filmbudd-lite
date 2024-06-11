export function getNodeByPath(doc: Document, path: string): Node | null {
  const rs = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);

  if (rs.resultType !== XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
    return null;
  }

  return rs.iterateNext();
}

export function getStringByPath(doc: Document, path: string): string {
  let s = "";
  const node = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
  if (node) {
    s = node.textContent?.trim() || "";
  }
  return s;
}
