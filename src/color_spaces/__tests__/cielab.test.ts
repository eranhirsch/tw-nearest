import { describe, expect, test } from "vitest";
import { asLAB } from "../cielab";

describe("Correctness", () => {
  test.only("x pulse", () => {
    const { l, a, b } = asLAB({ x: 0.4361, y: 0.2225, z: 0.013_93 });
    expect(l).toBeCloseTo(54.29);
    expect(a).toBeCloseTo(80.81);
    expect(b).toBeCloseTo(69.89);
  });

  test("y pulse", () => {
    const { l, a, b } = asLAB({ x: 0, y: 1, z: 0 });
    expect(l).toBeCloseTo(0.3851);
    expect(a).toBeCloseTo(0.7169);
    expect(b).toBeCloseTo(0.0971);
  });

  test("z pulse", () => {
    const { l, a, b } = asLAB({ x: 0, y: 0, z: 1 });
    expect(l).toBeCloseTo(0.1431);
    expect(a).toBeCloseTo(0.060_62);
    expect(b).toBeCloseTo(0.7142);
  });

  test("white", () => {
    const { l, a, b } = asLAB({ x: 1, y: 1, z: 1 });
    expect(l).toBeCloseTo(0.9642);
    expect(a).toBeCloseTo(1);
    expect(b).toBeCloseTo(0.8252);
  });

  test("black", () => {
    const { l, a, b } = asLAB({ x: 0, y: 0, z: 0 });
    expect(l).toBeCloseTo(0);
    expect(a).toBeCloseTo(0);
    expect(b).toBeCloseTo(0);
  });

  test("gray", () => {
    const { l, a, b } = asLAB({ x: 0.5, y: 0.5, z: 0.5 });
    expect(l).toBeCloseTo(0.2081);
    expect(a).toBeCloseTo(0.2159);
    expect(b).toBeCloseTo(0.1781);
  });

  test("different ratios 1", () => {
    const { l, a, b } = asLAB({ x: 0.123, y: 0.456, z: 0.789 });
    expect(l).toBeCloseTo(0.1574);
    expect(a).toBeCloseTo(0.1644);
    expect(b).toBeCloseTo(0.4353);
  });

  test("different ratios 1", () => {
    const { l, a, b } = asLAB({ x: 0.456, y: 0.789, z: 0.123 });
    expect(l).toBeCloseTo(0.304);
    expect(a).toBeCloseTo(0.4595);
    expect(b).toBeCloseTo(0.069_26);
  });
});
