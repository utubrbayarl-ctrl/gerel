import type { Metadata } from "next";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Бидний тухай",
  description:
    "ГЭРЭЛ — орчин үеийн гэрэлтүүлгийн дэлгүүр. Дэлгүүрийн хаяг, цагийн хуваарь, холбоо барих мэдээлэл.",
};

const VALUES = [
  {
    title: "Сонгомол загвар",
    text: "Дэлхийн чиг хандлагад нийцсэн, цаг хугацааг элээхгүй загваруудыг сонгон авчирдаг.",
  },
  {
    title: "Мэргэжлийн зөвлөгөө",
    text: "Kelvin, люмен, IP зэрэглэл — аль нь танд хэрэгтэйг бид энгийнээр тайлбарлаж өгнө.",
  },
  {
    title: "Суурилуулалтын дэмжлэг",
    text: "Худалдан авсан бүтээгдэхүүнээ хэрхэн суурилуулахад нь зөвлөж, туслах хүнтэй холбоно.",
  },
] as const;

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <p className="type-caption-uppercase text-muted">Бидний тухай</p>
          <h1 className="type-display-lg mt-3 text-balance">
            Гэрэл — орон зайг өөрчилдөг хамгийн энгийн зүйл
          </h1>
          <div className="type-body-md mt-6 max-w-prose space-y-4 leading-relaxed text-body">
            <p>
              {site.name} нь Монголын гэр, оффис, үйлчилгээний орон зайд
              зориулсан орчин үеийн гэрэлтүүлгийн бүтээгдэхүүнийг сонгон
              нийлүүлдэг дэлгүүр юм. Бид гэрлийг зүгээр л цахилгаан хэрэгсэл
              биш, орон зайн уур амьсгалыг бүтээгч гэж хардаг.
            </p>
            <p>
              Каталогт байгаа бүтээгдэхүүн бүрийн хэмжээс, өнгөний температур,
              гэрлийн урсгал зэрэг техник үзүүлэлтийг бид бүрэн, үнэн зөвөөр
              мэдээлдэг — учир нь зөв сонголт зөв мэдээллээс эхэлдэг.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-lg bg-surface-soft p-5">
                <h2 className="type-title-sm">{v.title}</h2>
                <p className="type-body-sm mt-2 text-body">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-lg bg-surface-card p-7">
          <h2 className="type-display-sm">Холбоо барих</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-1 size-4 shrink-0 text-muted" />
              <div>
                <p className="type-caption-uppercase text-muted">Хаяг</p>
                <p className="type-body-md mt-0.5 text-ink">{site.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <PhoneIcon className="mt-1 size-4 shrink-0 text-muted" />
              <div>
                <p className="type-caption-uppercase text-muted">Утас</p>
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="type-body-md mt-0.5 block text-ink transition-colors hover:text-primary"
                >
                  {site.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-1 size-4 shrink-0 text-muted" />
              <div>
                <p className="type-caption-uppercase text-muted">И-мэйл</p>
                <a
                  href={`mailto:${site.email}`}
                  className="type-body-md mt-0.5 block text-ink transition-colors hover:text-primary"
                >
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ClockIcon className="mt-1 size-4 shrink-0 text-muted" />
              <div>
                <p className="type-caption-uppercase text-muted">Цагийн хуваарь</p>
                <p className="type-body-md mt-0.5 text-ink">{site.hours}</p>
              </div>
            </li>
          </ul>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="type-button mt-7 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-on-primary transition-colors hover:bg-primary-active"
          >
            Газрын зураг дээр харах
          </a>
        </aside>
      </div>
    </Container>
  );
}
