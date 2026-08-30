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
    const { container } = render(
      <ProductCard product={makeProduct({ price: 385000 })} onDark />,
    );
    expect(container.querySelector('[class*="text-on-dark"]')).not.toBeNull();
    expect(container.querySelector(".text-ink")).toBeNull();
  });

  it("onDark байхгүй үед үнэ ink өнгөтэй хэвээрээ", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    expect(container.querySelector(".text-ink")).not.toBeNull();
  });

  it("үргэлж дулаан glow класстай", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    expect(container.querySelector(".glow-warm")).not.toBeNull();
  });
});
