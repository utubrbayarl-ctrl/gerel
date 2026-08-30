import type { Product, ProductFilter, SortOrder } from "./types";

/** Бүх нөхцөлийг AND-аар шалгаж шүүнэ. Эх массивыг өөрчлөхгүй. */
export function filterProducts(
  products: readonly Product[],
  filter: ProductFilter,
): readonly Product[] {
  return products.filter((p) => matchesFilter(p, filter));
}

function matchesFilter(p: Product, f: ProductFilter): boolean {
  if (f.subcategorySlugs?.length && !f.subcategorySlugs.includes(p.subcategorySlug)) {
    return false;
  }
  if (f.kelvinRange) {
    const k = p.specs.kelvin;
    if (k === undefined || k < f.kelvinRange[0] || k > f.kelvinRange[1]) return false;
  }
  if (f.priceRange && (p.price < f.priceRange[0] || p.price > f.priceRange[1])) {
    return false;
  }
  if (f.bases?.length && (p.specs.base === undefined || !f.bases.includes(p.specs.base))) {
    return false;
  }
  if (f.dimmableOnly && p.specs.dimmable !== true) return false;
  if (f.ipRatings?.length && (p.specs.ip === undefined || !f.ipRatings.includes(p.specs.ip))) {
    return false;
  }
  if (f.inStockOnly && p.stock !== "in_stock") return false;
  return true;
}

/** Шинэ массив буцаана — эх массивыг өөрчлөхгүй */
export function sortProducts(
  products: readonly Product[],
  order: SortOrder,
): readonly Product[] {
  const copy = [...products];
  switch (order) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    case "featured":
      return copy.sort(
        (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
      );
  }
}
