let layerCounter = 0;

export function createId(prefix = "layer") {
  layerCounter += 1;
  return `${prefix}-${Date.now()}-${layerCounter}`;
}

export function createDefaultDesign() {
  return {
    product: "tshirt",
    color: "white",
    size: "M",
    layers: [],
  };
}

export function createTextLayer(overrides = {}) {
  return {
    id: createId("text"),
    type: "text",
    content: "Your text here",
    fontSize: 24,
    fontWeight: "600",
    color: "#15130F",
    align: "center",
    x: 50, // percent, center of canvas
    y: 45, // percent
    ...overrides,
  };
}

export function createStickerLayer(overrides = {}) {
  const base = {
    id: createId("sticker"),
    type: "sticker",
    x: 50,
    y: 40,
  };

  if (overrides.src) {
    return { ...base, src: overrides.src, scale: 1, ...overrides };
  }

  return { ...base, content: "⭐", fontSize: 56, ...overrides };
}

export function createImageLayer(overrides = {}) {
  return {
    id: createId("image"),
    type: "image",
    src: "",
    x: 50,
    y: 50,
    scale: 1,
    ...overrides,
  };
}

// Accepted upload types for both apparel artwork and custom stickers.
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Validate an uploaded file before reading it.
 * Returns { valid: true } or { valid: false, message } so callers
 * can surface a toast error.
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, message: "No file was selected." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, message: "Only PNG or JPG images are supported." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, message: "Image is too large. Please upload a file under 5MB." };
  }
  return { valid: true };
}
