import { formatPrice } from "@/lib/format";

/** Үнэ. onDark — бараан showroom дэвсгэрт хэрэглэхэд өнгө сольдог. */
export function PriceBlock({
  price,
  size = "md",
  onDark = false,
}: {
  price: number;
  size?: "md" | "lg";
  onDark?: boolean;
}) {
  return (
    <span
      className={`${size === "lg" ? "type-display-sm" : "type-title-lg"} ${
        onDark ? "!text-on-dark" : "text-ink"
      }`}
    >
      {formatPrice(price)}
    </span>
  );
}
