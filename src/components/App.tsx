import { Fragment, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filter, keys, map, pipe, toPairs } from "remeda";
import invariant from "tiny-invariant";
import { MEASURERS } from "../color_spaces/measurers";
import { Comparer } from "./Comparer";
import { CssColorPicker } from "./CssColorPicker";
import { MultiPicker } from "./MultiPicker";
import { Results } from "./Results";

const DEFAULT_ACTIVE_MEASURERS = [
  "ciede2000",
] as const satisfies readonly (keyof typeof MEASURERS)[];

const ALL_MEASURERS = keys.strict(MEASURERS);

export function App() {
  const navigate = useNavigate();

  const { pivotColor: pivotColorParameter, targetColor: targetColorParameter } =
    useParams();
  invariant(pivotColorParameter !== undefined, "pivotColor is undefined");
  invariant(targetColorParameter !== undefined, "targetColor is undefined");
  const pivotColor = `#${pivotColorParameter}`;
  const targetColor = `#${targetColorParameter}`;

  const [activeMeasurers, setActiveMeasurers] = useState<
    readonly (keyof typeof MEASURERS)[]
  >(DEFAULT_ACTIVE_MEASURERS);

  const handlePivotColorChange = useCallback(
    (color: string) => {
      navigate(`/${color.slice(1)}/${targetColor.slice(1)}`);
    },
    [navigate, targetColor],
  );

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-center gap-12 overflow-hidden px-32 py-24">
        <section className="flex w-full items-stretch justify-evenly gap-8">
          <CssColorPicker
            value={pivotColor}
            style={{ borderColor: pivotColor }}
            className={`text-md w-64 rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg ${
              pivotColor === "#ffffff" ? "!border-neutral-300" : ""
            }`}
            onChange={handlePivotColorChange}
            placeholder="CSS Color"
          />
          <MultiPicker
            className="text-md w-64 rounded-lg border border-neutral-300 font-mono transition focus-within:shadow-lg"
            value={activeMeasurers}
            allValues={ALL_MEASURERS}
            onChange={setActiveMeasurers}
          />
        </section>
        <section className="grid grid-cols-[min-content_auto] gap-5">
          {pipe(
            MEASURERS,
            toPairs.strict,
            filter(([measurerName]) => activeMeasurers.includes(measurerName)),
            map(([measurerName, measurer]) => (
              <Fragment key={measurerName}>
                <h6 className="flex items-center justify-end text-xs font-bold uppercase">
                  {measurerName}
                </h6>
                <Results
                  key={measurerName}
                  pivotColor={pivotColor}
                  measurerFunction={measurer}
                />
              </Fragment>
            )),
          )}
        </section>
        <Comparer pivotColor={pivotColor} targetColor={targetColor} />
      </main>
    </div>
  );
}
