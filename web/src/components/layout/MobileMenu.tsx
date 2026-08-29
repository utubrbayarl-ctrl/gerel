"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/navigation";
import { ChevronDownIcon } from "@/components/ui/icons";

/** Гар утасны accordion цэс */
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav aria-label="Гар утасны цэс" className="border-b border-hairline bg-canvas lg:hidden">
      <ul className="divide-y divide-hairline-soft px-5 pb-6">
        {navItems.map((item) =>
          item.panel ? (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => setOpen(open === item.key ? null : item.key)}
                aria-expanded={open === item.key}
                className="type-title-sm flex w-full items-center justify-between py-4"
              >
                {item.label}
                <ChevronDownIcon
                  className={`size-4 text-muted transition-transform ${
                    open === item.key ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === item.key && (
                <ul className="pb-4">
                  {item.panel.items.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={onNavigate}
                        className="type-body-md block py-2 pl-4 text-body"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={item.panel.allHref}
                      onClick={onNavigate}
                      className="type-nav-link block py-2 pl-4 text-primary"
                    >
                      {item.panel.allLabel} →
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`type-title-sm block py-4 ${item.accent ? "text-error" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
        <li>
          <Link
            href="/about"
            onClick={onNavigate}
            className="type-title-sm block py-4"
          >
            Бидний тухай
          </Link>
        </li>
      </ul>
    </nav>
  );
}
