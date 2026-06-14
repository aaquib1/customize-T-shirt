import { Sticker as StickerIcon, Trash2, Upload } from "lucide-react";
import { stickerPack } from "@/data/stickers";
import { validateImageFile } from "@/utils/designState";

export default function StickerPanel({ stickers, selectedId, onAddPreset, onUploadCustom, onSelect, onUpdate, onRemove, showToast }) {
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = validateImageFile(file);
    if (!result.valid) {
      showToast(result.message, "error");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onUploadCustom(reader.result);
      showToast("Sticker uploaded successfully.", "success");
    };
    reader.onerror = () => showToast("Could not read that file. Please try again.", "error");
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Stickers</p>

      <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-8">
        {stickerPack.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onAddPreset(emoji)}
            className="grid aspect-square place-items-center rounded-lg border border-line bg-cream text-xl transition-colors hover:border-sage hover:bg-sage-light"
            aria-label={`Add ${emoji} sticker`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-cream px-4 py-4 text-sm text-muted transition-colors hover:border-sage hover:text-sage-dark">
        <Upload className="h-4 w-4" />
        Upload your own sticker (PNG/JPG)
        <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
      </label>

      {stickers.length > 0 && (
        <div className="mt-4 space-y-2">
          {stickers.map((sticker) => (
            <div
              key={sticker.id}
              onClick={() => onSelect(sticker.id)}
              className={`flex items-center gap-3 rounded-xl border p-2.5 ${
                selectedId === sticker.id ? "border-sage bg-sage-light" : "border-line bg-paper"
              }`}
            >
              {sticker.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sticker.src} alt="Custom sticker" className="h-8 w-8 rounded object-cover" />
              ) : (
                <span className="grid h-8 w-8 place-items-center rounded bg-cream text-lg">
                  {sticker.content}
                </span>
              )}

              <div className="flex-1">
                <input
                  type="range"
                  min={24}
                  max={140}
                  value={sticker.fontSize || sticker.scale * 56}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (sticker.src) onUpdate(sticker.id, { scale: val / 56 });
                    else onUpdate(sticker.id, { fontSize: val });
                  }}
                  className="w-full accent-sage"
                  aria-label="Sticker size"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(sticker.id);
                }}
                aria-label="Remove sticker"
                className="text-coral hover:opacity-70"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {stickers.length === 0 && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <StickerIcon className="h-3.5 w-3.5" /> Tap a sticker to add it to your design.
        </p>
      )}
    </div>
  );
}
