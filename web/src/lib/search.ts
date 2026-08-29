import type { Product } from "./types";

/**
 * Нэр ба тайлбараас том/жижиг үсэг ялгалгүй хайна.
 * Олон үгтэй бол бүх үг таарсан барааг буцаана.
 */
export function searchProducts(
  products: readonly Product[],
  query: string,
): readonly Product[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  return products.filter((p) => {
    const haystack = `${p.name} ${p.description}`.toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}
