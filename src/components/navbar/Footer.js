import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Studio",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Templates", href: "/#templates" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/#contact" },
      { label: "FAQ", href: "/#faq" },
      { label: "Shipping", href: "/#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A premium studio for designing custom t-shirts, hoodies, and
              apparel online — from first sketch to finished print.
            </p>
          </div>

          <div className="flex gap-12">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-semibold text-ink">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-sage-dark"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Forma Studio. All rights reserved.</p>
          <p>Designed for makers, brands, and big ideas.</p>
        </div>
      </div>
    </footer>
  );
}
