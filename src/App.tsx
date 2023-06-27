import { useState } from "react";
import { Comparer } from "./components/Comparer";
import { CssColorPicker } from "./components/CssColorPicker";
import { Results } from "./components/Results";

export function App() {
  const [pivotColor, setPivotColor] = useState<string>();
  const [targetColor, setTargetColor] = useState<string>();

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="flex h-full w-full flex-col items-center justify-center gap-8 overflow-hidden p-12">
        <CssColorPicker
          style={{ borderColor: pivotColor }}
          className="text-md rounded-lg border p-2 font-mono text-neutral-500 transition focus-within:shadow-lg"
          onChange={setPivotColor}
          placeholder="CSS Color"
        />
        {pivotColor !== undefined && (
          <Results color={pivotColor} onColorClick={setTargetColor} />
        )}
        {targetColor !== undefined && pivotColor !== undefined && (
          <Comparer pivotColor={pivotColor} targetColor={targetColor} />
        )}
      </main>
    </div>
  );
}
