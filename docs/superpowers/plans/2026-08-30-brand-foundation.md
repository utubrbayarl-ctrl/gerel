# Tes Sky — Брэнд суурь ба motion (Төлөвлөгөө 1/4)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сайтад брэндийн бодит дүр төрх (лого, гүнзгийрүүлсэн өнгө, «зөвлөх» дуу хоолой) болон «гэрэл асах» motion хэлийг нэвтрүүлж, «яаруу хийсэн» мэдрэмжийг арилгах.

**Architecture:** Одоогийн Next.js 16 SSG бүтэц хэвээрээ. Шинэ дизайн токенууд `globals.css`-ийн `@theme` блокт нэмэгдэнэ; лого нь тусдаа server компонент; motion нь ганц `Reveal` client компонент (IntersectionObserver) + CSS-ээр хийгдэнэ — гуравдагч талын анимацийн сан авахгүй. Брэндийн бүх текст `src/data/brand.ts`-д төвлөрнө.

**Tech Stack:** Next.js 16.3.3 (App Router, SSG), React 19.2.8, Tailwind CSS v4 (`@theme` токен), TypeScript 5, Vitest 4 + Testing Library, Playwright.

## Global Constraints

- Брэндийн албан нэр: **Tes Sky**. Кодод `site.name` = `"Tes Sky"`, лого текст `TES SKY`. «ГЭРЭЛ» гэдгийг хэрэглэгчид харагдах текстэд ХЭРЭГЛЭХГҮЙ (энэ нь зөвхөн repo-гийн нэр).
- Албан tagline: **«Гэрэл орон зайг өөрчилнө»**.
- Шинэ өнгө зохиохгүй. Зөвхөн `web/src/app/globals.css`-ийн `@theme`-д одоо байгаа токенууд болон энэ төлөвлөгөөнд заасан үүсмэл (glow/shadow) утгуудыг хэрэглэнэ.
- Акцент өнгөний утга: `--color-accent-amber: #e8a55a` = «гэрлийн туяа». `--color-primary: #cc785c` = CTA.
- Бүх анимаци `prefers-reduced-motion: reduce` үед бүрэн унтарна.
- Гуравдагч талын анимацийн сан (GSAP, Framer Motion) нэмэхгүй. `package.json`-д шинэ dependency нэмэхгүй.
- Дуу хоолой: «зөвлөх», худалдагч биш. Анхаарлын тэмдэг, «Хямд!», «Яаравчил!» маягийн үг хэрэглэхгүй.
- Тест: `npm test` (vitest) бүх алхмын дараа ногоон байна. Шинэ логик бүр тесттэй.
- Бүх commit нь `<type>: <тайлбар>` форматтай, тайлбар монголоор.
- Ажлын хавтас: бүх команд `web/` дотроос ажиллана.

---

## File Structure

| Файл | Үүрэг |
|---|---|
| `web/src/app/globals.css` | Токен нэмэлт: glow shadow, туяаны gradient, reveal keyframes (Modify) |
| `web/src/data/brand.ts` | Брэндийн бүх текст: tagline, түүх, үнэт зүйл, B2B итгэлийн блок (Create) |
| `web/src/data/site.ts` | Байгууллагын мэдээлэл — tagline-г brand.ts-ээс татна (Modify) |
| `web/src/components/ui/Logo.tsx` | SVG wordmark + туяаны цэг, 2 өнгөний хувилбар (Create) |
| `web/src/components/ui/Logo.test.tsx` | Логоны тест (Create) |
| `web/src/components/ui/Reveal.tsx` | IntersectionObserver-т суурилсан scroll reveal (Create) |
| `web/src/components/ui/Reveal.test.tsx` | Reveal-ийн тест (Create) |
| `web/src/components/layout/SiteHeader.tsx` | Логог компонентоор солино (Modify) |
| `web/src/components/layout/SiteFooter.tsx` | Логог компонентоор солино (Modify) |
| `web/src/components/home/HomeHero.tsx` | «Гэрэл асах» ачаалалтын анимаци + tagline brand.ts-ээс (Modify) |
| `web/src/components/home/FeaturedProducts.tsx` | Бараан showroom section болгоно + Reveal (Modify) |
| `web/src/components/product/ProductCard.tsx` | Hover дээр дулаан glow (Modify) |
| `web/src/app/about/page.tsx` | Брэндийн түүх, үнэт зүйлийг brand.ts-ээс авч дахин бичнэ (Modify) |
| `web/e2e/smoke.spec.ts` | Лого, hero-ийн smoke шалгалт (Modify) |

---

## Task 1: Брэндийн контентын эх сурвалж (`brand.ts`)

Бүх брэндийн текстийг нэг файлд төвлөрүүлнэ. Дараагийн бүх task үүнээс уншина.

**Files:**
- Create: `web/src/data/brand.ts`
- Create: `web/src/data/brand.test.ts`
- Modify: `web/src/data/site.ts`

**Interfaces:**
- Consumes: юу ч биш (эхний task).
- Produces: `export const brand` — талбарууд: `tagline: string`, `story: readonly string[]` (About-ийн догол мөрүүд), `values: readonly { title: string; text: string }[]` (яг 3 ширхэг), `b2bTrust: readonly { title: string; text: string }[]` (яг 3 ширхэг), `heroCta: string`.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/data/brand.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { brand } from "./brand";

describe("brand", () => {
  it("албан tagline-тай", () => {
    expect(brand.tagline).toBe("Гэрэл орон зайг өөрчилнө");
  });

  it("About-д зориулсан 2-оос доошгүй догол мөртэй түүхтэй", () => {
    expect(brand.story.length).toBeGreaterThanOrEqual(2);
    for (const p of brand.story) {
      expect(p.length).toBeGreaterThan(80);
    }
  });

  it("яг 3 үнэт зүйлтэй", () => {
    expect(brand.values).toHaveLength(3);
  });

  it("барилгын компаниудад зориулсан яг 3 итгэлийн блоктой", () => {
    expect(brand.b2bTrust).toHaveLength(3);
  });

  it("бүх текст худалдагчийн аялгуугүй — анхаарлын тэмдэггүй", () => {
    const all = [
      brand.tagline,
      brand.heroCta,
      ...brand.story,
      ...brand.values.flatMap((v) => [v.title, v.text]),
      ...brand.b2bTrust.flatMap((v) => [v.title, v.text]),
    ].join(" ");
    expect(all).not.toContain("!");
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- brand`
Хүлээх үр дүн: FAIL — `Cannot find module './brand'`.

- [ ] **Step 3: `brand.ts` бичих**

`web/src/data/brand.ts`:

```ts
/**
 * Брэндийн бүх харагдах текст — НЭГ газраас удирдана.
 * Аялгуу: зөвлөх, мэргэжлийн-халуун дулаан. Худалдагчийн шахалт байхгүй.
 */
export const brand = {
  tagline: "Гэрэл орон зайг өөрчилнө",
  heroCta: "Цуглуулга үзэх",

  story: [
    "Tes Sky нь шинэ гэрээ тохижуулж буй хүмүүс болон барилгын төсөл хэрэгжүүлэгчдэд зориулсан гэрэлтүүлгийн бүтээгдэхүүнийг сонгон импортолдог. Бид гэрлийг цахилгаан хэрэгсэл гэж биш, орон зайн уур амьсгалыг бүтээдэг материал гэж хардаг.",
    "Бүтээгдэхүүн бүрийг гурван шалгуураар шүүнэ: гэрлийн чанар буюу өнгө үнэн зөв гаргах чадвар, эдэлгээ буюу LED модулийн бодит наслалт, мөн Монголын 220V сүлжээ, өвлийн хэлбэлзэлд тэсвэртэй эсэх.",
    "Хэмжээс, өнгөний температур, гэрлийн урсгал зэрэг үзүүлэлтийг бид бүрэн, чимэггүй мэдээлдэг. Зөв сонголт нь зөв мэдээллээс эхэлдэг гэдэгт бид итгэдэг.",
  ],

  values: [
    {
      title: "Сонгомол загвар",
      text: "Цаг хугацаа элээхгүй, олон жил хуучрахгүй загваруудыг сонгож авчирдаг. Түр зуурын хэв маягийн араас хөөцөлддөггүй.",
    },
    {
      title: "Мэргэжлийн зөвлөгөө",
      text: "Kelvin, люмен, IP зэрэглэл — аль нь танд яг хэрэгтэйг өрөө бүрээр тань тооцож, энгийнээр тайлбарлана.",
    },
    {
      title: "Суурилуулалтын дэмжлэг",
      text: "Сонгосон бүтээгдэхүүнээ хэрхэн байрлуулах, ямар өндөрт өлгөх талаар зөвлөж, шаардлагатай бол мэргэжлийн хүнтэй холбоно.",
    },
  ],

  b2bTrust: [
    {
      title: "Төслийн нийлүүлэлт",
      text: "Зураг төслийн үе шатнаас эхлэн гэрэлтүүлгийн сонголтод оролцож, барилгын хугацаанд тааруулан үе шаттай нийлүүлнэ.",
    },
    {
      title: "Тогтвортой нөөц",
      text: "Нэг төсөлд хэрэглэсэн загварыг дараагийн ээлжид ч нийлүүлэх боломжтой байхаар нөөцөө төлөвлөдөг.",
    },
    {
      title: "Баталгаа ба солилт",
      text: "LED модулийн үйлдвэрийн баталгааг бүрэн хүлээн авч, гэмтэлтэй бүтээгдэхүүнийг солих журамтай ажилладаг.",
    },
  ],
} as const;
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- brand`
Хүлээх үр дүн: PASS — 5 тест.

- [ ] **Step 5: `site.ts`-г brand-тай холбох**

`web/src/data/site.ts`-д `tagline`-г brand-аас авахаар өөрчилнө. `import { brand } from "./brand";` мөрийг файлын эхэнд нэмээд, `tagline: "Гэрэлтүүлгийн дэлгүүр",` мөрийг дараахаар солино:

```ts
  tagline: brand.tagline,
```

- [ ] **Step 6: Бүх тест ажиллуулах**

Ажиллуулах: `npm test`
Хүлээх үр дүн: PASS — өмнөх 61 + шинэ 5 = 66 тест.

- [ ] **Step 7: Commit**

```bash
git add src/data/brand.ts src/data/brand.test.ts src/data/site.ts
git commit -m "feat: брэндийн контентын нэгдсэн эх сурвалж (brand.ts)"
```

---

## Task 2: Лого компонент

**Files:**
- Create: `web/src/components/ui/Logo.tsx`
- Create: `web/src/components/ui/Logo.test.tsx`
- Modify: `web/src/components/layout/SiteHeader.tsx:75-81`
- Modify: `web/src/components/layout/SiteFooter.tsx:19-22`

**Interfaces:**
- Consumes: юу ч биш.
- Produces: `export function Logo(props: { className?: string; size?: "sm" | "md" })` — `<span>` буцаана: SVG туяаны цэг + `TES SKY` текст. Өнгө нь `currentColor`-оос удамшина (эцэг элемент `text-on-dark` эсвэл `text-ink` өгнө).

- [ ] **Step 1: Тест бичих (унана)**

`web/src/components/ui/Logo.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("брэндийн нэрийг харуулна", () => {
    render(<Logo />);
    expect(screen.getByText("TES SKY")).toBeInTheDocument();
  });

  it("туяаны тэмдгийг дэлгэц уншигчаас нуудаг", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("нэмэлт className-ийг дамжуулна", () => {
    const { container } = render(<Logo className="text-on-dark" />);
    expect(container.firstChild).toHaveClass("text-on-dark");
  });

  it("sm хэмжээнд жижиг фонтын класс өгнө", () => {
    const { container } = render(<Logo size="sm" />);
    expect(container.firstChild).toHaveClass("text-[22px]");
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- Logo`
Хүлээх үр дүн: FAIL — `Cannot find module './Logo'`.

- [ ] **Step 3: `Logo.tsx` бичих**

`web/src/components/ui/Logo.tsx`:

```tsx
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
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- Logo`
Хүлээх үр дүн: PASS — 4 тест.

- [ ] **Step 5: Header-т логог хэрэглэх**

`web/src/components/layout/SiteHeader.tsx`:

Импортын хэсэгт нэмэх (`MegaPanel` импортын өмнө):

```tsx
import { Logo } from "@/components/ui/Logo";
```

Дараах блокийг:

```tsx
        <Link
          href="/"
          onClick={closeAll}
          className="font-display text-[26px] tracking-[0.18em] text-current lg:text-[30px]"
        >
          TES SKY
        </Link>
```

үүгээр солино:

```tsx
        <Link href="/" onClick={closeAll} aria-label="Tes Sky — нүүр хуудас">
          <Logo className="text-current" />
        </Link>
```

- [ ] **Step 6: Footer-т логог хэрэглэх**

`web/src/components/layout/SiteFooter.tsx`:

Импортын хэсэгт нэмэх (`Container` импортын дараа):

```tsx
import { Logo } from "@/components/ui/Logo";
```

Дараах блокийг:

```tsx
          <p className="font-display text-2xl tracking-[0.18em] text-on-dark">
            TES SKY
          </p>
```

үүгээр солино:

```tsx
          <Logo size="sm" className="text-on-dark" />
```

- [ ] **Step 7: Бүх тест + build шалгах**

Ажиллуулах: `npm test && npm run build`
Хүлээх үр дүн: тест PASS (70 тест), build амжилттай.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/Logo.tsx src/components/ui/Logo.test.tsx src/components/layout/SiteHeader.tsx src/components/layout/SiteFooter.tsx
git commit -m "feat: Tes Sky лого компонент — туяаны тэмдэг + wordmark"
```

---

## Task 3: Motion токен ба «гэрэл асах» CSS

Анимацийн бүх суурийг CSS-д нэг удаа тодорхойлно. Дараагийн task-ууд зөвхөн класс хэрэглэнэ.

**Files:**
- Modify: `web/src/app/globals.css:47-49` (`@theme` блокийн төгсгөл) ба файлын төгсгөл

**Interfaces:**
- Consumes: одоогийн `@theme` токенууд (`--color-accent-amber`, `--color-surface-dark`).
- Produces: CSS утилити классууд — `.reveal` (эхний нуугдмал төлөв), `.reveal-visible` (харагдах төлөв), `.glow-warm` (дулаан glow сүүдэр), `.hero-lightup` (нэг удаагийн асалт), `.ray-sweep` (бараан section дээрх туяаны gradient). Мөн `--shadow-glow-warm`, `--duration-reveal` токен.

- [ ] **Step 1: `@theme` блокт токен нэмэх**

`web/src/app/globals.css`, `--spacing-section: 96px;` мөрийн ДАРАА, хаах `}` -ийн ӨМНӨ нэмэх:

```css
  /* Motion — «гэрэл асах» хэл. Бүх анимаци эдгээрээс үүснэ. */
  --duration-reveal: 700ms;
  --duration-lightup: 800ms;
  --ease-glow: cubic-bezier(0.22, 0.61, 0.36, 1);
  /* Дулаан glow — accent-amber (#e8a55a)-ийн тунгалаг хувилбар */
  --shadow-glow-warm: 0 18px 48px -20px rgba(232, 165, 90, 0.55);
```

- [ ] **Step 2: Анимацийн класс нэмэх**

`web/src/app/globals.css`-ийн ТӨГСГӨЛД нэмэх:

```css
/* ── Motion: «гэрэл асах» ────────────────────────────────────────────
   Бүх анимаци reduced-motion үед бүрэн унтарна. */

.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity var(--duration-reveal) var(--ease-glow),
    transform var(--duration-reveal) var(--ease-glow);
}

.reveal-visible {
  opacity: 1;
  transform: none;
}

.glow-warm {
  transition:
    box-shadow var(--duration-reveal) var(--ease-glow),
    transform var(--duration-reveal) var(--ease-glow);
}

.glow-warm:hover {
  box-shadow: var(--shadow-glow-warm);
}

@keyframes hero-lightup {
  from {
    opacity: 0.35;
    filter: brightness(0.6);
  }
  to {
    opacity: 1;
    filter: brightness(1);
  }
}

.hero-lightup {
  animation: hero-lightup var(--duration-lightup) var(--ease-glow) both;
}

@keyframes ray-sweep {
  0%,
  100% {
    opacity: 0.25;
    transform: translateX(-6%);
  }
  50% {
    opacity: 0.5;
    transform: translateX(6%);
  }
}

/* Бараан section-ы дээгүүр аажим хөвөх алтлаг туяа */
.ray-sweep::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    60% 55% at 50% 0%,
    rgba(232, 165, 90, 0.16),
    transparent 70%
  );
  animation: ray-sweep 14s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .glow-warm,
  .glow-warm:hover {
    transition: none;
    box-shadow: none;
  }
  .hero-lightup {
    animation: none;
  }
  .ray-sweep::before {
    animation: none;
    opacity: 0.25;
    transform: none;
  }
}
```

- [ ] **Step 3: Build шалгах**

Ажиллуулах: `npm run build`
Хүлээх үр дүн: амжилттай — CSS алдаагүй хөрвөнө.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: «гэрэл асах» motion токен ба CSS суурь"
```

---

## Task 4: `Reveal` компонент

Scroll дээр section-уудыг зөөлөн гийлгэх цорын ганц механизм.

**Files:**
- Create: `web/src/components/ui/Reveal.tsx`
- Create: `web/src/components/ui/Reveal.test.tsx`

**Interfaces:**
- Consumes: Task 3-ын `.reveal` / `.reveal-visible` класс.
- Produces: `export function Reveal(props: { children: ReactNode; className?: string; delayMs?: number })` — client компонент. Дотоод агуулгыг `<div>`-д ороож, харагдах хүртэл `.reveal`, харагдмагц `.reveal-visible` нэмнэ. `IntersectionObserver` байхгүй орчинд (тест, хуучин browser) шууд харагдана.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/components/ui/Reveal.test.tsx`:

```tsx
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("хүүхэд элементийг үргэлж рендерлэнэ", () => {
    render(<Reveal>агуулга</Reveal>);
    expect(screen.getByText("агуулга")).toBeInTheDocument();
  });

  it("IntersectionObserver байхгүй үед шууд харагдана", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<Reveal>агуулга</Reveal>);
    expect(container.firstChild).toHaveClass("reveal-visible");
  });

  it("харагдах хүртэл reveal-visible класс аваагүй байна", () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        disconnect = vi.fn();
        unobserve = vi.fn();
      },
    );
    const { container } = render(<Reveal>агуулга</Reveal>);
    expect(container.firstChild).not.toHaveClass("reveal-visible");
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("нэмэлт className-ийг хадгална", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { container } = render(<Reveal className="mt-8">агуулга</Reveal>);
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- Reveal`
Хүлээх үр дүн: FAIL — `Cannot find module './Reveal'`.

- [ ] **Step 3: `Reveal.tsx` бичих**

`web/src/components/ui/Reveal.tsx`:

```tsx
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
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
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
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- Reveal`
Хүлээх үр дүн: PASS — 4 тест.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Reveal.tsx src/components/ui/Reveal.test.tsx
git commit -m "feat: Reveal компонент — scroll дээр зөөлөн гийх"
```

---

## Task 5: Hero-гийн «асалт» ба tagline

**Files:**
- Modify: `web/src/components/home/HomeHero.tsx`

**Interfaces:**
- Consumes: Task 1-ийн `brand.tagline`, `brand.heroCta`; Task 3-ын `.hero-lightup` класс.
- Produces: өөрчлөлтгүй — `HomeHero` экспорт хэвээрээ.

- [ ] **Step 1: `HomeHero.tsx`-г бүтнээр солих**

```tsx
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Бүтэн дэлгэцийн hero. Transparent header-ийн доогуур орж
 * зураг нь дээд ирмэг хүртэл харагдана. Ачаалахад гэрэл нэг удаа «асна».
 */
export function HomeHero() {
  return (
    <section className="hero-lightup relative -mt-[72px] flex min-h-[540px] items-center justify-center overflow-hidden md:min-h-[78vh] lg:-mt-20">
      <Image
        src="/images/heroes/home-photo.jpg"
        alt=""
        fill
        priority
        unoptimized
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface-dark/45 via-surface-dark/15 to-surface-dark/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_35%,rgba(232,165,90,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative px-6 py-24 text-center">
        <h1 className="type-display-xl max-w-3xl text-balance !text-on-dark [text-shadow:0_2px_28px_rgba(20,20,19,0.55)]">
          {brand.tagline}
        </h1>
        <Link
          href="#angilal"
          className="type-button mt-9 inline-flex items-center gap-2.5 rounded-md border border-on-dark/70 px-7 py-3.5 text-on-dark transition-colors hover:bg-on-dark/10"
        >
          {brand.heroCta}
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: E2E smoke-д hero шалгалт нэмэх**

`web/e2e/smoke.spec.ts`-ийн ЭХНИЙ тестийн дотор, `toHaveTitle` мөрийн дараа нэмэх:

```ts
  await expect(
    page.getByRole("heading", { name: "Гэрэл орон зайг өөрчилнө", level: 1 }),
  ).toBeVisible();
```

- [ ] **Step 3: Тест ба build ажиллуулах**

Ажиллуулах: `npm test && npm run build`
Хүлээх үр дүн: PASS, build амжилттай.

- [ ] **Step 4: E2E ажиллуулах**

Ажиллуулах: `npm run e2e`
Хүлээх үр дүн: 3 тест PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HomeHero.tsx e2e/smoke.spec.ts
git commit -m "feat: hero-гийн гэрэл асах анимаци, tagline brand.ts-ээс"
```

---

## Task 6: Бараан showroom section ба картын glow

Нүүр хуудсанд бараан section оруулж, барааг гэрэлтэж харагдуулна.

**Files:**
- Modify: `web/src/components/ui/PriceBlock.tsx`
- Modify: `web/src/components/ui/Badge.tsx`
- Modify: `web/src/components/product/ProductCard.tsx`
- Modify: `web/src/components/product/ProductCard.test.tsx`
- Modify: `web/src/components/home/FeaturedProducts.tsx`
- Modify: `web/src/components/home/KelvinGuide.tsx`

**Interfaces:**
- Consumes: Task 3-ын `.ray-sweep`, `.glow-warm`; Task 4-ийн `Reveal`.
- Produces:
  - `PriceBlock(props: { price: number; size?: "md" | "lg"; onDark?: boolean })`
  - `NewBadge(props: { onDark?: boolean })`
  - `ProductCard(props: { product: Product; onDark?: boolean })`
  - Гурвуулаа `onDark` өгөгдөөгүй бол `false` — одоогийн цайвар харагдац бүрэн хэвээрээ.

**Анхаар:** `PriceBlock` одоо `text-ink`, `NewBadge` нь `bg-ink text-on-dark` хатуу бичигдсэн байгаа — бараан дэвсгэрт эдгээр харагдахгүй. Тиймээс Step 3-д тэдгээрийг эхэлж засна.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/components/product/ProductCard.test.tsx`-ийн ТӨГСГӨЛД, сүүлийн `});` -ийн ӨМНӨ нэмэх:

```tsx
  it("onDark үед үнэ бараан дэвсгэрт харагдах өнгөтэй болно", () => {
    const { container } = render(
      <ProductCard product={makeProduct({ price: 385000 })} onDark />,
    );
    expect(container.querySelector(".text-on-dark")).not.toBeNull();
    expect(container.querySelector(".text-ink")).toBeNull();
  });

  it("onDark байхгүй үед үнэ ink өнгөтэй хэвээрээ", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    expect(container.querySelector(".text-ink")).not.toBeNull();
  });

  it("үргэлж дулаан glow класстай", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    expect(container.querySelector(".glow-warm")).not.toBeNull();
  });
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- ProductCard`
Хүлээх үр дүн: FAIL — шинэ тестүүд унана (`onDark` prop байхгүй, `.glow-warm` класс байхгүй).

- [ ] **Step 3: `PriceBlock` ба `NewBadge`-д `onDark` нэмэх**

`web/src/components/ui/PriceBlock.tsx`-г бүтнээр солино:

```tsx
import { formatPrice } from "@/lib/format";

/** Үнэ. onDark — бараан showroom дэвсгэрт хэрэглэхэд өнгө сольдог. */
export function PriceBlock({
  price,
  size = "md",
  onDark = false,
}: {
  price: number;
  size?: "md" | "lg";
  onDark?: boolean;
}) {
  return (
    <span
      className={`${size === "lg" ? "type-display-sm" : "type-title-lg"} ${
        onDark ? "!text-on-dark" : "text-ink"
      }`}
    >
      {formatPrice(price)}
    </span>
  );
}
```

`web/src/components/ui/Badge.tsx`-ийн `NewBadge`-г дараахаар солино (`StockStatus` хэвээрээ — түүний `text-success` / `text-warning` өнгө бараан дэвсгэрт харагдана):

```tsx
/** Шинэ бараанд. onDark — бараан дэвсгэрт эсрэг өнгөөр харуулна. */
export function NewBadge({ onDark = false }: { onDark?: boolean } = {}) {
  return (
    <span
      className={`type-caption inline-flex items-center rounded-full px-3 py-1 ${
        onDark ? "bg-on-dark text-ink" : "bg-ink text-on-dark"
      }`}
    >
      Шинэ
    </span>
  );
}
```

- [ ] **Step 4: `ProductCard`-д `onDark` ба glow нэмэх**

`web/src/components/product/ProductCard.tsx`-г бүтнээр солино:

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { NewBadge, StockStatus } from "@/components/ui/Badge";
import { PriceBlock } from "@/components/ui/PriceBlock";

/**
 * Барааны карт: зураг → badge → үнэ → нэр → нөөцийн төлөв.
 * Hover үед бүрий орчны хоёр дахь зураг руу шилжиж, дулаан glow асна.
 * onDark — бараан showroom section дотор хэрэглэхэд текстийн өнгө сольдог.
 */
export function ProductCard({
  product,
  onDark = false,
}: {
  product: Product;
  onDark?: boolean;
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <span className="glow-warm relative block overflow-hidden rounded-lg bg-surface-soft">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={800}
          height={800}
          unoptimized
          className="aspect-square w-full object-cover"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            width={800}
            height={800}
            unoptimized
            aria-hidden="true"
            className="absolute inset-0 aspect-square w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </span>

      <span className="mt-4 flex min-h-7 items-center gap-2">
        {product.isNew && <NewBadge onDark={onDark} />}
      </span>

      <span className="mt-1.5 block">
        <PriceBlock price={product.price} onDark={onDark} />
      </span>

      <span
        className={`type-body-md mt-1.5 line-clamp-2 block transition-colors ${
          onDark
            ? "text-on-dark-soft group-hover:text-on-dark"
            : "text-body group-hover:text-ink"
        }`}
      >
        {product.name}
      </span>

      <span className="mt-2 block">
        <StockStatus product={product} />
      </span>
    </Link>
  );
}
```

- [ ] **Step 5: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- ProductCard`
Хүлээх үр дүн: PASS — бүх тест (өмнөх 3 + шинэ 3).

- [ ] **Step 6: `FeaturedProducts`-ыг бараан showroom болгох**

`web/src/components/home/FeaturedProducts.tsx`-г бүтнээр солино:

```tsx
import { productRepository } from "@/lib/repository/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";

/** Онцлох бүтээгдэхүүн — бараан showroom дэвсгэр дээр гэрэлтэж харагдана */
export function FeaturedProducts() {
  const featured = productRepository.getFeatured().slice(0, 8);
  return (
    <section className="ray-sweep relative overflow-hidden bg-surface-dark py-16 text-on-dark md:py-24">
      <Container className="relative">
        <Reveal>
          <p className="type-caption-uppercase text-on-dark-soft">Сонголт</p>
          <h2 className="type-display-md mt-3 !text-on-dark">
            Онцлох бүтээгдэхүүн
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {featured.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} onDark />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: `KelvinGuide`-д туяа ба `Reveal` нэмэх**

`web/src/components/home/KelvinGuide.tsx`:

Импортын хэсэгт нэмэх:

```tsx
import { Reveal } from "@/components/ui/Reveal";
```

`<section>`-ий классыг дараахаар солино:

```tsx
    <section className="ray-sweep relative overflow-hidden bg-surface-dark py-16 text-on-dark md:py-24">
```

`<Container>`-т `className="relative"` нэмээд, дотоод агуулгыг хоёр `Reveal`-д хуваана: эхнийх нь `<p>` + `<h2>` + тайлбар `<p>`, хоёр дахь нь (`delayMs={120}`) `<ul>`.

- [ ] **Step 8: Бүх тест ба build**

Ажиллуулах: `npm test && npm run build && npm run lint`
Хүлээх үр дүн: тест PASS, build амжилттай, lint цэвэр.

- [ ] **Step 9: Нүүр хуудсыг нүдээр шалгах**

Ажиллуулах: `npm run dev` (background), дараа нь `http://localhost:3000` нээж:
- Hero ачаалахад нэг удаа гийж асахыг харах
- Онцлох бүтээгдэхүүний хэсэг бараан дэвсгэртэй, картууд hover дээр дулаан glow авахыг харах
- Scroll дээр section-ууд зөөлөн гийж орж ирэхийг харах

- [ ] **Step 10: Commit**

```bash
git add src/components/ui/PriceBlock.tsx src/components/ui/Badge.tsx src/components/product/ProductCard.tsx src/components/product/ProductCard.test.tsx src/components/home/FeaturedProducts.tsx src/components/home/KelvinGuide.tsx
git commit -m "feat: бараан showroom section, картын дулаан glow, scroll reveal"
```

---

## Task 7: About хуудсыг брэндийн түүхээр дахин бичих

**Files:**
- Modify: `web/src/app/about/page.tsx`

**Interfaces:**
- Consumes: Task 1-ийн `brand.story`, `brand.values`, `brand.b2bTrust`; Task 4-ийн `Reveal`.
- Produces: өөрчлөлтгүй.

- [ ] **Step 1: Дотоод `VALUES` тогтмолыг устгаж brand.ts-ээс авах**

`web/src/app/about/page.tsx`-д:

1. Файлын дээд талын `const VALUES = [...] as const;` блокийг БҮТНЭЭР устгана.
2. Импортын хэсэгт нэмнэ:

```tsx
import { brand } from "@/data/brand";
import { Reveal } from "@/components/ui/Reveal";
```

3. `VALUES.map` → `brand.values.map` болгоно.

- [ ] **Step 2: Түүхийн догол мөрүүдийг brand.story-оос авах**

`web/src/app/about/page.tsx:41-53` дэх блокийг (хоёр гар бичмэл `<p>` агуулсан `<div>`) БҮТНЭЭР дараахаар солино:

```tsx
          <div className="type-body-md mt-6 max-w-prose space-y-4 leading-relaxed text-body">
            {brand.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
```

- [ ] **Step 3: Барилгын компаниудад зориулсан итгэлийн блок нэмэх**

`<ul>` (үнэт зүйлс) -ийн ДАРАА, хаах `</div>`-ийн ӨМНӨ нэмэх:

```tsx
          <Reveal className="mt-16">
            <section className="ray-sweep relative overflow-hidden rounded-xl bg-surface-dark p-8 text-on-dark md:p-10">
              <div className="relative">
                <p className="type-caption-uppercase text-on-dark-soft">
                  Барилгын компаниудад
                </p>
                <h2 className="type-display-sm mt-3 !text-on-dark">
                  Төсөлд зориулсан хамтын ажиллагаа
                </h2>
                <ul className="mt-8 grid gap-6 sm:grid-cols-3">
                  {brand.b2bTrust.map((item) => (
                    <li key={item.title}>
                      <h3 className="type-title-sm !text-on-dark">
                        {item.title}
                      </h3>
                      <p className="type-body-sm mt-2 text-on-dark-soft">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
```

- [ ] **Step 4: Хуудасны гарчгийг tagline-тай уялдуулах**

`web/src/app/about/page.tsx`-ийн `<h1>`-ийн доторх `Гэрэл — орон зайг өөрчилдөг хамгийн энгийн зүйл` текстийг `{brand.tagline}` болгож солино.

Мөн `site` импорт хэвээр хэрэглэгдэж байгааг шалгах (aside дотор `site.address`, `site.phone`, `site.email`, `site.hours` ашиглагдсаар байгаа тул устгахгүй).

- [ ] **Step 5: Тест, build, lint**

Ажиллуулах: `npm test && npm run build && npm run lint`
Хүлээх үр дүн: бүгд амжилттай.

- [ ] **Step 6: Хуудсыг нүдээр шалгах**

`http://localhost:3000/about` нээж брэндийн түүх, үнэт зүйл, бараан B2B блок зөв харагдахыг шалгана.

- [ ] **Step 7: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: About хуудас — брэндийн түүх, B2B итгэлийн блок"
```

---

## Дараагийн төлөвлөгөөнүүд

Энэ төлөвлөгөө дуусахад сайт брэндийн суурьтай, motion-той болно. Үлдсэн ажил тусдаа төлөвлөгөө болно (тус бүр өөрөө ажиллах, тестлэгдэх бүтээгдэхүүн гаргана):

2. **AI зургийн pipeline** — style bible, fal.ai script, 116 зураг, WebP optimize, `unoptimized` горимоос гарах.
3. **Гэрэлтүүлгийн тооцоолуур ба Kelvin үзүүлэн** — `src/lib/calculator/`, `/tooluur` хуудас, интерактив слайдер.
4. **B2B хуудас ба журнал** — `/b2b` (форм), `/zovlogoo` (6 нийтлэл, markdown → SSG).
