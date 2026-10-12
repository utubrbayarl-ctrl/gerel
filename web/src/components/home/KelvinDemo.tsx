"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import {
  KELVIN_MAX,
  KELVIN_MIN,
  kelvinDescription,
  kelvinLabel,
  kelvinOverlay,
} from "@/lib/kelvin";

const PRESETS = [2700, 4000, 6500] as const;

/**
 * Kelvin-ийн ялгааг мэдрүүлэх интерактив үзүүлэн: слайдер чирэхэд
 * өрөөний зураг дээрх гэрлийн давхарга дулаанаас хүйтэн рүү шилжинэ.
 */
export function KelvinDemo() {
  const [kelvin, setKelvin] = useState<number>(KELVIN_MIN);

  return (
    <section className="ray-sweep relative overflow-hidden bg-surface-dark py-16 text-on-dark md:py-24">
      <Container className="relative">
        <p className="type-caption-uppercase text-on-dark-soft">Гэрлийн мэдлэг</p>
        <h2 className="type-display-md mt-3 max-w-2xl !text-on-dark">
          Өнгөний температурыг мэдрээрэй
        </h2>
        <p className="type-body-md mt-4 max-w-2xl text-on-dark-soft">
          Kelvin (K) нь гэрлийн өнгөний дулаан, хүйтнийг илэрхийлнэ. Слайдерыг
          чирээд ижил өрөө хэрхэн өөрчлөгдөхийг харна уу.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/images/heroes/home-photo.jpg"
              alt="Зочны өрөөний гэрэлтүүлгийн жишээ"
              width={1200}
              height={800}
              unoptimized
              className="w-full object-cover"
            />
            <div
              data-kelvin-overlay
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-colors duration-300 motion-reduce:transition-none"
              style={{ backgroundColor: kelvinOverlay(kelvin) }}
            />
          </div>

          <div>
            <p className="type-display-sm !text-on-dark">{kelvin}K</p>
            <p className="type-title-md mt-1 !text-on-dark">{kelvinLabel(kelvin)}</p>
            <p className="type-body-sm mt-3 text-on-dark-soft">
              {kelvinDescription(kelvin)}
            </p>

            <label htmlFor="kelvin" className="sr-only">
              Өнгөний температур
            </label>
            <input
              id="kelvin"
              type="range"
              min={KELVIN_MIN}
              max={KELVIN_MAX}
              step={100}
              value={kelvin}
              onChange={(e) => setKelvin(Number(e.target.value))}
              className="mt-7 w-full accent-accent-amber"
            />

            <div className="mt-5 flex flex-wrap gap-2.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setKelvin(preset)}
                  aria-pressed={kelvin === preset}
                  className={`type-caption rounded-full border px-4 py-2 transition-colors ${
                    kelvin === preset
                      ? "border-on-dark bg-on-dark text-ink"
                      : "border-on-dark/40 text-on-dark-soft hover:text-on-dark"
                  }`}
                >
                  {preset}K {kelvinLabel(preset)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
