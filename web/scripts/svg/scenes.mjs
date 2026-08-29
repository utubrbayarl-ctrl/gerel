/**
 * Өргөн scene-үүд: нүүрийн hero, ангиллын hero/карт, өрөөний зургууд.
 * Бүгд бүрий (dusk) өнгө аясаар — дээр нь цагаан текст тод харагдана.
 */
import { C, glow, grain, linGrad, uid } from "./helpers.mjs";

/** Бүрийн ханын дэвсгэр + шал */
function duskRoom(w, h, floorY) {
  const wallId = uid("dw");
  const floorId = uid("df");
  return (
    `<defs>${linGrad(wallId, [
      [0, "#3b342a"],
      [0.7, "#2a251d"],
      [1, "#211d17"],
    ])}${linGrad(floorId, [
      [0, "#26211a"],
      [1, "#161310"],
    ])}</defs>` +
    `<rect width="${w}" height="${h}" fill="url(#${wallId})"/>` +
    `<rect y="${floorY}" width="${w}" height="${h - floorY}" fill="url(#${floorId})"/>`
  );
}

/** Нар жаргах үзэгдэлт цонх */
function window_(x, y, w, h, opts = {}) {
  const skyId = uid("sk");
  const panes = opts.panes ?? 2;
  const paneW = w / panes;
  const bars = Array.from(
    { length: panes - 1 },
    (_, i) => `<rect x="${x + paneW * (i + 1) - 3}" y="${y}" width="6" height="${h}" fill="#171410"/>`,
  ).join("");
  return (
    `<defs>${linGrad(skyId, [
      [0, "#cbb98f"],
      [0.45, "#dcae72"],
      [0.72, "#b97e54"],
      [1, "#6e5138"],
    ])}</defs>` +
    `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" fill="#171410"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${skyId})"/>` +
    `<circle cx="${x + w * 0.62}" cy="${y + h * 0.42}" r="${h * 0.1}" fill="${C.glowHot}" opacity="0.9"/>` +
    `<path d="M${x} ${y + h * 0.78} Q ${x + w * 0.3} ${y + h * 0.64} ${x + w * 0.55} ${y + h * 0.76} T ${x + w} ${y + h * 0.72} L${x + w} ${y + h} L${x} ${y + h} Z" fill="#4a3a28" opacity="0.9"/>` +
    bars
  );
}

/** Хөшиг — хажуугийн хүрээ */
function curtain(x, w, h, flip = false) {
  const id = uid("ct");
  const folds = Array.from({ length: 5 }, (_, i) => {
    const fx = x + (w / 5) * i + 8;
    return `<path d="M${fx} 0 Q ${fx + 10} ${h * 0.5} ${fx} ${h}" fill="none" stroke="#141210" stroke-width="6" opacity="0.5"/>`;
  }).join("");
  return (
    `<defs>${linGrad(id, [[0, "#2b241c"], [1, "#191512"]], { x1: flip ? 1 : 0, y1: 0, x2: flip ? 0 : 1, y2: 0 })}</defs>` +
    `<rect x="${x}" y="0" width="${w}" height="${h}" fill="url(#${id})"/>` +
    folds
  );
}

/** Нүүр хуудасны hero — хоолны өрөө, шугаман дүүжин (reference 1-ийн сэдэв) */
export function homeHero() {
  const W = 1920;
  const H = 900;
  const tableId = uid("tb");
  const linear =
    `<line x1="760" y1="0" x2="760" y2="150" stroke="#0f0d0b" stroke-width="4"/>` +
    `<line x1="1160" y1="0" x2="1160" y2="150" stroke="#0f0d0b" stroke-width="4"/>` +
    `<rect x="660" y="150" width="600" height="26" rx="12" fill="#12100d"/>` +
    `<rect x="668" y="172" width="584" height="10" rx="5" fill="${C.glowHot}"/>` +
    glow(960, 198, 480, 150, 1) +
    `<defs><filter id="hb"><feGaussianBlur stdDeviation="26"/></filter></defs>` +
    `<rect x="668" y="172" width="584" height="14" rx="7" fill="${C.glowWarm}" filter="url(#hb)" opacity="0.8"/>`;
  const table =
    `<defs>${linGrad(tableId, [[0, "#4a3826"], [1, "#241a10"]])}</defs>` +
    `<path d="M420 640 L1500 640 L1540 690 L380 690 Z" fill="url(#${tableId})"/>` +
    `<path d="M430 642 Q 700 628 960 640 T 1490 642 L1500 640 L420 640 Z" fill="#5c4830" opacity="0.8"/>` +
    `<rect x="480" y="690" width="30" height="150" fill="#191410"/>` +
    `<rect x="1410" y="690" width="30" height="150" fill="#191410"/>` +
    `<ellipse cx="760" cy="632" rx="46" ry="10" fill="#171310"/>` +
    `<ellipse cx="1160" cy="632" rx="46" ry="10" fill="#171310"/>` +
    `<ellipse cx="960" cy="630" rx="40" ry="9" fill="#2b2118"/>`;
  const stools = [640, 960, 1280]
    .map(
      (x) =>
        `<rect x="${x - 42}" y="716" width="84" height="26" rx="12" fill="#2e241a"/>` +
        `<rect x="${x - 34}" y="742" width="12" height="110" fill="#1c1610"/>` +
        `<rect x="${x + 22}" y="742" width="12" height="110" fill="#1c1610"/>`,
    )
    .join("");
  return (
    duskRoom(W, H, 700) +
    window_(300, 90, 1320, 560, { panes: 3 }) +
    curtain(0, 260, H) +
    curtain(1660, 260, H, true) +
    `<rect x="290" y="86" width="1340" height="570" fill="${C.glowWarm}" opacity="0.06"/>` +
    table +
    stools +
    linear +
    `<ellipse cx="960" cy="700" rx="640" ry="60" fill="${C.glowWarm}" opacity="0.14"/>` +
    grain(W, H, 0.05)
  );
}

/** Ангиллын hero (1600×700) — ангиллын гол хэлбэрүүд бүрий өрөөнд */
export function categoryHero(draw) {
  const W = 1600;
  const H = 700;
  return (
    duskRoom(W, H, 560) +
    window_(1020, 80, 460, 400, { panes: 2 }) +
    curtain(0, 170, H) +
    draw(W, H) +
    `<ellipse cx="800" cy="580" rx="560" ry="50" fill="${C.glowWarm}" opacity="0.12"/>` +
    grain(W, H, 0.05)
  );
}

/** Хямдралын hero (1600×500) */
export function saleHero() {
  const W = 1600;
  const H = 500;
  const pendants = [260, 480, 700, 920, 1140, 1360]
    .map((x, i) => {
      const y = 180 + (i % 2) * 70;
      const r = 40 + (i % 3) * 10;
      return (
        `<line x1="${x}" y1="0" x2="${x}" y2="${y - r}" stroke="#0f0d0b" stroke-width="3"/>` +
        `<path d="M${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y} Z" fill="#12100d"/>` +
        `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="8" fill="${C.glowHot}"/>` +
        glow(x, y + 10, r * 2.4, r * 1.8, 0.9)
      );
    })
    .join("");
  return duskRoom(W, H, 420) + pendants + grain(W, H, 0.05);
}

/** Өрөөний vignette (800×600) */
export function roomScene(furniture) {
  const W = 800;
  const H = 600;
  return duskRoom(W, H, 470) + furniture(W, H) + grain(W, H, 0.05);
}

/* --- Өрөө бүрийн тавилга + гэрэл --- */

export const roomDrawers = {
  zochny: () =>
    // буйдан + нуман шалны чийдэн
    `<rect x="180" y="360" width="380" height="110" rx="26" fill="#33291e"/>` +
    `<rect x="200" y="310" width="150" height="70" rx="18" fill="#3d3225"/>` +
    `<rect x="370" y="310" width="150" height="70" rx="18" fill="#3d3225"/>` +
    `<rect x="160" y="330" width="34" height="140" rx="16" fill="#2b2218"/>` +
    `<rect x="546" y="330" width="34" height="140" rx="16" fill="#2b2218"/>` +
    `<path d="M640 470 L640 260 Q 642 170 540 172 Q 486 174 482 216" fill="none" stroke="#0f0d0b" stroke-width="8"/>` +
    `<path d="M446 216 A 38 38 0 0 1 522 216 Z" fill="#0f0d0b"/>` +
    `<ellipse cx="484" cy="216" rx="38" ry="7" fill="${C.glowHot}"/>` +
    glow(484, 240, 150, 120, 1) +
    `<ellipse cx="640" cy="486" rx="60" ry="12" fill="#0c0a08"/>`,
  untlagyn: () =>
    // ор + ханын бра
    `<rect x="200" y="380" width="420" height="90" rx="14" fill="#33291e"/>` +
    `<rect x="200" y="330" width="120" height="60" rx="10" fill="#4a3c2b"/>` +
    `<rect x="186" y="250" width="20" height="220" rx="8" fill="#241d15"/>` +
    `<rect x="330" y="352" width="270" height="40" rx="12" fill="#57452f"/>` +
    `<rect x="252" y="196" width="44" height="86" rx="10" fill="#191512"/>` +
    `<ellipse cx="274" cy="196" rx="20" ry="5" fill="${C.glowHot}"/>` +
    `<ellipse cx="274" cy="282" rx="20" ry="5" fill="${C.glowHot}"/>` +
    glow(274, 238, 100, 110, 1),
  "gal-togoo": () =>
    // тавиур + гурван жижиг дүүжин
    `<rect x="150" y="400" width="500" height="70" rx="8" fill="#2e251b"/>` +
    `<rect x="150" y="396" width="500" height="12" rx="6" fill="#57452f"/>` +
    [260, 400, 540]
      .map(
        (x) =>
          `<line x1="${x}" y1="0" x2="${x}" y2="170" stroke="#0f0d0b" stroke-width="3"/>` +
          `<path d="M${x - 42} 230 A 42 42 0 0 1 ${x + 42} 230 Z" transform="rotate(180 ${x} 209)" fill="#12100d"/>` +
          `<ellipse cx="${x}" cy="230" rx="40" ry="7" fill="${C.glowHot}"/>` +
          glow(x, 250, 110, 90, 1),
      )
      .join(""),
  "azhlyn-uruu": () =>
    // ширээ + ажлын чийдэн
    `<rect x="200" y="380" width="400" height="18" rx="6" fill="#57452f"/>` +
    `<rect x="220" y="398" width="16" height="90" fill="#241d15"/>` +
    `<rect x="564" y="398" width="16" height="90" fill="#241d15"/>` +
    `<rect x="250" y="300" width="120" height="80" rx="6" fill="#191512"/>` +
    `<rect x="258" y="308" width="104" height="60" rx="4" fill="#2b3038"/>` +
    `<line x1="520" y1="380" x2="480" y2="290" stroke="#0f0d0b" stroke-width="7" stroke-linecap="round"/>` +
    `<line x1="480" y1="290" x2="560" y2="250" stroke="#0f0d0b" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M540 236 A 30 30 0 0 1 600 236 Z" transform="rotate(28 570 240)" fill="#0f0d0b"/>` +
    `<ellipse cx="574" cy="252" rx="26" ry="6" transform="rotate(28 574 252)" fill="${C.glowHot}"/>` +
    glow(580, 290, 90, 80, 1) +
    `<ellipse cx="600" cy="380" rx="90" ry="8" fill="${C.glowWarm}" opacity="0.4"/>`,
  ugaalgyn: () =>
    // толь + LED бар
    `<rect x="270" y="200" width="260" height="230" rx="14" fill="#20252a" stroke="#101314" stroke-width="8"/>` +
    `<path d="M300 220 L380 410 L330 410 Z" fill="#39424c" opacity="0.7"/>` +
    `<rect x="250" y="160" width="300" height="16" rx="8" fill="#4a463f"/>` +
    `<rect x="256" y="172" width="288" height="7" rx="3.5" fill="${C.glowHot}"/>` +
    glow(400, 200, 240, 90, 1) +
    `<rect x="240" y="440" width="320" height="46" rx="10" fill="#33291e"/>` +
    `<ellipse cx="400" cy="440" rx="70" ry="12" fill="#efe8da" opacity="0.9"/>`,
  khuukhdiin: () =>
    // хүүхдийн ор + туулай чийдэн + одтой гэрлэн хэлхээ
    `<rect x="180" y="380" width="330" height="90" rx="14" fill="#33291e"/>` +
    `<rect x="170" y="300" width="18" height="170" rx="8" fill="#241d15"/>` +
    `<rect x="502" y="300" width="18" height="170" rx="8" fill="#241d15"/>` +
    `<rect x="560" y="420" width="130" height="50" rx="8" fill="#2e251b"/>` +
    `<ellipse cx="625" cy="382" rx="34" ry="30" fill="${C.glowHot}"/>` +
    `<ellipse cx="612" cy="342" rx="9" ry="26" transform="rotate(-10 612 342)" fill="${C.glowSoft}"/>` +
    `<ellipse cx="638" cy="342" rx="9" ry="26" transform="rotate(10 638 342)" fill="${C.glowSoft}"/>` +
    glow(625, 380, 110, 100, 1) +
    `<path d="M120 120 Q 400 200 700 110" fill="none" stroke="#0f0d0b" stroke-width="3"/>` +
    [180, 300, 420, 540, 640]
      .map((x, i) => {
        const y = 130 + Math.sin((i + 1) * 1.1) * 34 + 28;
        return `<circle cx="${x}" cy="${y}" r="9" fill="${C.glowHot}"/>` + glow(x, y, 34, 34, 0.8);
      })
      .join(""),
};

/** Ангиллын editorial карт (800×1000) — reference 2-ын хэв маяг */
export function categoryCard(draw) {
  const W = 800;
  const H = 1000;
  return (
    duskRoom(W, H, 780) +
    window_(460, 120, 280, 380, { panes: 2 }) +
    draw(W, H) +
    `<ellipse cx="400" cy="800" rx="330" ry="46" fill="${C.glowWarm}" opacity="0.12"/>` +
    grain(W, H, 0.05)
  );
}
