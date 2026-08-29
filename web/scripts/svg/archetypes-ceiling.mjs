/**
 * Таазны гэрлийн archetype-ууд. Бүх функц (g) авна:
 * g = гэрлийн туяаны эрчим (0.45 = студи, 1 = бүрий орчин).
 * 800×800 тайзан дээр төвлөрч зурагдана.
 */
import { C, ceilingMount, contactShadow, glow, lightCone, linGrad, metalGrad, uid } from "./helpers.mjs";

/** Гуулин 12 салаат чандельер («Мандал») */
export function chandelierBrass(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  const arms = [-270, -190, -100, 100, 190, 270]
    .map((dx) => {
      const x = 400 + dx;
      return (
        `<path d="M400 390 Q ${400 + dx * 0.55} 480 ${x} 400" fill="none" stroke="url(#${id})" stroke-width="9"/>` +
        `<rect x="${x - 9}" y="338" width="18" height="64" rx="6" fill="url(#${id})"/>` +
        `<ellipse cx="${x}" cy="326" rx="13" ry="20" fill="${C.glowHot}"/>` +
        glow(x, 322, 58, 64, 0.8 * g)
      );
    })
    .join("");
  return (
    `<defs>${def}</defs>` +
    ceilingMount(400, 260, C.brassDark) +
    `<ellipse cx="400" cy="285" rx="26" ry="18" fill="url(#${id})"/>` +
    `<rect x="392" y="285" width="16" height="130" rx="8" fill="url(#${id})"/>` +
    `<ellipse cx="400" cy="428" rx="34" ry="22" fill="url(#${id})"/>` +
    arms +
    glow(400, 380, 300, 190, 0.35 * g) +
    contactShadow(400, 712, 210, 0.14)
  );
}

/** Болор чандельер («Болор») */
export function chandelierCrystal(g) {
  const { id, def } = metalGrad("#cfcac0", "#8f897d");
  const arms = [-210, -120, 120, 210]
    .map((dx) => {
      const x = 400 + dx;
      return (
        `<path d="M400 380 Q ${400 + dx * 0.55} 460 ${x} 392" fill="none" stroke="url(#${id})" stroke-width="8"/>` +
        `<rect x="${x - 8}" y="336" width="16" height="58" rx="6" fill="url(#${id})"/>` +
        `<ellipse cx="${x}" cy="324" rx="12" ry="18" fill="${C.glowHot}"/>` +
        glow(x, 320, 52, 58, 0.75 * g)
      );
    })
    .join("");
  const drops = Array.from({ length: 13 }, (_, i) => {
    const x = 250 + i * 25;
    const len = 34 + (i % 3) * 18;
    return (
      `<line x1="${x}" y1="440" x2="${x}" y2="${440 + len}" stroke="${C.glass}" stroke-width="2.5" opacity="0.9"/>` +
      `<path d="M${x} ${440 + len} l7 12 l-7 12 l-7 -12 Z" fill="${C.glass}" stroke="#b9b2a5" stroke-width="1"/>`
    );
  }).join("");
  return (
    `<defs>${def}</defs>` +
    ceilingMount(400, 250, "#8f897d") +
    `<rect x="393" y="250" width="14" height="120" rx="7" fill="url(#${id})"/>` +
    `<ellipse cx="400" cy="440" rx="160" ry="20" fill="none" stroke="url(#${id})" stroke-width="8"/>` +
    arms +
    drops +
    `<line x1="400" y1="450" x2="400" y2="540" stroke="${C.glass}" stroke-width="3"/>` +
    `<path d="M400 540 l10 16 l-10 16 l-10 -16 Z" fill="${C.glass}" stroke="#b9b2a5" stroke-width="1"/>` +
    glow(400, 380, 290, 180, 0.4 * g) +
    contactShadow(400, 712, 190, 0.13)
  );
}

/** LED цагираган чандельер («Цацал») */
export function chandelierRings(g) {
  const rings = [
    [300, 220, 26],
    [385, 150, 20],
    [465, 84, 14],
  ]
    .map(
      ([cy, rx, ry]) =>
        `<ellipse cx="400" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${C.black}" stroke-width="11"/>` +
        `<ellipse cx="400" cy="${cy + 4}" rx="${rx - 2}" ry="${ry}" fill="none" stroke="${C.glowHot}" stroke-width="4" opacity="${0.9 * g}"/>` +
        glow(400, cy + 6, rx + 40, ry + 34, 0.5 * g),
    )
    .join("");
  return (
    ceilingMount(400, 60, C.black, 2) +
    `<line x1="290" y1="14" x2="330" y2="290" stroke="${C.black}" stroke-width="2"/>` +
    `<line x1="510" y1="14" x2="470" y2="290" stroke="${C.black}" stroke-width="2"/>` +
    `<line x1="400" y1="14" x2="400" y2="455" stroke="${C.black}" stroke-width="2"/>` +
    rings +
    contactShadow(400, 712, 200, 0.12)
  );
}

/** Даавуун бүрхүүлт дүүжин («Сарнай») — атираат drum */
export function pendantDrum(g, color = C.fabric, dark = "#ddceac") {
  const pleats = Array.from({ length: 24 }, (_, i) => {
    const x = 254 + i * 12.5;
    return `<line x1="${x}" y1="292" x2="${x}" y2="436" stroke="${dark}" stroke-width="3" opacity="0.55"/>`;
  }).join("");
  const bodyId = uid("dr");
  return (
    `<defs>${linGrad(bodyId, [[0, color], [0.55, color], [1, dark]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    ceilingMount(400, 284, C.body) +
    `<rect x="248" y="288" width="304" height="152" rx="16" fill="url(#${bodyId})"/>` +
    pleats +
    `<ellipse cx="400" cy="440" rx="152" ry="17" fill="${C.glowHot}" opacity="${0.85 * g}"/>` +
    lightCone(400, 448, 290, 430, 250, 0.4 * g) +
    glow(400, 452, 220, 110, 0.55 * g) +
    contactShadow(400, 712, 190, 0.15)
  );
}

/** Шилэн бөмбөлөг дүүжин («Туяа») */
export function pendantGlobe(g) {
  const gid = uid("gb");
  return (
    `<defs>${radGradSmoke(gid)}</defs>` +
    ceilingMount(400, 262, C.brassDark, 2.5) +
    `<rect x="386" y="258" width="28" height="26" rx="6" fill="${C.brass}"/>` +
    `<circle cx="400" cy="392" r="112" fill="url(#${gid})"/>` +
    `<circle cx="400" cy="392" r="112" fill="none" stroke="#8d8375" stroke-width="3" opacity="0.7"/>` +
    `<ellipse cx="352" cy="336" rx="42" ry="58" transform="rotate(32 352 336)" fill="${C.white}" opacity="0.45"/>` +
    `<circle cx="400" cy="398" r="40" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
    `<rect x="392" y="316" width="16" height="46" rx="6" fill="#6e675c" opacity="0.85"/>` +
    glow(400, 398, 150, 150, 0.7 * g) +
    contactShadow(400, 712, 150, 0.15)
  );
}

function radGradSmoke(id) {
  return `<radialGradient id="${id}" cx="0.38" cy="0.32" r="0.85"><stop offset="0" stop-color="#d9d3c7" stop-opacity="0.55"/><stop offset="0.68" stop-color="${C.smoke}" stop-opacity="0.62"/><stop offset="1" stop-color="#6e6557" stop-opacity="0.88"/></radialGradient>`;
}

/** Металл бөмбөгөр дүүжин («Наран») */
export function pendantDome(g, color = C.black, dark = "#0d0c0a") {
  const id = uid("dm");
  return (
    `<defs>${linGrad(id, [[0, color], [0.6, color], [1, dark]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    ceilingMount(400, 300, C.black, 2.5) +
    `<path d="M272 428 A 128 128 0 0 1 528 428 Z" fill="url(#${id})"/>` +
    `<ellipse cx="400" cy="428" rx="128" ry="14" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(400, 436, 250, 400, 260, 0.45 * g) +
    glow(400, 444, 190, 100, 0.6 * g) +
    contactShadow(400, 712, 180, 0.16)
  );
}

/** Модон гурван толгойт дүүжин («Шинэс») */
export function pendantWoodTriple(g) {
  const id = uid("wd");
  const heads = [255, 400, 545]
    .map(
      (x) =>
        `<line x1="${x}" y1="262" x2="${x}" y2="352" stroke="${C.body}" stroke-width="2.5"/>` +
        `<path d="M${x - 52} 420 L${x - 18} 352 L${x + 18} 352 L${x + 52} 420 Z" fill="url(#${id})"/>` +
        `<ellipse cx="${x}" cy="421" rx="52" ry="8" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
        lightCone(x, 426, 100, 170, 200, 0.35 * g) +
        glow(x, 432, 86, 62, 0.5 * g),
    )
    .join("");
  return (
    `<defs>${linGrad(id, [[0, C.wood], [1, C.woodDark]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    ceilingMount(400, 240, C.body, 2.5) +
    `<rect x="196" y="240" width="408" height="22" rx="11" fill="url(#${id})"/>` +
    heads +
    contactShadow(400, 712, 210, 0.13)
  );
}

/** Наамал drum («Саран», «Хар сар») */
export function flushDrum(g, { color = C.offwhite, dark = "#d8d0bd", w = 280, h = 116 } = {}) {
  const id = uid("fl");
  const x = 400 - w / 2;
  return (
    `<defs>${linGrad(id, [[0, color], [0.55, color], [1, dark]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    `<rect x="330" y="0" width="140" height="16" rx="8" fill="${dark}"/>` +
    `<rect x="${x}" y="14" width="${w}" height="${h}" rx="${Math.min(26, h / 3)}" fill="url(#${id})"/>` +
    `<ellipse cx="400" cy="${14 + h}" rx="${w / 2 - 6}" ry="14" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(400, 22 + h, w - 30, w + 200, 380, 0.35 * g) +
    glow(400, 40 + h, w * 0.72, 120, 0.55 * g) +
    contactShadow(400, 712, 200, 0.12)
  );
}

/** Шугаман LED дүүжин («Жим», «Солонго») */
export function linearPendant(g, { color = C.black, len = 440 } = {}) {
  const x = 400 - len / 2;
  return (
    `<rect x="330" y="0" width="140" height="14" rx="7" fill="${color}"/>` +
    `<line x1="${x + 40}" y1="14" x2="${x + 40}" y2="308" stroke="${color}" stroke-width="2.5"/>` +
    `<line x1="${x + len - 40}" y1="14" x2="${x + len - 40}" y2="308" stroke="${color}" stroke-width="2.5"/>` +
    `<rect x="${x}" y="308" width="${len}" height="20" rx="8" fill="${color}"/>` +
    `<rect x="${x + 6}" y="326" width="${len - 12}" height="7" rx="3.5" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
    lightCone(400, 334, len - 20, len + 160, 300, 0.4 * g) +
    glow(400, 350, len * 0.62, 100, 0.5 * g) +
    contactShadow(400, 712, len * 0.5, 0.14)
  );
}

/** Суулгамал спот 3 ш («Цэглэг») */
export function recessedSpots(g) {
  const spots = [250, 400, 550]
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="46" rx="42" ry="14" fill="#eee5d3" stroke="#b3a789" stroke-width="4"/>` +
        `<ellipse cx="${x}" cy="46" rx="26" ry="8" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
        lightCone(x, 54, 48, 190, 560, 0.4 * g) +
        `<ellipse cx="${x}" cy="660" rx="95" ry="16" fill="${C.glowWarm}" opacity="${0.35 * g}"/>`,
    )
    .join("");
  return `<rect x="0" y="0" width="800" height="34" fill="#eae2d0"/><line x1="0" y1="34" x2="800" y2="34" stroke="#cdc1a6" stroke-width="2"/>` + spots;
}

/** Рельсэн гэрэл («Зам» 4 спот, «Урт» 6 спот) */
export function trackLight(g, { heads = 4, len = 500 } = {}) {
  const x0 = 400 - len / 2;
  const gap = len / (heads + 1);
  const headEls = Array.from({ length: heads }, (_, i) => {
    const x = x0 + gap * (i + 1);
    const tilt = i % 2 === 0 ? -16 : 14;
    return (
      `<line x1="${x}" y1="78" x2="${x}" y2="106" stroke="${C.black}" stroke-width="5"/>` +
      `<g transform="rotate(${tilt} ${x} 128)">` +
      `<rect x="${x - 22}" y="106" width="44" height="64" rx="12" fill="${C.black}"/>` +
      `<ellipse cx="${x}" cy="170" rx="19" ry="7" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
      lightCone(x, 176, 40, 150, 460, 0.35 * g) +
      `</g>`
    );
  }).join("");
  return (
    `<rect x="330" y="0" width="140" height="12" rx="6" fill="${C.black}"/>` +
    `<line x1="400" y1="12" x2="400" y2="68" stroke="${C.black}" stroke-width="4"/>` +
    `<rect x="${x0}" y="68" width="${len}" height="12" rx="6" fill="${C.black}"/>` +
    headEls
  );
}
