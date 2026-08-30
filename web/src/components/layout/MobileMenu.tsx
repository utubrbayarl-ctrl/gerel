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
              {open === item.key && item.panel.groups && (
                <ul className="pb-4">
                  {item.panel.groups.map((group) => (
                    <li key={group.href} className="pb-2">
                      <Link
                        href={group.href}
                        onClick={onNavigate}
                        className="type-body-md block py-2 pl-4 font-medium text-ink"
                      >
                        {group.title}
                      </Link>
                      <ul>
                        {group.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={onNavigate}
                              className="type-body-sm block py-1.5 pl-8 text-body"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              {open === item.key && item.panel.items && (
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
                </ul>
              )}
            </li>
          ) : item.href ? (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="type-title-sm block py-4"
              >
                {item.label}
              </Link>
            </li>
          ) : null,
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
