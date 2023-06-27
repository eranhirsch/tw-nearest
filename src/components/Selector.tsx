export function Selector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  return (
    <form className="flex h-10 items-center rounded p-1 ring ring-neutral-100">
      <input
        className="text-md font-mono outline-none"
        placeholder="Enter a color..."
        type="text"
      />
      <input
        className="h-10 w-10 rounded-md bg-transparent p-2"
        type="color"
        onChange={({ currentTarget: { value } }) => {
          onChange(value);
        }}
      />
    </form>
  );
}
