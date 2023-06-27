import { describe, test } from "vitest";
import { asCIEXYZ } from "../ciexyz";
import { expectAllToBeClose } from "./expectAllToBeClose";
import { COLORS } from "./colors";

describe("correctness", () => {
  test.each(COLORS)("$name", ({ rgb, xyz }) => {
    expectAllToBeClose(asCIEXYZ(rgb), xyz);
  });
});
