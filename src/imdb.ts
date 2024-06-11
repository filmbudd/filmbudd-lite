export function IsFakeTitlePk(s: string): boolean {
  const noImdb = !s;
  const fakeIm = s ? s.indexOf("tt") !== 0 : true;
  return noImdb || fakeIm;
}

export function IsFakeNamePk(s: string): boolean {
  const noImdb = !s;
  const fakeIm = s ? s.indexOf("nm") !== 0 : true;
  return noImdb || fakeIm;
}
