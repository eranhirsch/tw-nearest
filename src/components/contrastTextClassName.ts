import { asLAB } from "../color_spaces/cielab";
import { asCIEXYZ } from "../color_spaces/ciexyz";
import { asSRGB } from "../color_spaces/srgb";

export function contrastTextClassName(color: string): string {
  const { l } = asLAB(asCIEXYZ(asSRGB(color)));
  return l > 50 ? "text-neutral-950" : "text-neutral-50";
}
