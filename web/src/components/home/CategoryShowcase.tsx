import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

function CategoryCard({
  slug,
  name,
  image,
  labelFirst = false,
}: {
  slug: string;
  name: string;
  image: string;
  labelFirst?: boolean;
}) {
  const label = (
    <span className="flex items-center justify-between py-4">
      <span className="type-title-lg font-normal">{name}</span>
      <ArrowRightIcon className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" />
    </span>
  );
  return (
    <Link href={`/category/${slug}`} className="group block">
      {labelFirst && label}
      <span className="block overflow-hidden rounded-lg bg-surface-soft">
        <Image
          src={image}
          alt=""
          width={800}
          height={1000}
          unoptimized
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      {!labelFirst && label}
    </Link>
  );
}

/** Ангиллын editorial grid — reference 2-ын зөрүүлсэн байрлалтай */
export function CategoryShowcase() {
  const [first, second, third, fourth, fifth] = categories;
  return (
    <section id="angilal" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <h2 className="type-display-md">Ангиллаар үзэх</h2>
        <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-3">
          <CategoryCard slug={first.slug} name={first.name} image={first.cardImage} />
          <CategoryCard
            slug={second.slug}
            name={second.name}
            image={second.cardImage}
            labelFirst
          />
          <CategoryCard slug={third.slug} name={third.name} image={third.cardImage} />
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
          {[fourth, fifth].map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group relative block overflow-hidden rounded-lg"
            >
              <Image
                src={c.heroImage}
                alt=""
                width={1600}
                height={700}
                unoptimized
                className="aspect-[16/7] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-surface-dark/70 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                <span className="type-title-lg font-normal !text-on-dark">{c.name}</span>
                <ArrowRightIcon className="size-5 text-on-dark transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
