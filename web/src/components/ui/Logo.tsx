/**
 * Брэндийн тэмдэг: туяа сацруулж буй гэрлийн цэг + TES SKY wordmark.
 * Өнгө нь currentColor-оос удамшдаг тул цайвар/бараан аль ч дэвсгэрт зохино.
 */
export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const textSize = size === "sm" ? "text-[22px]" : "text-[26px] lg:text-[30px]";
  const markSize = size === "sm" ? "size-4" : "size-5";

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display tracking-[0.18em] ${textSize} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${markSize} shrink-0`}
        fill="none"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
        <g strokeWidth="1.25" strokeLinecap="round" opacity="0.65">
          <path d="M12 1.5v3.5" />
          <path d="M12 19v3.5" />
          <path d="M1.5 12h3.5" />
          <path d="M19 12h3.5" />
          <path d="M4.6 4.6l2.5 2.5" />
          <path d="M16.9 16.9l2.5 2.5" />
          <path d="M19.4 4.6l-2.5 2.5" />
          <path d="M7.1 16.9l-2.5 2.5" />
        </g>
      </svg>
      TES SKY
    </span>
  );
}
