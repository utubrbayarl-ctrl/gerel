import { specEntries } from "@/lib/format";
import type { ProductSpecs } from "@/lib/types";

/** Техник үзүүлэлтийн хүснэгт — судалгааны "хэмжээг тодорхой заах" зөвлөмжөөр */
export function SpecTable({ specs }: { specs: ProductSpecs }) {
  const entries = specEntries(specs);
  if (entries.length === 0) return null;
  return (
    <dl className="divide-y divide-hairline-soft border-y border-hairline">
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="grid grid-cols-2 gap-4 py-3.5 sm:grid-cols-[240px_1fr]"
        >
          <dt className="type-body-sm text-muted">{label}</dt>
          <dd className="type-body-sm text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
