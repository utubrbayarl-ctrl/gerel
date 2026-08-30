"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { navItems } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { MegaPanel } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

/**
 * Толгой хэсэг: лого + төв цэс + хайлт (reference 1),
 * hover/focus дээр mega menu задарна (reference 4).
 * Нүүр хуудсан дээр hero зурагтай уусан transparent эхэлж,
 * гүйлгэх юмуу цэс нээхэд цайвар дэвсгэртэй болно.
 */
export function SiteHeader() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = usePathname() === "/";

  const closeAll = useCallback(() => {
    setOpenPanel(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeItem = navItems.find((i) => i.key === openPanel);
  const transparent =
    isHome && !scrolled && openPanel === null && !mobileOpen && !searchOpen;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-transparent text-on-dark"
          : "border-hairline bg-canvas text-ink"
      }`}
      onMouseLeave={() => setOpenPanel(null)}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
        {/* Гар утасны цэсний товч */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setOpenPanel(null);
          }}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Цэс хаах" : "Цэс нээх"}
          className="-ml-2 rounded-md p-2 lg:hidden"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Лого */}
        <Link
          href="/"
          onClick={closeAll}
          className="font-display text-[26px] tracking-[0.18em] text-current lg:text-[30px]"
        >
          TES SKY
        </Link>

        {/* Төв цэс — desktop */}
        <nav aria-label="Үндсэн цэс" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const linkClasses = `type-nav-link relative block px-4 py-3 transition-colors after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform ${
                transparent
                  ? "text-on-dark/85 hover:text-on-dark"
                  : "text-body hover:text-ink"
              } ${
                openPanel === item.key
                  ? "after:scale-x-100 " +
                    (transparent ? "text-on-dark" : "text-ink")
                  : ""
              }`;
              return (
                <li key={item.key}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-expanded={item.panel ? openPanel === item.key : undefined}
                      onClick={closeAll}
                      onMouseEnter={() =>
                        setOpenPanel(item.panel ? item.key : null)
                      }
                      onFocus={() => setOpenPanel(item.panel ? item.key : null)}
                      className={linkClasses}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-expanded={openPanel === item.key}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenPanel(openPanel === item.key ? null : item.key)
                      }
                      onMouseEnter={() => setOpenPanel(item.key)}
                      onFocus={() => setOpenPanel(item.key)}
                      className={linkClasses}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Хайлт */}
        <button
          type="button"
          onClick={() => {
            setSearchOpen(true);
            closeAll();
          }}
          className={`type-nav-link -mr-2 inline-flex items-center gap-2 rounded-md p-2 transition-colors ${
            transparent
              ? "text-on-dark/85 hover:text-on-dark"
              : "text-body hover:text-ink"
          }`}
        >
          <SearchIcon />
          <span className="hidden sm:inline">Хайх</span>
        </button>
      </Container>

      {/* Mega menu — desktop */}
      {activeItem?.panel && (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <MegaPanel item={activeItem} onNavigate={closeAll} />
        </div>
      )}

      {/* Гар утасны цэс */}
      {mobileOpen && <MobileMenu onNavigate={closeAll} />}

      {/* Хайлтын давхарга */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
