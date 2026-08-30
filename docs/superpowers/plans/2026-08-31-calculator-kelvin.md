# Tes Sky — Гэрэлтүүлгийн тооцоолуур ба Kelvin үзүүлэн (Төлөвлөгөө 3/4)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Шинэ байранд орж буй хэрэглэгч өрөөндөө хэдэн люмен гэрэл хэрэгтэйг тооцоолж, тохирох бараа санал авах `/tooluur` хуудас, мөн Kelvin-ийн ялгааг слайдераар мэдрүүлэх интерактив үзүүлэн нэмэх.

**Architecture:** Бүх тооцоо цэвэр функц болж `src/lib/calculator/`-т төвлөрнө — сервер шаардахгүй, SSG хэвээрээ. Хуудас нь server компонент болж барааны нимгэн проекцыг client форм руу дамжуулна (бүтэн `Product` объектыг client bundle-д явуулахгүй). Kelvin-ийн өнгө тооцоо мөн цэвэр функц (`src/lib/kelvin.ts`) болж, зөвхөн үзүүлэнгийн бүрхүүл нь client болно.

**Tech Stack:** Next.js 16.3.3 (App Router, SSG), React 19.2.8, Tailwind CSS v4, TypeScript 5, Vitest 4 + Testing Library, Playwright.

## Global Constraints

- Брэндийн албан нэр: **Tes Sky**. «ГЭРЭЛ» гэдгийг хэрэглэгчид харагдах текстэд ХЭРЭГЛЭХГҮЙ.
- Шинэ өнгө зохиохгүй. Зөвхөн `web/src/app/globals.css`-ийн `@theme`-д байгаа токенууд. Kelvin үзүүлэнгийн давхаргын өнгө нь тооцоолсон rgba бөгөөд энэ нь цорын ганц үл хамаарах зүйл (гэрлийн физик өнгийг илэрхийлнэ).
- `package.json`-д шинэ dependency нэмэхгүй.
- Дуу хоолой: «зөвлөх», худалдагч биш. Анхаарлын тэмдэг хэрэглэхгүй.
- Бүх хэрэглэгчид харагдах текст монголоор.
- Бүх анимаци/шилжилт `prefers-reduced-motion: reduce` үед унтарна.
- Тест: `npm test` бүх алхмын дараа ногоон. Эхлэх үеийн суурь: **74 тест / 8 файл**.
- `npm run lint` нь яг **1 алдаа** (`src/components/category/FilteredCatalog.tsx:120`, хуучин) харуулна — түүнийг ЗАСАХГҮЙ, шинэ алдаа нэмэхгүй.
- Бүх commit `<type>: <тайлбар>` форматтай, тайлбар монголоор.
- Ажлын хавтас: бүх команд `web/` дотроос.

---

## File Structure

| Файл | Үүрэг |
|---|---|
| `web/src/lib/calculator/standards.ts` | Өрөө бүрийн люкс норм, таазны өндрийн коэффициент, санал болгох Kelvin (Create) |
| `web/src/lib/calculator/calculate.ts` | Цэвэр тооцоо + оролтын шалгалт, төрлүүд (Create) |
| `web/src/lib/calculator/calculate.test.ts` | Тооцооны тест (Create) |
| `web/src/lib/calculator/suggest.ts` | Барааны нимгэн проекц + тохирох бараа сонгох цэвэр функц (Create) |
| `web/src/lib/calculator/suggest.test.ts` | Санал болгох логикийн тест (Create) |
| `web/src/components/calculator/CalculatorForm.tsx` | Client форм + үр дүн (Create) |
| `web/src/components/calculator/CalculatorForm.test.tsx` | Формын тест (Create) |
| `web/src/app/tooluur/page.tsx` | `/tooluur` хуудас, SEO metadata (Create) |
| `web/src/data/navigation.ts` | Цэсэнд «Тооцоолуур» нэмнэ (Modify) |
| `web/src/lib/kelvin.ts` | Kelvin → давхаргын өнгө + шошго, цэвэр функц (Create) |
| `web/src/lib/kelvin.test.ts` | Kelvin функцийн тест (Create) |
| `web/src/components/home/KelvinDemo.tsx` | Слайдертай интерактив үзүүлэн (Create) |
| `web/src/components/home/KelvinDemo.test.tsx` | Үзүүлэнгийн тест (Create) |
| `web/src/components/home/KelvinGuide.tsx` | Устгана — KelvinDemo орлоно (Delete) |
| `web/src/app/page.tsx` | KelvinGuide → KelvinDemo (Modify) |
| `web/e2e/smoke.spec.ts` | Тооцоолуур ба слайдерын e2e (Modify) |

---

## Task 1: Тооцооны цэвэр логик

**Files:**
- Create: `web/src/lib/calculator/standards.ts`
- Create: `web/src/lib/calculator/calculate.ts`
- Create: `web/src/lib/calculator/calculate.test.ts`

**Interfaces:**
- Consumes: юу ч биш.
- Produces:
  - `standards.ts`: `export const ROOM_STANDARDS: readonly RoomStandard[]` төрөл `interface RoomStandard { readonly slug: string; readonly luxTarget: number; readonly recommendedKelvin: number; }`; `export const AVERAGE_FIXTURE_LUMEN = 800;`; `export function ceilingFactor(heightM: number): number`.
  - `calculate.ts`: төрлүүд `CalculatorInput { roomSlug: string; areaM2: number; ceilingHeightM: number }`, `CalculatorResult { totalLumen: number; luxTarget: number; ceilingFactor: number; recommendedKelvin: number; fixtureCount: number }`, `CalculatorOutcome = { ok: true; result: CalculatorResult } | { ok: false; errors: readonly string[] }`; функц `export function calculateLighting(input: CalculatorInput): CalculatorOutcome`.
  - Хязгаарууд: `export const AREA_MIN = 1`, `AREA_MAX = 500`, `HEIGHT_MIN = 2`, `HEIGHT_MAX = 6`.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/lib/calculator/calculate.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { calculateLighting } from "./calculate";
import { ceilingFactor } from "./standards";

describe("ceilingFactor", () => {
  it("2.5м хүртэл суурь коэффициент 1", () => {
    expect(ceilingFactor(2.4)).toBe(1);
    expect(ceilingFactor(2.5)).toBe(1);
  });

  it("өндөр тааз тутамд коэффициент өснө", () => {
    expect(ceilingFactor(2.8)).toBe(1.2);
    expect(ceilingFactor(3.4)).toBe(1.4);
    expect(ceilingFactor(4)).toBe(1.6);
  });
});

describe("calculateLighting", () => {
  it("зочны өрөөний 20м², 2.5м таазанд 3000 люмен гаргана", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.luxTarget).toBe(150);
    expect(outcome.result.ceilingFactor).toBe(1);
    expect(outcome.result.totalLumen).toBe(3000);
    expect(outcome.result.recommendedKelvin).toBe(2700);
  });

  it("өндөр тааз люменийг нэмэгдүүлнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 3,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.totalLumen).toBe(3600);
  });

  it("гал тогоонд илүү өндөр норм, хүйтэвтэр Kelvin", () => {
    const outcome = calculateLighting({
      roomSlug: "gal-togoo",
      areaM2: 10,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.result.luxTarget).toBe(300);
    expect(outcome.result.totalLumen).toBe(3000);
    expect(outcome.result.recommendedKelvin).toBe(4000);
  });

  it("гэрлийн тоог дээш нь бүхэлчилнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    // 3000 / 800 = 3.75 → 4
    expect(outcome.result.fixtureCount).toBe(4);
  });

  it("үл мэдэгдэх өрөөг алдаа гэж үзнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "байхгүй-өрөө",
      areaM2: 20,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors).toHaveLength(1);
    expect(outcome.errors[0]).toContain("Өрөө");
  });

  it("хязгаараас гадуурх талбайг алдаа гэж үзнэ", () => {
    for (const areaM2 of [0, 0.5, 501, -3]) {
      const outcome = calculateLighting({
        roomSlug: "zochny",
        areaM2,
        ceilingHeightM: 2.5,
      });
      expect(outcome.ok).toBe(false);
    }
  });

  it("хязгаараас гадуурх таазны өндрийг алдаа гэж үзнэ", () => {
    for (const ceilingHeightM of [1.9, 6.1, 0]) {
      const outcome = calculateLighting({
        roomSlug: "zochny",
        areaM2: 20,
        ceilingHeightM,
      });
      expect(outcome.ok).toBe(false);
    }
  });

  it("тоо биш утгыг алдаа гэж үзнэ", () => {
    const outcome = calculateLighting({
      roomSlug: "zochny",
      areaM2: Number.NaN,
      ceilingHeightM: 2.5,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors[0]).toContain("Талбай");
  });

  it("хэд хэдэн алдааг зэрэг буцаана", () => {
    const outcome = calculateLighting({
      roomSlug: "байхгүй",
      areaM2: 0,
      ceilingHeightM: 99,
    });
    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.errors.length).toBe(3);
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- calculate`
Хүлээх үр дүн: FAIL — `Cannot find module './calculate'`.

- [ ] **Step 3: `standards.ts` бичих**

`web/src/lib/calculator/standards.ts`:

```ts
/**
 * Гэрэлтүүлгийн норм — EN 12464-1 болон орон сууцны практикт тулгуурласан
 * люкс утгууд. Өрөөний slug нь `src/data/rooms.ts`-ийнхтэй тохирно.
 */
export interface RoomStandard {
  readonly slug: string;
  /** Шаардлагатай гэрэлтэлт, люкс (лм/м²) */
  readonly luxTarget: number;
  /** Тухайн орон зайд тохирох өнгөний температур */
  readonly recommendedKelvin: number;
}

export const ROOM_STANDARDS: readonly RoomStandard[] = [
  { slug: "zochny", luxTarget: 150, recommendedKelvin: 2700 },
  { slug: "untlagyn", luxTarget: 100, recommendedKelvin: 2700 },
  { slug: "gal-togoo", luxTarget: 300, recommendedKelvin: 4000 },
  { slug: "azhlyn-uruu", luxTarget: 400, recommendedKelvin: 4000 },
  { slug: "ugaalgyn", luxTarget: 200, recommendedKelvin: 4000 },
  { slug: "khuukhdiin", luxTarget: 200, recommendedKelvin: 3000 },
];

/** Нэг ердийн LED чийдэнгийн ойролцоо гэрлийн урсгал */
export const AVERAGE_FIXTURE_LUMEN = 800;

/**
 * Тааз өндөр байх тусам гэрэл тархаж, ажлын гадаргууд хүрэх хэмжээ буурна.
 * 2.5м-ийг суурь болгож коэффициентээр нөхнө.
 */
export function ceilingFactor(heightM: number): number {
  if (heightM <= 2.5) return 1;
  if (heightM <= 3) return 1.2;
  if (heightM <= 3.5) return 1.4;
  return 1.6;
}
```

- [ ] **Step 4: `calculate.ts` бичих**

`web/src/lib/calculator/calculate.ts`:

```ts
import { AVERAGE_FIXTURE_LUMEN, ROOM_STANDARDS, ceilingFactor } from "./standards";

export const AREA_MIN = 1;
export const AREA_MAX = 500;
export const HEIGHT_MIN = 2;
export const HEIGHT_MAX = 6;

export interface CalculatorInput {
  readonly roomSlug: string;
  readonly areaM2: number;
  readonly ceilingHeightM: number;
}

export interface CalculatorResult {
  /** Нийт шаардлагатай гэрлийн урсгал, люмен */
  readonly totalLumen: number;
  readonly luxTarget: number;
  readonly ceilingFactor: number;
  readonly recommendedKelvin: number;
  /** Санал болгох гэрлийн тоо, дээш бүхэлчилсэн */
  readonly fixtureCount: number;
}

export type CalculatorOutcome =
  | { readonly ok: true; readonly result: CalculatorResult }
  | { readonly ok: false; readonly errors: readonly string[] };

function isValidNumber(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Өрөөний төрөл, талбай, таазны өндрөөс шаардлагатай гэрлийн урсгалыг тооцно.
 * Цэвэр функц — оролтыг өөрчлөхгүй, сүлжээ/сервер шаардахгүй.
 */
export function calculateLighting(input: CalculatorInput): CalculatorOutcome {
  const errors: string[] = [];

  const standard = ROOM_STANDARDS.find((s) => s.slug === input.roomSlug);
  if (!standard) {
    errors.push("Өрөөний төрлийг сонгоно уу.");
  }

  if (!isValidNumber(input.areaM2)) {
    errors.push("Талбайг тоогоор оруулна уу.");
  } else if (input.areaM2 < AREA_MIN || input.areaM2 > AREA_MAX) {
    errors.push(`Талбай ${AREA_MIN}-${AREA_MAX} м² хооронд байх ёстой.`);
  }

  if (!isValidNumber(input.ceilingHeightM)) {
    errors.push("Таазны өндрийг тоогоор оруулна уу.");
  } else if (
    input.ceilingHeightM < HEIGHT_MIN ||
    input.ceilingHeightM > HEIGHT_MAX
  ) {
    errors.push(`Таазны өндөр ${HEIGHT_MIN}-${HEIGHT_MAX} м хооронд байх ёстой.`);
  }

  if (!standard || errors.length > 0) {
    return { ok: false, errors };
  }

  const factor = ceilingFactor(input.ceilingHeightM);
  const totalLumen = Math.round(input.areaM2 * standard.luxTarget * factor);

  return {
    ok: true,
    result: {
      totalLumen,
      luxTarget: standard.luxTarget,
      ceilingFactor: factor,
      recommendedKelvin: standard.recommendedKelvin,
      fixtureCount: Math.ceil(totalLumen / AVERAGE_FIXTURE_LUMEN),
    },
  };
}
```

- [ ] **Step 5: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- calculate`
Хүлээх үр дүн: PASS — 11 тест.

- [ ] **Step 6: Бүх тест**

Ажиллуулах: `npm test`
Хүлээх үр дүн: бүгд PASS (74 + 11 = 85).

- [ ] **Step 7: Commit**

```bash
git add src/lib/calculator/standards.ts src/lib/calculator/calculate.ts src/lib/calculator/calculate.test.ts
git commit -m "feat: гэрэлтүүлгийн тооцооны цэвэр логик ба норм"
```

---

## Task 2: Тохирох бараа санал болгох логик

**Files:**
- Create: `web/src/lib/calculator/suggest.ts`
- Create: `web/src/lib/calculator/suggest.test.ts`

**Interfaces:**
- Consumes: Task 1-ийн `CalculatorResult`; `Product` төрөл `@/lib/types`-аас.
- Produces:
  - `interface FixtureCandidate { readonly slug: string; readonly name: string; readonly price: number; readonly image: string; readonly lumen: number; readonly roomSlugs: readonly string[] }`
  - `export function toCandidates(products: readonly Product[]): readonly FixtureCandidate[]` — зөвхөн `specs.lumen` тодорхой барааг авч нимгэн объект болгоно.
  - `export function suggestFixtures(candidates: readonly FixtureCandidate[], roomSlug: string, lumenPerFixture: number, limit: number): readonly FixtureCandidate[]` — тухайн өрөөнд тохирох, шаардлагатай люментэй хамгийн ойр барааг эрэмбэлж буцаана.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/lib/calculator/suggest.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { suggestFixtures, toCandidates } from "./suggest";
import { makeProduct } from "@/lib/test-helpers";

describe("toCandidates", () => {
  it("люментэй барааг нимгэн объект болгоно", () => {
    const candidates = toCandidates([
      makeProduct({
        slug: "a",
        name: "А гэрэл",
        price: 250000,
        images: ["/a-1.svg", "/a-2.svg"],
        roomSlugs: ["zochny"],
        specs: { lumen: 900 },
      }),
    ]);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toEqual({
      slug: "a",
      name: "А гэрэл",
      price: 250000,
      image: "/a-1.svg",
      lumen: 900,
      roomSlugs: ["zochny"],
    });
  });

  it("люмен заагаагүй барааг хасна", () => {
    const candidates = toCandidates([
      makeProduct({ slug: "a", specs: { lumen: 900 } }),
      makeProduct({ slug: "b", specs: {} }),
    ]);
    expect(candidates.map((c) => c.slug)).toEqual(["a"]);
  });
});

describe("suggestFixtures", () => {
  const candidates = toCandidates([
    makeProduct({
      slug: "ойр",
      roomSlugs: ["zochny"],
      specs: { lumen: 780 },
    }),
    makeProduct({
      slug: "хол",
      roomSlugs: ["zochny"],
      specs: { lumen: 2500 },
    }),
    makeProduct({
      slug: "өөр-өрөө",
      roomSlugs: ["gal-togoo"],
      specs: { lumen: 800 },
    }),
  ]);

  it("зөвхөн тухайн өрөөнд тохирох барааг буцаана", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 10);
    expect(result.map((c) => c.slug)).not.toContain("өөр-өрөө");
  });

  it("шаардлагатай люментэй хамгийн ойрыг нь түрүүлж эрэмбэлнэ", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 10);
    expect(result[0].slug).toBe("ойр");
  });

  it("limit-ээс илүү буцаахгүй", () => {
    const result = suggestFixtures(candidates, "zochny", 800, 1);
    expect(result).toHaveLength(1);
  });

  it("тохирох бараа байхгүй бол хоосон массив", () => {
    const result = suggestFixtures(candidates, "ugaalgyn", 800, 10);
    expect(result).toEqual([]);
  });

  it("эх массивыг өөрчлөхгүй", () => {
    const before = candidates.map((c) => c.slug);
    suggestFixtures(candidates, "zochny", 800, 10);
    expect(candidates.map((c) => c.slug)).toEqual(before);
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- suggest`
Хүлээх үр дүн: FAIL — `Cannot find module './suggest'`.

- [ ] **Step 3: `suggest.ts` бичих**

`web/src/lib/calculator/suggest.ts`:

```ts
import type { Product } from "@/lib/types";

/**
 * Барааны нимгэн проекц — client компонент руу бүтэн `Product`-ийг
 * дамжуулахгүйн тулд зөвхөн хэрэгтэй талбарыг авна.
 */
export interface FixtureCandidate {
  readonly slug: string;
  readonly name: string;
  readonly price: number;
  readonly image: string;
  readonly lumen: number;
  readonly roomSlugs: readonly string[];
}

/** Люмен нь тодорхой байгаа барааг л сонгож нимгэн объект болгоно */
export function toCandidates(
  products: readonly Product[],
): readonly FixtureCandidate[] {
  return products.flatMap((p) => {
    const lumen = p.specs.lumen;
    if (lumen === undefined) return [];
    return [
      {
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.images[0],
        lumen,
        roomSlugs: p.roomSlugs,
      },
    ];
  });
}

/**
 * Тухайн өрөөнд тохирох бараануудаас нэг гэрэлд ногдох люментэй
 * хамгийн ойрыг нь эрэмбэлж буцаана. Эх массивыг өөрчлөхгүй.
 */
export function suggestFixtures(
  candidates: readonly FixtureCandidate[],
  roomSlug: string,
  lumenPerFixture: number,
  limit: number,
): readonly FixtureCandidate[] {
  return candidates
    .filter((c) => c.roomSlugs.includes(roomSlug))
    .slice()
    .sort(
      (a, b) =>
        Math.abs(a.lumen - lumenPerFixture) - Math.abs(b.lumen - lumenPerFixture),
    )
    .slice(0, limit);
}
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- suggest`
Хүлээх үр дүн: PASS — 7 тест.

- [ ] **Step 5: Commit**

```bash
git add src/lib/calculator/suggest.ts src/lib/calculator/suggest.test.ts
git commit -m "feat: тооцооны үр дүнд тохирох бараа санал болгох логик"
```

---

## Task 3: Тооцоолуурын форм, хуудас, цэс

**Files:**
- Create: `web/src/components/calculator/CalculatorForm.tsx`
- Create: `web/src/components/calculator/CalculatorForm.test.tsx`
- Create: `web/src/app/tooluur/page.tsx`
- Modify: `web/src/data/navigation.ts`
- Modify: `web/e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: Task 1-ийн `calculateLighting`, `CalculatorOutcome`, `AREA_MIN/MAX`, `HEIGHT_MIN/MAX`; Task 2-ын `FixtureCandidate`, `suggestFixtures`, `toCandidates`; `rooms` (`@/data/rooms`); `formatPrice` (`@/lib/format`); `Container` (`@/components/ui/Container`).
- Produces: `export function CalculatorForm(props: { candidates: readonly FixtureCandidate[] })` — client компонент.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/components/calculator/CalculatorForm.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalculatorForm } from "./CalculatorForm";
import type { FixtureCandidate } from "@/lib/calculator/suggest";

const CANDIDATES: readonly FixtureCandidate[] = [
  {
    slug: "zochny-gerel",
    name: "Зочны дүүжин",
    price: 320000,
    image: "/images/products/test.svg",
    lumen: 800,
    roomSlugs: ["zochny"],
  },
];

describe("CalculatorForm", () => {
  it("эхэндээ үр дүн харуулахгүй", () => {
    render(<CalculatorForm candidates={CANDIDATES} />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("зөв утга оруулахад нийт люмен ба гэрлийн тоог харуулна", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "20");
    await user.clear(screen.getByLabelText("Таазны өндөр (м)"));
    await user.type(screen.getByLabelText("Таазны өндөр (м)"), "2.5");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    const result = await screen.findByRole("status");
    expect(result).toHaveTextContent("3,000 лм");
    expect(result).toHaveTextContent("4 ш");
    expect(result).toHaveTextContent("2700K");
  });

  it("хязгаараас гадуур талбайд алдааны мессеж харуулна", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "900");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Талбай 1-500 м² хооронд байх ёстой.");
  });

  it("тохирох барааг санал болгоно", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(screen.getByLabelText("Талбай (м²)"));
    await user.type(screen.getByLabelText("Талбай (м²)"), "20");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    expect(await screen.findByText("Зочны дүүжин")).toBeInTheDocument();
    expect(screen.getByText("320,000₮")).toBeInTheDocument();
  });

  it("алдаа гарсан үед өмнөх үр дүнг цэвэрлэнэ", async () => {
    const user = userEvent.setup();
    render(<CalculatorForm candidates={CANDIDATES} />);
    const area = screen.getByLabelText("Талбай (м²)");

    await user.selectOptions(screen.getByLabelText("Өрөөний төрөл"), "zochny");
    await user.clear(area);
    await user.type(area, "20");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));
    expect(await screen.findByRole("status")).toBeInTheDocument();

    await user.clear(area);
    await user.type(area, "900");
    await user.click(screen.getByRole("button", { name: "Тооцоолох" }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- CalculatorForm`
Хүлээх үр дүн: FAIL — `Cannot find module './CalculatorForm'`.

- [ ] **Step 3: `CalculatorForm.tsx` бичих**

`web/src/components/calculator/CalculatorForm.tsx`:

```tsx
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
                        {c.lumen} лм · {formatPrice(c.price)}
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
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- CalculatorForm`
Хүлээх үр дүн: PASS — 5 тест.

- [ ] **Step 5: `/tooluur` хуудас үүсгэх**

`web/src/app/tooluur/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CalculatorForm } from "@/components/calculator/CalculatorForm";
import { productRepository } from "@/lib/repository/products";
import { toCandidates } from "@/lib/calculator/suggest";

export const metadata: Metadata = {
  title: "Гэрэлтүүлгийн тооцоолуур",
  description:
    "Өрөөнийхөө талбай, таазны өндрөөр шаардлагатай гэрлийн урсгалыг тооцож, тохирох бүтээгдэхүүний санал аваарай.",
};

export default function CalculatorPage() {
  const candidates = toCandidates(productRepository.getAll());

  return (
    <Container className="py-12 md:py-16">
      <p className="type-caption-uppercase text-muted">Зөвлөх хэрэгсэл</p>
      <h1 className="type-display-lg mt-3 max-w-3xl text-balance">
        Өрөөндөө хэдэн гэрэл хэрэгтэйг тооцоолоорой
      </h1>
      <p className="type-body-md mt-4 max-w-prose text-body">
        Өрөөний төрөл, талбай, таазны өндрийг оруулахад шаардлагатай нийт гэрлийн
        урсгал, санал болгох гэрлийн тоо, тохирох өнгөний температурыг харуулна.
      </p>

      <div className="mt-12">
        <CalculatorForm candidates={candidates} />
      </div>
    </Container>
  );
}
```

- [ ] **Step 6: Цэсэнд нэмэх**

`web/src/data/navigation.ts`-д `contact` элементийн ӨМНӨ дараах элементийг оруулна:

```ts
  {
    key: "tooluur",
    label: "Тооцоолуур",
    href: "/tooluur",
  },
```

- [ ] **Step 7: E2E тест нэмэх**

`web/e2e/smoke.spec.ts`-ийн ТӨГСГӨЛД нэмэх:

```ts
test("тооцоолуур ажиллана", async ({ page }) => {
  await page.goto("/tooluur");
  await page.getByLabel("Өрөөний төрөл").selectOption("zochny");
  await page.getByLabel("Талбай (м²)").fill("20");
  await page.getByLabel("Таазны өндөр (м)").fill("2.5");
  await page.getByRole("button", { name: "Тооцоолох" }).click();

  const result = page.getByRole("status");
  await expect(result).toContainText("3,000 лм");
  await expect(result).toContainText("2700K");
});

test("тооцоолуур буруу оролтод алдаа харуулна", async ({ page }) => {
  await page.goto("/tooluur");
  await page.getByLabel("Талбай (м²)").fill("900");
  await page.getByRole("button", { name: "Тооцоолох" }).click();
  await expect(page.getByRole("alert")).toContainText("1-500 м²");
});
```

- [ ] **Step 8: Тест, build, lint**

Ажиллуулах: `npm test && npm run build && npm run lint`
Хүлээх үр дүн: тест PASS (90), build амжилттай, lint яг 1 хуучин алдаа.

- [ ] **Step 9: E2E ажиллуулах**

Ажиллуулах: `npm run e2e`
Хүлээх үр дүн: 6 тест PASS. Хэрэв Playwright browser суугаагүй бол `npx playwright install chromium` ажиллуулаад дахин оролдоно; боломжгүй бол тайландаа үнэнээр бичнэ.

- [ ] **Step 10: Commit**

```bash
git add src/components/calculator src/app/tooluur src/data/navigation.ts e2e/smoke.spec.ts
git commit -m "feat: /tooluur гэрэлтүүлгийн тооцоолуурын хуудас ба цэс"
```

---

## Task 4: Kelvin өнгөний цэвэр функц

**Files:**
- Create: `web/src/lib/kelvin.ts`
- Create: `web/src/lib/kelvin.test.ts`

**Interfaces:**
- Consumes: юу ч биш.
- Produces:
  - `export const KELVIN_MIN = 2700`, `KELVIN_MAX = 6500`
  - `export function kelvinOverlay(kelvin: number): string` — CSS `rgba(...)` мөр буцаана. Хязгаараас гадуур утгыг хязгаарт нааж (clamp) тооцно.
  - `export function kelvinLabel(kelvin: number): string` — «Дулаан цагаан» / «Төвийг сахисан» / «Өдрийн гэрэл».
  - `export function kelvinDescription(kelvin: number): string` — нэг өгүүлбэрийн зөвлөмж.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/lib/kelvin.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  KELVIN_MAX,
  KELVIN_MIN,
  kelvinDescription,
  kelvinLabel,
  kelvinOverlay,
} from "./kelvin";

describe("kelvinLabel", () => {
  it("дулаан мужид «Дулаан цагаан»", () => {
    expect(kelvinLabel(2700)).toBe("Дулаан цагаан");
    expect(kelvinLabel(3100)).toBe("Дулаан цагаан");
  });

  it("дунд мужид «Төвийг сахисан»", () => {
    expect(kelvinLabel(3200)).toBe("Төвийг сахисан");
    expect(kelvinLabel(4000)).toBe("Төвийг сахисан");
    expect(kelvinLabel(5000)).toBe("Төвийг сахисан");
  });

  it("хүйтэн мужид «Өдрийн гэрэл»", () => {
    expect(kelvinLabel(5100)).toBe("Өдрийн гэрэл");
    expect(kelvinLabel(6500)).toBe("Өдрийн гэрэл");
  });
});

describe("kelvinOverlay", () => {
  it("rgba мөр буцаана", () => {
    expect(kelvinOverlay(2700)).toMatch(/^rgba\(\d+, \d+, \d+, [\d.]+\)$/);
  });

  it("дулаан төгсгөлд улаан нь цэнхрээс их", () => {
    const [r, , b] = readRgb(kelvinOverlay(KELVIN_MIN));
    expect(r).toBeGreaterThan(b);
  });

  it("хүйтэн төгсгөлд цэнхэр нь улаанаас их", () => {
    const [r, , b] = readRgb(kelvinOverlay(KELVIN_MAX));
    expect(b).toBeGreaterThan(r);
  });

  it("дунд цэг хамгийн тунгалаг байна", () => {
    expect(alpha(kelvinOverlay(4000))).toBeLessThan(alpha(kelvinOverlay(KELVIN_MIN)));
    expect(alpha(kelvinOverlay(4000))).toBeLessThan(alpha(kelvinOverlay(KELVIN_MAX)));
  });

  it("хязгаараас гадуур утгыг хязгаарт наана", () => {
    expect(kelvinOverlay(1000)).toBe(kelvinOverlay(KELVIN_MIN));
    expect(kelvinOverlay(99000)).toBe(kelvinOverlay(KELVIN_MAX));
  });
});

describe("kelvinDescription", () => {
  it("муж бүрт хоосон биш тайлбар өгнө", () => {
    for (const k of [2700, 4000, 6500]) {
      expect(kelvinDescription(k).length).toBeGreaterThan(20);
    }
  });
});

function readRgb(rgba: string): readonly [number, number, number] {
  const m = rgba.match(/rgba\((\d+), (\d+), (\d+)/);
  if (!m) throw new Error(`rgba биш: ${rgba}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function alpha(rgba: string): number {
  const m = rgba.match(/, ([\d.]+)\)$/);
  if (!m) throw new Error(`alpha олдсонгүй: ${rgba}`);
  return Number(m[1]);
}
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- kelvin`
Хүлээх үр дүн: FAIL — `Cannot find module './kelvin'`.

- [ ] **Step 3: `kelvin.ts` бичих**

`web/src/lib/kelvin.ts`:

```ts
export const KELVIN_MIN = 2700;
export const KELVIN_MAX = 6500;
/** Дулаан/хүйтний шилжилтийн дундаж цэг */
const KELVIN_MID = 4000;

/** Дулаан төгсгөлийн шаргал давхарга */
const WARM = { r: 255, g: 167, b: 87, a: 0.42 } as const;
/** Дундын төвийг сахисан — бараг тунгалаг */
const NEUTRAL = { r: 255, g: 244, b: 229, a: 0.05 } as const;
/** Хүйтэн төгсгөлийн цэнхэвтэр давхарга */
const COOL = { r: 150, g: 196, b: 255, a: 0.34 } as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/**
 * Kelvin утгыг зураг дээр давхарлах CSS өнгө болгоно.
 * Гэрлийн бодит өнгөний физикийг илэрхийлдэг тул энэ нь дизайн токен биш.
 */
export function kelvinOverlay(kelvin: number): string {
  const k = clamp(kelvin, KELVIN_MIN, KELVIN_MAX);
  const warmSide = k <= KELVIN_MID;
  const from = warmSide ? WARM : NEUTRAL;
  const to = warmSide ? NEUTRAL : COOL;
  const span = warmSide ? KELVIN_MID - KELVIN_MIN : KELVIN_MAX - KELVIN_MID;
  const t = (k - (warmSide ? KELVIN_MIN : KELVIN_MID)) / span;

  const r = Math.round(lerp(from.r, to.r, t));
  const g = Math.round(lerp(from.g, to.g, t));
  const b = Math.round(lerp(from.b, to.b, t));
  const a = Number(lerp(from.a, to.a, t).toFixed(3));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Хэрэглэгчид ойлгомжтой мужийн нэр */
export function kelvinLabel(kelvin: number): string {
  if (kelvin < 3200) return "Дулаан цагаан";
  if (kelvin <= 5000) return "Төвийг сахисан";
  return "Өдрийн гэрэл";
}

/** Тухайн мужид ямар орон зай тохирохыг зөвлөнө */
export function kelvinDescription(kelvin: number): string {
  if (kelvin < 3200) {
    return "Лааны гэрэл шиг зөөлөн, тухтай уур амьсгал. Зочны болон унтлагын өрөөнд хамгийн тохиромжтой.";
  }
  if (kelvin <= 5000) {
    return "Байгалийн өдрийн гэрэлд ойр, тод боловч хатуу биш. Гал тогоо, угаалгын өрөөнд зохино.";
  }
  return "Сэргэг, төвлөрөлд тустай хүйтэвтэр гэрэл. Ажлын өрөө, нарийн ажил хийдэг орчинд.";
}
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- kelvin`
Хүлээх үр дүн: PASS — 9 тест.

- [ ] **Step 5: Commit**

```bash
git add src/lib/kelvin.ts src/lib/kelvin.test.ts
git commit -m "feat: Kelvin өнгө, шошго, тайлбарын цэвэр функц"
```

---

## Task 5: Kelvin интерактив үзүүлэн

**Files:**
- Create: `web/src/components/home/KelvinDemo.tsx`
- Create: `web/src/components/home/KelvinDemo.test.tsx`
- Delete: `web/src/components/home/KelvinGuide.tsx`
- Modify: `web/src/app/page.tsx`
- Modify: `web/e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: Task 4-ийн `KELVIN_MIN`, `KELVIN_MAX`, `kelvinOverlay`, `kelvinLabel`, `kelvinDescription`; `Container` (`@/components/ui/Container`); `Reveal` (`@/components/ui/Reveal`).
- Produces: `export function KelvinDemo()` — client компонент, параметргүй.

**Анхаар:** `.ray-sweep` класс хэрэглэх элемент нь ЗААВАЛ `relative` ба `overflow-hidden` байх ёстой, дотоод агуулга нь өөрийн `relative`-тэй байж давхаргын дээгүүр харагдана. Доорх код үүнийг агуулсан — хялбаршуулж хасахгүй.

- [ ] **Step 1: Тест бичих (унана)**

`web/src/components/home/KelvinDemo.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { KelvinDemo } from "./KelvinDemo";

describe("KelvinDemo", () => {
  it("2700K-аас эхэлж дулаан шошго харуулна", () => {
    render(<KelvinDemo />);
    expect(screen.getByRole("slider")).toHaveValue("2700");
    expect(screen.getByText("2700K")).toBeInTheDocument();
    expect(screen.getByText("Дулаан цагаан")).toBeInTheDocument();
  });

  it("слайдер чирэхэд шошго ба утга шинэчлэгдэнэ", () => {
    render(<KelvinDemo />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "6500" } });
    expect(screen.getByText("6500K")).toBeInTheDocument();
    expect(screen.getByText("Өдрийн гэрэл")).toBeInTheDocument();
  });

  it("слайдер хүрэх боломжтой нэр, хязгаартай", () => {
    render(<KelvinDemo />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAccessibleName("Өнгөний температур");
    expect(slider).toHaveAttribute("min", "2700");
    expect(slider).toHaveAttribute("max", "6500");
  });

  it("бэлэн тохиргооны товч дарахад тухайн утга руу шилжинэ", () => {
    render(<KelvinDemo />);
    fireEvent.click(screen.getByRole("button", { name: "4000K Төвийг сахисан" }));
    expect(screen.getByRole("slider")).toHaveValue("4000");
  });

  it("гэрлийн давхаргыг дэлгэц уншигчаас нуудаг", () => {
    const { container } = render(<KelvinDemo />);
    const overlay = container.querySelector("[data-kelvin-overlay]");
    expect(overlay).not.toBeNull();
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Тест унаж байгааг батлах**

Ажиллуулах: `npm test -- KelvinDemo`
Хүлээх үр дүн: FAIL — `Cannot find module './KelvinDemo'`.

- [ ] **Step 3: `KelvinDemo.tsx` бичих**

`web/src/components/home/KelvinDemo.tsx`:

```tsx
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
```

- [ ] **Step 4: Тест ногоон болохыг батлах**

Ажиллуулах: `npm test -- KelvinDemo`
Хүлээх үр дүн: PASS — 5 тест.

- [ ] **Step 5: Нүүр хуудсанд солих**

`web/src/app/page.tsx`-д:

1. `import { KelvinGuide } from "@/components/home/KelvinGuide";` мөрийг дараахаар солино:

```tsx
import { KelvinDemo } from "@/components/home/KelvinDemo";
```

2. JSX доторх `<KelvinGuide />` мөрийг `<KelvinDemo />` болгоно.

- [ ] **Step 6: Хуучин компонентыг устгах**

```bash
git rm src/components/home/KelvinGuide.tsx
```

Дараа нь `grep -rn "KelvinGuide" src/ e2e/` ажиллуулж, үлдсэн лавлагаа байхгүйг батлана. Хэрэв байвал устгана.

- [ ] **Step 7: E2E тест нэмэх**

`web/e2e/smoke.spec.ts`-ийн ТӨГСГӨЛД нэмэх:

```ts
test("Kelvin слайдер өнгөний мужийг сольдог", async ({ page }) => {
  await page.goto("/");
  const slider = page.getByRole("slider", { name: "Өнгөний температур" });
  await expect(page.getByText("Дулаан цагаан")).toBeVisible();
  await slider.fill("6500");
  await expect(page.getByText("Өдрийн гэрэл")).toBeVisible();
});
```

- [ ] **Step 8: Тест, build, lint**

Ажиллуулах: `npm test && npm run build && npm run lint`
Хүлээх үр дүн: тест PASS (95), build амжилттай, lint яг 1 хуучин алдаа.

- [ ] **Step 9: E2E ажиллуулах**

Ажиллуулах: `npm run e2e`
Хүлээх үр дүн: 7 тест PASS. Ажиллуулах боломжгүй бол тайландаа үнэнээр бичнэ.

- [ ] **Step 10: Нүдээр шалгах**

`http://localhost:3000` дээр (dev сервер аль хэдийн ажиллаж байвал шинийг эхлүүлэхгүй):
- слайдерыг чирэхэд зургийн гэрэл дулаанаас хүйтэн рүү жигд шилжиж байгааг харах
- бэлэн тохиргооны 3 товч ажиллаж байгааг шалгах
- `/tooluur` дээр тооцоо хийж, санал болгосон бараа гарч ирэхийг харах

- [ ] **Step 11: Commit**

```bash
git add src/components/home/KelvinDemo.tsx src/components/home/KelvinDemo.test.tsx src/app/page.tsx e2e/smoke.spec.ts
git commit -m "feat: Kelvin интерактив үзүүлэн, KelvinGuide-ийг орлов"
```
