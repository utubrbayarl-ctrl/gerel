import { describe, expect, it } from "vitest";
import {
  discountPercent,
  formatLeadTime,
  formatPrice,
  formatSpecValue,
} from "./format";

describe("formatPrice", () => {
  it("мянгатын таслалтай, ₮ тэмдэгтэй форматлана", () => {
    expect(formatPrice(1299000)).toBe("1,299,000₮");
  });
  it("бага дүнг таслалгүй форматлана", () => {
    expect(formatPrice(900)).toBe("900₮");
  });
  it("тэгийг зөв форматлана", () => {
    expect(formatPrice(0)).toBe("0₮");
  });
  it("сая давсан дүнг зөв бүлэглэнэ", () => {
    expect(formatPrice(12345678)).toBe("12,345,678₮");
  });
});

describe("discountPercent", () => {
  it("хямдралын хувийг бүхэл тоогоор тооцно", () => {
    expect(discountPercent(69900, 99900)).toBe(30);
  });
  it("хуучин үнэгүй бол 0 буцаана", () => {
    expect(discountPercent(50000, undefined)).toBe(0);
  });
  it("хуучин үнэ нь одоогийнхоос бага/тэнцүү бол 0 буцаана", () => {
    expect(discountPercent(50000, 40000)).toBe(0);
    expect(discountPercent(50000, 50000)).toBe(0);
  });
});

describe("formatLeadTime", () => {
  it("долоо хоногийн мужийг монголоор бичнэ", () => {
    expect(formatLeadTime([4, 5])).toBe("Ирэх хугацаа: 4–5 долоо хоног");
  });
  it("ижил тоотой мужийг нэг тоогоор бичнэ", () => {
    expect(formatLeadTime([2, 2])).toBe("Ирэх хугацаа: 2 долоо хоног");
  });
});

describe("formatSpecValue", () => {
  it("хэмжээсийг см-ээр бичнэ", () => {
    expect(formatSpecValue("heightCm", 38)).toBe("38 см");
  });
  it("Kelvin-ийг K-ээр бичнэ", () => {
    expect(formatSpecValue("kelvin", 2700)).toBe("2700K");
  });
  it("люменийг лм-ээр бичнэ", () => {
    expect(formatSpecValue("lumen", 1800)).toBe("1800 лм");
  });
  it("ваттыг Вт-оор бичнэ", () => {
    expect(formatSpecValue("watt", 12)).toBe("12 Вт");
  });
  it("dimmable-ийг Тийм/Үгүй гэж бичнэ", () => {
    expect(formatSpecValue("dimmable", true)).toBe("Тийм");
    expect(formatSpecValue("dimmable", false)).toBe("Үгүй");
  });
  it("текст утгыг шууд буцаана", () => {
    expect(formatSpecValue("material", "Гуулин, шил")).toBe("Гуулин, шил");
  });
});
