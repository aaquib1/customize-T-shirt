export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-sage text-cream">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4.5 9 3l3 2 3-2 5 1.5-1.5 4.5-2-.7V21h-9V8.3l-2 .7L4 4.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        Forma
      </span>
    </span>
  );
}
