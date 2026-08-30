import { describe, expect, it } from "vitest";
import { filterProducts, sortProducts } from "./filter";
import { makeProduct } from "./test-helpers";

const products = [
  makeProduct({
    id: "1", slug: "a", price: 300000, subcategorySlug: "duujin",
    specs: { kelvin: 2700, base: "E27", dimmable: true, ip: "IP20" },
    isNew: true,
  }),
  makeProduct({
    id: "2", slug: "b", price: 100000, subcategorySlug: "chandelier",
    specs: { kelvin: 4000, base: "GU10", dimmable: false, ip: "IP20" },
    stock: "preorder",
  }),
  makeProduct({
    id: "3", slug: "c", price: 550000, subcategorySlug: "duujin",
    specs: { kelvin: 6500, base: "E27", ip: "IP44" },
    featured: true,
  }),
];

describe("filterProducts", () => {
  it("хоосон шүүлтүүрт бүгдийг буцаана", () => {
    expect(filterProducts(products, {})).toHaveLength(3);
  });

  it("дэд ангиллаар шүүнэ", () => {
    const r = filterProducts(products, { subcategorySlugs: ["duujin"] });
    expect(r.map((p) => p.id)).toEqual(["1", "3"]);
  });

  it("Kelvin мужаар шүүнэ", () => {
    const r = filterProducts(products, { kelvinRange: [3000, 5000] });
    expect(r.map((p) => p.id)).toEqual(["2"]);
  });

  it("Kelvin үзүүлэлтгүй барааг Kelvin шүүлтүүрээс хасна", () => {
    const noKelvin = [makeProduct({ id: "4", specs: {} })];
    expect(filterProducts(noKelvin, { kelvinRange: [2000, 7000] })).toHaveLength(0);
  });

  it("үнийн мужаар шүүнэ", () => {
    const r = filterProducts(products, { priceRange: [200000, 600000] });
    expect(r.map((p) => p.id)).toEqual(["1", "3"]);
  });

  it("суурийн төрлөөр шүүнэ", () => {
    const r = filterProducts(products, { bases: ["GU10"] });
    expect(r.map((p) => p.id)).toEqual(["2"]);
  });

  it("зөвхөн dimmable-ийг шүүнэ", () => {
    const r = filterProducts(products, { dimmableOnly: true });
    expect(r.map((p) => p.id)).toEqual(["1"]);
  });

  it("IP зэрэглэлээр шүүнэ", () => {
    const r = filterProducts(products, { ipRatings: ["IP44"] });
    expect(r.map((p) => p.id)).toEqual(["3"]);
  });

  it("зөвхөн бэлэн барааг шүүнэ", () => {
    const r = filterProducts(products, { inStockOnly: true });
    expect(r.map((p) => p.id)).toEqual(["1", "3"]);
  });

  it("олон нөхцөлийг хамтад нь (AND) шүүнэ", () => {
    const r = filterProducts(products, {
      subcategorySlugs: ["duujin"],
      bases: ["E27"],
      priceRange: [400000, 600000],
    });
    expect(r.map((p) => p.id)).toEqual(["3"]);
  });

  it("эх массивыг өөрчлөхгүй (immutable)", () => {
    const before = [...products];
    filterProducts(products, { dimmableOnly: true });
    expect(products).toEqual(before);
  });
});

describe("sortProducts", () => {
  it("үнэ өсөхөөр эрэмбэлнэ", () => {
    expect(sortProducts(products, "price_asc").map((p) => p.id)).toEqual(["2", "1", "3"]);
  });

  it("үнэ буурахаар эрэмбэлнэ", () => {
    expect(sortProducts(products, "price_desc").map((p) => p.id)).toEqual(["3", "1", "2"]);
  });

  it("шинэ нь эхэндээ байхаар эрэмбэлнэ", () => {
    expect(sortProducts(products, "newest")[0].id).toBe("1");
  });

  it("featured эхэндээ байна", () => {
    expect(sortProducts(products, "featured")[0].id).toBe("3");
  });

  it("шинэ массив буцаана, эхийг өөрчлөхгүй", () => {
    const before = [...products];
    const r = sortProducts(products, "price_asc");
    expect(r).not.toBe(products);
    expect(products).toEqual(before);
  });
});
