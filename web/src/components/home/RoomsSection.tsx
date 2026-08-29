import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Өрөөгөөр сонгох хэсэг — судалгааны "Shop by Room" зөвлөмжөөр */
export function RoomsSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="type-display-md">Өрөөгөөр сонгох</h2>
        <p className="type-body-md mt-3 max-w-2xl text-muted">
          Өрөө бүр өөр гэрэл шаарддаг. Таны орон зайд яг тохирох
          гэрэлтүүлгийг өрөөгөөр нь ангилж бэлдлээ.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {rooms.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/rooms/${r.slug}`}
                className="group relative block overflow-hidden rounded-lg"
              >
                <Image
                  src={r.image}
                  alt=""
                  width={800}
                  height={600}
                  unoptimized
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-surface-dark/75 via-surface-dark/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 md:p-5">
                  <span className="type-title-sm !text-on-dark md:type-title-md">
                    {r.name}
                  </span>
                  <ArrowRightIcon className="size-4 text-on-dark transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
