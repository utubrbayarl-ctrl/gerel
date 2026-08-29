/** Шүүлтүүрийн тогтмол тохиргоо — цэвэр өгөгдөл, UI-гаас тусдаа */

export interface RangeBucket {
  readonly key: string;
  readonly label: string;
  readonly range: readonly [number, number];
}

export const KELVIN_BUCKETS: readonly RangeBucket[] = [
  { key: "warm", label: "Дулаан (≈2700K)", range: [1800, 3200] },
  { key: "neutral", label: "Төвийг сахисан (≈4000K)", range: [3300, 5000] },
  { key: "daylight", label: "Өдрийн (≈6500K)", range: [5100, 6500] },
];

export const PRICE_BUCKETS: readonly RangeBucket[] = [
  { key: "p1", label: "100,000₮ хүртэл", range: [0, 100000] },
  { key: "p2", label: "100,000–300,000₮", range: [100000, 300000] },
  { key: "p3", label: "300,000–1,000,000₮", range: [300000, 1000000] },
  { key: "p4", label: "1,000,000₮-с дээш", range: [1000000, Number.MAX_SAFE_INTEGER] },
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Онцлох" },
  { value: "newest", label: "Шинэ нь эхэндээ" },
  { value: "price_asc", label: "Үнэ: өсөхөөр" },
  { value: "price_desc", label: "Үнэ: буурахаар" },
  { value: "discount", label: "Хямдралын хувиар" },
] as const;
