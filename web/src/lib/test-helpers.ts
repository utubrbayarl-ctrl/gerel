import type { Product } from "./types";

/** Тестэд зориулсан барааны fixture — талбар дарж өгч болно */
export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: "p-test",
    slug: "test-product",
    name: "Тест бараа",
    categorySlug: "taazny-gerel",
    subcategorySlug: "duujin",
    roomSlugs: ["zochny"],
    price: 100000,
    stock: "in_stock",
    images: ["/images/products/test.svg"],
    description: "Тестийн тайлбар",
    specs: {},
    ...overrides,
  };
}
