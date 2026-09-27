import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-deep",
  secondary: "border border-navy/25 bg-white text-navy hover:border-navy hover:bg-navy-50",
  ghost: "text-navy hover:bg-navy-50",
  danger: "border border-danger/30 bg-white text-danger hover:bg-danger/5",
  /** Para uso sobre fundos navy */
  gold: "bg-gold text-navy-deep hover:bg-gold-light",
  inverse: "border border-white/35 text-white hover:border-white hover:bg-white/10",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
} as const;

type StyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

type ButtonAsButton = StyleProps & ComponentProps<"button"> & { href?: never };
type ButtonAsLink = StyleProps & ComponentProps<typeof Link> & { href: string };

export function buttonClasses({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition-colors",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  if (typeof props.href === "string") {
    const { variant, size, className, ...linkProps } = props as ButtonAsLink;
    return <Link {...linkProps} className={buttonClasses({ variant, size, className })} />;
  }

  const { variant, size, className, type = "button", ...buttonProps } = props as ButtonAsButton;
  return <button type={type} {...buttonProps} className={buttonClasses({ variant, size, className })} />;
}
