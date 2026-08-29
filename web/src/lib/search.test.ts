import { describe, expect, it } from "vitest";
import { searchProducts } from "./search";
import { makeProduct } from "./test-helpers";

const products = [
  makeProduct({ id: "1", name: "Дүүжин гэрэл «Сарнай»", description: "Гуулин хүрээтэй" }),
  makeProduct({ id: "2", name: "Чандельер «Мандал»", description: "Болор шилэн" }),
  makeProduct({ id: "3", name: "LED зурвас 5м", description: "Ухаалаг удирдлагатай" }),
];

describe("searchProducts", () => {
  it("нэрээр том/жижиг үсэг ялгалгүй хайна", () => {
    expect(searchProducts(products, "дүүжин").map((p) => p.id)).toEqual(["1"]);
    expect(searchProducts(products, "ДҮҮЖИН").map((p) => p.id)).toEqual(["1"]);
  });

  it("тайлбараас хайна", () => {
    expect(searchProducts(products, "болор").map((p) => p.id)).toEqual(["2"]);
  });

  it("латин үсгээр хайна", () => {
    expect(searchProducts(products, "led").map((p) => p.id)).toEqual(["3"]);
  });

  it("хоосон query-д хоосон буцаана", () => {
    expect(searchProducts(products, "")).toEqual([]);
    expect(searchProducts(products, "   ")).toEqual([]);
  });

  it("олдоогүй үед хоосон буцаана", () => {
    expect(searchProducts(products, "байхгүйзүйл")).toEqual([]);
  });

  it("олон үгийн бүгдийг агуулсныг буцаана", () => {
    expect(searchProducts(products, "ухаалаг зурвас").map((p) => p.id)).toEqual(["3"]);
  });
});
