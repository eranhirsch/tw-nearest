import { HSLColor, RGBColor, color as d3Color, rgb as d3Rgb } from "d3-color";
import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

const WHITE = d3Rgb(0xff, 0xff, 0xff);

export function CssColorPicker({
  value,
  onChange,
  className,
  placeholder,
}: {
  readonly value: string;
  readonly placeholder?: string;
  readonly onChange: (value: string) => void;
  readonly className?: string | undefined;
}): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [color, setColor] = useState(d3Color(value)!);
  const [backgroundColor, setBackgroundColor] = useState<RGBColor | HSLColor>();

  const handleColorChange = useCallback(
    (newColor: RGBColor | HSLColor) => {
      setColor(newColor);

      if (newColor.opacity === 1) {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setBackgroundColor(undefined);
        onChange(newColor.formatHex());
      } else {
        setBackgroundColor((current) => current ?? WHITE);
      }

      const realColor = alphaBlend(newColor, backgroundColor ?? WHITE);

      onChange(realColor.formatHex());
    },
    [backgroundColor, onChange],
  );

  const handleOpacityColorChange = useCallback(
    (newBackgroundColor: RGBColor | HSLColor) => {
      setBackgroundColor(newBackgroundColor);

      const realColor = alphaBlend(color, newBackgroundColor);

      onChange(realColor.formatHex());
    },
    [color, onChange],
  );

  return (
    <>
      <ColorPicker
        placeholder={placeholder}
        className={className}
        value={color}
        onChange={handleColorChange}
      />
      {backgroundColor !== undefined && (
        <ColorPicker
          placeholder="Background"
          className={className}
          value={backgroundColor}
          onChange={handleOpacityColorChange}
        />
      )}
    </>
  );
}

function ColorPicker({
  placeholder,
  value,
  className,
  onChange,
}: {
  readonly placeholder: string | undefined;
  readonly className: string | undefined;
  readonly value: RGBColor | HSLColor;
  readonly onChange: (value: RGBColor | HSLColor) => void;
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

    onChange(color);
  };

  const handlePickerChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onChange(d3Color(value)!);

    const { current } = textInputReference;
    if (current === null) {
      return;
    }

    current.value = value;
  };

  const isWhite = useMemo(() => {
    const { r, g, b } = value.rgb();
    return r === 0xff && g === 0xff && b === 0xff;
  }, [value]);

  return (
    <div
      className={`flex items-center ${className ?? ""}`}
      style={{ borderColor: isWhite ? "rgb(212 212 212)" : value.formatHex() }}
    >
      <input
        ref={textInputReference}
        className="flex-1 outline-none"
        placeholder={placeholder}
        type="text"
        onChange={handleTextChange}
      />
      <input
        value={value.formatHex()}
        className="w-10 flex-none cursor-pointer rounded-md bg-transparent"
        type="color"
        onChange={handlePickerChange}
      />
    </div>
  );
}

function alphaBlend(
  top: RGBColor | HSLColor,
  bottom: RGBColor | HSLColor,
): RGBColor {
  const topAsRgb = top.rgb();
  const bottomAsRgb = bottom.rgb();

  return d3Rgb(
    topAsRgb.r * top.opacity + bottomAsRgb.r * (1 - top.opacity),
    topAsRgb.g * top.opacity + bottomAsRgb.g * (1 - top.opacity),
    topAsRgb.b * top.opacity + bottomAsRgb.b * (1 - top.opacity),
  );
}
