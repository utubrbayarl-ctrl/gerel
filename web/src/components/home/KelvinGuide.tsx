import { Container } from "@/components/ui/Container";

const KELVIN_STEPS = [
  {
    kelvin: "2700K",
    name: "Дулаан цагаан",
    dotClass: "bg-accent-amber",
    description:
      "Лааны гэрэл шиг зөөлөн, тухтай уур амьсгал. Амрах орон зайд хамгийн тохиромжтой.",
    rooms: "Унтлагын өрөө · Зочны өрөө",
  },
  {
    kelvin: "4000K",
    name: "Төвийг сахисан",
    dotClass: "bg-canvas border border-hairline",
    description:
      "Байгалийн өдрийн гэрэлд ойр, тод боловч хатуу биш. Ажил ба амьдралын тэнцвэр.",
    rooms: "Гал тогоо · Угаалгын өрөө",
  },
  {
    kelvin: "6500K",
    name: "Өдрийн гэрэл",
    dotClass: "bg-accent-teal",
    description:
      "Сэргэг, төвлөрөлд тустай хүйтэвтэр гэрэл. Нарийн ажил хийдэг орчинд зориулагдсан.",
    rooms: "Ажлын өрөө · Агуулах",
  },
] as const;

/** Kelvin боловсролын хэсэг — судалгааны "хэрэглэгчид Kelvin-ийг заах" зөвлөмжөөр */
export function KelvinGuide() {
  return (
    <section className="bg-surface-dark py-16 text-on-dark md:py-24">
      <Container>
        <p className="type-caption-uppercase text-on-dark-soft">Гэрлийн мэдлэг</p>
        <h2 className="type-display-md mt-3 max-w-2xl !text-on-dark">
          Өнгөний температур гэж юу вэ?
        </h2>
        <p className="type-body-md mt-4 max-w-2xl text-on-dark-soft">
          Kelvin (K) нь гэрлийн өнгөний дулаан, хүйтнийг илэрхийлнэ. Тоо бага
          байх тусам дулаан шаргал, өндөр байх тусам хүйтэн цэнхэр гэрэл гэсэн үг.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {KELVIN_STEPS.map((step) => (
            <li
              key={step.kelvin}
              className="rounded-lg bg-surface-dark-elevated p-7"
            >
              <span
                className={`block size-10 rounded-full ${step.dotClass}`}
                aria-hidden="true"
              />
              <p className="type-display-sm mt-5 !text-on-dark">{step.kelvin}</p>
              <p className="type-title-sm mt-1 !text-on-dark">{step.name}</p>
              <p className="type-body-sm mt-3 text-on-dark-soft">
                {step.description}
              </p>
              <p className="type-caption mt-4 text-on-dark-soft">{step.rooms}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
