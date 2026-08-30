import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { NewBadge, StockStatus } from "@/components/ui/Badge";
import { PriceBlock } from "@/components/ui/PriceBlock";

/**
 * Барааны карт: зураг → badge → үнэ → нэр → нөөцийн төлөв.
 * Hover үед бүрий орчны хоёр дахь зураг руу шилжиж, дулаан glow асна.
 * onDark — бараан showroom section дотор хэрэглэхэд текстийн өнгө сольдог.
 * onDark үед images[1] (бүрий/интерьер хувилбар) байвал үүнийг үндсэн
 * зураг болгож, images[0] (цайвар студи render)-ийг hover-ийн нөөц зураг
 * болгоно — эс тэгвээс бараан дэвсгэр дээр цайвар зурагнууд гэрэлтэхийн
 * оронд цайвар тэгш өнцөгт хэсгүүд болж харагдана.
 */
export function ProductCard({
  product,
  onDark = false,
}: {
  product: Product;
  onDark?: boolean;
}) {
  const useDuskAsPrimary = onDark && Boolean(product.images[1]);
  const primaryImage = useDuskAsPrimary ? product.images[1] : product.images[0];
  const secondaryImage = useDuskAsPrimary ? product.images[0] : product.images[1];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <span
        className={`glow-warm relative block overflow-hidden rounded-lg ${
          onDark ? "bg-surface-dark-elevated" : "bg-surface-soft"
        }`}
      >
        <Image
          src={primaryImage}
          alt={product.name}
          width={800}
          height={800}
          unoptimized
          className="aspect-square w-full object-cover"
        />
        {secondaryImage && (
          <Image
            src={secondaryImage}
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
        {product.isNew && <NewBadge onDark={onDark} />}
      </span>

      <span className="mt-1.5 block">
        <PriceBlock price={product.price} onDark={onDark} />
      </span>

      <span
        className={`type-body-md mt-1.5 line-clamp-2 block transition-colors ${
          onDark
            ? "text-on-dark-soft group-hover:text-on-dark"
            : "text-body group-hover:text-ink"
        }`}
      >
        {product.name}
      </span>

      <span className="mt-2 block">
        <StockStatus product={product} />
      </span>
    </Link>
  );
}
