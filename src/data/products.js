export const products = [
  { id: "tshirt", label: "T-Shirt", price: 499 },
  { id: "hoodie", label: "Hoodie", price: 999 },
  { id: "sweatshirt", label: "Sweatshirt", price: 899 },
  { id: "oversized", label: "Oversized Tee", price: 599 },
];

// A broad, Canva-style color palette shown as circular swatches.
export const colors = [
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "cream", label: "Cream", hex: "#FAF6EF" },
  { id: "beige", label: "Beige", hex: "#E8DCC8" },
  { id: "black", label: "Black", hex: "#1A1A1A" },
  { id: "charcoal", label: "Charcoal", hex: "#36454F" },
  { id: "grey", label: "Grey", hex: "#9CA3AF" },
  { id: "navy", label: "Navy", hex: "#1F2A44" },
  { id: "royal-blue", label: "Royal Blue", hex: "#2563EB" },
  { id: "sky-blue", label: "Sky Blue", hex: "#38BDF8" },
  { id: "teal", label: "Teal", hex: "#0D9488" },
  { id: "mint", label: "Mint", hex: "#6EE7B7" },
  { id: "green", label: "Green", hex: "#2F6B4F" },
  { id: "olive", label: "Olive", hex: "#6B7E4E" },
  { id: "yellow", label: "Yellow", hex: "#FACC15" },
  { id: "mustard", label: "Mustard", hex: "#D9A441" },
  { id: "orange", label: "Orange", hex: "#F97316" },
  { id: "red", label: "Red", hex: "#B5432A" },
  { id: "maroon", label: "Maroon", hex: "#7F1D1D" },
  { id: "burgundy", label: "Burgundy", hex: "#6B2B3A" },
  { id: "pink", label: "Pink", hex: "#F472B6" },
  { id: "hot-pink", label: "Hot Pink", hex: "#EC4899" },
  { id: "purple", label: "Purple", hex: "#7C3AED" },
  { id: "lavender", label: "Lavender", hex: "#CFC6F2" },
  { id: "brown", label: "Brown", hex: "#78350F" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const fontWeights = [
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
];

export const textColors = [
  "#15130F",
  "#FFFFFF",
  "#2F6B4F",
  "#B5432A",
  "#CFC6F2",
  "#F2A36B",
  "#1F2A44",
];

export function getProductPrice(productId) {
  return products.find((p) => p.id === productId)?.price ?? 499;
}

export function getColorHex(colorId) {
  return colors.find((c) => c.id === colorId)?.hex ?? "#FFFFFF";
}
