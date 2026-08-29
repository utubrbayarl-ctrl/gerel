import type { Room } from "@/lib/types";

export const rooms: readonly Room[] = [
  {
    slug: "zochny",
    name: "Зочны өрөө",
    description:
      "Гэрийн гол орон зайд дулаан уур амьсгал бүрдүүлэх чандельер, дүүжин гэрэл, шалны чийдэнгийн сонголт.",
    image: "/images/rooms/zochny.svg",
  },
  {
    slug: "untlagyn",
    name: "Унтлагын өрөө",
    description:
      "Амралтын орон зайд зориулсан зөөлөн, бүдэгшүүлэх боломжтой гэрэлтүүлгийн шийдлүүд.",
    image: "/images/rooms/untlagyn.svg",
  },
  {
    slug: "gal-togoo",
    name: "Гал тогоо",
    description:
      "Ажлын гадаргуу дээрх тод гэрэл ба хоолны ширээний дээрх дүүжин гэрлийн хослол.",
    image: "/images/rooms/gal-togoo.svg",
  },
  {
    slug: "azhlyn-uruu",
    name: "Ажлын өрөө",
    description:
      "Төвлөрөл шаардсан орчинд нүд чилээхгүй, өндөр CRI-тэй ажлын гэрэлтүүлэг.",
    image: "/images/rooms/azhlyn-uruu.svg",
  },
  {
    slug: "ugaalgyn",
    name: "Угаалгын өрөө",
    description:
      "Чийгэнд тэсвэртэй IP44+ зэрэглэлийн толины болон таазны гэрэлтүүлэг.",
    image: "/images/rooms/ugaalgyn.svg",
  },
  {
    slug: "khuukhdiin",
    name: "Хүүхдийн өрөө",
    description:
      "Аюулгүй, дулаан гэрэлтэй, тоглоомсог загварын гэрэлтүүлгийн сонголт.",
    image: "/images/rooms/khuukhdiin.svg",
  },
];
