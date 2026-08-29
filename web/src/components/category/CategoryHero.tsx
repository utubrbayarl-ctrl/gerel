import Image from "next/image";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";

/** Ангиллын бүтэн өргөний hero — reference 1-ийн хэв маягаар */
export function CategoryHero({
  title,
  description,
  image,
  crumbs,
}: {
  title: string;
  description: string;
  image: string;
  crumbs: readonly Crumb[];
}) {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden md:min-h-[460px]">
      <Image src={image} alt="" fill priority unoptimized className="object-cover" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/35 via-surface-dark/10 to-surface-dark/45"
        aria-hidden="true"
      />
      <div className="relative px-6 py-16 text-center">
        <Breadcrumb items={crumbs} onDark />
        <h1 className="type-display-lg mt-5 text-balance !text-on-dark">{title}</h1>
        <p className="type-body-md mx-auto mt-4 max-w-xl text-balance text-on-dark/85">
          {description}
        </p>
      </div>
    </section>
  );
}
