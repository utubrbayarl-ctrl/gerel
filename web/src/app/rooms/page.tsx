import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { rooms } from "@/data/rooms";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Өрөөгөөр үзэх",
  description:
    "Зочны, унтлагын, гал тогоо, ажлын, угаалгын, хүүхдийн өрөөнд тохирох гэрэлтүүлгийг өрөөгөөр нь сонгоорой.",
};

export default function RoomsIndexPage() {
  return (
    <Container className="py-12 md:py-16">
      <h1 className="type-display-lg">Өрөөгөөр үзэх</h1>
      <p className="type-body-md mt-4 max-w-2xl text-muted">
        Өрөө бүр өөр гэрэл шаарддаг: амрах орон зайд дулаан бүдэг гэрэл, ажлын
        орчинд тод төвлөрсөн гэрэл. Өрөөгөө сонгоод тохирох шийдлээ олоорой.
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/15 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="flex items-center justify-between">
                  <span className="type-title-md !text-on-dark">{r.name}</span>
                  <ArrowRightIcon className="size-4 text-on-dark transition-transform group-hover:translate-x-1" />
                </span>
                <span className="type-body-sm mt-1.5 line-clamp-2 block text-on-dark/75">
                  {r.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
