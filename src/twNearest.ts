import { map, pipe, prop, sortBy, toPairs } from "remeda";
import { TAILWIND_COLORS, TailwindColor } from "./tailwindColors";
import { CIELAB, asLAB } from "./utils/cielab";
import { asCIEXYZ } from "./utils/ciexyz";
import { distance } from "./utils/distance";
import { asSRGB } from "./utils/srgb";

export interface ScoredColor {
  readonly color: TailwindColor;
  readonly distance: number;
}

export function twNearest(target: string): readonly ScoredColor[] {
  const targetLab = hexStringToCIELAB(target);
  return pipe(
    TAILWIND_COLORS,
    toPairs.strict,
    map(([value, color]) => ({
      color,
      distance: distance(targetLab, hexStringToCIELAB(value)),
    })),
    sortBy(prop("distance")),
  );
}

const hexStringToCIELAB = (hex: string): CIELAB => asLAB(asCIEXYZ(asSRGB(hex)));
