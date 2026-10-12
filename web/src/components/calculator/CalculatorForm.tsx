"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { rooms } from "@/data/rooms";
import { formatPrice } from "@/lib/format";
import {
  AREA_MAX,
  AREA_MIN,
  HEIGHT_MAX,
  HEIGHT_MIN,
  calculateLighting,
  type CalculatorResult,
} from "@/lib/calculator/calculate";
import {
  suggestFixtures,
  type FixtureCandidate,
} from "@/lib/calculator/suggest";

interface Outcome {
  readonly result: CalculatorResult;
  readonly roomSlug: string;
  readonly suggestions: readonly FixtureCandidate[];
}

/**
 * Гэрэлтүүлгийн тооцоолуур — бүх тооцоо хөтөч дээр, цэвэр функцээр хийгдэнэ.
 * Оролт буруу бол үр дүнг цэвэрлэж, алдааг ойлгомжтой мессежээр харуулна.
 */
export function CalculatorForm({
  candidates,
}: {
  candidates: readonly FixtureCandidate[];
}) {
  const [roomSlug, setRoomSlug] = useState(rooms[0].slug);
  const [area, setArea] = useState("20");
  const [height, setHeight] = useState("2.5");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [errors, setErrors] = useState<readonly string[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const computed = calculateLighting({
      roomSlug,
      areaM2: Number.parseFloat(area),
      ceilingHeightM: Number.parseFloat(height),
    });

    if (!computed.ok) {
      setErrors(computed.errors);
      setOutcome(null);
      return;
    }

    const lumenPerFixture =
      computed.result.totalLumen / computed.result.fixtureCount;
    setErrors([]);
    setOutcome({
      result: computed.result,
      roomSlug,
      suggestions: suggestFixtures(candidates, roomSlug, lumenPerFixture, 4),
    });
  }

  const fieldClass =
    "mt-2 w-full rounded-md border border-hairline bg-canvas px-4 py-3 text-ink";

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
      {/* noValidate — HTML5-ийн өөрийн шалгалт submit-ийг блоклочихвол
          бидний монгол алдааны мессеж хэзээ ч харагдахгүй болно */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="h-fit rounded-xl bg-surface-soft p-7"
      >
        <div>
          <label htmlFor="room" className="type-caption-uppercase text-muted">
            Өрөөний төрөл
          </label>
          <select
            id="room"
            value={roomSlug}
            onChange={(e) => setRoomSlug(e.target.value)}
            className={fieldClass}
          >
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label htmlFor="area" className="type-caption-uppercase text-muted">
            Талбай (м²)
          </label>
          <input
            id="area"
            type="number"
            inputMode="decimal"
            step="0.5"
            min={AREA_MIN}
            max={AREA_MAX}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="height" className="type-caption-uppercase text-muted">
            Таазны өндөр (м)
          </label>
          <input
            id="height"
            type="number"
            inputMode="decimal"
            step="0.1"
            min={HEIGHT_MIN}
            max={HEIGHT_MAX}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          className="type-button mt-7 w-full rounded-md bg-primary px-5 py-3.5 text-on-primary transition-colors hover:bg-primary-active"
        >
          Тооцоолох
        </button>

        {errors.length > 0 && (
          <ul role="alert" className="mt-5 space-y-1.5">
            {errors.map((message) => (
              <li key={message} className="type-body-sm text-error">
                {message}
              </li>
            ))}
          </ul>
        )}
      </form>

      {outcome && (
        <div role="status" className="h-fit">
          <dl className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-surface-card p-6">
              <dt className="type-caption-uppercase text-muted">Нийт гэрлийн урсгал</dt>
              <dd className="type-display-sm mt-2">
                {outcome.result.totalLumen.toLocaleString("en-US")} лм
              </dd>
            </div>
            <div className="rounded-lg bg-surface-card p-6">
              <dt className="type-caption-uppercase text-muted">Санал болгох гэрлийн тоо</dt>
              <dd className="type-display-sm mt-2">{outcome.result.fixtureCount} ш</dd>
            </div>
            <div className="rounded-lg bg-surface-card p-6">
              <dt className="type-caption-uppercase text-muted">Өнгөний температур</dt>
              <dd className="type-display-sm mt-2">
                {outcome.result.recommendedKelvin}K
              </dd>
            </div>
          </dl>

          <p className="type-body-sm mt-5 max-w-prose text-muted">
            Тооцоо нь {outcome.result.luxTarget} люксийн норм, таазны өндрийн{" "}
            {outcome.result.ceilingFactor} коэффициент дээр үндэслэв. Энэ нь
            ерөнхий гэрэлтүүлгийн зөвлөмж — ажлын гадаргуу, толь зэрэгт нэмэлт
            гэрэл шаардаж болно.
          </p>

          {outcome.suggestions.length > 0 && (
            <>
              <h2 className="type-title-lg mt-10">Тохирох бүтээгдэхүүн</h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
                {outcome.suggestions.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/product/${c.slug}`} className="group block">
                      <span className="glow-warm relative block overflow-hidden rounded-lg bg-surface-soft">
                        <Image
                          src={c.image}
                          alt={c.name}
                          width={800}
                          height={800}
                          unoptimized
                          className="aspect-square w-full object-cover"
                        />
                      </span>
                      <span className="type-body-md mt-3 block text-body transition-colors group-hover:text-ink">
                        {c.name}
                      </span>
                      <span className="type-body-sm mt-1 block text-muted">
                        {c.lumen} лм · <span>{formatPrice(c.price)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
