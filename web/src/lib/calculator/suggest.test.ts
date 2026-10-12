import { describe, expect, it } from "vitest";
import { suggestFixtures, toCandidates } from "./suggest";
import { makeProduct } from "@/lib/test-helpers";

describe("toCandidates", () => {
  it("люментэй барааг нимгэн объект болгоно", () => {
    const candidates = toCandidates([
      makeProduct({
        slug: "a",
        name: "А гэрэл",
        price: 250000,
        images: ["/a-1.svg", "/a-2.svg"],
        roomSlugs: ["zochny"],
        specs: { lumen: 900 },
      }),
    ]);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toEqual({
      slug: "a",
      name: "А гэрэл",
      price: 250000,
      image: "/a-1.svg",
      lumen: 900,
      roomSlugs: ["zochny"],
    });
  });

  it("люмен заагаагүй барааг хасна", () => {
    const candidates = toCandidates([
      makeProduct({ slug: "a", specs: { lumen: 900 } }),
      makeProduct({ slug: "b", specs: {} }),
    ]);
    expect(candidates.map((c) => c.slug)).toEqual(["a"]);
  });

  it("зураг байхгүй барааг хасна", () => {
    const candidates = toCandidates([
      makeProduct({ slug: "a", images: ["/a.svg"], specs: { lumen: 900 } }),
      makeProduct({ slug: "b", images: [], specs: { lumen: 900 } }),
    ]);
    expect(candidates.map((c) => c.slug)).toEqual(["a"]);
  });
});

describe("suggestFixtures", () => {
  const candidates = toCandidates([
    makeProduct({
      slug: "ойр",
      roomSlugs: ["zochny"],
      specs: { lumen: 780 },
    }),
    makeProduct({
      slug: "хол",
      roomSlugs: ["zochny"],
      specs: { lumen: 2500 },
    }),
    makeProduct({
      slug: "өөр-өрөө",
      roomSlugs: ["gal-togoo"],
      specs: { lumen: 800 },
    }),
  ]);

  it("зөвхөн тухайн өрөөнд тохирох барааг буцаана", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 10);
    expect(result.map((c) => c.slug)).not.toContain("өөр-өрөө");
  });

  it("шаардлагатай люментэй хамгийн ойрыг нь түрүүлж эрэмбэлнэ", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 10);
    expect(result[0].slug).toBe("ойр");
  });

  it("limit-ээс илүү буцаахгүй", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 1);
    expect(result).toHaveLength(1);
  });

  it("тохирох бараа байхгүй бол хоосон массив", () => {
    const result = suggestFixtures(candidates, "ugaalgyn", 800, 10);
    expect(result).toEqual([]);
  });

  it("эх массивыг өөрчлөхгүй", () => {
    const before = candidates.map((c) => c.slug);
    suggestFixtures(candidates, "zochny", 800, 10);
    expect(candidates.map((c) => c.slug)).toEqual(before);
  });
});
