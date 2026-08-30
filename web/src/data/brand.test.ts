import { describe, expect, it } from "vitest";
import { brand } from "./brand";

describe("brand", () => {
  it("албан tagline-тай", () => {
    expect(brand.tagline).toBe("Гэрэл орон зайг өөрчилнө");
  });

  it("About-д зориулсан 2-оос доошгүй догол мөртэй түүхтэй", () => {
    expect(brand.story.length).toBeGreaterThanOrEqual(2);
    for (const p of brand.story) {
      expect(p.length).toBeGreaterThan(80);
    }
  });

  it("яг 3 үнэт зүйлтэй", () => {
    expect(brand.values).toHaveLength(3);
  });

  it("барилгын компаниудад зориулсан яг 3 итгэлийн блоктой", () => {
    expect(brand.b2bTrust).toHaveLength(3);
  });

  it("бүх текст худалдагчийн аялгуугүй — анхаарлын тэмдэггүй", () => {
    const all = [
      brand.tagline,
      brand.heroCta,
      ...brand.story,
      ...brand.values.flatMap((v) => [v.title, v.text]),
      ...brand.b2bTrust.flatMap((v) => [v.title, v.text]),
    ].join(" ");
    expect(all).not.toContain("!");
  });
});
