import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { productRepository } from "@/lib/repository/products";
import { toCandidates } from "@/lib/calculator/suggest";

export const metadata: Metadata = {
  title: "Гэрэлтүүлгийн тооцоолуур",
  description:
    "Өрөөнийхөө талбай, таазны өндрөөр шаардлагатай гэрлийн урсгалыг тооцож, тохирох бүтээгдэхүүний санал аваарай.",
};

export default function CalculatorPage() {
  const candidates = toCandidates(productRepository.getAll());

  return (
    <Container className="py-12 md:py-16">
      <p className="type-caption-uppercase text-muted">Зөвлөх хэрэгсэл</p>
      <h1 className="type-display-lg mt-3 max-w-3xl text-balance">
        Өрөөндөө хэдэн гэрэл хэрэгтэйг тооцоолоорой
      </h1>
      <p className="type-body-md mt-4 max-w-prose text-body">
        Өрөөний төрөл, талбай, таазны өндрийг оруулахад шаардлагатай нийт гэрлийн
        урсгал, санал болгох гэрлийн тоо, тохирох өнгөний температурыг харуулна.
      </p>

      <div className="mt-12">
        <CalculatorForm candidates={candidates} />
      </div>
    </Container>
  );
}
