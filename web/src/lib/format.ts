import type { ProductSpecs } from "./types";

/** Үнийг мянгатын таслалтай, төгрөгийн тэмдэгтэй форматлана: 1,299,000₮ */
export function formatPrice(amount: number): string {
  const grouped = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${grouped}₮`;
}

/** Хямдралын хувь (бүхэл тоо). Хуучин үнэ байхгүй/буруу бол 0. */
export function discountPercent(price: number, oldPrice?: number): number {
  if (oldPrice === undefined || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** Захиалгаар ирэх хугацааг монголоор: "Ирэх хугацаа: 4–5 долоо хоног" */
export function formatLeadTime(range: readonly [number, number]): string {
  const [min, max] = range;
  const text = min === max ? `${min}` : `${min}–${max}`;
  return `Ирэх хугацаа: ${text} долоо хоног`;
}

const CM_KEYS: ReadonlySet<string> = new Set([
  "heightCm",
  "diameterCm",
  "widthCm",
  "depthCm",
  "lengthCm",
  "cableLengthCm",
]);

/** Техник үзүүлэлтийн утгыг нэгжтэй нь монголоор форматлана */
export function formatSpecValue(
  key: keyof ProductSpecs,
  value: string | number | boolean,
): string {
  if (typeof value === "boolean") return value ? "Тийм" : "Үгүй";
  if (typeof value === "number") {
    if (CM_KEYS.has(key)) return `${value} см`;
    if (key === "kelvin") return `${value}K`;
    if (key === "lumen") return `${value} лм`;
    if (key === "watt") return `${value} Вт`;
    if (key === "bulbCount") return `${value} ш`;
    return String(value);
  }
  return value;
}

/** Хүснэгтэд харуулах дараалал ба монгол нэршил */
export const SPEC_LABELS: ReadonlyArray<
  readonly [keyof ProductSpecs, string]
> = [
  ["heightCm", "Өндөр"],
  ["diameterCm", "Диаметр"],
  ["widthCm", "Өргөн"],
  ["depthCm", "Гүн"],
  ["lengthCm", "Урт"],
  ["cableLengthCm", "Кабелийн урт"],
  ["kelvin", "Өнгөний температур"],
  ["lumen", "Гэрлийн урсгал"],
  ["watt", "Чадал"],
  ["cri", "Өнгө дамжуулалт (CRI)"],
  ["base", "Суурь"],
  ["bulbCount", "Чийдэнгийн тоо"],
  ["dimmable", "Бүдэгшүүлэх (dimmable)"],
  ["ip", "Хамгаалалтын зэрэглэл"],
  ["material", "Материал"],
  ["color", "Өнгө"],
];

/** Байгаа үзүүлэлтүүдийг [нэршил, форматласан утга] хосоор, тогтсон дарааллаар */
export function specEntries(
  specs: ProductSpecs,
): ReadonlyArray<readonly [string, string]> {
  return SPEC_LABELS.flatMap(([key, label]) => {
    const value = specs[key];
    if (value === undefined) return [];
    return [[label, formatSpecValue(key, value)] as const];
  });
}
