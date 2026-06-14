"use client";

import { useEffect } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";

export default function TypingText({ words, onChangeIndex, className = "" }) {
  const { text, activeIndex } = useTypingEffect(words.map((w) => w.text));

  useEffect(() => {
    if (typeof onChangeIndex === "function") onChangeIndex(activeIndex);
  }, [activeIndex, onChangeIndex]);

  return (
    <span className={`text-sage-dark ${className}`}>
      {text}
      <span
        className="ml-1 inline-block w-[3px] animate-blink bg-sage-dark align-middle"
        style={{ height: "0.85em" }}
        aria-hidden="true"
      />
    </span>
  );
}
