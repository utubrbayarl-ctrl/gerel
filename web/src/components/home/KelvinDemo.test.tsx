import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { KelvinDemo } from "./KelvinDemo";

describe("KelvinDemo", () => {
  it("2700K-аас эхэлж дулаан шошго харуулна", () => {
    render(<KelvinDemo />);
    expect(screen.getByRole("slider")).toHaveValue("2700");
    expect(screen.getByText("2700K")).toBeInTheDocument();
    expect(screen.getByText("Дулаан цагаан")).toBeInTheDocument();
  });

  it("слайдер чирэхэд шошго ба утга шинэчлэгдэнэ", () => {
    render(<KelvinDemo />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "6500" } });
    expect(screen.getByText("6500K")).toBeInTheDocument();
    expect(screen.getByText("Өдрийн гэрэл")).toBeInTheDocument();
  });

  it("слайдер хүрэх боломжтой нэр, хязгаартай", () => {
    render(<KelvinDemo />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAccessibleName("Өнгөний температур");
    expect(slider).toHaveAttribute("min", "2700");
    expect(slider).toHaveAttribute("max", "6500");
  });

  it("бэлэн тохиргооны товч дарахад тухайн утга руу шилжинэ", () => {
    render(<KelvinDemo />);
    fireEvent.click(screen.getByRole("button", { name: "4000K Төвийг сахисан" }));
    expect(screen.getByRole("slider")).toHaveValue("4000");
  });

  it("гэрлийн давхаргыг дэлгэц уншигчаас нуудаг", () => {
    const { container } = render(<KelvinDemo />);
    const overlay = container.querySelector("[data-kelvin-overlay]");
    expect(overlay).not.toBeNull();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
