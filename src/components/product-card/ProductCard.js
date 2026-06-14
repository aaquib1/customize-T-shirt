import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ShirtMockup from "@/components/mockup/ShirtMockup";

export default function ProductCard({ id, label, color, blurb }) {
  return (
    <Link
      href={`/customize?product=${id}&color=${encodeURIComponent(color.id)}`}
      className="group block rounded-2xl border border-line bg-paper p-5 shadow-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="grid aspect-square place-items-center rounded-xl bg-cream">
        <ShirtMockup product={id} color={color.hex} className="h-4/5 w-4/5" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold text-ink">{label}</p>
          <p className="mt-1 text-sm text-muted">{blurb}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage-light text-sage-dark transition-colors group-hover:bg-sage group-hover:text-cream">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
