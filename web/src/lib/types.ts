/** Барааны нөөцийн төлөв */
export type StockStatus = "in_stock" | "preorder" | "out_of_stock";

/** Чийдэнгийн суурийн төрөл (Монголд 220V/E27 стандарт) */
export type BulbBase = "E27" | "E14" | "GU10" | "GX53" | "LED модуль";

/** Барааны техник үзүүлэлт */
export interface ProductSpecs {
  readonly heightCm?: number;
  readonly diameterCm?: number;
  readonly widthCm?: number;
  readonly depthCm?: number;
  readonly lengthCm?: number;
  readonly cableLengthCm?: number;
  readonly kelvin?: number;
  readonly lumen?: number;
  readonly watt?: number;
  readonly cri?: number;
  readonly base?: BulbBase;
  readonly bulbCount?: number;
  readonly dimmable?: boolean;
  readonly ip?: string;
  readonly material?: string;
  readonly color?: string;
}

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly categorySlug: string;
  readonly subcategorySlug: string;
  readonly roomSlugs: readonly string[];
  /** Үнэ, төгрөгөөр */
  readonly price: number;
  readonly stock: StockStatus;
  /** Захиалгаар ирэх хугацаа, долоо хоногоор [мин, макс] */
  readonly leadTimeWeeks?: readonly [number, number];
  readonly images: readonly string[];
  readonly description: string;
  readonly specs: ProductSpecs;
  readonly isNew?: boolean;
  readonly featured?: boolean;
}

export interface Subcategory {
  readonly slug: string;
  readonly name: string;
  readonly image: string;
}

export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly heroImage: string;
  readonly cardImage: string;
  readonly subcategories: readonly Subcategory[];
}

export interface Room {
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly image: string;
}

/** Ангиллын хуудасны шүүлтүүр — бүх талбар нэмэлт */
export interface ProductFilter {
  readonly subcategorySlugs?: readonly string[];
  readonly kelvinRange?: readonly [number, number];
  readonly priceRange?: readonly [number, number];
  readonly bases?: readonly BulbBase[];
  readonly dimmableOnly?: boolean;
  readonly ipRatings?: readonly string[];
  readonly inStockOnly?: boolean;
}

export type SortOrder = "featured" | "newest" | "price_asc" | "price_desc";
