import { expect } from "vitest";

export function expectAllToBeClose<K extends string>(
  actual: Record<K, number>,
  expected: Record<K, number>,
) {
  for (const key in actual) {
    expect(actual[key]).toBeCloseTo(expected[key]);
  }
}
