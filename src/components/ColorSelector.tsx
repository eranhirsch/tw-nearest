export function ColorSelector({
  onChange,
}: {
  readonly onChange: (value: string) => void;
}): JSX.Element {
  return (
    <form className="flex items-center justify-center">
      <label className="flex items-center gap-2">
        Color:{" "}
        <input
          type="color"
          onChange={({ currentTarget: { value } }) => {
            onChange(value);
          }}
        />
      </label>
    </form>
  );
}
