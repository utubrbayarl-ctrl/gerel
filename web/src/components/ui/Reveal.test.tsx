import { describe, expect, it, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
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

  it("огтлолцох үед reveal-visible класс нэмнэ", () => {
    let capturedCallback: IntersectionObserverCallback | null = null;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          capturedCallback = callback;
        }
        observe = vi.fn();
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );
    const { container } = render(<Reveal>агуулга</Reveal>);
    expect(container.firstChild).not.toHaveClass("reveal-visible");

    // Огтлолцлыг дуурайлган симуляцлав
    act(() => {
      if (capturedCallback) {
        capturedCallback(
          [{ isIntersecting: true }] as IntersectionObserverEntry[],
          {} as IntersectionObserver,
        );
      }
    });

    expect(container.firstChild).toHaveClass("reveal-visible");
    expect(disconnect).toHaveBeenCalled();
  });
});
