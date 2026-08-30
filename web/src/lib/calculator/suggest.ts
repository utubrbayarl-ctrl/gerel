import type { Product } from "@/lib/types";

/**
 * Барааны нимгэн проекц — client компонент руу бүтэн `Product`-ийг
 * дамжуулахгүйн тулд зөвхөн хэрэгтэй талбарыг авна.
 */
export interface FixtureCandidate {
  readonly slug: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly lumen: number;
  readonly roomSlugs: readonly string[];
}

/** Люмен нь тодорхой байгаа барааг л сонгож нимгэн объект болгоно */
export function toCandidates(
  products: readonly Product[],
): readonly FixtureCandidate[] {
  return products.flatMap((p) => {
    const lumen = p.specs.lumen;
    if (lumen === undefined) return [];
    return [
      {
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.images[0],
        lumen,
        roomSlugs: p.roomSlugs,
      },
    ];
  });
}

/**
 * Тухайн өрөөнд тохирох бараануудаас нэг гэрэлд ногдох люментэй
 * хамгийн ойрыг нь эрэмбэлж буцаана. Эх массивыг өөрчлөхгүй.
 */
export function suggestFixtures(
  candidates: readonly FixtureCandidate[],
  roomSlug: string,
  lumenPerFixture: number,
  limit: number,
): readonly FixtureCandidate[] {
  return candidates
    .filter((c) => c.roomSlugs.includes(roomSlug))
    .slice()
    .sort(
      (a, b) =>
        Math.abs(a.lumen - lumenPerFixture) - Math.abs(b.lumen - lumenPerFixture),
    )
    .slice(0, limit);
}
