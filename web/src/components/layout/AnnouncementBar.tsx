import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";

/** Хамгийн дээд хар зарын зурвас — reference 1-ийн хэв маягаар */
export function AnnouncementBar() {
  return (
    <div className="bg-surface-dark text-on-dark">
      <Container className="flex h-10 items-center justify-between gap-4">
        <span className="hidden w-40 md:block" aria-hidden="true" />
        <p className="type-caption-uppercase truncate text-center text-on-dark-soft">
          {site.announcement}
        </p>
        <a
          href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
          className="type-caption inline-flex w-auto shrink-0 items-center gap-1.5 text-on-dark-soft transition-colors hover:text-on-dark md:w-40 md:justify-end"
        >
          <PhoneIcon />
          <span className="hidden sm:inline">{site.phone}</span>
        </a>
      </Container>
    </div>
  );
}
