import { map, pipe, sortBy, toPairs } from "remeda";
import { CIELAB, asLAB } from "./utils/cielab";
import { asCIEXYZ } from "./utils/ciexyz";
import { distance } from "./utils/distance";
import { asSRGB } from "./utils/srgb";
import { TAILWIND_COLORS, TailwindColor } from "./tailwindColors";

export function twNearest(target: string): readonly TailwindColor[] {
  const targetLab = hexStringToCIELAB(target);
  return pipe(
    TAILWIND_COLORS,
    toPairs.strict,
    sortBy(([value]) => distance(targetLab, hexStringToCIELAB(value))),
    ($) => $,
    map(([, twColor]) => twColor),
  );
}

const hexStringToCIELAB = (hex: string): CIELAB => asLAB(asCIEXYZ(asSRGB(hex)));
