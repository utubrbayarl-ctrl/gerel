import { productRepository } from "@/lib/repository/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";

/** Онцлох бүтээгдэхүүний эгнээ — reference 3-ын карт хэв маягаар */
export function FeaturedProducts() {
  const featured = productRepository.getFeatured().slice(0, 8);
  return (
    <section className="bg-surface-soft py-16 md:py-24">
      <Container>
        <h2 className="type-display-md">Онцлох бүтээгдэхүүн</h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {featured.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
