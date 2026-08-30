import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/data/categories";
import { productRepository } from "@/lib/repository/products";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { NewBadge, StockStatus } from "@/components/ui/Badge";
import { PriceBlock } from "@/components/ui/PriceBlock";
import { Container } from "@/components/ui/Container";
import { ContactCard } from "@/components/product/ContactCard";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productRepository.getAll().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = productRepository.getBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = productRepository.getBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);
  const subcategory = category?.subcategories.find(
    (s) => s.slug === product.subcategorySlug,
  );
  const related = productRepository.getRelated(product.slug, 4);

  return (
    <Container className="py-8 md:py-12">
      <div className="[&_ol]:justify-start">
        <Breadcrumb
          items={[
            { label: "Нүүр", href: "/" },
            ...(category
              ? [{ label: category.name, href: `/category/${category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <div className="flex items-center gap-2">
            {product.isNew && <NewBadge />}
            {subcategory && (
              <span className="type-caption text-muted">{subcategory.name}</span>
            )}
          </div>

          <h1 className="type-display-md mt-3 text-balance">{product.name}</h1>

          <div className="mt-5">
            <PriceBlock price={product.price} size="lg" />
          </div>

          <div className="mt-3">
            <StockStatus product={product} />
          </div>

          <p className="type-body-md mt-6 max-w-prose leading-relaxed text-body">
            {product.description}
          </p>

          <div className="mt-8">
            <ContactCard />
          </div>
        </div>
      </div>

      <section className="mt-16 max-w-3xl">
        <h2 className="type-display-sm">Техник үзүүлэлт</h2>
        <div className="mt-6">
          <SpecTable specs={product.specs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-hairline pt-12">
          <h2 className="type-display-sm">Төстэй бүтээгдэхүүн</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
