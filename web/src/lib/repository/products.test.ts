import { describe, expect, it } from "vitest";
import { productRepository } from "./products";
import { categories } from "@/data/categories";
import { rooms } from "@/data/rooms";

describe("productRepository", () => {
  it("дор хаяж 36 бараатай", () => {
    expect(productRepository.getAll().length).toBeGreaterThanOrEqual(36);
  });

  it("slug-аар барааг олно", () => {
    const first = productRepository.getAll()[0];
    expect(productRepository.getBySlug(first.slug)?.id).toBe(first.id);
  });

  it("буруу slug-д undefined буцаана", () => {
    expect(productRepository.getBySlug("baihgui-baraa")).toBeUndefined();
  });

  it("ангиллаар шүүж буцаана", () => {
    const r = productRepository.getByCategory("taazny-gerel");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.categorySlug === "taazny-gerel")).toBe(true);
  });

  it("өрөөгөөр шүүж буцаана", () => {
    const r = productRepository.getByRoom("zochny");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.roomSlugs.includes("zochny"))).toBe(true);
  });

  it("хямдралтай нь зөвхөн oldPrice-тэй бараа", () => {
    const r = productRepository.getOnSale();
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => (p.oldPrice ?? 0) > p.price)).toBe(true);
  });

  it("онцлох бараа байна", () => {
    expect(productRepository.getFeatured().length).toBeGreaterThanOrEqual(4);
  });

  it("төстэй бараа өөрийг нь агуулахгүй, ижил ангиллаас 4 хүртэл буцаана", () => {
    const p = productRepository.getAll()[0];
    const related = productRepository.getRelated(p.slug, 4);
    expect(related.length).toBeGreaterThan(0);
    expect(related.length).toBeLessThanOrEqual(4);
    expect(related.some((r) => r.id === p.id)).toBe(false);
    expect(related.every((r) => r.categorySlug === p.categorySlug)).toBe(true);
  });
});

describe("өгөгдлийн бүрэн бүтэн байдал", () => {
  const all = productRepository.getAll();
  const categorySlugs = new Set(categories.map((c) => c.slug));
  const roomSlugs = new Set(rooms.map((r) => r.slug));

  it("slug давхардахгүй", () => {
    const slugs = all.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("бүх бараа хүчинтэй ангилалтай", () => {
    for (const p of all) {
      expect(categorySlugs.has(p.categorySlug), `${p.slug}: ${p.categorySlug}`).toBe(true);
    }
  });

  it("бүх бараа тухайн ангиллынхаа хүчинтэй дэд ангилалд байна", () => {
    for (const p of all) {
      const cat = categories.find((c) => c.slug === p.categorySlug)!;
      const subSlugs = cat.subcategories.map((s) => s.slug);
      expect(subSlugs, `${p.slug}: ${p.subcategorySlug}`).toContain(p.subcategorySlug);
    }
  });

  it("бүх өрөөний холбоос хүчинтэй", () => {
    for (const p of all) {
      for (const r of p.roomSlugs) {
        expect(roomSlugs.has(r), `${p.slug}: ${r}`).toBe(true);
      }
    }
  });

  it("үнэ эерэг, oldPrice нь price-ээс их", () => {
    for (const p of all) {
      expect(p.price, p.slug).toBeGreaterThan(0);
      if (p.oldPrice !== undefined) {
        expect(p.oldPrice, p.slug).toBeGreaterThan(p.price);
      }
    }
  });

  it("бүх бараа дор хаяж 2 зурагтай", () => {
    for (const p of all) {
      expect(p.images.length, p.slug).toBeGreaterThanOrEqual(2);
    }
  });

  it("preorder бараа хүлээх хугацаатай", () => {
    for (const p of all) {
      if (p.stock === "preorder") {
        expect(p.leadTimeWeeks, p.slug).toBeDefined();
      }
    }
  });

  it("Kelvin утга бодит мужид (1800–6500)", () => {
    for (const p of all) {
      if (p.specs.kelvin !== undefined) {
        expect(p.specs.kelvin, p.slug).toBeGreaterThanOrEqual(1800);
        expect(p.specs.kelvin, p.slug).toBeLessThanOrEqual(6500);
      }
    }
  });

  it("тайлбар 40-өөс дээш тэмдэгттэй (чанарын шаардлага)", () => {
    for (const p of all) {
      expect(p.description.length, p.slug).toBeGreaterThanOrEqual(40);
    }
  });
});
