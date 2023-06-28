import { useMemo } from "react";
import { twNearest } from "../twNearest";
import { contrastTextClassName } from "./contrastTextClassName";

const RESULTS_TO_SHOW = 10;

export function Results({
  color,
  selectedColor,
  onColorClick,
}: {
  readonly color: string;
  readonly selectedColor: string;
  readonly onColorClick: (clickedColor: string) => void;
}): JSX.Element {
  const closest = useMemo(
    () => twNearest(color).slice(0, RESULTS_TO_SHOW),
    [color],
  );

  return (
    <ol className="flex shrink flex-wrap content-start items-center justify-center gap-3 overflow-hidden overflow-y-auto p-2">
      {closest.map(({ color, names }) => (
        <>
          {names.length > 1 ? (
            <>
              {names.map(([colorName, shade]) => (
                <li key={colorName}>
                  <Color
                    selected={color === selectedColor}
                    colorName={colorName}
                    shade={shade}
                    color={color}
                    onClick={onColorClick}
                  />
                </li>
              ))}
            </>
          ) : (
            <li key={color}>
              <Color
                selected={color === selectedColor}
                colorName={names[0][0]}
                shade={names[0][1]}
                color={color}
                onClick={onColorClick}
              />
            </li>
          )}
        </>
      ))}
    </ol>
  );
}

function Color({
  colorName,
  shade,
  color,
  selected,
  onClick,
}: {
  readonly colorName: string;
  readonly shade: number | undefined;
  readonly color: string;
  readonly selected: boolean;
  readonly onClick: (clickedColor: string) => void;
}): JSX.Element {
  return (
    <button
      className={`flex items-center justify-center rounded p-2 font-mono text-sm font-semibold transition hover:-translate-y-2 hover:scale-105 hover:enabled:shadow-md disabled:scale-105 disabled:animate-bounce ${contrastTextClassName(
        color,
      )} ${
        color === "#ffffff" ? "border border-dashed border-neutral-300" : ""
      }}`}
      style={{ backgroundColor: color }}
      onClick={() => {
        onClick(color);
      }}
      disabled={selected}
    >
      {colorName}
      {shade !== undefined && <>-{shade}</>}
    </button>
  );
}
