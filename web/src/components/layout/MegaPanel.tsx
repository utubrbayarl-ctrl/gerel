import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Mega menu-гийн задаргаа — reference 4-ийн хэв маягаар:
 * барааны төрлийн зурган товчлолууд + "Бүгдийг үзэх" холбоос.
 */
export function MegaPanel({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  if (!item.panel) return null;
  return (
    <div className="border-b border-hairline bg-canvas shadow-[0_24px_48px_-24px_rgba(20,20,19,0.18)]">
      <Container className="py-8">
        <ul className="grid grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-6">
          {item.panel.items.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                onClick={onNavigate}
                className="group block text-center"
              >
                <span className="mx-auto block w-full max-w-36 overflow-hidden rounded-lg bg-surface-soft">
                  <Image
                    src={sub.image}
                    alt=""
                    width={288}
                    height={288}
                    unoptimized
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="type-body-sm mt-3 block text-body transition-colors group-hover:text-ink group-hover:underline group-hover:underline-offset-4">
                  {sub.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-hairline-soft pt-5">
          <span onClick={onNavigate}>
            <ArrowLink href={item.panel.allHref}>
              {item.label} — {item.panel.allLabel}
            </ArrowLink>
          </span>
        </div>
      </Container>
    </div>
  );
}
