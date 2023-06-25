import { describe, expect, test } from "vitest";
import { normalizedColors } from "../normalizedColors";
import { TAILWIND_COLORS_RAW } from "../pallettes/tailwind";

describe("normalizedTailwindColors", () => {
  test("trivial empty", () => {
    expect(normalizedColors({})).toEqual({});
  });

  test("non shaded, 3-letter rgb", () => {
    expect(normalizedColors({ red: "#f00" })).toEqual({
      "#ff0000": [["red"]],
    });
  });

  test("simple case, regular rgb", () => {
    expect(normalizedColors({ red: "#ff0000" })).toEqual({
      "#ff0000": [["red"]],
    });
  });

  test("mulitple simple colors", () => {
    expect(normalizedColors({ red: "#ff0000", green: "#00ff00" })).toEqual({
      "#ff0000": [["red"]],
      "#00ff00": [["green"]],
    });
  });

  test("simple case, clashing", () => {
    expect(normalizedColors({ red: "#ff0000", green: "#ff0000" })).toEqual({
      "#ff0000": [["red"], ["green"]],
    });
  });

  test("single shade", () => {
    expect(normalizedColors({ red: { 500: "#ff0000" } })).toEqual({
      "#ff0000": [["red", 500]],
    });
  });

  test("multiple shades", () => {
    expect(
      normalizedColors({ red: { 500: "#af0000", 600: "#ff0000" } }),
    ).toEqual({
      "#af0000": [["red", 500]],
      "#ff0000": [["red", 600]],
    });
  });

  test("multiple shaded colors", () => {
    expect(
      normalizedColors({
        red: { 500: "#af0000", 600: "#ff0000" },
        green: { 500: "#00af00", 600: "#00ff00" },
      }),
    ).toEqual({
      "#af0000": [["red", 500]],
      "#ff0000": [["red", 600]],
      "#00af00": [["green", 500]],
      "#00ff00": [["green", 600]],
    });
  });
});

describe("tailwind sanity", () => {
  test("snapshot", () => {
    expect(normalizedColors(TAILWIND_COLORS_RAW)).toMatchSnapshot();
  });
  test("no clashes", () => {
    const tw = normalizedColors(TAILWIND_COLORS_RAW);
    expect(Object.keys(tw)).toHaveLength(243);
  });
});
