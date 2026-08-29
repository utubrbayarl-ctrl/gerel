import { Suspense } from "react";
import type { Metadata } from "next";
import { productRepository } from "@/lib/repository/products";
import { CategoryHero } from "@/components/category/CategoryHero";
import { FilteredCatalog } from "@/components/category/FilteredCatalog";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Хямдралтай бараа",
  description:
    "ГЭРЭЛ дэлгүүрийн хямдралтай гэрэлтүүлгийн бүтээгдэхүүнүүд — 50% хүртэл хямдрал.",
};

export default function SalePage() {
  const products = productRepository.getOnSale();
  return (
    <>
      <CategoryHero
        title="Хямдралтай бараа"
        description="Сонгосон бүтээгдэхүүнүүд дээрх онцгой үнийн санал — нөөц дуустал."
        image="/images/heroes/sale.svg"
        crumbs={[{ label: "Нүүр", href: "/" }, { label: "Хямдрал" }]}
      />
      <Container className="py-10 md:py-14">
        <Suspense>
          <FilteredCatalog products={products} subcategories={[]} />
        </Suspense>
      </Container>
    </>
  );
}
