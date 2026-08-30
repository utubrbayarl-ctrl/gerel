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
});
