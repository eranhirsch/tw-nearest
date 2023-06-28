import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, useRef } from "react";
import { color as d3Color } from "d3-color";

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
    // TODO: d3 doesn't accept everything the css standard does, e.g. it doesn't
    // accept spaces as delimiters, we need a translation layer to make it
    // compliant
    const color = d3Color(value);

    if (color === null) {
      return;
    }

    onChange(color.formatHex());
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
