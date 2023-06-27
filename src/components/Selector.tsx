import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CSS_COLORS_RAW } from "../pallettes/csscolors";

export function Selector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  const textInputReference = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    if (color === undefined) {
      return;
    }
    onChange(color);
  }, [color, onChange]);

  const handleTextChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const normalized = value.trim().toLowerCase();
    const color = fromNamedColor(normalized);
    if (color === undefined) {
      return;
    }
    setColor(color);
  };

  const handlePickerChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setColor(value);

    const { current } = textInputReference;
    if (current === null) {
      return;
    }

    current.value = value;
  };

  return (
    <form className="flex h-10 items-center rounded p-2 ring ring-neutral-100">
      <input
        ref={textInputReference}
        className="text-md font-mono text-neutral-500 outline-none"
        placeholder="CSS Color"
        type="text"
        onChange={handleTextChange}
      />
      <input
        value={color}
        className="h-10 w-10 rounded-md bg-transparent p-2"
        type="color"
        onChange={handlePickerChange}
      />
    </form>
  );
}

const fromNamedColor = (possibleName: string): string | undefined =>
  (CSS_COLORS_RAW as Record<string, string>)[possibleName];
