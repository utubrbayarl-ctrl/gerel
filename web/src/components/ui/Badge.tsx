import { CalendarIcon, CheckCircleIcon } from "./icons";
import { formatLeadTime } from "@/lib/format";
import type { Product } from "@/lib/types";

/** Шинэ бараанд */
export function NewBadge() {
  return (
    <span className="type-caption inline-flex items-center rounded-full bg-ink px-3 py-1 text-on-dark">
      Шинэ
    </span>
  );
}

/** Нөөцийн төлөв — ногоон чагт / хугацаа / дууссан */
export function StockStatus({ product }: { product: Product }) {
  if (product.stock === "in_stock") {
    return (
      <span className="type-body-sm inline-flex items-center gap-1.5 text-success">
        <CheckCircleIcon />
        Бэлэн байгаа
      </span>
    );
  }
  if (product.stock === "preorder") {
    return (
      <span className="type-body-sm inline-flex items-center gap-1.5 text-warning">
        <CalendarIcon />
        {product.leadTimeWeeks ? formatLeadTime(product.leadTimeWeeks) : "Захиалгаар"}
      </span>
    );
  }
  return <span className="type-body-sm text-muted-soft">Түр дууссан</span>;
}
