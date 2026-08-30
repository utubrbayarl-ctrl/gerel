import Link from "next/link";
import { categories } from "@/data/categories";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

const infoLinks = [
  { href: "/rooms", label: "Өрөөгөөр үзэх" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/about", label: "Холбоо барих" },
] as const;

/** Хөл хэсэг — surface-dark дэвсгэртэй */
export function SiteFooter() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size="sm" className="text-on-dark" />
          <p className="type-body-sm mt-4 max-w-xs leading-relaxed">
            {site.description}
          </p>
        </div>

        <nav aria-label="Ангилал">
          <h2 className="type-caption-uppercase text-on-dark">Ангилал</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="type-body-sm transition-colors hover:text-on-dark"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Өрөөгөөр">
          <h2 className="type-caption-uppercase text-on-dark">Өрөөгөөр</h2>
          <ul className="mt-4 space-y-2.5">
            {rooms.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/rooms/${r.slug}`}
                  className="type-body-sm transition-colors hover:text-on-dark"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="type-caption-uppercase text-on-dark">Холбоо барих</h2>
          <ul className="mt-4 space-y-3">
            <li className="type-body-sm flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" />
              {site.address}
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="type-body-sm flex items-center gap-2.5 transition-colors hover:text-on-dark"
              >
                <PhoneIcon className="size-4 shrink-0" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="type-body-sm flex items-center gap-2.5 transition-colors hover:text-on-dark"
              >
                <MailIcon className="size-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li className="type-body-sm flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 size-4 shrink-0" />
              {site.hours}
            </li>
          </ul>
          <ul className="mt-5 space-y-2.5">
            {infoLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="type-body-sm transition-colors hover:text-on-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-surface-dark-elevated">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="type-caption text-on-dark-soft">
            © 2026 {site.name}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-6">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="type-caption transition-colors hover:text-on-dark"
            >
              Facebook
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="type-caption transition-colors hover:text-on-dark"
            >
              Instagram
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
