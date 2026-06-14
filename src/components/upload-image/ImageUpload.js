import { ImagePlus, Trash2 } from "lucide-react";
import { validateImageFile } from "@/utils/designState";

export default function ImageUpload({ images, selectedId, onUpload, onSelect, onUpdate, onRemove, showToast }) {
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
      onUpload(reader.result);
      showToast("Image uploaded successfully.", "success");
    };
    reader.onerror = () => showToast("Could not read that file. Please try again.", "error");
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Upload Image</p>

      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-cream px-4 py-5 text-sm text-muted transition-colors hover:border-sage hover:text-sage-dark">
        <ImagePlus className="h-4 w-4" />
        Upload PNG or JPG
        <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
      </label>

      {images.length > 0 && (
        <div className="mt-4 space-y-2">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => onSelect(image.id)}
              className={`flex items-center gap-3 rounded-xl border p-2.5 ${
                selectedId === image.id ? "border-sage bg-sage-light" : "border-line bg-paper"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt="Uploaded design" className="h-8 w-8 rounded object-cover" />

              <div className="flex-1">
                <label className="mb-1 flex items-center justify-between text-[11px] text-muted">
                  Size <span>{Math.round(image.scale * 100)}%</span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.05}
                  value={image.scale}
                  onChange={(e) => onUpdate(image.id, { scale: Number(e.target.value) })}
                  className="w-full accent-sage"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(image.id);
                }}
                aria-label="Remove image"
                className="text-coral hover:opacity-70"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
