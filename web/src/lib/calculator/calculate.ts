import { AVERAGE_FIXTURE_LUMEN, ROOM_STANDARDS, ceilingFactor } from "./standards";

export const AREA_MIN = 1;
export const AREA_MAX = 500;
export const HEIGHT_MIN = 2;
export const HEIGHT_MAX = 6;

export interface CalculatorInput {
  readonly roomSlug: string;
  readonly areaM2: number;
  readonly ceilingHeightM: number;
}

export interface CalculatorResult {
  /** Нийт шаардлагатай гэрлийн урсгал, люмен */
  readonly totalLumen: number;
  readonly luxTarget: number;
  readonly ceilingFactor: number;
  readonly recommendedKelvin: number;
  /** Санал болгох гэрлийн тоо, дээш бүхэлчилсэн */
  readonly fixtureCount: number;
}

export type CalculatorOutcome =
  | { readonly ok: true; readonly result: CalculatorResult }
  | { readonly ok: false; readonly errors: readonly string[] };

function isValidNumber(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Өрөөний төрөл, талбай, таазны өндрөөс шаардлагатай гэрлийн урсгалыг тооцно.
 * Цэвэр функц — оролтыг өөрчлөхгүй, сүлжээ/сервер шаардахгүй.
 */
export function calculateLighting(input: CalculatorInput): CalculatorOutcome {
  const errors: string[] = [];

  const standard = ROOM_STANDARDS.find((s) => s.slug === input.roomSlug);
  if (!standard) {
    errors.push("Өрөөний төрлийг сонгоно уу.");
  }

  if (!isValidNumber(input.areaM2)) {
    errors.push("Талбайг тоогоор оруулна уу.");
  } else if (input.areaM2 < AREA_MIN || input.areaM2 > AREA_MAX) {
    errors.push(`Талбай ${AREA_MIN}-${AREA_MAX} м² хооронд байх ёстой.`);
  }

  if (!isValidNumber(input.ceilingHeightM)) {
    errors.push("Таазны өндрийг тоогоор оруулна уу.");
  } else if (
    input.ceilingHeightM < HEIGHT_MIN ||
    input.ceilingHeightM > HEIGHT_MAX
  ) {
    errors.push(`Таазны өндөр ${HEIGHT_MIN}-${HEIGHT_MAX} м хооронд байх ёстой.`);
  }

  if (!standard || errors.length > 0) {
    return { ok: false, errors };
  }

  const factor = ceilingFactor(input.ceilingHeightM);
  const totalLumen = Math.round(input.areaM2 * standard.luxTarget * factor);

  return {
    ok: true,
    result: {
      totalLumen,
      luxTarget: standard.luxTarget,
      ceilingFactor: factor,
      recommendedKelvin: standard.recommendedKelvin,
      fixtureCount: Math.ceil(totalLumen / AVERAGE_FIXTURE_LUMEN),
    },
  };
}
