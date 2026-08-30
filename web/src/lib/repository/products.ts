import { products } from "@/data/products";
import type { Product } from "@/lib/types";

/**
 * Барааны өгөгдөлд хандах цорын ганц цэг.
 * v1: mock өгөгдөл. Дараа нь DB/CMS-руу шилжихдээ зөвхөн
 * энэ interface-ийн өөр хэрэгжүүлэлт бичнэ — хуудасны код өөрчлөгдөхгүй.
 */
export interface ProductRepository {
  getAll(): readonly Product[];
  getBySlug(slug: string): Product | undefined;
  getByCategory(categorySlug: string): readonly Product[];
  getBySubcategory(subcategorySlug: string): readonly Product[];
  getByRoom(roomSlug: string): readonly Product[];
  getFeatured(): readonly Product[];
  getNew(): readonly Product[];
  /** Ижил дэд ангиллынхийг эхэнд, дараа нь ижил ангиллынхаар нөхөж буцаана */
  getRelated(slug: string, limit: number): readonly Product[];
}

export const productRepository: ProductRepository = {
  getAll: () => products,

  getBySlug: (slug) => products.find((p) => p.slug === slug),

  getByCategory: (categorySlug) =>
    products.filter((p) => p.categorySlug === categorySlug),

  getBySubcategory: (subcategorySlug) =>
    products.filter((p) => p.subcategorySlug === subcategorySlug),

  getByRoom: (roomSlug) =>
    products.filter((p) => p.roomSlugs.includes(roomSlug)),

  getFeatured: () => products.filter((p) => p.featured === true),

  getNew: () => products.filter((p) => p.isNew === true),

  getRelated: (slug, limit) => {
    const current = products.find((p) => p.slug === slug);
    if (!current) return [];
    const sameSub = products.filter(
      (p) => p.slug !== slug && p.subcategorySlug === current.subcategorySlug,
    );
    const sameCat = products.filter(
      (p) =>
        p.slug !== slug &&
        p.categorySlug === current.categorySlug &&
        p.subcategorySlug !== current.subcategorySlug,
    );
    return [...sameSub, ...sameCat].slice(0, limit);
  },
};
