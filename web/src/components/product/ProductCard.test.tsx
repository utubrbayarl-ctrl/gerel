import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { makeProduct } from "@/lib/test-helpers";

describe("ProductCard", () => {
  it("нэр, үнэ, нөөцийн төлөвийг харуулна", () => {
    render(
      <ProductCard
        product={makeProduct({ name: "Тест гэрэл", price: 385000 })}
      />,
    );
    expect(screen.getByText("Тест гэрэл")).toBeInTheDocument();
    expect(screen.getByText("385,000₮")).toBeInTheDocument();
    expect(screen.getByText("Бэлэн байгаа")).toBeInTheDocument();
  });

  it("шинэ бараанд «Шинэ» badge харуулна", () => {
    render(<ProductCard product={makeProduct({ isNew: true })} />);
    expect(screen.getByText("Шинэ")).toBeInTheDocument();
  });

  it("захиалгаар ирэх бараанд хугацааг харуулна", () => {
    render(
      <ProductCard
        product={makeProduct({ stock: "preorder", leadTimeWeeks: [4, 5] })}
      />,
    );
    expect(screen.getByText("Ирэх хугацаа: 4–5 долоо хоног")).toBeInTheDocument();
  });

  it("барааны дэлгэрэнгүй рүү холбоно", () => {
    render(<ProductCard product={makeProduct({ slug: "test-gerel" })} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/test-gerel");
  });

  it("onDark үед үнэ бараан дэвсгэрт харагдах өнгөтэй болно", () => {
    render(<ProductCard product={makeProduct({ price: 385000 })} onDark />);
    const priceEl = screen.getByText("385,000₮");
    expect(priceEl.className).toMatch(/text-on-dark/);
    expect(priceEl.className).not.toMatch(/text-ink/);
  });

  it("onDark байхгүй үед үнэ ink өнгөтэй хэвээрээ", () => {
    render(<ProductCard product={makeProduct({ price: 385000 })} />);
    const priceEl = screen.getByText("385,000₮");
    expect(priceEl.className).toMatch(/text-ink/);
  });

  it("үргэлж дулаан glow класстай", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    expect(container.querySelector(".glow-warm")).not.toBeNull();
  });

  it("onDark ба шинэ бараанд badge эсрэг өнгөөр харагдана", () => {
    render(
      <ProductCard product={makeProduct({ isNew: true })} onDark />,
    );
    const badge = screen.getByText("Шинэ");
    expect(badge.className).toMatch(/bg-on-dark/);
    expect(badge.className).toMatch(/text-ink/);
  });

  it("onDark ба хоёр зурагтай үед бүрий зураг (images[1]) үндсэн болж, alt нь нэр авна", () => {
    const product = makeProduct({
      name: "Тест гэрэл",
      images: ["/images/products/light.svg", "/images/products/dusk.svg"],
    });
    const { container } = render(<ProductCard product={product} onDark />);
    const images = container.querySelectorAll("img");
    expect(images[0]).toHaveAttribute("src", expect.stringContaining("dusk.svg"));
    expect(images[0]).toHaveAttribute("alt", "Тест гэрэл");
    expect(images[1]).toHaveAttribute("src", expect.stringContaining("light.svg"));
    expect(images[1]).toHaveAttribute("alt", "");
    expect(images[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("onDark ба ганц зурагтай үед хэвийн рендерлэнэ", () => {
    const product = makeProduct({
      name: "Тест гэрэл",
      images: ["/images/products/light.svg"],
    });
    const { container } = render(<ProductCard product={product} onDark />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", expect.stringContaining("light.svg"));
    expect(images[0]).toHaveAttribute("alt", "Тест гэрэл");
  });

  it("onDark байхгүй үед зургийн дараалал өөрчлөгдөхгүй хэвээрээ", () => {
    const product = makeProduct({
      name: "Тест гэрэл",
      images: ["/images/products/light.svg", "/images/products/dusk.svg"],
    });
    const { container } = render(<ProductCard product={product} />);
    const images = container.querySelectorAll("img");
    expect(images[0]).toHaveAttribute("src", expect.stringContaining("light.svg"));
    expect(images[0]).toHaveAttribute("alt", "Тест гэрэл");
    expect(images[1]).toHaveAttribute("src", expect.stringContaining("dusk.svg"));
    expect(images[1]).toHaveAttribute("alt", "");
  });
});
