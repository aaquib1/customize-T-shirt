const testimonials = [
  {
    quote:
      "I designed a full hoodie drop for my small business in one afternoon. The preview made it easy to get the placement exactly right.",
    name: "Amara Singh",
    role: "Founder, Looseleaf Co.",
    initials: "AS",
  },
  {
    quote:
      "The save draft feature is a lifesaver — I tried a dozen layouts over a week without losing any of my earlier ideas.",
    name: "Diego Marin",
    role: "Graphic Designer",
    initials: "DM",
  },
  {
    quote:
      "Clean, fast, and the mockups actually look like the finished product. Ordering merch for our team was painless.",
    name: "Priya Nair",
    role: "Community Lead, Northwind",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Loved by designers, small brands, and teams
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col justify-between rounded-2xl border border-line bg-cream p-6 shadow-card"
            >
              <blockquote className="text-sm leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sm font-semibold text-cream">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
