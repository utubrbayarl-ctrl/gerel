import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { productRepository } from "@/lib/repository/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/sale", "/rooms", "/about"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
  }));
  const categoryPages = categories.map((c) => ({
    url: `${site.url}/category/${c.slug}`,
    changeFrequency: "weekly" as const,
  }));
  const roomPages = rooms.map((r) => ({
    url: `${site.url}/rooms/${r.slug}`,
    changeFrequency: "weekly" as const,
  }));
  const productPages = productRepository.getAll().map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
  }));
  return [...staticPages, ...categoryPages, ...roomPages, ...productPages];
}
