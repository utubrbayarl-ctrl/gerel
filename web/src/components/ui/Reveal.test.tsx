import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("хүүхэд элементийг үргэлж рендерлэнэ", () => {
    render(<Reveal>агуулга</Reveal>);
    expect(screen.getByText("агуулга")).toBeInTheDocument();
  });

  it("IntersectionObserver байхгүй үед шууд харагдана", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<Reveal>агуулга</Reveal>);
    expect(container.firstChild).toHaveClass("reveal-visible");
  });

  it("харагдах хүртэл reveal-visible класс аваагүй байна", () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = vi.fn();
        unobserve = vi.fn();
      },
    );
    const { container } = render(<Reveal>агуулга</Reveal>);
    expect(container.firstChild).not.toHaveClass("reveal-visible");
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("нэмэлт className-ийг хадгална", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<Reveal className="mt-8">агуулга</Reveal>);
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
