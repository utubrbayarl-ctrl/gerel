import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Бүтэн дэлгэцийн hero — reference 1-ийн хэв маягаар */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[540px] items-center justify-center overflow-hidden md:min-h-[78vh]">
      <Image
        src="/images/heroes/home.svg"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/30 via-transparent to-surface-dark/40"
        aria-hidden="true"
      />
      <div className="relative px-6 py-24 text-center">
        <p className="type-caption-uppercase text-on-dark-soft">
          Гэрэлтүүлгийн дэлгүүр
        </p>
        <h1 className="type-display-xl mt-4 max-w-3xl text-balance !text-on-dark">
          Гэрэл орон зайг өөрчилнө
        </h1>
        <p className="type-body-md mx-auto mt-5 max-w-xl text-balance text-on-dark/85">
          Таазнаас шал хүртэл — орчин үеийн гэрэлтүүлгийн шилдэг загваруудыг
          нэг дороос. Танай гэрт зориулсан дулаан гэрлийг бид мэднэ.
        </p>
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
