import { map, pipe, prop, sortBy, toPairs } from "remeda";
import { TAILWIND_COLORS } from "./pallettes/tailwind";
import { CIELAB, asLAB } from "./color_spaces/cielab";
import { asCIEXYZ } from "./color_spaces/ciexyz";
import { distance } from "./utils/distance";
import { asSRGB } from "./color_spaces/srgb";

export interface ScoredColor {
  readonly names: (typeof TAILWIND_COLORS)[keyof typeof TAILWIND_COLORS];
  readonly color: string;
  readonly distance: number;
}

export function twNearest(
  pivot: string,
  measurer = defaultMeasurer,
): readonly ScoredColor[] {
  return pipe(
    TAILWIND_COLORS,
    toPairs.strict,
    map(([color, names]) => ({
      names,
      color,
      distance: measurer(pivot, color),
    })),
    sortBy(prop("distance")),
  );
}

const defaultMeasurer = (pivot: string, target: string) =>
  distance(hexStringToCIELAB(pivot), hexStringToCIELAB(target));

const hexStringToCIELAB = (hex: string): CIELAB => asLAB(asCIEXYZ(asSRGB(hex)));
