export const SITE_NAME_DOUBAN = "Douban";
export const SITE_NAME_IMDB = "IMDb";
export const QUICK_SEARCH_SITE_NAMES = [SITE_NAME_DOUBAN, SITE_NAME_IMDB];

export const SOURCE_CN = "cn";
export const SOURCE_IM = "im";

export enum Action {
  ProxyRequest = "ProxyRequest",
}

// It is here for documentation.
// Do not export it since it will not work as expect.
// for more: https://wxt.dev/guide/entrypoints.html#side-effects
// const CONTENT_SCRIPT_MATCHES_DOUBAN = ["*://movie.douban.com/subject/*", "*://www.douban.com/personage/*", "*://movie.douban.com/celebrity/*"];

// DON'T CHANGE FOLLOWING.
// Use .env.{production,development} VITE_BASE_URL_FILMBUDD_LITE=xx instead if you wan to custom it.
export const BASE_URL_FILMBUDD_LITE = "https://lite-api.filmbudd.com";

export const URL_FEEDBACK = "https://filmbudd.com";
