/**
 * Гадна гэрэлтүүлэг ба LED/ухаалаг бүтээгдэхүүний archetype-ууд.
 * g = гэрлийн туяаны эрчим (0.45 = студи, 1 = бүрий).
 */
import { C, contactShadow, glow, lightCone, linGrad, uid } from "./helpers.mjs";

/** Цэцэрлэгийн шонт гэрэл («Зул») */
export function bollard(g) {
  return (
    `<rect x="382" y="380" width="36" height="320" rx="8" fill="${C.black}"/>` +
    `<rect x="386" y="404" width="28" height="64" rx="6" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
    `<rect x="376" y="366" width="48" height="18" rx="8" fill="${C.black}"/>` +
    glow(400, 436, 120, 110, 0.6 * g) +
    `<ellipse cx="400" cy="700" rx="150" ry="16" fill="${C.glowWarm}" opacity="${0.3 * g}"/>` +
    contactShadow(400, 706, 90, 0.22)
  );
}

/** Нарны эрчимт гэрлийн багц («Нар») */
export function solarStakes(g) {
  const stakes = [
    [260, 470],
    [400, 420],
    [540, 470],
  ]
    .map(
      ([x, top]) =>
        `<line x1="${x}" y1="700" x2="${x}" y2="${top + 40}" stroke="#3c3833" stroke-width="7"/>` +
        `<path d="M${x - 34} ${top + 40} L${x + 34} ${top + 40} L${x + 24} ${top} L${x - 24} ${top} Z" fill="${C.steel}"/>` +
        `<rect x="${x - 20}" y="${top - 10}" width="40" height="12" rx="4" fill="${C.darkEl}"/>` +
        `<rect x="${x - 28}" y="${top + 18}" width="56" height="14" rx="6" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
        glow(x, top + 26, 84, 74, 0.55 * g) +
        contactShadow(x, 706, 60, 0.2),
    )
    .join("");
  return stakes;
}

/** Фасадны дээш-доош гэрэл («Тулга») */
export function facadeUpDown(g) {
  return (
    `<rect x="336" y="296" width="128" height="128" rx="16" fill="#3a3833"/>` +
    `<rect x="350" y="310" width="100" height="100" rx="10" fill="${C.darkEl}"/>` +
    `<ellipse cx="400" cy="296" rx="56" ry="10" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    `<ellipse cx="400" cy="424" rx="56" ry="10" fill="${C.glowHot}" opacity="${0.9 * g}"/>` +
    lightCone(400, 290, 104, 300, 290, 0.42 * g, true) +
    lightCone(400, 430, 104, 300, 290, 0.42 * g) +
    glow(400, 360, 160, 180, 0.3 * g)
  );
}

/** LED прожектор («Гэрэлт») */
export function floodlight(g) {
  const gid = uid("fd");
  return (
    `<defs>${linGrad(gid, [[0, C.glowHot], [1, C.glowWarm]], { x1: 0, y1: 0, x2: 1, y2: 1 })}</defs>` +
    `<path d="M330 700 L470 700 L440 660 L360 660 Z" fill="${C.black}"/>` +
    `<g transform="rotate(-24 400 560)">` +
    `<rect x="300" y="500" width="200" height="130" rx="16" fill="${C.black}"/>` +
    `<rect x="316" y="516" width="168" height="98" rx="8" fill="url(#${gid})" opacity="${Math.min(1, 0.55 + 0.45 * g)}"/>` +
    `</g>` +
    lightCone(470, 470, 190, 420, 400, 0.4 * g, true) +
    glow(420, 540, 180, 140, 0.5 * g) +
    contactShadow(400, 706, 130, 0.22)
  );
}

/** Замын шон гэрэл («Шон») */
export function pathPole(g) {
  return (
    `<rect x="388" y="330" width="24" height="370" rx="6" fill="#3a3833"/>` +
    `<rect x="368" y="280" width="64" height="56" rx="10" fill="${C.black}"/>` +
    `<ellipse cx="400" cy="336" rx="28" ry="7" fill="${C.glowHot}" opacity="${0.95 * g}"/>` +
    lightCone(400, 342, 54, 300, 360, 0.4 * g) +
    glow(400, 360, 110, 90, 0.5 * g) +
    `<ellipse cx="400" cy="700" rx="170" ry="17" fill="${C.glowWarm}" opacity="${0.32 * g}"/>` +
    contactShadow(400, 706, 80, 0.22)
  );
}

/** RGB LED зурвас («Солонго») — долгион тууз */
export function ledStripRgb(g) {
  const id = uid("rb");
  const grad = `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d76a5f"/><stop offset="0.22" stop-color="${C.amber}"/><stop offset="0.45" stop-color="#d9c26a"/><stop offset="0.65" stop-color="${C.teal}"/><stop offset="0.85" stop-color="#6a8fd7"/><stop offset="1" stop-color="#a76ad7"/></linearGradient>`;
  const path = "M110 520 C 230 420 320 620 440 500 S 640 400 690 470";
  const blurId = uid("bl");
  return (
    `<defs>${grad}<filter id="${blurId}"><feGaussianBlur stdDeviation="16"/></filter></defs>` +
    `<path d="${path}" fill="none" stroke="url(#${id})" stroke-width="34" stroke-linecap="round" filter="url(#${blurId})" opacity="${0.65 * g}"/>` +
    `<path d="${path}" fill="none" stroke="url(#${id})" stroke-width="17" stroke-linecap="round"/>` +
    contactShadow(400, 690, 210, 0.1)
  );
}

/** Дулаан цагаан LED зурвас ороомогтой («Цагаан») */
export function ledStripWarm(g) {
  const blurId = uid("bw");
  return (
    `<defs><filter id="${blurId}"><feGaussianBlur stdDeviation="12"/></filter></defs>` +
    `<circle cx="360" cy="480" r="104" fill="none" stroke="${C.glowWarm}" stroke-width="30" filter="url(#${blurId})" opacity="${0.6 * g}"/>` +
    `<circle cx="360" cy="480" r="104" fill="none" stroke="${C.glowHot}" stroke-width="15"/>` +
    `<circle cx="360" cy="480" r="66" fill="none" stroke="${C.glowHot}" stroke-width="15"/>` +
    `<circle cx="360" cy="480" r="30" fill="none" stroke="${C.glowHot}" stroke-width="14"/>` +
    `<path d="M462 460 C 540 420 570 500 660 470" fill="none" stroke="${C.glowHot}" stroke-width="15" stroke-linecap="round"/>` +
    glow(400, 480, 230, 170, 0.4 * g) +
    contactShadow(420, 620, 190, 0.12)
  );
}

/** LED панель («Дөрвөлж» 60×60, «Өргөн» 120×30) */
export function ledPanel(g, { w = 320, h = 320 } = {}) {
  const x = 400 - w / 2;
  const y = 400 - h / 2;
  const gid = uid("pn");
  return (
    `<defs>${linGrad(gid, [[0, C.white], [0.5, C.glowHot], [1, "#f0e6cf"]], { x1: 0, y1: 0, x2: 1, y2: 1 })}</defs>` +
    `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="14" fill="#c9c2b2" stroke="#a99e86" stroke-width="2"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${gid})" opacity="${Math.min(1, 0.75 + 0.3 * g)}"/>` +
    glow(400, 400, w * 0.75, h * 0.75, 0.5 * g) +
    contactShadow(400, 690, w * 0.5, 0.1)
  );
}

/** Ухаалаг RGBW чийдэн («Ухаан») */
export function smartBulb(g) {
  const halo = uid("hl");
  const bulb = uid("bb");
  return (
    `<defs><radialGradient id="${halo}"><stop offset="0" stop-color="${C.glowHot}" stop-opacity="${0.9 * g}"/><stop offset="0.45" stop-color="${C.teal}" stop-opacity="${0.22 * g}"/><stop offset="0.75" stop-color="#a76ad7" stop-opacity="${0.16 * g}"/><stop offset="1" stop-color="#a76ad7" stop-opacity="0"/></radialGradient><radialGradient id="${bulb}" cx="0.4" cy="0.35" r="0.9"><stop offset="0" stop-color="${C.white}"/><stop offset="1" stop-color="${C.glowSoft}"/></radialGradient></defs>` +
    `<ellipse cx="400" cy="380" rx="260" ry="240" fill="url(#${halo})"/>` +
    `<circle cx="400" cy="380" r="98" fill="url(#${bulb})"/>` +
    `<path d="M352 462 L448 462 L436 500 L364 500 Z" fill="${C.glowSoft}"/>` +
    `<rect x="364" y="500" width="72" height="14" rx="4" fill="#b9b2a2"/>` +
    `<rect x="368" y="518" width="64" height="12" rx="4" fill="#a49c8a"/>` +
    `<rect x="372" y="534" width="56" height="12" rx="4" fill="#b9b2a2"/>` +
    `<path d="M380 550 L420 550 L400 572 Z" fill="#8a8270"/>` +
    contactShadow(400, 660, 130, 0.12)
  );
}

/** Хөгжимд бүжиглэдэг ухаалаг зурвас («Мэдрэмж») */
export function ledStripMusic(g) {
  const id = uid("mz");
  const grad = `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.teal}"/><stop offset="0.5" stop-color="${C.amber}"/><stop offset="1" stop-color="#d76a5f"/></linearGradient>`;
  const bars = [
    [300, 90],
    [345, 150],
    [390, 60],
    [435, 190],
    [480, 110],
  ]
    .map(
      ([x, h]) =>
        `<rect x="${x}" y="${620 - h}" width="26" height="${h}" rx="13" fill="url(#${id})" opacity="0.9"/>`,
    )
    .join("");
  return (
    `<defs>${grad}</defs>` +
    `<path d="M140 380 C 260 300 380 440 520 360 S 680 320 700 360" fill="none" stroke="url(#${id})" stroke-width="16" stroke-linecap="round"/>` +
    glow(420, 380, 240, 110, 0.4 * g) +
    bars +
    contactShadow(400, 660, 200, 0.1)
  );
}

/** Ухаалаг таазны гэрэл («Тэнгэр») */
export function smartCeiling(g) {
  const gid = uid("sc");
  return (
    `<defs><radialGradient id="${gid}" cx="0.42" cy="0.4" r="0.85"><stop offset="0" stop-color="${C.white}"/><stop offset="0.7" stop-color="${C.glowHot}"/><stop offset="1" stop-color="#e7ddc6"/></radialGradient></defs>` +
    `<rect x="330" y="0" width="140" height="14" rx="7" fill="#d5cfc2"/>` +
    `<ellipse cx="400" cy="230" rx="186" ry="176" fill="#dcd7cc"/>` +
    `<ellipse cx="400" cy="226" rx="168" ry="158" fill="url(#${gid})" opacity="${Math.min(1, 0.8 + 0.25 * g)}"/>` +
    glow(400, 260, 280, 220, 0.5 * g) +
    contactShadow(400, 700, 200, 0.1)
  );
}
