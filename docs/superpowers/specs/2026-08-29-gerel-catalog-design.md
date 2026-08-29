# «ГЭРЭЛ» — Гэрэлтүүлгийн барааны мэдээллийн каталог (v1 spec)

*Огноо: 2026-08-29 | Статус: Хэрэглэгч баталсан*

## Зорилго

Монголын гэрэлтүүлгийн худалдааны байгууллагад зориулсан **барааны мэдээллийн каталог сайт**.
Худалдан авалтын функцгүй (сагс, төлбөр, бүртгэл, wishlist огт байхгүй) — зөвхөн бараа,
үнэ, техник мэдээллийг мэргэжлийн түвшинд харуулна. Худалдан авахыг хүссэн хэрэглэгчид
дэлгүүрийн утас/хаяг харагдана. Хэл: зөвхөн монгол.

Визуал бүтэц: хэрэглэгчийн өгсөн 4 reference зураг (Lumens бүтэц + Lampenwelt карт):

1. `web photos reference/first veiw of web/…194527.png` — хар зарын зурвас, лого+төв цэс,
   бүтэн дэлгэцийн lifestyle hero (breadcrumb, serif гарчиг, тайлбар, хүрээтэй CTA)
2. `…194556.png` — "Ангиллаар үзэх" зөрүүлж байрлуулсан editorial 3 баганат grid
3. `…194626.png` — барааны карт: зураг, хямдралын улаан badge, том үнэ + дарсан хуучин үнэ,
   нэр, ногоон "Бэлэн байгаа" статус (зүрхэн wishlist товчийг ХАСНА)
4. `navigation function/…194503.png` — mega menu: идэвхтэй цэс доогуур зураас,
   дэд ангиллын эгнээ, барааны төрлийн зурган товчлолын эгнээ

## Хуудсууд

| Route | Агуулга |
|---|---|
| `/` | Зарын зурвас → header+mega menu → hero → ангиллын staggered grid → онцлох бараа → Өрөөгөөр → Kelvin мэдлэг → footer |
| `/category/[slug]` | Ангиллын hero (breadcrumb+serif), дэд ангиллын chips, шүүлтүүр (Kelvin, люмен, ватт, суурь, dimmable, IP, үнэ), эрэмбэлэлт, барааны grid |
| `/product/[slug]` | Галерей, үнэ+badge+хуучин үнэ, статус, техник үзүүлэлтийн хүснэгт, «Мэдээлэл авах» блок (утас/хаяг), төстэй бараа |
| `/sale` | Хямдралтай бараа (oldPrice-тэй бүх бараа) |
| `/rooms/[slug]` | Өрөөгөөр үзэх: зочны, унтлагын, гал тогоо, ажлын, угаалгын, хүүхдийн |
| `/about` | Бидний тухай + холбоо барих + дэлгүүрийн мэдээлэл |
| Хайлт | Тусдаа route биш — header-ээс нээгдэх overlay, client-side шууд үр дүн |

## Дизайн систем

Эх сурвалж: `C:\Users\Dell\awesome-design-md\design-md\claude\DESIGN.md` — өнгө, radius,
spacing, type scale-ийг ЯГ файлын утгаар. Гол тархалт:

- canvas `#faf9f5`, ink `#141413`, body `#3d3d3a`, muted `#6c6a64`, hairline `#e6dfd8`
- surface-soft `#f5f0e8`, surface-card `#efe9de`, surface-dark `#181715` (зарын зурвас, footer)
- accent/primary `#cc785c` (CTA, идэвхтэй холбоос, focus ring-д Л)
- Хямдралын badge → `error #c64545`; «Бэлэн байгаа» → `success #5db872`; «Захиалгаар» → `warning #d4a017`
- Фонт: Copernicus/StyreneB кирилл дэмждэггүй → display serif = **Playfair Display**
  (cyrillic subset), UI/body = **Inter** (cyrillic) — DESIGN.md-ийн өөрийн sans fallback.
  next/font/google-оор self-host.
- DESIGN.md-д байхгүй өнгө нэмэхгүй.

## Ангиллын бүтэц

- **Таазны гэрэл** `taazny-gerel`: чандельер, дүүжин гэрэл, наамал гэрэл, шугаман дүүжин, суулгамал спот, рельсэн гэрэл
- **Хананы гэрэл** `khanany-gerel`: ханын бра, толины гэрэл, зургийн гэрэл
- **Чийдэн** `chiiden`: шалны, ширээний, ажлын
- **Гадна гэрэлтүүлэг** `gadna-gerel`: цэцэрлэгийн, фасадны, замын
- **LED & ухаалаг** `led-ukhaalag`: LED зурвас, LED панель, ухаалаг чийдэн
- **Өрөөгөөр**: зочны, унтлагын, гал тогоо, ажлын, угаалгын, хүүхдийн
- **Хямдрал**: тооцоолол (oldPrice байгаа бараа)

## Технологи

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, бүх хуудас SSG (generateStaticParams)
- Апп байрлал: `web/` дэд хавтас; git repo нь `gerel/` эх хавтас
- **Repository pattern**: `ProductRepository` interface → v1-д mock implementation
  (`src/data/*.ts`), дараа Supabase/CMS-ээр солиход хуудасны код өөрчлөгдөхгүй
- Шүүлт/хайлт/эрэмбэлэлт: client талын цэвэр функцууд (immutable)
- ~40 бараа, бүрэн техник үзүүлэлттэй: хэмжээс (өндөр/диаметр/кабель), Kelvin, люмен,
  ватт, CRI, суурь (E27/GU10/GX53/LED module), dimmable, IP, материал
- Үнэ: MNT, формат `1,299,000₮`

## Зураг

Локал орчинд AI зургийн API түлхүүр байхгүй тул v1-д **нэгдсэн art direction бүхий SVG
студи-рендер**: archetype-д суурилсан generator скрипт → бараа бүрт өвөрмөц SVG
(cream дэвсгэр, дулаан glow, зөөлөн сүүдэр), ангилал/өрөө/hero-д гар урласан SVG.
Бүгд `public/images/`-д тогтсон нэрээр — дараа нь жинхэнэ фото/AI фото файл солих
төдийхнөөр орлоно.

## Чанар

- TDD: lib давхарга (format, filter, search, repository) тест эхэлж бичигдэнэ (Vitest)
- Гол компонентын тест (ProductCard г.м.), 1 Playwright smoke (нүүр→ангилал→бараа)
- Accessibility: semantic HTML, aria mega menu, Escape, keyboard nav, alt текст, contrast
- SEO: хуудас бүрт Mongolian metadata/OG, sitemap.ts, robots.ts
- Гар утас: hamburger + accordion цэс, responsive grid
- Code review: code-reviewer агент, CRITICAL/HIGH заавал засна

## Хамрахгүй (v1-ээс гадуур)

Сагс/төлбөр (QPay г.м.), бүртгэл/wishlist, admin, DB/CMS, AR/Room viewer, B2B үнэ,
хэрэглэгчийн сэтгэгдэл, олон хэл. Эдгээр нь судалгааны тайланд дараагийн шатууд гэж
тодорхойлогдсон.
