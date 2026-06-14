import { AlignCenter, AlignLeft, AlignRight, Plus, Trash2 } from "lucide-react";
import { fontWeights, textColors } from "@/data/products";

const alignments = [
  { id: "left", icon: AlignLeft },
  { id: "center", icon: AlignCenter },
  { id: "right", icon: AlignRight },
];

export default function TextPanel({ texts, selectedId, onAdd, onSelect, onUpdate, onRemove }) {
  const selected = texts.find((t) => t.id === selectedId);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Text</p>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1 rounded-full bg-sage-light px-3 py-1.5 text-xs font-medium text-sage-dark hover:bg-sage hover:text-cream"
        >
          <Plus className="h-3.5 w-3.5" /> Add Text
        </button>
      </div>

      {texts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {texts.map((layer, i) => (
            <button
              key={layer.id}
              onClick={() => onSelect(layer.id)}
              className={`rounded-full border px-3 py-1 text-xs ${
                layer.id === selectedId
                  ? "border-sage bg-sage-light text-sage-dark"
                  : "border-line text-muted"
              }`}
            >
              Text {i + 1}
            </button>
          ))}
        </div>
      )}

      {selected ? (
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Content</label>
            <textarea
              value={selected.content}
              onChange={(e) => onUpdate(selected.id, { content: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink focus:border-sage"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
              Font size <span>{selected.fontSize}px</span>
            </label>
            <input
              type="range"
              min={12}
              max={72}
              value={selected.fontSize}
              onChange={(e) => onUpdate(selected.id, { fontSize: Number(e.target.value) })}
              className="w-full accent-sage"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Font weight</label>
            <div className="flex flex-wrap gap-2">
              {fontWeights.map((w) => (
                <button
                  key={w.value}
                  onClick={() => onUpdate(selected.id, { fontWeight: w.value })}
                  className={`rounded-lg border px-3 py-1.5 text-xs ${
                    selected.fontWeight === w.value
                      ? "border-sage bg-sage-light text-sage-dark"
                      : "border-line text-muted"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Color</label>
            <div className="flex flex-wrap gap-2">
              {textColors.map((hex) => (
                <button
                  key={hex}
                  onClick={() => onUpdate(selected.id, { color: hex })}
                  aria-label={`Set text color ${hex}`}
                  className={`h-7 w-7 rounded-full border ${
                    selected.color === hex ? "ring-2 ring-sage ring-offset-2 ring-offset-paper" : "border-line"
                  }`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted">Alignment</label>
            <div className="flex gap-2">
              {alignments.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onUpdate(selected.id, { align: id })}
                  aria-label={`Align ${id}`}
                  className={`grid h-9 w-9 place-items-center rounded-lg border ${
                    selected.align === id
                      ? "border-sage bg-sage-light text-sage-dark"
                      : "border-line text-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onRemove(selected.id)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-coral hover:underline"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove this text
          </button>
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted">
          Add a text layer, then select it to edit size, weight, color, and alignment.
        </p>
      )}
    </div>
  );
}
