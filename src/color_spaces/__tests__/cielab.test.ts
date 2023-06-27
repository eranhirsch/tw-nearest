import { describe, test } from "vitest";
import { asLAB } from "../cielab";
import { COLORS } from "./colors";
import { expectAllToBeClose } from "./expectAllToBeClose";

describe("correctness", () => {
  test.each(COLORS)("$name", ({ xyz, lab }) => {
    expectAllToBeClose(asLAB(xyz), lab);
  });
});
