export function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <main>
        <form>
          <label className="flex items-center gap-2">
            Color: <input type="color" />
          </label>
        </form>
      </main>
    </div>
  );
}
