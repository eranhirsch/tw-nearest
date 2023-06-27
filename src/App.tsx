import { useState } from "react";
import { Comparer } from "./components/Comparer";
import { CssColorPicker } from "./components/CssColorPicker";
import { Results } from "./components/Results";

const INITIAL_COLOR = "#a3e635";

export function App() {
  const [pivotColor, setPivotColor] = useState<string>(INITIAL_COLOR);
  const [targetColor, setTargetColor] = useState<string>();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-evenly gap-12 overflow-hidden px-32 py-24">
        <CssColorPicker
          value={pivotColor}
          style={{ borderColor: pivotColor }}
          className="text-md rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg"
          onChange={setPivotColor}
          placeholder="CSS Color"
        />
        <Results color={pivotColor} onColorClick={setTargetColor} />
        {targetColor !== undefined && (
          <Comparer pivotColor={pivotColor} targetColor={targetColor} />
        )}
      </main>
    </div>
  );
}
