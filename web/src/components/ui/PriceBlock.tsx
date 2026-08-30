import { formatPrice } from "@/lib/format";

/** Үнэ — reference картын хэв маягаар */
export function PriceBlock({
  price,
  size = "md",
}: {
  price: number;
  size?: "md" | "lg";
}) {
  return (
    <span className={`${size === "lg" ? "type-display-sm" : "type-title-lg"} text-ink`}>
      {formatPrice(price)}
    </span>
  );
}
