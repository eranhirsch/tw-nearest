import { CIELAB } from "../color_spaces/cielab";

export const distance = (first: CIELAB, second: CIELAB): number =>
  ((first.l - second.l) ** 2 +
    (first.a - second.a) ** 2 +
    (first.b - second.b) ** 2) **
  0.5;
