
type CheckboxProps = {
  label?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({ label, defaultChecked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className="
          flex h-5 w-5 items-center justify-center
          rounded border border-zinc-500 bg-zinc-900
          transition-all
          peer-checked:border-purple-600 peer-checked:bg-purple-600
          [&>svg]:scale-0 peer-checked:[&>svg]:scale-100
        "
      >
        <svg
          className="h-3.5 w-3.5 text-white transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      {label && <span className="text-sm text-zinc-200">{label}</span>}
    </label>
  );
}