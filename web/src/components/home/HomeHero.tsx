import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Бүтэн дэлгэцийн hero. Transparent header-ийн доогуур орж
 * зураг нь дээд ирмэг хүртэл харагдана. Ачаалахад гэрэл нэг удаа «асна».
 */
export function HomeHero() {
  return (
    <section className="hero-lightup relative -mt-[72px] flex min-h-[540px] items-center justify-center overflow-hidden md:min-h-[78vh] lg:-mt-20">
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
      <div
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_35%,rgba(232,165,90,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative px-6 py-24 text-center">
        <h1 className="type-display-xl max-w-3xl text-balance !text-on-dark [text-shadow:0_2px_28px_rgba(20,20,19,0.55)]">
          {brand.tagline}
        </h1>
        <Link
          href="#angilal"
          className="type-button mt-9 inline-flex items-center gap-2.5 rounded-md border border-on-dark/70 px-7 py-3.5 text-on-dark transition-colors hover:bg-on-dark/10"
        >
          {brand.heroCta}
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
