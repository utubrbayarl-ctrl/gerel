import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { productRepository } from "@/lib/repository/products";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FilteredCatalog } from "@/components/category/FilteredCatalog";
import { Container } from "@/components/ui/Container";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = productRepository.getByCategory(category.slug);

  return (
    <>
      <CategoryHero
        title={category.name}
        description={category.description}
        image={category.heroImage}
        crumbs={[{ label: "Нүүр", href: "/" }, { label: category.name }]}
      />
      <Container className="py-10 md:py-14">
        <Suspense>
          <FilteredCatalog
            products={products}
            subcategories={category.subcategories}
          />
        </Suspense>
      </Container>
    </>
  );
}
