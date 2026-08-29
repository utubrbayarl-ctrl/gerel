import type { ReactNode } from "react";

/** Хуудасны агуулгын нэгдсэн өргөн */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
