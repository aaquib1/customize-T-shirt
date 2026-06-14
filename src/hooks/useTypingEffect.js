"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through an array of words with a typewriter effect.
 * Returns the current substring, whether the cursor should blink
 * solid (typing) or just blink, and the active word index —
 * useful for syncing other UI (like hero images) to the active word.
 */
export function useTypingEffect(
  words,
  { typingSpeed = 80, deletingSpeed = 45, pauseDuration = 1800 } = {}
) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const current = words[index % words.length];

    // Pause at full word before deleting
    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), pauseDuration);
      return () => clearTimeout(pause);
    }

    // Move to next word once fully deleted
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = deleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseDuration]);

  const text = words?.length ? words[index % words.length].substring(0, subIndex) : "";

  return { text, activeIndex: index % (words?.length || 1) };
}
