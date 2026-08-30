"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll дээр агуулгыг зөөлөн гийлгэнэ — «гэрэл асах» motion хэлний нэг хэсэг.
 * IntersectionObserver дэмжигдэхгүй орчинд агуулга шууд харагдана.
 */
export function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If IntersectionObserver is not available, show immediately
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
