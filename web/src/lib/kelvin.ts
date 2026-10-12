export const KELVIN_MIN = 2700;
export const KELVIN_MAX = 6500;
/** Дулаан/хүйтний шилжилтийн дундаж цэг */
const KELVIN_MID = 4000;

/** Дулаан төгсгөлийн шаргал давхарга */
const WARM = { r: 255, g: 167, b: 87, a: 0.42 } as const;
/** Дундын төвийг сахисан — бараг тунгалаг */
const NEUTRAL = { r: 255, g: 244, b: 229, a: 0.05 } as const;
/** Хүйтэн төгсгөлийн цэнхэвтэр давхарга */
const COOL = { r: 150, g: 196, b: 255, a: 0.34 } as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Kelvin утгыг зураг дээр давхарлах CSS өнгө болгоно.
 * Гэрлийн бодит өнгөний физикийг илэрхийлдэг тул энэ нь дизайн токен биш.
 */
export function kelvinOverlay(kelvin: number): string {
  const k = clamp(kelvin, KELVIN_MIN, KELVIN_MAX);
  const warmSide = k <= KELVIN_MID;
  const from = warmSide ? WARM : NEUTRAL;
  const to = warmSide ? NEUTRAL : COOL;
  const span = warmSide ? KELVIN_MID - KELVIN_MIN : KELVIN_MAX - KELVIN_MID;
  const t = (k - (warmSide ? KELVIN_MIN : KELVIN_MID)) / span;

  const r = Math.round(lerp(from.r, to.r, t));
  const g = Math.round(lerp(from.g, to.g, t));
  const b = Math.round(lerp(from.b, to.b, t));
  const a = Number(lerp(from.a, to.a, t).toFixed(3));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Хэрэглэгчид ойлгомжтой мужийн нэр */
export function kelvinLabel(kelvin: number): string {
  if (kelvin < 3200) return "Дулаан цагаан";
  if (kelvin <= 5000) return "Төвийг сахисан";
  return "Өдрийн гэрэл";
}

/** Тухайн мужид ямар орон зай тохирохыг зөвлөнө */
export function kelvinDescription(kelvin: number): string {
  if (kelvin < 3200) {
    return "Лааны гэрэл шиг зөөлөн, тухтай уур амьсгал. Зочны болон унтлагын өрөөнд хамгийн тохиромжтой.";
  }
  if (kelvin <= 5000) {
    return "Байгалийн өдрийн гэрэлд ойр, тод боловч хатуу биш. Гал тогоо, угаалгын өрөөнд зохино.";
  }
  return "Сэргэг, төвлөрөлд тустай хүйтэвтэр гэрэл. Ажлын өрөө, нарийн ажил хийдэг орчинд.";
}
