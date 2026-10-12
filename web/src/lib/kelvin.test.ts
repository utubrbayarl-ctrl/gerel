import { describe, expect, it } from "vitest";
import {
  KELVIN_MAX,
  KELVIN_MIN,
  kelvinDescription,
  kelvinLabel,
  kelvinOverlay,
} from "./kelvin";

describe("kelvinLabel", () => {
  it("дулаан мужид «Дулаан цагаан»", () => {
    expect(kelvinLabel(2700)).toBe("Дулаан цагаан");
    expect(kelvinLabel(3100)).toBe("Дулаан цагаан");
  });

  it("дунд мужид «Төвийг сахисан»", () => {
    expect(kelvinLabel(3200)).toBe("Төвийг сахисан");
    expect(kelvinLabel(4000)).toBe("Төвийг сахисан");
    expect(kelvinLabel(5000)).toBe("Төвийг сахисан");
  });

  it("хүйтэн мужид «Өдрийн гэрэл»", () => {
    expect(kelvinLabel(5100)).toBe("Өдрийн гэрэл");
    expect(kelvinLabel(6500)).toBe("Өдрийн гэрэл");
  });
});

describe("kelvinOverlay", () => {
  it("rgba мөр буцаана", () => {
    expect(kelvinOverlay(2700)).toMatch(/^rgba\(\d+, \d+, \d+, [\d.]+\)$/);
  });

  it("дулаан төгсгөлд улаан нь цэнхрээс их", () => {
    const [r, , b] = readRgb(kelvinOverlay(KELVIN_MIN));
    expect(r).toBeGreaterThan(b);
  });

  it("хүйтэн төгсгөлд цэнхэр нь улаанаас их", () => {
    const [r, , b] = readRgb(kelvinOverlay(KELVIN_MAX));
    expect(b).toBeGreaterThan(r);
  });

  it("дунд цэг хамгийн тунгалаг байна", () => {
    expect(alpha(kelvinOverlay(4000))).toBeLessThan(alpha(kelvinOverlay(KELVIN_MIN)));
    expect(alpha(kelvinOverlay(4000))).toBeLessThan(alpha(kelvinOverlay(KELVIN_MAX)));
  });

  it("хязгаараас гадуур утгыг хязгаарт наана", () => {
    expect(kelvinOverlay(1000)).toBe(kelvinOverlay(KELVIN_MIN));
    expect(kelvinOverlay(99000)).toBe(kelvinOverlay(KELVIN_MAX));
  });
});

describe("kelvinDescription", () => {
  it("муж бүрт хоосон биш тайлбар өгнө", () => {
    for (const k of [2700, 4000, 6500]) {
      expect(kelvinDescription(k).length).toBeGreaterThan(20);
    }
  });
});

function readRgb(rgba: string): readonly [number, number, number] {
  const m = rgba.match(/rgba\((\d+), (\d+), (\d+)/);
  if (!m) throw new Error(`rgba биш: ${rgba}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function alpha(rgba: string): number {
  const m = rgba.match(/, ([\d.]+)\)$/);
  if (!m) throw new Error(`alpha олдсонгүй: ${rgba}`);
  return Number(m[1]);
}
