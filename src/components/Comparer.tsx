import { useState } from "react";
import { asLAB } from "../color_spaces/cielab";
import { asCIEXYZ } from "../color_spaces/ciexyz";
import { SRGB, asSRGB } from "../color_spaces/srgb";
import { distance } from "../utils/distance";
import { contrastTextClassName } from "./contrastTextClassName";

export function Comparer({
  pivotColor,
  targetColor,
}: {
  readonly pivotColor: string;
  readonly targetColor: string;
}): JSX.Element {
  const [pivotOnTop, setPivotOnTop] = useState(false);

  const pivotRGB = asSRGB(pivotColor);
  const targetRGB = asSRGB(targetColor);
  const scoreRGB = distance(pivotRGB, targetRGB);
  const scoreRedMean = redmean(pivotRGB, targetRGB);

  const pivotXYZ = asCIEXYZ(pivotRGB);
  const targetXYZ = asCIEXYZ(targetRGB);
  const scoreXYZ = distance(pivotXYZ, targetXYZ);

  const pivotLAB = asLAB(pivotXYZ);
  const targetLAB = asLAB(targetXYZ);
  const scoreLAB = distance(pivotLAB, targetLAB);

  return (
    <section className="flex flex-col items-center justify-evenly gap-12">
      <dl className="flex items-center gap-4 text-xs font-light tabular-nums [&_dd]:text-lg [&_dd]:font-medium">
        <dt>LAB</dt>
        <dd>{scoreLAB.toFixed(2)}</dd>
        <dt>RedMean</dt>
        <dd>{scoreRedMean.toFixed(2)}</dd>
        <dt>RGB</dt>
        <dd>{scoreRGB.toFixed(2)}</dd>
        <dt>XYZ</dt>
        <dd>{scoreXYZ.toFixed(2)}</dd>
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
  const rgb = asSRGB(color);
  const xyz = asCIEXYZ(rgb);
  const lab = asLAB(xyz);

  return (
    <dl className="flex flex-col gap-2 font-mono text-xs tabular-nums">
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

/**
 * @see https://en.wikipedia.org/wiki/Color_difference#sRGB
 */
function redmean(a: SRGB, b: SRGB): number {
  const rRoof = (a.red + b.red) * 127.5;

  return (
    ((2 + rRoof / 256) * ((a.red - b.red) * 255) ** 2 +
      4 * ((a.green - b.green) * 255) ** 2 +
      (2 + (255 - rRoof) / 256) * ((a.blue - b.blue) * 255) ** 2) **
    0.5
  );
}
