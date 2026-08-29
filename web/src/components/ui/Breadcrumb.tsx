import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  readonly label: string;
  readonly href?: string;
}

/** Breadcrumb — reference 1-ийн "Home · Lighting · Ceiling Lights" хэв маяг */
export function Breadcrumb({
  items,
  onDark = false,
}: {
  items: readonly Crumb[];
  onDark?: boolean;
}) {
  const base = onDark ? "text-on-dark/80" : "text-muted";
  const active = onDark ? "text-on-dark" : "text-ink";
  return (
    <nav aria-label="Байршил">
      <ol className="type-body-sm flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && (
                <li aria-hidden="true" className={base}>
                  ·
                </li>
              )}
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={`${base} transition-colors hover:underline hover:underline-offset-4`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={active}>
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
