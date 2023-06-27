import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, useRef } from "react";
import invariant from "tiny-invariant";
import { CSS_COLORS_RAW } from "../pallettes/csscolors";

const REGEX_RGB_HEXADECIMAL = /^#[\da-f]{3,6}$/;

// Accept percentage or numbers, and accept any number of spaces, legacy commas
// (with any number of spaces after them), or tailwind specific underscores
// (which replace spaces).
const REGEX_RGB =
  /^rgb\( *(\d+%?)(?:(?: *[ ,] *)|_)(\d+%?)(?:(?: *[ ,] *)|_)(\d+%?) *\)$/;

export function CssColorPicker({
  value,
  onChange,
  className,
  placeholder,
  ...properties
}: Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "onChange"
> & {
  readonly value: string;
  readonly placeholder?: string;
  readonly onChange: (value: string) => void;
}): JSX.Element {
  const textInputReference = useRef<HTMLInputElement>(null);

  const handleTextChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const normalized = value.trim().toLowerCase();
    const color =
      fromNamedColor(normalized) ?? fromHex(normalized) ?? fromRGB(normalized);
    if (color === undefined) {
      return;
    }
    onChange(color);
  };

  const handlePickerChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(value);

    const { current } = textInputReference;
    if (current === null) {
      return;
    }

    current.value = value;
  };

  return (
    <div className={`flex items-center ${className ?? ""}`} {...properties}>
      <input
        ref={textInputReference}
        className="flex-1 outline-none"
        placeholder={placeholder}
        type="text"
        onChange={handleTextChange}
      />
      <input
        value={value}
        className="flex-none cursor-pointer rounded-md bg-transparent"
        type="color"
        onChange={handlePickerChange}
      />
    </div>
  );
}

const fromNamedColor = (possibleName: string): string | undefined =>
  (CSS_COLORS_RAW as Record<string, string>)[possibleName];

const fromHex = (possibleHex: string): string | undefined =>
  REGEX_RGB_HEXADECIMAL.test(possibleHex)
    ? possibleHex.length === 7
      ? possibleHex
      : possibleHex.length === 4
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- We just confirmed the format of the string with the regex and it's length explicitly. Typescript just can't represent this in the typing system
        `#${possibleHex[1]!}${possibleHex[1]!}${possibleHex[2]!}${possibleHex[2]!}${possibleHex[3]!}${possibleHex[3]!}`
      : undefined
    : undefined;

const fromRGB = (possibleRGB: string): string | undefined => {
  const match = possibleRGB.match(REGEX_RGB);
  if (match === null || match.length !== 4) {
    return undefined;
  }

  try {
    return `#${match
      .slice(1)
      .map((raw) => toHexPart(raw))
      .join("")}`;
  } catch {
    return;
  }
};

function toHexPart(raw: string | undefined): string {
  invariant(raw !== undefined, "Missing section");
  const rawNumber = Number.parseInt(raw);
  const asNumber = raw.endsWith("%")
    ? Math.floor((rawNumber / 100) * 0xff)
    : rawNumber;
  invariant(asNumber >= 0 && asNumber <= 0xff, `Out of range ${asNumber}`);
  return asNumber.toString(16).padStart(2, "0");
}
