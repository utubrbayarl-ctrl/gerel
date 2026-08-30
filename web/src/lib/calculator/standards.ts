/**
 * Гэрэлтүүлгийн норм — EN 12464-1 болон орон сууцны практикт тулгуурласан
 * люкс утгууд. Өрөөний slug нь `src/data/rooms.ts`-ийнхтэй тохирно.
 */
export interface RoomStandard {
  readonly slug: string;
  /** Шаардлагатай гэрэлтэлт, люкс (лм/м²) */
  readonly luxTarget: number;
  /** Тухайн орон зайд тохирох өнгөний температур */
  readonly recommendedKelvin: number;
}

export const ROOM_STANDARDS: readonly RoomStandard[] = [
  { slug: "zochny", luxTarget: 150, recommendedKelvin: 2700 },
  { slug: "untlagyn", luxTarget: 100, recommendedKelvin: 2700 },
  { slug: "gal-togoo", luxTarget: 300, recommendedKelvin: 4000 },
  { slug: "azhlyn-uruu", luxTarget: 400, recommendedKelvin: 4000 },
  { slug: "ugaalgyn", luxTarget: 200, recommendedKelvin: 4000 },
  { slug: "khuukhdiin", luxTarget: 200, recommendedKelvin: 3000 },
];

/** Нэг ердийн LED чийдэнгийн ойролцоо гэрлийн урсгал */
export const AVERAGE_FIXTURE_LUMEN = 800;

/**
 * Тааз өндөр байх тусам гэрэл тархаж, ажлын гадаргууд хүрэх хэмжээ буурна.
 * 2.5м-ийг суурь болгож коэффициентээр нөхнө.
 */
export function ceilingFactor(heightM: number): number {
  if (heightM <= 2.5) return 1;
  if (heightM <= 3) return 1.2;
  if (heightM <= 3.5) return 1.4;
  return 1.6;
}
