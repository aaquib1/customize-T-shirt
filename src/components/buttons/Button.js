import Link from "next/link";
import { ArrowRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-medium transition-all duration-200 whitespace-nowrap";

const variants = {
  primary: "bg-sage text-cream hover:bg-sage-dark shadow-card",
  secondary: "bg-transparent text-ink border border-sage/30 hover:border-sage hover:bg-sage-light hover:text-sage-dark",
  ghost: "bg-sage-light text-sage-dark hover:bg-sage hover:text-cream",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-7 py-4 text-base md:text-lg",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = false,
  className = "",
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
