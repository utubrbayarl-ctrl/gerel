import type { Category } from "@/lib/types";

export const categories: readonly Category[] = [
  {
    slug: "taazny-gerel",
    name: "Таазны гэрэл",
    description:
      "Орон зайг бүхэлд нь гэрэлтүүлэх давхарласан гэрэлтүүлгийн гол элемент — чандельер, дүүжин, наамал болон рельсэн систем.",
    heroImage: "/images/heroes/taazny-gerel.svg",
    cardImage: "/images/categories/taazny-gerel-card.jpg",
    subcategories: [
      { slug: "avjur", name: "Авжур", image: "/images/subcategories/avjur.svg" },
      { slug: "offis", name: "Оффис гэрэл", image: "/images/subcategories/offis.svg" },
      { slug: "soronzon", name: "Соронзон замтай гэрэл", image: "/images/subcategories/soronzon.svg" },
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
    name: "Гадна зориулалтын гэрэл",
    description:
      "Цаг агаарт тэсвэртэй IP54+ зэрэглэлийн цэцэрлэг, фасад, замын гэрэлтүүлгийн шийдлүүд.",
    heroImage: "/images/heroes/gadna-gerel.svg",
    cardImage: "/images/categories/gadna-gerel.svg",
    subcategories: [
      { slug: "tsetserlegiin", name: "Цэцэрлэгийн гэрэл", image: "/images/subcategories/tsetserlegiin.svg" },
      { slug: "fasadny", name: "Фасадны гэрэл", image: "/images/subcategories/fasadny.svg" },
      { slug: "zamyn", name: "Замын гэрэл", image: "/images/subcategories/zamyn.svg" },
      { slug: "prozhektor", name: "Прожектор", image: "/images/subcategories/prozhektor.svg" },
      { slug: "shongiin-tolgoi", name: "Шонгийн толгой", image: "/images/subcategories/shongiin-tolgoi.svg" },
    ],
  },
  {
    slug: "led-ukhaalag",
    name: "Лед гэрэл",
    description:
      "Панел, өдрийн гэрэл, LED тууз болон агуулахын гэрэлтүүлэг — эрчим хүчний хэмнэлттэй орчин үеийн шийдэл.",
    heroImage: "/images/heroes/led-ukhaalag.svg",
    cardImage: "/images/categories/led-ukhaalag.svg",
    subcategories: [
      { slug: "panel", name: "Панел гэрэл", image: "/images/subcategories/panel.svg" },
      { slug: "udriin", name: "Өдрийн гэрэл", image: "/images/subcategories/udriin.svg" },
      { slug: "aguulakhyn", name: "Агуулахын гэрэл", image: "/images/subcategories/aguulakhyn.svg" },
      { slug: "zurvas", name: "LED тууз", image: "/images/subcategories/zurvas.svg" },
    ],
  },
];

/** Дотор гэрэлтүүлэгт багтах ангиллууд — харагдах дарааллаараа */
export const INDOOR_CATEGORY_SLUGS = [
  "taazny-gerel",
  "khanany-gerel",
  "chiiden",
  "led-ukhaalag",
] as const;

export const indoorCategories: readonly Category[] = INDOOR_CATEGORY_SLUGS.flatMap(
  (slug) => {
    const c = categories.find((cat) => cat.slug === slug);
    return c ? [c] : [];
  },
);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
