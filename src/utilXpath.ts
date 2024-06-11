export function GetNodeByPath(doc: Document, path: string): XPathResult {
  return doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
}

export function GetStringByPath(doc: Document, path: string): string {
  let s = "";
  const node = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null).iterateNext();
  if (node) {
    s = node.textContent?.trim() || "";
  }
  return s;
}
