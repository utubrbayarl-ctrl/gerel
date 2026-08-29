import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="type-caption-uppercase text-muted">404</p>
      <h1 className="type-display-md mt-3">Хуудас олдсонгүй</h1>
      <p className="type-body-md mt-4 max-w-md text-muted">
        Таны хайсан хуудас байхгүй эсвэл шилжсэн байна. Нүүр хуудаснаас
        хэрэгтэй зүйлээ олоорой.
      </p>
      <Link
        href="/"
        className="type-button mt-8 inline-flex items-center gap-2 rounded-md border border-ink px-6 py-3 text-ink transition-colors hover:bg-surface-soft"
      >
        Нүүр хуудас руу буцах
        <ArrowRightIcon />
      </Link>
    </Container>
  );
}
