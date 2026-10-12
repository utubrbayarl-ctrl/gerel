import { HomeHero } from "@/components/home/HomeHero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { RoomsSection } from "@/components/home/RoomsSection";
import { KelvinDemo } from "@/components/home/KelvinDemo";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryShowcase />
      <FeaturedProducts />
      <RoomsSection />
      <KelvinDemo />
    </>
  );
}
