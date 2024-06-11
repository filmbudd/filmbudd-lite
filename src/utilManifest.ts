import { Manifest } from "wxt/browser";

// Composing and shorten extension name, such as transform "@filmbudd/filmbudd-lite" to "Filmbudd Lite".
export function composeExtensionTitleCaseName(manifest: Manifest.WebExtensionManifest): string {
  const splits = manifest.name.split("/");
  const name = splits[splits.length - 1].replaceAll("-", " ");
  return toTitleCase(name);
}

export function toTitleCase(s: string): string {
  return s.toLowerCase().replace(/(?<!\S)\S/gu, (match) => match.toUpperCase());
}

// Separate words in class names by a hyphen.
// ref: https://google.github.io/styleguide/htmlcssguide.html#ID_and_Class_Name_Delimiters
export function toGoogleStyleCssClassName(s: string): string {
  return s.replaceAll(" ", "-").toLowerCase();
}
