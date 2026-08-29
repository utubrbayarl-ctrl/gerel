import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/** Барааны стандарт grid */
export function ProductGrid({ products }: { products: readonly Product[] }) {
  if (products.length === 0) {
    return (
      <p className="type-body-md py-16 text-center text-muted">
        Энэ нөхцөлд тохирох бүтээгдэхүүн олдсонгүй. Шүүлтүүрээ өөрчилж үзээрэй.
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
