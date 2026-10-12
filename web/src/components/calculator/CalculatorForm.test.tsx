import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalculatorForm } from "./CalculatorForm";
import type { FixtureCandidate } from "@/lib/calculator/suggest";

const CANDIDATES: readonly FixtureCandidate[] = [
  {
    slug: "zochny-gerel",
    name: "Зочны дүүжин",
    price: 320000,
    image: "/images/products/test.svg",
    lumen: 800,
    roomSlugs: ["zochny"],
  },
];

describe("CalculatorForm", () => {
  it("эхэндээ үр дүн харуулахгүй", () => {
    render(<CalculatorForm candidates={CANDIDATES} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("зөв утга оруулахад нийт люмен ба гэрлийн тоог харуулна", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "20");
    await user.clear(screen.getByLabelText("Таазны өндөр (м)"));
    await user.type(screen.getByLabelText("Таазны өндөр (м)"), "2.5");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    const result = await screen.findByRole("status");
    expect(result).toHaveTextContent("3,000 лм");
    expect(result).toHaveTextContent("4 ш");
    expect(result).toHaveTextContent("2700K");
  });

  it("хязгаараас гадуур талбайд алдааны мессеж харуулна", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "900");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Талбай 1-500 м² хооронд байх ёстой.");
  });

  it("тохирох барааг санал болгоно", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "20");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    expect(await screen.findByText("Зочны дүүжин")).toBeInTheDocument();
    expect(screen.getByText("320,000₮")).toBeInTheDocument();
  });

  it("алдаа гарсан үед өмнөх үр дүнг цэвэрлэнэ", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);
    const area = screen.getByLabelText("Талбай (м²)");

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(area);
    await user.type(area, "20");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));
    expect(await screen.findByRole("status")).toBeInTheDocument();

    await user.clear(area);
    await user.type(area, "900");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
