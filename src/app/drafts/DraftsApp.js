"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, ShoppingBag, Trash2 } from "lucide-react";
import ShirtMockup from "@/components/mockup/ShirtMockup";
import Button from "@/components/buttons/Button";
import { useToast } from "@/components/toast/ToastProvider";
import { getDrafts, deleteDraft, saveCheckoutDesign } from "@/utils/localStorage";
import { products, getColorHex, getProductPrice } from "@/data/products";

export default function DraftsApp() {
  const router = useRouter();
  const { showToast } = useToast();
  const [drafts, setDrafts] = useState(null); // null = not loaded yet

  useEffect(() => {
    setDrafts(getDrafts());
  }, []);

  function handleDelete(id) {
    deleteDraft(id);
    setDrafts(getDrafts());
    showToast("Draft deleted.", "info");
  }

  function handleBuyNow(draft) {
    saveCheckoutDesign(draft.design);
    router.push("/checkout");
  }

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
            Your library
          </span>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            My Drafts
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Designs you&apos;ve saved are stored in this browser. Continue
            editing or send a draft straight to checkout.
          </p>
        </div>

        {drafts === null ? null : drafts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line bg-paper p-10 text-center">
            <p className="font-display text-lg font-semibold text-ink">No drafts yet</p>
            <p className="mt-2 text-sm text-muted">
              Open the studio and select &ldquo;Save Draft&rdquo; to see your designs here.
            </p>
            <div className="mt-5">
              <Button href="/customize">Open the studio</Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => {
              const label = products.find((p) => p.id === draft.design.product)?.label || "Garment";
              const price = getProductPrice(draft.design.product);
              return (
                <div key={draft.id} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                  <div className="grid aspect-square place-items-center rounded-xl bg-cream">
                    <ShirtMockup
                      product={draft.design.product}
                      color={getColorHex(draft.design.color)}
                      className="h-4/5 w-4/5"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-display text-base font-semibold text-ink">
                        {label} &middot; {draft.design.size}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Saved {formatDate(draft.savedAt)} &middot; {draft.design.layers.length} layer
                        {draft.design.layers.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <p className="font-display text-sm font-semibold text-sage-dark">₹{price}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/customize?draft=${draft.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-sage/30 px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-sage hover:bg-sage-light"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </Link>
                    <button
                      onClick={() => handleBuyNow(draft)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-sage px-3 py-2 text-xs font-medium text-cream transition-colors hover:bg-sage-dark"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Buy Now
                    </button>
                    <button
                      onClick={() => handleDelete(draft.id)}
                      aria-label="Delete draft"
                      className="inline-flex items-center justify-center rounded-full border border-line px-3 py-2 text-coral transition-colors hover:border-coral"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
