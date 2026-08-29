import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { rooms } from "@/data/rooms";
import { productRepository } from "@/lib/repository/products";
import { CategoryHero } from "@/components/category/CategoryHero";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return {};
  return { title: `${room.name} — гэрэлтүүлэг`, description: room.description };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const products = productRepository.getByRoom(room.slug);

  return (
    <>
      <CategoryHero
        title={room.name}
        description={room.description}
        image={room.image}
        crumbs={[
          { label: "Нүүр", href: "/" },
          { label: "Өрөөгөөр", href: "/rooms" },
          { label: room.name },
        ]}
      />
      <Container className="py-10 md:py-14">
        <p className="type-body-sm border-b border-hairline pb-4 text-muted">
          {products.length} бүтээгдэхүүн
        </p>
        <div className="py-10">
          <ProductGrid products={products} />
        </div>
      </Container>
    </>
  );
}
