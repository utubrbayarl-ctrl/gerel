/**
 * Хананы гэрэл ба чийдэнгийн archetype-ууд.
 * g = гэрлийн туяаны эрчим (0.45 = студи, 1 = бүрий).
 */
import { C, contactShadow, glow, lightCone, linGrad, metalGrad, uid } from "./helpers.mjs";

const wallPlate = (x, y, color) =>
  `<rect x="${x - 10}" y="${y - 34}" width="20" height="68" rx="10" fill="${color}"/>`;

/** Гуулин даавуун бра («Эгшиг») */
export function sconceBrassFabric(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  return (
    `<defs>${def}</defs>` +
    wallPlate(400, 400, C.brassDark) +
    `<path d="M400 400 Q 460 400 460 340" fill="none" stroke="url(#${id})" stroke-width="9"/>` +
    `<path d="M408 268 L512 268 L536 344 L384 344 Z" fill="${C.fabric}" stroke="#ddceac" stroke-width="2"/>` +
    `<ellipse cx="460" cy="345" rx="76" ry="9" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(460, 352, 140, 220, 240, 0.3 * g) +
    lightCone(460, 264, 100, 190, 200, 0.25 * g, true) +
    glow(460, 310, 130, 110, 0.55 * g)
  );
}

/** Дээш-доош цилиндр бра («Сүүдэр») */
export function sconceUpDown(g, color = C.black) {
  return (
    wallPlate(400, 380, color) +
    `<rect x="368" y="322" width="64" height="118" rx="14" fill="${color}"/>` +
    `<ellipse cx="400" cy="322" rx="30" ry="7" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    `<ellipse cx="400" cy="440" rx="30" ry="7" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(400, 316, 56, 230, 260, 0.42 * g, true) +
    lightCone(400, 446, 56, 230, 260, 0.42 * g) +
    glow(400, 380, 120, 160, 0.35 * g)
  );
}

/** Шилэн бөмбөлөгт бра («Номин») */
export function sconceGlobe(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  const gid = uid("mg");
  return (
    `<defs>${def}<radialGradient id="${gid}" cx="0.4" cy="0.35" r="0.9"><stop offset="0" stop-color="${C.white}" stop-opacity="0.98"/><stop offset="1" stop-color="#dcd3c0" stop-opacity="0.98"/></radialGradient></defs>` +
    wallPlate(400, 400, C.brassDark) +
    `<line x1="400" y1="400" x2="400" y2="330" stroke="url(#${id})" stroke-width="8"/>` +
    `<circle cx="400" cy="330" r="14" fill="url(#${id})"/>` +
    `<circle cx="400" cy="300" r="74" fill="url(#${gid})"/>` +
    glow(400, 300, 130, 130, 0.7 * g)
  );
}

/** Толины LED гэрэл («Гэгээ», «Цагаан») — толин дээрх бар */
export function vanityBar(g, { len = 320 } = {}) {
  const x = 400 - len / 2;
  return (
    `<rect x="${400 - len / 2 - 20}" y="330" width="${len + 40}" height="290" rx="10" fill="#e3e7e6" opacity="0.9" stroke="#b9ad92" stroke-width="4"/>` +
    `<path d="M${x + 24} 360 L${x + len * 0.4} 600 L${x + len * 0.24} 600 Z" fill="${C.white}" opacity="0.35"/>` +
    `<rect x="${x}" y="286" width="${len}" height="18" rx="9" fill="#d9d5cc"/>` +
    `<rect x="${x + 4}" y="300" width="${len - 8}" height="8" rx="4" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
    lightCone(400, 306, len - 12, len + 90, 240, 0.28 * g) +
    glow(400, 320, len * 0.62, 90, 0.5 * g)
  );
}

/** Зургийн гэрэл («Музей») — уран зурган дээрх гуулин гэрэл */
export function pictureLight(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  return (
    `<defs>${def}</defs>` +
    `<rect x="292" y="330" width="216" height="166" fill="#efe6d2" stroke="${C.woodDark}" stroke-width="12"/>` +
    `<path d="M292 448 Q 360 386 420 430 T 508 412 L508 496 L292 496 Z" fill="${C.terraDark}" opacity="0.75"/>` +
    `<circle cx="352" cy="376" r="17" fill="${C.amber}" opacity="0.9"/>` +
    `<path d="M400 330 L400 292 Q 400 268 428 268 L448 268" fill="none" stroke="url(#${id})" stroke-width="8"/>` +
    `<rect x="330" y="252" width="140" height="20" rx="10" fill="url(#${id})"/>` +
    lightCone(400, 274, 140, 230, 200, 0.4 * g) +
    glow(400, 380, 160, 130, 0.4 * g)
  );
}

/** Нуман шалны чийдэн («Нүүдэлчин») */
export function floorArc(g) {
  const id = uid("mb");
  return (
    `<defs>${linGrad(id, [[0, "#f4f1ea"], [1, "#cfc8b8"]])}</defs>` +
    `<ellipse cx="270" cy="694" rx="86" ry="20" fill="url(#${id})" stroke="#bdb4a1" stroke-width="2"/>` +
    `<path d="M270 690 L270 400 Q 274 212 470 216 Q 560 220 566 300" fill="none" stroke="${C.black}" stroke-width="11"/>` +
    `<path d="M506 300 A 60 60 0 0 1 626 300 Z" fill="${C.black}"/>` +
    `<ellipse cx="566" cy="300" rx="60" ry="9" fill="${C.glowHot}" opacity="${0.92 * g}"/>` +
    lightCone(566, 308, 112, 240, 380, 0.4 * g) +
    glow(566, 330, 130, 100, 0.55 * g) +
    `<ellipse cx="566" cy="688" rx="130" ry="18" fill="${C.glowWarm}" opacity="${0.3 * g}"/>` +
    contactShadow(300, 704, 130, 0.2)
  );
}

/** Гурван хөлт шалны чийдэн («Уяхан») */
export function floorTripod(g) {
  const id = uid("tp");
  return (
    `<defs>${linGrad(id, [[0, C.fabric], [0.55, C.fabric], [1, "#ddceac"]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    `<line x1="400" y1="470" x2="316" y2="700" stroke="${C.wood}" stroke-width="12" stroke-linecap="round"/>` +
    `<line x1="400" y1="470" x2="484" y2="700" stroke="${C.woodDark}" stroke-width="12" stroke-linecap="round"/>` +
    `<line x1="400" y1="470" x2="400" y2="706" stroke="${C.wood}" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M330 356 L470 356 L492 476 L308 476 Z" fill="url(#${id})"/>` +
    `<ellipse cx="400" cy="477" rx="92" ry="10" fill="${C.glowHot}" opacity="${0.85 * g}"/>` +
    lightCone(400, 484, 170, 260, 210, 0.28 * g) +
    glow(400, 420, 150, 130, 0.5 * g) +
    contactShadow(400, 712, 170, 0.2)
  );
}

/** Уншлагын LED шалны чийдэн («Тунд») */
export function floorReading(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  return (
    `<defs>${def}</defs>` +
    `<ellipse cx="430" cy="700" rx="70" ry="15" fill="url(#${id})"/>` +
    `<line x1="430" y1="698" x2="430" y2="330" stroke="url(#${id})" stroke-width="9"/>` +
    `<path d="M430 330 Q 430 290 386 290 L352 290" fill="none" stroke="url(#${id})" stroke-width="8"/>` +
    `<path d="M368 262 A 34 34 0 0 0 300 262 Z" transform="rotate(-14 334 268)" fill="${C.black}"/>` +
    `<ellipse cx="334" cy="272" rx="30" ry="6" transform="rotate(-14 334 272)" fill="${C.glowHot}" opacity="${0.92 * g}"/>` +
    lightCone(326, 280, 56, 170, 330, 0.4 * g) +
    glow(330, 300, 90, 76, 0.5 * g) +
    contactShadow(430, 710, 110, 0.2)
  );
}

const tableTop = () =>
  `<rect x="216" y="560" width="368" height="16" rx="6" fill="${C.wood}"/>` +
  `<rect x="240" y="576" width="14" height="128" fill="${C.woodDark}"/>` +
  `<rect x="546" y="576" width="14" height="128" fill="${C.woodDark}"/>`;

/** Керамик ширээний чийдэн («Оюу») */
export function tableCeramic(g) {
  const id = uid("cr");
  return (
    tableTop() +
    `<defs>${linGrad(id, [[0, C.teal], [0.5, C.teal], [1, "#3f8273"]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    `<ellipse cx="400" cy="512" rx="56" ry="52" fill="url(#${id})"/>` +
    `<rect x="388" y="440" width="24" height="34" fill="url(#${id})"/>` +
    `<path d="M322 350 L478 350 L502 442 L298 442 Z" fill="${C.fabric}" stroke="#c9b791" stroke-width="3"/>` +
    `<path d="M441 350 L478 350 L502 442 L458 442 Z" fill="#e0d0ab" opacity="0.8"/>` +
    `<ellipse cx="400" cy="443" rx="102" ry="10" fill="${C.glowHot}" opacity="${0.85 * g}"/>` +
    glow(400, 400, 150, 120, 0.55 * g) +
    contactShadow(400, 566, 120, 0.18)
  );
}

/** Хүүхдийн туулай чийдэн («Бөжин») */
export function tableBunny(g) {
  const gid = uid("bn");
  return (
    tableTop() +
    `<defs><radialGradient id="${gid}" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${C.glowHot}"/><stop offset="1" stop-color="#efe4ce"/></radialGradient></defs>` +
    `<ellipse cx="374" cy="392" rx="24" ry="66" transform="rotate(-12 374 392)" fill="url(#${gid})"/>` +
    `<ellipse cx="430" cy="390" rx="24" ry="70" transform="rotate(10 430 390)" fill="url(#${gid})"/>` +
    `<ellipse cx="400" cy="496" rx="82" ry="72" fill="url(#${gid})"/>` +
    `<circle cx="372" cy="484" r="5" fill="${C.body}"/>` +
    `<circle cx="428" cy="484" r="5" fill="${C.body}"/>` +
    `<path d="M388 508 Q 400 516 412 508" fill="none" stroke="${C.body}" stroke-width="4" stroke-linecap="round"/>` +
    glow(400, 470, 160, 140, 0.7 * g) +
    contactShadow(400, 566, 110, 0.16)
  );
}

/** Банкирын чийдэн («Алтан») */
export function tableBanker(g) {
  const { id, def } = metalGrad(C.brass, C.brassDark);
  const gid = uid("gg");
  return (
    tableTop() +
    `<defs>${def}${linGrad(gid, [[0, "#5a9a76"], [0.5, C.greenGlass], [1, "#2c4f3a"]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>` +
    `<ellipse cx="400" cy="556" rx="86" ry="14" fill="url(#${id})"/>` +
    `<rect x="392" y="452" width="16" height="98" fill="url(#${id})"/>` +
    `<path d="M300 452 A 100 54 0 0 1 500 452 L472 452 A 72 38 0 0 0 328 452 Z" fill="url(#${gid})"/>` +
    `<ellipse cx="400" cy="452" rx="86" ry="10" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(400, 458, 160, 220, 100, 0.35 * g) +
    glow(400, 440, 130, 90, 0.55 * g) +
    contactShadow(400, 566, 120, 0.18)
  );
}

/** Хавчаартай ажлын чийдэн («Төгсгөл») */
export function taskClamp(g) {
  return (
    tableTop() +
    `<rect x="286" y="540" width="30" height="52" rx="8" fill="${C.black}"/>` +
    `<path d="M300 544 C 300 430 360 430 400 396 C 436 366 460 360 486 366" fill="none" stroke="${C.black}" stroke-width="10" stroke-linecap="round"/>` +
    `<g transform="rotate(24 500 372)"><rect x="462" y="352" width="76" height="34" rx="16" fill="${C.black}"/></g>` +
    `<ellipse cx="506" cy="390" rx="30" ry="7" transform="rotate(24 506 390)" fill="${C.glowHot}" opacity="${0.92 * g}"/>` +
    lightCone(514, 398, 60, 170, 170, 0.45 * g) +
    glow(510, 420, 90, 76, 0.5 * g) +
    `<ellipse cx="520" cy="560" rx="100" ry="10" fill="${C.glowWarm}" opacity="${0.4 * g}"/>`
  );
}

/** Архитекторын хос мөртэй чийдэн («Архитектор») */
export function taskArchitect(g) {
  return (
    tableTop() +
    `<ellipse cx="330" cy="556" rx="52" ry="10" fill="${C.black}"/>` +
    `<line x1="330" y1="552" x2="302" y2="420" stroke="${C.black}" stroke-width="9" stroke-linecap="round"/>` +
    `<line x1="302" y1="420" x2="450" y2="352" stroke="${C.black}" stroke-width="9" stroke-linecap="round"/>` +
    `<line x1="310" y1="432" x2="446" y2="368" stroke="${C.black}" stroke-width="2.5" opacity="0.7"/>` +
    `<circle cx="302" cy="420" r="9" fill="${C.black}"/>` +
    `<g transform="rotate(30 470 356)"><path d="M430 340 A 42 42 0 0 1 514 340 Z" fill="${C.black}"/></g>` +
    `<ellipse cx="474" cy="368" rx="36" ry="8" transform="rotate(28 474 368)" fill="${C.glowHot}" opacity="${0.92 * g}"/>` +
    lightCone(484, 378, 70, 190, 180, 0.42 * g) +
    glow(478, 400, 100, 84, 0.5 * g) +
    `<ellipse cx="500" cy="560" rx="110" ry="10" fill="${C.glowWarm}" opacity="${0.4 * g}"/>`
  );
}
