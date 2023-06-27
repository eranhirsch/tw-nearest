import { ChangeEvent } from "react";
import { CSS_COLORS_RAW } from "../pallettes/csscolors";

export function Selector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  const handleTextChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const normalized = value.trim().toLowerCase();
    const color = fromNamedColor(normalized);
    if (color === undefined) {
      return;
    }
    onChange(color);
  };

  return (
    <form className="flex h-10 items-center rounded p-1 ring ring-neutral-100">
      <input
        className="text-md font-mono outline-none"
        placeholder="Enter a color..."
        type="text"
        onChange={handleTextChange}
      />
      <input
        className="h-10 w-10 rounded-md bg-transparent p-2"
        type="color"
        onChange={({ currentTarget: { value } }) => {
          onChange(value);
        }}
      />
    </form>
  );
}

const fromNamedColor = (possibleName: string): string | undefined =>
  (CSS_COLORS_RAW as Record<string, string>)[possibleName];
