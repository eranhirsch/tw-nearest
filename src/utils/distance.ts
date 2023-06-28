import { pipe, sumBy, toPairs } from "remeda";

export const distance = <T extends Record<string, number>>(
  first: Readonly<T>,
  second: Readonly<T>,
): number =>
  pipe(
    first,
    toPairs.strict,
    sumBy(([key, value]) => Math.pow(second[key] - value, 2)),
    ($) => Math.pow($, 0.5),
  );
