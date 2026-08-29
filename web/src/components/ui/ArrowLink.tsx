import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

/** Сумтай текст холбоос — reference 2-ын категорийн линкийн хэв маяг */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/al type-nav-link inline-flex items-center gap-2 text-ink transition-colors hover:text-primary ${className}`}
    >
      {children}
      <ArrowRightIcon className="size-4 transition-transform group-hover/al:translate-x-1" />
    </Link>
  );
}
