// Simple, flat-illustration garment shapes used across the hero and the
// customizer canvas. Each shape shares a 400x480 viewBox and exposes a
// "printArea" rect so overlay text/images can be aligned consistently.

const SHAPES = {
  tshirt: {
    body: "M120 70 L40 120 L75 185 L120 160 L120 460 L280 460 L280 160 L325 185 L360 120 L280 70 C280 70 255 95 200 95 C145 95 120 70 120 70 Z",
    shade: "M200 95 C145 95 120 70 120 70 L120 460 L150 460 L150 110 C165 120 180 125 200 125 C220 125 235 120 250 110 L250 460 L280 460 L280 70 C280 70 255 95 200 95 Z",
    printArea: { x: 145, y: 150, width: 110, height: 140 },
  },
  hoodie: {
    body: "M130 95 L45 135 L78 200 L130 175 L130 460 L270 460 L270 175 L322 200 L355 135 L270 95 C270 95 270 60 200 60 C130 60 130 95 130 95 Z",
    shade: "M200 60 C130 60 130 95 130 95 L130 460 L155 460 L155 130 C155 130 175 145 200 145 C225 145 245 130 245 130 L245 460 L270 460 L270 95 C270 95 270 60 200 60 Z M170 230 L230 230 L230 290 L170 290 Z",
    printArea: { x: 150, y: 195, width: 100, height: 130 },
  },
  sweatshirt: {
    body: "M125 85 L45 130 L78 195 L125 168 L125 460 L275 460 L275 168 L322 195 L355 130 L275 85 C275 85 255 105 200 105 C145 105 125 85 125 85 Z",
    shade: "M200 105 C145 105 125 85 125 85 L125 460 L150 460 L150 122 C165 132 182 138 200 138 C218 138 235 132 250 122 L250 460 L275 460 L275 85 C275 85 255 105 200 105 Z M125 430 L275 430 L275 460 L125 460 Z",
    printArea: { x: 148, y: 175, width: 104, height: 135 },
  },
  oversized: {
    body: "M110 90 L20 145 L58 215 L110 182 L110 470 L290 470 L290 182 L342 215 L380 145 L290 90 C290 90 260 115 200 115 C140 115 110 90 110 90 Z",
    shade: "M200 115 C140 115 110 90 110 90 L110 470 L140 470 L140 135 C158 148 178 158 200 158 C222 158 242 148 260 135 L260 470 L290 470 L290 90 C290 90 260 115 200 115 Z",
    printArea: { x: 138, y: 165, width: 124, height: 150 },
  },
};

export function getPrintArea(product) {
  return (SHAPES[product] || SHAPES.tshirt).printArea;
}

export default function ShirtMockup({
  product = "tshirt",
  color = "#FFFFFF",
  className = "",
}) {
  const shape = SHAPES[product] || SHAPES.tshirt;
  const isLight = isLightColor(color);
  const shadeOpacity = isLight ? 0.06 : 0.18;
  const strokeColor = isLight ? "#15130F22" : "#FFFFFF26";

  return (
    <svg
      viewBox="0 0 400 480"
      className={className}
      role="img"
      aria-label={`${product} mockup in selected color`}
    >
      <path d={shape.body} fill={color} stroke={strokeColor} strokeWidth="2" />
      <path d={shape.shade} fill="#000000" opacity={shadeOpacity} />
    </svg>
  );
}

function isLightColor(hex) {
  if (!hex) return true;
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
