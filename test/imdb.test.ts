import { assert, test } from "vitest";

import { IsFakeTitlePk } from "@/src/imdb";

test("IsFakeTitlePk", () => {
  [
    ["", true],
    ["1234", true],
    ["abcd", true],

    ["tt1234", false],
  ].forEach((item) => {
    const input = item[0] as string;
    const want = item[1];

    assert.equal(want, IsFakeTitlePk(input));
  });
});
