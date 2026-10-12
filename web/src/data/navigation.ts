import { categories, indoorCategories } from "./categories";
import { rooms } from "./rooms";

export interface NavPanelItem {
  readonly name: string;
  readonly href: string;
  readonly image: string;
}

export interface NavPanelGroup {
  readonly title: string;
  readonly href: string;
  readonly items: readonly { readonly name: string; readonly href: string }[];
}

export interface NavItem {
  readonly key: string;
  readonly label: string;
  /** Байхгүй бол хуудас руу үсрэхгүй, зөвхөн panel нээдэг товч болно */
  readonly href?: string;
  /** Mega menu-гийн агуулга: items (зурган towchlol) эсвэл groups (баганатай задаргаа) */
  readonly panel?: {
    readonly items?: readonly NavPanelItem[];
    readonly groups?: readonly NavPanelGroup[];
  };
}

const outdoorCategory = categories.find((c) => c.slug === "gadna-gerel");

/** Толгойн цэс: Дотор / Гадна гэрэлтүүлэг + Өрөөгөөр + Холбоо барих */
export const navItems: readonly NavItem[] = [
  {
    key: "indoor",
    label: "Дотор гэрэлтүүлэг",
    href: "/indoor",
    panel: {
      groups: indoorCategories.map((c) => ({
        title: c.name,
        href: `/category/${c.slug}`,
        items: c.subcategories.map((s) => ({
          name: s.name,
          href: `/category/${c.slug}?sub=${s.slug}`,
        })),
      })),
    },
  },
  ...(outdoorCategory
    ? [
        {
          key: outdoorCategory.slug,
          label: "Гадна гэрэлтүүлэг",
          href: `/category/${outdoorCategory.slug}`,
          panel: {
            items: outdoorCategory.subcategories.map((s) => ({
              name: s.name,
              href: `/category/${outdoorCategory.slug}?sub=${s.slug}`,
              image: s.image,
            })),
          },
        } satisfies NavItem,
      ]
    : []),
  {
    key: "rooms",
    label: "Өрөөгөөр",
    href: "/rooms",
    panel: {
      items: rooms.map((r) => ({
        name: r.name,
        href: `/rooms/${r.slug}`,
        image: r.image,
      })),
    },
  },
  {
    key: "tooluur",
    label: "Тооцоолуур",
    href: "/tooluur",
  },
  {
    key: "contact",
    label: "Холбоо барих",
    href: "/about#kholboo",
  },
];
