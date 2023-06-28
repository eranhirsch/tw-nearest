import { lab as d3Lab, rgb as d3Rgb, lch as d3Lch } from "d3-color";
import { Fragment, useMemo, useState } from "react";
import { map, pipe, toPairs } from "remeda";
import { MEASURERS } from "../color_spaces/measurers";
import { contrastTextClassName } from "./contrastTextClassName";

export function Comparer({
  pivotColor,
  targetColor,
}: {
  readonly pivotColor: string;
  readonly targetColor: string;
}): JSX.Element {
  const [pivotOnTop, setPivotOnTop] = useState(false);

  return (
    <section className="flex flex-col items-center justify-evenly gap-12">
      <dl className="flex items-center gap-4 text-xs font-light tabular-nums [&_dd]:text-lg [&_dd]:font-medium">
        {pipe(
          MEASURERS,
          toPairs.strict,
          map(([measurerName, measurer]) => (
            <Fragment key={measurerName}>
              <dt>{measurerName}</dt>
              <dd>{measurer(pivotColor)(targetColor).toFixed(2)}</dd>
            </Fragment>
          )),
        )}
      </dl>
      <section className="flex cursor-pointer select-none items-center justify-center font-medium">
        <div
          className={`h-24 w-32 rounded p-1 text-xs ${contrastTextClassName(
            pivotColor,
          )} ${pivotOnTop ? "z-50" : ""}`}
          style={{ backgroundColor: pivotColor }}
          onClick={() => {
            setPivotOnTop((current) => !current);
          }}
        >
          Pivot
        </div>
        <div
          className={`-ms-14 flex h-24 w-32 items-end justify-end rounded p-1 text-xs ${contrastTextClassName(
            targetColor,
          )}`}
          style={{ backgroundColor: targetColor }}
          onClick={() => {
            setPivotOnTop((current) => !current);
          }}
        >
          Target
        </div>
      </section>
      <dl className="flex gap-12">
        <dt>Pivot</dt>
        <dd>
          <ColorDetails color={pivotColor} />
        </dd>
        <dt>Target</dt>
        <dd>
          <ColorDetails color={targetColor} />
        </dd>
      </dl>
    </section>
  );
}

function ColorDetails({ color }: { readonly color: string }): JSX.Element {
  return (
    <dl className="flex flex-col gap-2 font-mono text-xs tabular-nums">
      <dt>Hex</dt>
      <dd>{color}</dd>
      <dt>RGB</dt>
      <Coordinates color={color} parser={d3Rgb} parts={["r", "g", "b"]} />
      <dt>LAB</dt>
      <Coordinates color={color} parser={d3Lab} parts={["l", "a", "b"]} />
    </dl>
  );
}

function Coordinates<K extends string>({
  color,
  parser,
  parts,
}: {
  readonly color: string;
  readonly parser: (c: string) => Readonly<Record<K, number>>;
  readonly parts: readonly K[];
}): JSX.Element {
  const parsed = parser(color);
  return (
    <dl className="flex gap-4">
      {parts.map((part) => (
        <Fragment key={part}>
          <dt>{part}</dt>
          <dd>{parsed[part].toFixed(5)}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
