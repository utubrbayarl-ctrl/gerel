import { site } from "@/data/site";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

/**
 * «Мэдээлэл авах» блок — сайт худалдан авалтгүй тул сонирхсон хэрэглэгчийг
 * дэлгүүр рүү чиглүүлнэ.
 */
export function ContactCard() {
  return (
    <div className="rounded-lg bg-surface-card p-6">
      <h2 className="type-title-sm">Дэлгэрэнгүй мэдээлэл авах</h2>
      <p className="type-body-sm mt-2 text-body">
        Үнэ, нөөц, суурилуулалтын талаар манай дэлгүүрээс лавлана уу.
      </p>
      <a
        href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
        className="type-title-lg mt-4 inline-flex items-center gap-3 text-ink transition-colors hover:text-primary"
      >
        <PhoneIcon className="size-5" />
        {site.phone}
      </a>
      <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
        <li className="type-body-sm flex items-start gap-2.5 text-body">
          <MapPinIcon className="mt-0.5 size-4 shrink-0" />
          {site.address}
        </li>
        <li className="type-body-sm flex items-start gap-2.5 text-body">
          <ClockIcon className="mt-0.5 size-4 shrink-0" />
          {site.hours}
        </li>
      </ul>
    </div>
  );
}
