import { describe, expect, it } from "vitest";
import { calculateLighting } from "./calculate";
import { ceilingFactor } from "./standards";

describe("ceilingFactor", () => {
  it("2.5м хүртэл суурь коэффициент 1", () => {
    expect(ceilingFactor(2.4)).toBe(1);
    expect(ceilingFactor(2.5)).toBe(1);
  });

  it("өндөр тааз тутамд коэффициент өснө", () => {
    expect(ceilingFactor(2.8)).toBe(1.2);
    expect(ceilingFactor(3.4)).toBe(1.4);
    expect(ceilingFactor(4)).toBe(1.6);
  });
});

describe("calculateLighting", () => {
  it("зочны өрөөний 20м², 2.5м таазанд 3000 люмен гаргана", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.luxTarget).toBe(150);
    expect(outcome.result.ceilingFactor).toBe(1);
    expect(outcome.result.totalLumen).toBe(3000);
    expect(outcome.result.recommendedKelvin).toBe(2700);
  });

  it("өндөр тааз люменийг нэмэгдүүлнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 3,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.totalLumen).toBe(3600);
  });

  it("гал тогоонд илүү өндөр норм, хүйтэвтэр Kelvin", () => {
    const outcome = calculateLighting({
      roomSlug: "gal-togoo",
      areaM2: 10,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.luxTarget).toBe(300);
    expect(outcome.result.totalLumen).toBe(3000);
    expect(outcome.result.recommendedKelvin).toBe(4000);
  });

  it("гэрлийн тоог дээш нь бүхэлчилнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    // 3000 / 800 = 3.75 → 4
    expect(outcome.result.fixtureCount).toBe(4);
  });

  it("үл мэдэгдэх өрөөг алдаа гэж үзнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "байхгүй-өрөө",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toHaveLength(1);
    expect(outcome.errors[0]).toContain("Өрөө");
  });

  it("хязгаараас гадуурх талбайг алдаа гэж үзнэ", () => {
    for (const areaM2 of [0, 0.5, 501, -3]) {
      const outcome = calculateLighting({
        roomSlug: "zochny",
        areaM2,
        ceilingHeightM: 2.5,
      });
      expect(outcome.ok).toBe(false);
    }
  });

  it("хязгаараас гадуурх таазны өндрийг алдаа гэж үзнэ", () => {
    for (const ceilingHeightM of [1.9, 6.1, 0]) {
      const outcome = calculateLighting({
        roomSlug: "zochny",
        areaM2: 20,
        ceilingHeightM,
      });
      expect(outcome.ok).toBe(false);
    }
  });

  it("тоо биш утгыг алдаа гэж үзнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: Number.NaN,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors[0]).toContain("Талбай");
  });

  it("хэд хэдэн алдааг зэрэг буцаана", () => {
    const outcome = calculateLighting({
      roomSlug: "байхгүй",
      areaM2: 0,
      ceilingHeightM: 99,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors.length).toBe(3);
  });
});
