import { categories } from "./categories";
import { rooms } from "./rooms";

export interface NavPanelItem {
  readonly name: string;
  readonly href: string;
  readonly image: string;
}

export interface NavItem {
  readonly key: string;
  readonly label: string;
  readonly href: string;
  /** Хямдрал зэрэг онцолсон цэс */
  readonly accent?: boolean;
  /** Mega menu-гийн агуулга */
  readonly panel?: {
    readonly items: readonly NavPanelItem[];
    readonly allHref: string;
    readonly allLabel: string;
  };
}

/** Толгойн цэсний бүтэц — ангилал + өрөөгөөр + хямдрал */
export const navItems: readonly NavItem[] = [
  ...categories.map(
    (c): NavItem => ({
      key: c.slug,
      label: c.name,
      href: `/category/${c.slug}`,
      panel: {
        items: c.subcategories.map((s) => ({
          name: s.name,
          href: `/category/${c.slug}?sub=${s.slug}`,
          image: s.image,
        })),
        allHref: `/category/${c.slug}`,
        allLabel: "Бүгдийг үзэх",
      },
    }),
  ),
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
      allHref: "/rooms",
      allLabel: "Бүх өрөө",
    },
  },
  { key: "sale", label: "Хямдрал", href: "/sale", accent: true },
];
