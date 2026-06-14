import { sizes } from "@/data/products";

export default function SizeSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Size</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((size) => {
          const active = size === value;
          return (
            <button
              key={size}
              onClick={() => onChange(size)}
              className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition-colors ${
                active
                  ? "border-sage bg-sage text-cream"
                  : "border-line bg-paper text-ink hover:border-sage/40"
              }`}
              aria-pressed={active}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
