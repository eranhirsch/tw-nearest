import { useState } from "react";
import { ScoredColor, twNearest } from "./twNearest";

export function App() {
  const [twColors, setTwColors] = useState<readonly ScoredColor[]>([]);

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main className="overflow-hidden">
        <form>
          <label className="flex items-center gap-2">
            Color:{" "}
            <input
              type="color"
              onChange={({ currentTarget: { value } }) => {
                setTwColors(twNearest(value));
              }}
            />
          </label>
        </form>
        <ol className="overflow-hidden overflow-y-auto">
          {twColors.map(({ color: [color, shade], distance }) => (
            <li key={`${color}-${shade ?? ""}`}>
              {color}
              {shade !== undefined && -{ shade }}:{distance}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
