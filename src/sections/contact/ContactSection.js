"use client";

export default function ContactSection() {
  function handleSubmit(e) {
    e.preventDefault();
    // Frontend only: replace with a POST to your Node.js API route, e.g.
    // await fetch("/api/contact", { method: "POST", body: new FormData(e.target) })
    alert("Thanks! This form is ready to connect to a backend.");
  }

  return (
    <section id="contact" className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-sage-dark">
              Contact
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Questions about an order or a bulk request?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              Send us a note and our team will get back to you within one
              business day. For urgent order issues, include your order
              number if you have one.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-paper p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" placeholder="Jordan Lee" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us a bit about what you need..."
                className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-sage"
              />
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-sage px-6 py-3 font-display text-sm font-medium text-cream transition-colors hover:bg-sage-dark"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-sage"
      />
    </div>
  );
}
