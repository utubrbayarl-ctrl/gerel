import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("брэндийн нэрийг харуулна", () => {
    render(<Logo />);
    expect(screen.getByText("TES SKY")).toBeInTheDocument();
  });

  it("туяаны тэмдгийг дэлгэц уншигчаас нуудаг", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("нэмэлт className-ийг дамжуулна", () => {
    const { container } = render(<Logo className="text-on-dark" />);
    expect(container.firstChild).toHaveClass("text-on-dark");
  });

  it("sm хэмжээнд жижиг фонтын класс өгнө", () => {
    const { container } = render(<Logo size="sm" />);
    expect(container.firstChild).toHaveClass("text-[22px]");
  });
});
