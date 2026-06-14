"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FolderHeart, ShoppingBag, Save } from "lucide-react";
import ProductSelector from "@/components/customization-panel/ProductSelector";
import ColorPicker from "@/components/customization-panel/ColorPicker";
import SizeSelector from "@/components/customization-panel/SizeSelector";
import CanvasPreview from "@/components/customization-panel/CanvasPreview";
import TextPanel from "@/components/customization-panel/TextPanel";
import StickerPanel from "@/components/customization-panel/StickerPanel";
import PositionControls from "@/components/customization-panel/PositionControls";
import ImageUpload from "@/components/upload-image/ImageUpload";
import { useToast } from "@/components/toast/ToastProvider";
import {
  loadCurrentDesign,
  saveCurrentDesign,
  saveDraft,
  getDraft,
  saveCheckoutDesign,
} from "@/utils/localStorage";
import {
  createDefaultDesign,
  createTextLayer,
  createStickerLayer,
  createImageLayer,
} from "@/utils/designState";

export default function CustomizeApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef(null);
  const { showToast } = useToast();

  const [design, setDesign] = useState(createDefaultDesign);
  const [draftId, setDraftId] = useState(null);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [savedNotice, setSavedNotice] = useState(false);

  // Load a specific draft, the in-progress design, or query params from
  // a template card — in that order of priority.
  useEffect(() => {
    const draftParam = searchParams.get("draft");
    if (draftParam) {
      const draft = getDraft(draftParam);
      if (draft) {
        setDesign(draft.design);
        setDraftId(draft.id);
        return;
      }
    }

    const saved = loadCurrentDesign();
    if (saved) {
      setDesign(saved);
      return;
    }

    const product = searchParams.get("product");
    const color = searchParams.get("color");
    if (product || color) {
      setDesign((prev) => ({
        ...prev,
        ...(product ? { product } : {}),
        ...(color ? { color } : {}),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep an autosaved copy so work isn't lost on refresh.
  useEffect(() => {
    saveCurrentDesign(design);
  }, [design]);

  function updateDesign(updates) {
    setDesign((prev) => ({ ...prev, ...updates }));
  }

  function addLayer(layer) {
    setDesign((prev) => ({ ...prev, layers: [...prev.layers, layer] }));
    setSelectedLayerId(layer.id);
  }

  function updateLayer(id, updates) {
    setDesign((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));
  }

  function removeLayer(id) {
    setDesign((prev) => ({ ...prev, layers: prev.layers.filter((l) => l.id !== id) }));
    if (selectedLayerId === id) setSelectedLayerId(null);
  }

  // ---- Layer positioning -----------------------------------------------

  function getSelectedLayer() {
    return design.layers.find((l) => l.id === selectedLayerId) || null;
  }

  function handleDragLayer(id, info) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const current = design.layers.find((l) => l.id === id);
    if (!current) return;

    const dxPercent = (info.offset.x / rect.width) * 100;
    const dyPercent = (info.offset.y / rect.height) * 100;

    updateLayer(id, {
      x: clamp(current.x + dxPercent, 0, 100),
      y: clamp(current.y + dyPercent, 0, 100),
    });
  }

  function handleMove(dx, dy) {
    const layer = getSelectedLayer();
    if (!layer) return;
    updateLayer(layer.id, {
      x: clamp(layer.x + dx, 0, 100),
      y: clamp(layer.y + dy, 0, 100),
    });
  }

  function handleCenter() {
    const layer = getSelectedLayer();
    if (!layer) return;
    updateLayer(layer.id, { x: 50, y: 50 });
  }

  function handleReset() {
    const layer = getSelectedLayer();
    if (!layer) return;
    if (layer.type === "text") updateLayer(layer.id, { x: 50, y: 45 });
    else if (layer.type === "image") updateLayer(layer.id, { x: 50, y: 50, scale: 1 });
    else updateLayer(layer.id, { x: 50, y: 40 });
  }

  // ---- Save / Buy --------------------------------------------------------

  function handleSaveDraft() {
    const entry = saveDraft(design, draftId);
    setDraftId(entry.id);
    setSavedNotice(true);
    showToast("Draft saved. Find it anytime under My Drafts.", "success");
    setTimeout(() => setSavedNotice(false), 2000);
  }

  function handleBuyNow() {
    saveCheckoutDesign(design);
    router.push("/checkout");
  }

  const selectedLayer = getSelectedLayer();
  const textLayers = design.layers.filter((l) => l.type === "text");
  const stickerLayers = design.layers.filter((l) => l.type === "sticker");
  const imageLayers = design.layers.filter((l) => l.type === "image");

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
              Studio
            </span>
            <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Design your apparel
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/drafts"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/30 bg-paper px-4 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-sage hover:bg-sage-light"
            >
              <FolderHeart className="h-4 w-4" /> My Drafts
            </Link>
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sage px-4 py-2.5 font-display text-sm font-medium text-sage-dark transition-colors hover:bg-sage-light"
            >
              <Save className="h-4 w-4" />
              {savedNotice ? "Saved!" : "Save Draft"}
            </button>
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-2.5 font-display text-sm font-medium text-cream transition-colors hover:bg-sage-dark"
            >
              <ShoppingBag className="h-4 w-4" /> Buy Now
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr_300px]">
          {/* Left sidebar */}
          <aside className="order-2 space-y-6 rounded-2xl border border-line bg-paper p-5 shadow-card lg:order-none lg:sticky lg:top-24 lg:self-start">
            <ProductSelector value={design.product} onChange={(product) => updateDesign({ product })} />
            <ColorPicker value={design.color} onChange={(color) => updateDesign({ color })} />
            <SizeSelector value={design.size} onChange={(size) => updateDesign({ size })} />
          </aside>

          {/* Canvas */}
          <div className="order-1 rounded-2xl border border-line bg-paper p-5 shadow-card lg:order-none">
            <CanvasPreview
              ref={canvasRef}
              product={design.product}
              color={design.color}
              layers={design.layers}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onDragLayer={handleDragLayer}
              onDeselect={() => setSelectedLayerId(null)}
            />
          </div>

          {/* Right sidebar */}
          <aside className="order-3 space-y-6 rounded-2xl border border-line bg-paper p-5 shadow-card lg:order-none lg:sticky lg:top-24 lg:self-start">
            <TextPanel
              texts={textLayers}
              selectedId={selectedLayerId}
              onAdd={() => addLayer(createTextLayer())}
              onSelect={setSelectedLayerId}
              onUpdate={updateLayer}
              onRemove={removeLayer}
            />

            <div className="border-t border-line pt-5">
              <StickerPanel
                stickers={stickerLayers}
                selectedId={selectedLayerId}
                onAddPreset={(emoji) => addLayer(createStickerLayer({ content: emoji }))}
                onUploadCustom={(dataUrl) => addLayer(createStickerLayer({ src: dataUrl }))}
                onSelect={setSelectedLayerId}
                onUpdate={updateLayer}
                onRemove={removeLayer}
                showToast={showToast}
              />
            </div>

            <div className="border-t border-line pt-5">
              <ImageUpload
                images={imageLayers}
                selectedId={selectedLayerId}
                onUpload={(dataUrl) => addLayer(createImageLayer({ src: dataUrl }))}
                onSelect={setSelectedLayerId}
                onUpdate={updateLayer}
                onRemove={removeLayer}
                showToast={showToast}
              />
            </div>

            <div className="border-t border-line pt-5">
              <PositionControls
                selectedLayer={selectedLayer}
                onMove={handleMove}
                onCenter={handleCenter}
                onReset={handleReset}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
