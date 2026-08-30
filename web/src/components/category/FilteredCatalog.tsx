"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { filterProducts, sortProducts } from "@/lib/filter";
import type { BulbBase, Product, ProductFilter, SortOrder } from "@/lib/types";
import type { Subcategory } from "@/lib/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ChevronDownIcon } from "@/components/ui/icons";
import { KELVIN_BUCKETS, PRICE_BUCKETS, SORT_OPTIONS } from "./filter-config";

interface FilterState {
  readonly sub: string | null;
  readonly kelvinKey: string | null;
  readonly priceKey: string | null;
  readonly bases: readonly BulbBase[];
  readonly ips: readonly string[];
  readonly dimmable: boolean;
  readonly inStock: boolean;
  readonly onSale: boolean;
}

const EMPTY: FilterState = {
  sub: null,
  kelvinKey: null,
  priceKey: null,
  bases: [],
  ips: [],
  dimmable: false,
  inStock: false,
  onSale: false,
};

function toProductFilter(s: FilterState): ProductFilter {
  return {
    subcategorySlugs: s.sub ? [s.sub] : undefined,
    kelvinRange: KELVIN_BUCKETS.find((b) => b.key === s.kelvinKey)?.range,
    priceRange: PRICE_BUCKETS.find((b) => b.key === s.priceKey)?.range,
    bases: s.bases.length > 0 ? s.bases : undefined,
    ipRatings: s.ips.length > 0 ? s.ips : undefined,
    dimmableOnly: s.dimmable || undefined,
    inStockOnly: s.inStock || undefined,
    onSaleOnly: s.onSale || undefined,
  };
}

function activeCount(s: FilterState): number {
  return (
    Number(s.kelvinKey !== null) +
    Number(s.priceKey !== null) +
    s.bases.length +
    s.ips.length +
    Number(s.dimmable) +
    Number(s.inStock) +
    Number(s.onSale)
  );
}

const toggle = <T,>(list: readonly T[], value: T): readonly T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

/** Pill хэлбэрийн сонголт */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`type-body-sm rounded-full border px-4 py-2 transition-colors ${
        active
          ? "border-ink bg-ink text-on-dark"
          : "border-hairline bg-canvas text-body hover:border-muted"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="type-caption-uppercase text-muted">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

/**
 * Ангиллын шүүлттэй каталог: дэд ангиллын chips, задардаг шүүлтүүрийн
 * самбар (Kelvin, үнэ, суурь, IP, dimmable, нөөц, хямдрал), эрэмбэлэлт.
 */
export function FilteredCatalog({
  products,
  subcategories,
}: {
  products: readonly Product[];
  subcategories: readonly Subcategory[];
}) {
  const searchParams = useSearchParams();
  const initialSub = searchParams.get("sub");
  const validSub = subcategories.some((s) => s.slug === initialSub)
    ? initialSub
    : null;
  const [state, setState] = useState<FilterState>({ ...EMPTY, sub: validSub });

  // Mega menu-гээс ижил ангиллын өөр дэд ангилал руу шилжихэд
  // компонент remount хийгдэхгүй тул URL-ийн ?sub= өөрчлөлтийг дагана
  useEffect(() => {
    setState((prev) => (prev.sub === validSub ? prev : { ...prev, sub: validSub }));
  }, [validSub]);
  const [sort, setSort] = useState<SortOrder>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const bases = useMemo(
    () =>
      [...new Set(products.map((p) => p.specs.base).filter((b): b is BulbBase => !!b))],
    [products],
  );
  const ips = useMemo(
    () =>
      [...new Set(products.map((p) => p.specs.ip).filter((v): v is string => !!v))].sort(),
    [products],
  );
  const hasKelvin = useMemo(
    () => products.some((p) => p.specs.kelvin !== undefined),
    [products],
  );

  const visible = useMemo(
    () => sortProducts(filterProducts(products, toProductFilter(state)), sort),
    [products, state, sort],
  );

  const count = activeCount(state);

  return (
    <div>
      {/* Дэд ангиллын chips */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Pill
            active={state.sub === null}
            onClick={() => setState({ ...state, sub: null })}
          >
            Бүгд
          </Pill>
          {subcategories.map((s) => (
            <Pill
              key={s.slug}
              active={state.sub === s.slug}
              onClick={() =>
                setState({ ...state, sub: state.sub === s.slug ? null : s.slug })
              }
            >
              {s.name}
            </Pill>
          ))}
        </div>
      )}

      {/* Шүүлтүүр + эрэмбэлэлтийн мөр */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-hairline py-3.5">
        <button
          type="button"
          onClick={() => setPanelOpen(!panelOpen)}
          aria-expanded={panelOpen}
          className="type-nav-link inline-flex items-center gap-2"
        >
          Шүүлтүүр
          {count > 0 && (
            <span className="type-caption inline-flex size-5 items-center justify-center rounded-full bg-ink text-on-dark">
              {count}
            </span>
          )}
          <ChevronDownIcon
            className={`size-4 transition-transform ${panelOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex items-center gap-4">
          <p className="type-body-sm text-muted">{visible.length} бүтээгдэхүүн</p>
          <label className="type-body-sm inline-flex items-center gap-2">
            <span className="sr-only">Эрэмбэлэх</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOrder)}
              className="type-body-sm rounded-md border border-hairline bg-canvas px-3 py-2"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Задардаг шүүлтүүрийн самбар */}
      {panelOpen && (
        <div className="grid gap-8 border-b border-hairline py-8 md:grid-cols-2 lg:grid-cols-3">
          {hasKelvin && (
            <FilterGroup title="Өнгөний температур">
              {KELVIN_BUCKETS.map((b) => (
                <Pill
                  key={b.key}
                  active={state.kelvinKey === b.key}
                  onClick={() =>
                    setState({
                      ...state,
                      kelvinKey: state.kelvinKey === b.key ? null : b.key,
                    })
                  }
                >
                  {b.label}
                </Pill>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Үнэ">
            {PRICE_BUCKETS.map((b) => (
              <Pill
                key={b.key}
                active={state.priceKey === b.key}
                onClick={() =>
                  setState({
                    ...state,
                    priceKey: state.priceKey === b.key ? null : b.key,
                  })
                }
              >
                {b.label}
              </Pill>
            ))}
          </FilterGroup>

          {bases.length > 0 && (
            <FilterGroup title="Чийдэнгийн суурь">
              {bases.map((b) => (
                <Pill
                  key={b}
                  active={state.bases.includes(b)}
                  onClick={() => setState({ ...state, bases: toggle(state.bases, b) })}
                >
                  {b}
                </Pill>
              ))}
            </FilterGroup>
          )}

          {ips.length > 1 && (
            <FilterGroup title="Хамгаалалтын зэрэглэл">
              {ips.map((ip) => (
                <Pill
                  key={ip}
                  active={state.ips.includes(ip)}
                  onClick={() => setState({ ...state, ips: toggle(state.ips, ip) })}
                >
                  {ip}
                </Pill>
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Нэмэлт">
            <Pill
              active={state.dimmable}
              onClick={() => setState({ ...state, dimmable: !state.dimmable })}
            >
              Бүдэгшүүлэх боломжтой
            </Pill>
            <Pill
              active={state.inStock}
              onClick={() => setState({ ...state, inStock: !state.inStock })}
            >
              Бэлэн байгаа
            </Pill>
            <Pill
              active={state.onSale}
              onClick={() => setState({ ...state, onSale: !state.onSale })}
            >
              Хямдралтай
            </Pill>
          </FilterGroup>

          {count > 0 && (
            <div className="self-end">
              <button
                type="button"
                onClick={() => setState({ ...EMPTY, sub: state.sub })}
                className="type-nav-link text-primary transition-colors hover:text-primary-active"
              >
                Шүүлтүүр цэвэрлэх ✕
              </button>
            </div>
          )}
        </div>
      )}

      <div className="py-10">
        <ProductGrid products={visible} />
      </div>
    </div>
  );
}
