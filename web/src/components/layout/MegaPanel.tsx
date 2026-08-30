import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

/**
 * Mega menu-гийн задаргаа — reference 4-ийн хэв маягаар:
 * items байвал зурган товчлолууд, groups байвал ангилал тус бүрийн
 * баганатай задаргаа (Дотор гэрэлтүүлэг).
 */
export function MegaPanel({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  if (!item.panel) return null;
  const { groups, items } = item.panel;
  return (
    <div className="border-b border-hairline bg-canvas shadow-[0_24px_48px_-24px_rgba(20,20,19,0.18)]">
      <Container className="py-6">
        {groups && (
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 py-2">
            {groups.map((group) => (
              <div key={group.href} className="min-w-36">
                <Link
                  href={group.href}
                  onClick={onNavigate}
                  className="type-title-sm block text-ink transition-colors hover:underline hover:underline-offset-4"
                >
                  {group.title}
                </Link>
                <ul className="mt-3 space-y-1">
                  {group.items.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={onNavigate}
                        className="type-body-sm block py-0.5 text-body transition-colors hover:text-ink"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {items && (
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {items.map((sub) => (
              <li key={sub.href} className="w-28">
                <Link
                  href={sub.href}
                  onClick={onNavigate}
                  className="group block text-center"
                >
                  <span className="mx-auto block w-full max-w-18 overflow-hidden rounded-lg bg-surface-soft">
                    <Image
                      src={sub.image}
                      alt=""
                      width={288}
                      height={288}
                      unoptimized
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                  <span className="type-body-sm mt-2 block text-body transition-colors group-hover:text-ink group-hover:underline group-hover:underline-offset-4">
                    {sub.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
