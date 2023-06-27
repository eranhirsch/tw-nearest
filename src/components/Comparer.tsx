import { useState } from "react";
import { asLAB } from "../color_spaces/cielab";
import { asCIEXYZ } from "../color_spaces/ciexyz";
import { asSRGB } from "../color_spaces/srgb";
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
    <section className="flex gap-20">
      <dl className="flex gap-8">
        <dt>Pivot</dt>
        <dd>
          <ColorDetails color={pivotColor} />
        </dd>
        <dt>Target</dt>
        <dd>
          <ColorDetails color={targetColor} />
        </dd>
      </dl>
      <section className="flex cursor-pointer select-none items-center justify-center">
        <div
          className={`h-24 w-32 rounded p-1 text-xs ${contrastTextClassName(
            pivotColor,
          )} ${pivotOnTop ? "z-50" : ""}`}
          style={{ backgroundColor: pivotColor }}
          onClick={() => {
            setPivotOnTop((current) => !current);
          }}
        >
          <span className="flex flex-col items-start">
            <pre className="font-semibold">{pivotColor}</pre>Pivot
          </span>
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
          <span className="flex flex-col items-end">
            Target<pre className="font-semibold">{targetColor}</pre>
          </span>
        </div>
      </section>
    </section>
  );
}

function ColorDetails({ color }: { readonly color: string }): JSX.Element {
  const rgb = asSRGB(color);
  const xyz = asCIEXYZ(rgb);
  const lab = asLAB(xyz);

  return (
    <dl className="flex flex-col gap-2 font-mono text-xs">
      <dt>Hex</dt>
      <dd>{color}</dd>
      <dt>RGB</dt>
      <dl className="flex gap-4">
        <dt>R</dt>
        <dd>{rgb.red.toFixed(5)}</dd>
        <dt>G</dt>
        <dd>{rgb.green.toFixed(5)}</dd>
        <dt>B</dt>
        <dd>{rgb.blue.toFixed(5)}</dd>
      </dl>
      <dt>XYZ</dt>
      <dl className="flex gap-4">
        <dt>X</dt>
        <dd>{xyz.x.toFixed(5)}</dd>
        <dt>Y</dt>
        <dd>{xyz.y.toFixed(5)}</dd>
        <dt>Z</dt>
        <dd>{xyz.z.toFixed(5)}</dd>
      </dl>
      <dt>LAB</dt>
      <dl className="flex gap-4">
        <dt>L</dt>
        <dd>{lab.l.toFixed(5)}</dd>
        <dt>a</dt>
        <dd>{lab.a.toFixed(5)}</dd>
        <dt>b</dt>
        <dd>{lab.b.toFixed(5)}</dd>
      </dl>
    </dl>
  );
}
