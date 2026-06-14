import ShirtMockup from "@/components/mockup/ShirtMockup";
import { products } from "@/data/products";

export default function ProductSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">Product</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {products.map((product) => {
          const active = product.id === value;
          return (
            <button
              key={product.id}
              onClick={() => onChange(product.id)}
              className={`rounded-xl border p-3 text-left transition-colors ${
                active
                  ? "border-sage bg-sage-light"
                  : "border-line bg-paper hover:border-sage/40"
              }`}
              aria-pressed={active}
            >
              <div className="grid aspect-square place-items-center rounded-lg bg-cream">
                <ShirtMockup product={product.id} color="#E8E1D3" className="h-4/5 w-4/5" />
              </div>
              <p className="mt-2 text-xs font-medium text-ink">{product.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
