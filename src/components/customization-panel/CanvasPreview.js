"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import ShirtMockup from "@/components/mockup/ShirtMockup";
import { getColorHex } from "@/data/products";

const CanvasPreview = forwardRef(function CanvasPreview(
  { product, color, layers, selectedLayerId, onSelectLayer, onDragLayer, onDeselect },
  ref
) {
  const colorHex = getColorHex(color);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div
        ref={ref}
        onClick={onDeselect}
        className="relative aspect-[4/5] w-full max-w-md rounded-[2rem] border border-line bg-paper shadow-premium"
      >
        <div className="absolute inset-0 grid place-items-center p-10">
          <ShirtMockup product={product} color={colorHex} className="h-full w-full" />
        </div>

        {layers.map((layer) => (
          <motion.div
            key={`${layer.id}-${layer.x}-${layer.y}`}
            drag
            dragMomentum={false}
            onDragEnd={(e, info) => onDragLayer(layer.id, info)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectLayer(layer.id);
            }}
            style={layerStyle(layer)}
            className={`no-select absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${
              layer.type === "text" ? "max-w-[80%] whitespace-pre-wrap break-words px-1 leading-tight" : ""
            } ${selectedLayerId === layer.id ? "outline outline-2 outline-dashed outline-sage" : ""}`}
          >
            {layer.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={layer.src} alt="Uploaded design" className="pointer-events-none select-none" style={{ width: `${layer.scale * 140}px` }} />
            )}
            {layer.type === "sticker" && layer.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={layer.src} alt="Custom sticker" className="pointer-events-none select-none" style={{ width: `${layer.scale * 70}px` }} />
            )}
            {layer.type === "sticker" && !layer.src && (
              <span className="pointer-events-none select-none">{layer.content}</span>
            )}
            {layer.type === "text" && layer.content}
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Drag text, stickers, or images to reposition them on the garment.
      </p>
    </div>
  );
});

function layerStyle(layer) {
  const base = { left: `${layer.x}%`, top: `${layer.y}%` };

  if (layer.type === "text") {
    return {
      ...base,
      fontSize: `${layer.fontSize}px`,
      fontWeight: layer.fontWeight,
      color: layer.color,
      textAlign: layer.align,
    };
  }

  if (layer.type === "sticker" && !layer.src) {
    return { ...base, fontSize: `${layer.fontSize}px`, lineHeight: 1 };
  }

  return base;
}

export default CanvasPreview;
