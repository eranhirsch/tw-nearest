import invariant from "tiny-invariant";

export type SRGB = Readonly<Record<"red" | "green" | "blue", number>>;

const HEX_RADIX = 16;
const MAX_HEX_VALUE = 0xff;

export function asSRGB(raw: string): SRGB {
  const [, serialized] = raw.split("#", 2);
  invariant(serialized !== undefined, "Hex string must start with #");
  invariant(
    serialized.length === 6 || serialized.length === 3,
    "Hex string must be 3 or 6 characters long",
  );

  let redPart = serialized.slice(0, 2);
  let greenPart = serialized.slice(2, 4);
  let bluePart = serialized.slice(4, 6);
  if (serialized.length === 3) {
    /* eslint-disable @typescript-eslint/no-non-null-assertion --
     * We just did a length check above but there's no way to tell typescript
     * that this is safe.
     */
    redPart = serialized[0]!.repeat(2);
    greenPart = serialized[1]!.repeat(2);
    bluePart = serialized[2]!.repeat(2);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }

  const red = Number.parseInt(redPart, HEX_RADIX) / MAX_HEX_VALUE;
  const green = Number.parseInt(greenPart, HEX_RADIX) / MAX_HEX_VALUE;
  const blue = Number.parseInt(bluePart, HEX_RADIX) / MAX_HEX_VALUE;

  return { red, green, blue };
}
