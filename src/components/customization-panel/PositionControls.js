import { ArrowDown, ArrowUp, Crosshair, RotateCcw } from "lucide-react";

const STEP = 5;

export default function PositionControls({ selectedLayer, onMove, onCenter, onReset }) {
  const disabled = !selectedLayer;

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Design Position</p>
      <p className="mt-1 text-xs text-muted">
        {disabled
          ? "Select a text or image layer to reposition it."
          : "Nudge, center, or reset the selected layer."}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          disabled={disabled}
          onClick={() => onMove(0, -STEP)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink disabled:opacity-40 hover:border-sage/40"
        >
          <ArrowUp className="h-4 w-4" /> Move Up
        </button>
        <button
          disabled={disabled}
          onClick={() => onMove(0, STEP)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink disabled:opacity-40 hover:border-sage/40"
        >
          <ArrowDown className="h-4 w-4" /> Move Down
        </button>
        <button
          disabled={disabled}
          onClick={onCenter}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink disabled:opacity-40 hover:border-sage/40"
        >
          <Crosshair className="h-4 w-4" /> Center
        </button>
        <button
          disabled={disabled}
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink disabled:opacity-40 hover:border-sage/40"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>
    </div>
  );
}
