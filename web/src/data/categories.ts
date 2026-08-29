import type { Category } from "@/lib/types";

export const categories: readonly Category[] = [
  {
    slug: "taazny-gerel",
    name: "Таазны гэрэл",
    description:
      "Орон зайг бүхэлд нь гэрэлтүүлэх давхарласан гэрэлтүүлгийн гол элемент — чандельер, дүүжин, наамал болон рельсэн систем.",
    heroImage: "/images/heroes/taazny-gerel.svg",
    cardImage: "/images/categories/taazny-gerel.svg",
    subcategories: [
      { slug: "chandelier", name: "Чандельер", image: "/images/subcategories/chandelier.svg" },
      { slug: "duujin", name: "Дүүжин гэрэл", image: "/images/subcategories/duujin.svg" },
      { slug: "naamal", name: "Наамал гэрэл", image: "/images/subcategories/naamal.svg" },
      { slug: "shugaman", name: "Шугаман дүүжин", image: "/images/subcategories/shugaman.svg" },
      { slug: "spot", name: "Суулгамал спот", image: "/images/subcategories/spot.svg" },
      { slug: "relsen", name: "Рельсэн гэрэл", image: "/images/subcategories/relsen.svg" },
    ],
  },
  {
    slug: "khanany-gerel",
    name: "Хананы гэрэл",
    description:
      "Хананд уур амьсгал, гүн нэмэх бра, толины болон зургийн гэрэлтүүлэг — орон зайн хоёрдогч давхаргын түлхүүр.",
    heroImage: "/images/heroes/khanany-gerel.svg",
    cardImage: "/images/categories/khanany-gerel.svg",
    subcategories: [
      { slug: "bra", name: "Ханын бра", image: "/images/subcategories/bra.svg" },
      { slug: "toliny", name: "Толины гэрэл", image: "/images/subcategories/toliny.svg" },
      { slug: "zurgiin", name: "Зургийн гэрэл", image: "/images/subcategories/zurgiin.svg" },
    ],
  },
  {
    slug: "chiiden",
    name: "Чийдэн",
    description:
      "Хэрэгтэй газраа зөөж болох уян хатан гэрэлтүүлэг — шалны, ширээний болон ажлын чийдэнгийн цуглуулга.",
    heroImage: "/images/heroes/chiiden.svg",
    cardImage: "/images/categories/chiiden.svg",
    subcategories: [
      { slug: "shalny", name: "Шалны чийдэн", image: "/images/subcategories/shalny.svg" },
      { slug: "shireeny", name: "Ширээний чийдэн", image: "/images/subcategories/shireeny.svg" },
      { slug: "azhlyn", name: "Ажлын чийдэн", image: "/images/subcategories/azhlyn.svg" },
    ],
  },
  {
    slug: "gadna-gerel",
    name: "Гадна гэрэлтүүлэг",
    description:
      "Цаг агаарт тэсвэртэй IP54+ зэрэглэлийн цэцэрлэг, фасад, замын гэрэлтүүлгийн шийдлүүд.",
    heroImage: "/images/heroes/gadna-gerel.svg",
    cardImage: "/images/categories/gadna-gerel.svg",
    subcategories: [
      { slug: "tsetserlegiin", name: "Цэцэрлэгийн гэрэл", image: "/images/subcategories/tsetserlegiin.svg" },
      { slug: "fasadny", name: "Фасадны гэрэл", image: "/images/subcategories/fasadny.svg" },
      { slug: "zamyn", name: "Замын гэрэл", image: "/images/subcategories/zamyn.svg" },
    ],
  },
  {
    slug: "led-ukhaalag",
    name: "LED ба ухаалаг",
    description:
      "Аппаар удирдах ухаалаг гэрэлтүүлэг, LED зурвас, панель — орчин үеийн гэрийн эрчим хүчний хэмнэлттэй шийдэл.",
    heroImage: "/images/heroes/led-ukhaalag.svg",
    cardImage: "/images/categories/led-ukhaalag.svg",
    subcategories: [
      { slug: "zurvas", name: "LED зурвас", image: "/images/subcategories/zurvas.svg" },
      { slug: "panel", name: "LED панель", image: "/images/subcategories/panel.svg" },
      { slug: "ukhaalag", name: "Ухаалаг гэрэл", image: "/images/subcategories/ukhaalag.svg" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
