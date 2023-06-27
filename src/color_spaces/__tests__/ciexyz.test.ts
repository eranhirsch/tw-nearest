import { describe, expect, test } from "vitest";
import { asCIEXYZ } from "../ciexyz";

describe("Correctness", () => {
  test("red pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 1, green: 0, blue: 0 });
    expect(x).toBeCloseTo(41.246);
    expect(y).toBeCloseTo(21.267);
    expect(z).toBeCloseTo(1.933);
  });

  test("green pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 1, blue: 0 });
    expect(x).toBeCloseTo(35.758);
    expect(y).toBeCloseTo(71.515);
    expect(z).toBeCloseTo(11.919);
  });

  test("blue pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 0, blue: 1 });
    expect(x).toBeCloseTo(18.044);
    expect(y).toBeCloseTo(7.217);
    expect(z).toBeCloseTo(95.03);
  });

  test("white", () => {
    const { x, y, z } = asCIEXYZ({ red: 1, green: 1, blue: 1 });
    expect(x).toBeCloseTo(95.047);
    expect(y).toBeCloseTo(100);
    expect(z).toBeCloseTo(108.883);
  });

  test("black", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 0, blue: 0 });
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
    expect(z).toBeCloseTo(0);
  });

  test("gray", () => {
    const { x, y, z } = asCIEXYZ({ red: 0.5, green: 0.5, blue: 0.5 });
    expect(x).toBeCloseTo(20.344);
    expect(y).toBeCloseTo(21.404);
    expect(z).toBeCloseTo(23.305);
  });

  test("different ratios 1", () => {
    const { x, y, z } = asCIEXYZ({ red: 0.123, green: 0.456, blue: 0.789 });
    expect(x).toBeCloseTo(17.415);
    expect(y).toBeCloseTo(17.076);
    expect(z).toBeCloseTo(57.746);
  });

  test("different ratios 2", () => {
    const { x, y, z } = asCIEXYZ({ red: 0.789, green: 0.123, blue: 0.456 });
    expect(x).toBeCloseTo(27.81);
    expect(y).toBeCloseTo(14.715);
    expect(z).toBeCloseTo(17.981);
  });

  test("different ratios 3", () => {
    const { x, y, z } = asCIEXYZ({ red: 0.456, green: 0.789, blue: 0.123 });
    expect(x).toBeCloseTo(28.424);
    expect(y).toBeCloseTo(45.696);
    expect(z).toBeCloseTo(8.644);
  });
});
