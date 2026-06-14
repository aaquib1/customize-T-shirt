import ProductCard from "@/components/product-card/ProductCard";
import Button from "@/components/buttons/Button";
import { colors } from "@/data/products";

const templates = [
  { id: "tshirt", label: "Classic T-Shirt", blurb: "100% combed cotton, true to size.", color: colors[0] },
  { id: "hoodie", label: "Premium Hoodie", blurb: "Heavyweight fleece, kangaroo pocket.", color: colors[2] },
  { id: "sweatshirt", label: "Crewneck Sweatshirt", blurb: "Brushed interior, ribbed cuffs.", color: colors[4] },
  { id: "oversized", label: "Oversized Tee", blurb: "Dropped shoulders, boxy fit.", color: colors[3] },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
              Templates
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Start from a blank canvas or a ready-made base
            </h2>
          </div>
          <Button href="/customize" variant="secondary">
            Open the studio
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
