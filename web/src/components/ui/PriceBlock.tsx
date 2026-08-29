import { formatPrice } from "@/lib/format";

/** Үнэ + дарсан хуучин үнэ — reference картын хэв маягаар */
export function PriceBlock({
  price,
  oldPrice,
  size = "md",
}: {
  price: number;
  oldPrice?: number;
  size?: "md" | "lg";
}) {
  const hasSale = oldPrice !== undefined && oldPrice > price;
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span
        className={`${size === "lg" ? "type-display-sm" : "type-title-lg"} ${
          hasSale ? "text-error" : "text-ink"
        }`}
      >
        {formatPrice(price)}
      </span>
      {hasSale && (
        <span className="type-body-sm text-muted line-through">
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
}
