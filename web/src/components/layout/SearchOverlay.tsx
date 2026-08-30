"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { productRepository } from "@/lib/repository/products";
import { searchProducts } from "@/lib/search";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";

const MAX_RESULTS = 8;

/** Толгойноос нээгддэг хайлтын давхарга — шууд үр дүн харуулна */
export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Focus trap: Tab дарахад давхаргын дотор эргэлдэнэ
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const results = useMemo(
    () => searchProducts(productRepository.getAll(), query),
    [query],
  );

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-canvas"
      role="dialog"
      aria-modal="true"
      aria-label="Бүтээгдэхүүн хайх"
    >
      <Container className="py-6">
        <div className="flex items-center gap-4 border-b-2 border-ink pb-4">
          <SearchIcon className="size-6 shrink-0 text-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Бүтээгдэхүүн хайх…"
            className="type-title-lg w-full bg-transparent font-normal outline-none placeholder:text-muted-soft"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Хайлтыг хаах"
            className="shrink-0 rounded-md p-2 text-muted transition-colors hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        {query.trim() !== "" && (
          <div className="py-8">
            <p className="type-caption-uppercase text-muted">
              {results.length} илэрц
            </p>
            {results.length > 0 && (
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                {results.slice(0, MAX_RESULTS).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="group block"
                    >
                      <span className="block overflow-hidden rounded-lg bg-surface-soft">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          width={400}
                          height={400}
                          unoptimized
                          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </span>
                      <span className="type-body-sm mt-3 block text-body group-hover:text-ink">
                        {p.name}
                      </span>
                      <span className="type-title-sm mt-1 block">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {results.length === 0 && (
              <p className="type-body-md mt-6 text-muted">
                «{query}» гэсэн хайлтад тохирох бүтээгдэхүүн олдсонгүй. Өөр
                түлхүүр үгээр оролдоод үзээрэй.
              </p>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
