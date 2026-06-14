import { Check } from "lucide-react";
import { colors } from "@/data/products";

export default function ColorPicker({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Color</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((color) => {
          const active = color.id === value;
          const isLight = isLightHex(color.hex);
          return (
            <button
              key={color.id}
              onClick={() => onChange(color.id)}
              aria-pressed={active}
              aria-label={color.label}
              title={color.label}
              className="group relative shrink-0"
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border transition-transform ${
                  active
                    ? "scale-110 border-sage ring-2 ring-sage ring-offset-2 ring-offset-paper"
                    : "border-line group-hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {active && (
                  <Check
                    className="h-3.5 w-3.5"
                    style={{ color: isLight ? "#15130F" : "#FAF6EF" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isLightHex(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
