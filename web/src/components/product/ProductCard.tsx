import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { NewBadge, StockStatus } from "@/components/ui/Badge";
import { PriceBlock } from "@/components/ui/PriceBlock";

/**
 * Барааны карт — reference 3-ын хэв маягаар:
 * зураг → badge → үнэ → нэр → нөөцийн төлөв.
 * Hover үед бүрий орчны хоёр дахь зураг руу шилжинэ.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <span className="relative block overflow-hidden rounded-lg bg-surface-soft">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={800}
          unoptimized
          className="aspect-square w-full object-cover"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            width={800}
            height={800}
            unoptimized
            aria-hidden="true"
            className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </span>

      <span className="mt-4 flex min-h-7 items-center gap-2">
        {product.isNew && <NewBadge />}
      </span>

      <span className="mt-1.5 block">
        <PriceBlock price={product.price} />
      </span>

      <span className="type-body-md mt-1.5 line-clamp-2 block text-body transition-colors group-hover:text-ink">
        {product.name}
      </span>

      <span className="mt-2 block">
        <StockStatus product={product} />
      </span>
    </Link>
  );
}
