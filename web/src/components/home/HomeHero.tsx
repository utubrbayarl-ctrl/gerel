import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Бүтэн дэлгэцийн hero — reference 1-ийн хэв маягаар.
 * Transparent header-ийн доогуур орж зураг нь дээд ирмэг хүртэл харагдана.
 */
export function HomeHero() {
  return (
    <section className="relative -mt-[72px] flex min-h-[540px] items-center justify-center overflow-hidden md:min-h-[78vh] lg:-mt-20">
      <Image
        src="/images/heroes/home-photo.jpg"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/45 via-surface-dark/15 to-surface-dark/45"
        aria-hidden="true"
      />
      <div className="relative px-6 py-24 text-center">
        <h1 className="type-display-xl max-w-3xl text-balance !text-on-dark [text-shadow:0_2px_28px_rgba(20,20,19,0.55)]">
          Гэрэл орон зайг өөрчилнө
        </h1>
        <Link
          href="#angilal"
          className="type-button mt-9 inline-flex items-center gap-2.5 rounded-md border border-on-dark/70 px-7 py-3.5 text-on-dark transition-colors hover:bg-on-dark/10"
        >
          Цуглуулга үзэх
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
