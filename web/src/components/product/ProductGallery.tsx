"use client";

import Image from "next/image";
import { useState } from "react";

/** Барааны зургийн галерей — үндсэн зураг + жижиг сонголтууд */
export function ProductGallery({
  images,
  alt,
}: {
  images: readonly string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-lg bg-surface-soft">
        <Image
          src={images[active] ?? images[0]}
          alt={alt}
          width={800}
          height={800}
          priority
          unoptimized
          className="aspect-square w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${i + 1}-р зураг`}
                aria-current={active === i}
                className={`block w-20 overflow-hidden rounded-md border-2 transition-colors ${
                  active === i ? "border-ink" : "border-transparent hover:border-hairline"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={160}
                  unoptimized
                  className="aspect-square w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
