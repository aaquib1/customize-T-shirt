const CURRENT_KEY = "forma-current-design";
const DRAFTS_KEY = "forma-drafts";
const CHECKOUT_KEY = "forma-checkout-design";

function readJSON(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Could not read "${key}" from localStorage:`, err);
    return fallback;
  }
}

function writeJSON(key, value) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Could not write "${key}" to localStorage:`, err);
    return false;
  }
}

// ---- Current in-progress design (auto-restored on /customize) ----------

export function saveCurrentDesign(design) {
  return writeJSON(CURRENT_KEY, design);
}

export function loadCurrentDesign() {
  return readJSON(CURRENT_KEY, null);
}

// ---- Saved drafts list (shown on /drafts) -------------------------------

export function getDrafts() {
  return readJSON(DRAFTS_KEY, []);
}

/**
 * Save the given design as a draft. If `id` matches an existing draft,
 * it is updated in place; otherwise a new draft is created.
 * Returns the saved draft entry.
 */
export function saveDraft(design, id = null) {
  const drafts = getDrafts();
  const now = new Date().toISOString();

  if (id) {
    const index = drafts.findIndex((d) => d.id === id);
    if (index !== -1) {
      const updated = { ...drafts[index], design, savedAt: now };
      drafts[index] = updated;
      writeJSON(DRAFTS_KEY, drafts);
      return updated;
    }
  }

  const entry = {
    id: `draft-${Date.now()}`,
    name: `${design.product} draft`,
    savedAt: now,
    design,
  };
  writeJSON(DRAFTS_KEY, [entry, ...drafts]);
  return entry;
}

export function getDraft(id) {
  return getDrafts().find((d) => d.id === id) || null;
}

export function deleteDraft(id) {
  const drafts = getDrafts().filter((d) => d.id !== id);
  writeJSON(DRAFTS_KEY, drafts);
}

// ---- Checkout handoff -----------------------------------------------------

export function saveCheckoutDesign(design) {
  return writeJSON(CHECKOUT_KEY, design);
}

export function loadCheckoutDesign() {
  return readJSON(CHECKOUT_KEY, null);
}

export function clearCheckoutDesign() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHECKOUT_KEY);
}
