import { Suspense } from "react";
import type { Metadata } from "next";
import { indoorCategories } from "@/data/categories";
import { productRepository } from "@/lib/repository/products";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FilteredCatalog } from "@/components/category/FilteredCatalog";
import { Container } from "@/components/ui/Container";

const TITLE = "Дотор гэрэлтүүлэг";
const DESCRIPTION =
  "Таазны, хананы, чийдэн болон лед гэрэл — дотор орон зайн бүх гэрэлтүүлэг нэг дор.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

/** Дотор гэрэлтүүлгийн бүх ангиллын барааг нэгтгэсэн каталог */
export default function IndoorPage() {
  const products = indoorCategories.flatMap((c) =>
    productRepository.getByCategory(c.slug),
  );
  const subcategories = indoorCategories.flatMap((c) => c.subcategories);

  return (
    <>
      <CategoryHero
        title={TITLE}
        description={DESCRIPTION}
        image="/images/heroes/home.svg"
        crumbs={[{ label: "Нүүр", href: "/" }, { label: TITLE }]}
      />
      <Container className="py-10 md:py-14">
        <Suspense>
          <FilteredCatalog products={products} subcategories={subcategories} />
        </Suspense>
      </Container>
    </>
  );
}
