import { productRepository } from "@/lib/repository/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";

/** Онцлох бүтээгдэхүүн — бараан showroom дэвсгэр дээр гэрэлтэж харагдана */
export function FeaturedProducts() {
  const featured = productRepository.getFeatured().slice(0, 8);
  return (
    <section className="ray-sweep relative overflow-hidden bg-surface-dark py-16 text-on-dark md:py-24">
      <Container className="relative">
        <Reveal>
          <p className="type-caption-uppercase text-on-dark-soft">Сонголт</p>
          <h2 className="type-display-md mt-3 !text-on-dark">
            Онцлох бүтээгдэхүүн
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} onDark />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
