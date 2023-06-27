import { describe, expect, test } from "vitest";
import { asCIEXYZ } from "../ciexyz";

describe("Correctness", () => {
  test("red pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 1, green: 0, blue: 0 });
    expect(x).toBeCloseTo(0.4361);
    expect(y).toBeCloseTo(0.2225);
    expect(z).toBeCloseTo(0.013_93);
  });

  test("green pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 1, blue: 0 });
    expect(x).toBeCloseTo(0.3851);
    expect(y).toBeCloseTo(0.7169);
    expect(z).toBeCloseTo(0.0971);
  });

  test("blue pulse", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 0, blue: 1 });
    expect(x).toBeCloseTo(0.1431);
    expect(y).toBeCloseTo(0.060_62);
    expect(z).toBeCloseTo(0.7142);
  });

  test("white", () => {
    const { x, y, z } = asCIEXYZ({ red: 1, green: 1, blue: 1 });
    expect(x).toBeCloseTo(0.9642);
    expect(y).toBeCloseTo(1);
    expect(z).toBeCloseTo(0.8252);
  });

  test("black", () => {
    const { x, y, z } = asCIEXYZ({ red: 0, green: 0, blue: 0 });
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(0);
    expect(z).toBeCloseTo(0);
  });

  test("gray", () => {
    const { x, y, z } = asCIEXYZ({ red: 0.5, green: 0.5, blue: 0.5 });
    expect(x).toBeCloseTo(0.2081);
    expect(y).toBeCloseTo(0.2159);
    expect(z).toBeCloseTo(0.1781);
  });
});
