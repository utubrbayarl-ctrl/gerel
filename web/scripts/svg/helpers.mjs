/**
 * SVG студи-рендерийн суурь хэрэгслүүд.
 * Палитр нь сайтын дизайн токентой (claude DESIGN.md) уялдана —
 * cream суурь, дулаан amber glow, terracotta болон харанхуй тонууд.
 */

export const C = {
  // Сайтын токентой ижил суурь өнгөнүүд
  cream: "#faf9f5",
  soft: "#f5f0e8",
  card: "#efe9de",
  strong: "#e8e0d2",
  ink: "#141413",
  body: "#3d3d3a",
  muted: "#6c6a64",
  hairline: "#e6dfd8",
  dark: "#181715",
  darkEl: "#252320",
  terra: "#cc785c",
  terraDark: "#a9583e",
  amber: "#e8a55a",
  teal: "#5db8a6",
  // Зургийн урлагт хэрэглэх дулаан гэрлийн болон материалын тонууд
  glowHot: "#fdf3da",
  glowWarm: "#f3ddab",
  glowSoft: "#f7e8c3",
  brass: "#c9a35e",
  brassDark: "#8a6a33",
  wood: "#b98d5f",
  woodDark: "#8a6540",
  white: "#ffffff",
  offwhite: "#f3efe7",
  black: "#211e1a",
  steel: "#55504a",
  glass: "#d8d4cc",
  smoke: "#a89f92",
  greenGlass: "#3f6f52",
  fabric: "#efe3cd",
};

let counter = 0;
/** Файл доторх давхардалгүй id */
export const uid = (prefix = "g") => `${prefix}${++counter}`;

export function svgDoc(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`;
}

/** stops: [[offset, color, opacity?]] */
export function linGrad(id, stops, { x1 = 0, y1 = 0, x2 = 0, y2 = 1 } = {}) {
  const s = stops
    .map(
      ([o, c, op]) =>
        `<stop offset="${o}" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ""}/>`,
    )
    .join("");
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${s}</linearGradient>`;
}

export function radGrad(id, stops) {
  const s = stops
    .map(
      ([o, c, op]) =>
        `<stop offset="${o}" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ""}/>`,
    )
    .join("");
  return `<radialGradient id="${id}">${s}</radialGradient>`;
}

/** Дулаан гэрлийн бөөрөнхий туяа */
export function glow(cx, cy, rx, ry, opacity = 1) {
  const id = uid("gl");
  return `<defs>${radGrad(id, [
    [0, C.glowHot, 0.95 * opacity],
    [0.35, C.glowWarm, 0.5 * opacity],
    [1, C.glowWarm, 0],
  ])}</defs><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})"/>`;
}

/** Шалан дээрх зөөлөн сүүдэр */
export function contactShadow(cx, cy, rx, opacity = 0.22) {
  const id = uid("sh");
  return `<defs>${radGrad(id, [
    [0, C.ink, opacity],
    [1, C.ink, 0],
  ])}</defs><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.16}" fill="url(#${id})"/>`;
}

/** Гэрлийн конус (спот, бра) — доош эсвэл дээш */
export function lightCone(x, y, topW, bottomW, height, opacity = 0.5, up = false) {
  const id = uid("cn");
  const dir = up ? -1 : 1;
  const y2 = y + dir * height;
  const grad = linGrad(
    id,
    [
      [0, C.glowHot, 0.75 * opacity],
      [1, C.glowWarm, 0],
    ],
    { x1: 0, y1: up ? 1 : 0, x2: 0, y2: up ? 0 : 1 },
  );
  return `<defs>${grad}</defs><path d="M ${x - topW / 2} ${y} L ${x + topW / 2} ${y} L ${x + bottomW / 2} ${y2} L ${x - bottomW / 2} ${y2} Z" fill="url(#${id})"/>`;
}

/** Нарийн ширхэгтэй мөхлөг — premium текстур */
export function grain(w, h, opacity = 0.04) {
  const id = uid("nz");
  return `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0.08 0 0 0 0 0.07 0 0 0 0 0.06 0 0 0 ${opacity} 0"/></filter><rect width="${w}" height="${h}" filter="url(#${id})"/>`;
}

/**
 * Барааны 800×800 студийн дэвсгэр.
 * mode: "studio" — цайвар cream; "ambient" — бүрий, гэрэл асаалттай үзэмж
 */
export function productBg(mode) {
  const wallId = uid("wall");
  const floorId = uid("floor");
  if (mode === "ambient") {
    return `<defs>${linGrad(wallId, [
      [0, "#332d24"],
      [0.75, "#211d17"],
      [1, "#191612"],
    ])}${linGrad(floorId, [
      [0, "#211d17"],
      [1, "#131110"],
    ])}</defs><rect width="800" height="800" fill="url(#${wallId})"/><rect y="640" width="800" height="160" fill="url(#${floorId})"/>`;
  }
  return `<defs>${linGrad(wallId, [
    [0, C.cream],
    [0.8, "#f2ecdf"],
    [1, "#ede5d5"],
  ])}${linGrad(floorId, [
    [0, "#e9e1d0"],
    [1, "#ded4bf"],
  ])}</defs><rect width="800" height="800" fill="url(#${wallId})"/><rect y="640" width="800" height="160" fill="url(#${floorId})"/><line x1="0" y1="640" x2="800" y2="640" stroke="#d8cdb8" stroke-width="2" opacity="0.6"/>`;
}

/** Таазнаас унжих кабель ба таазны таг */
export function ceilingMount(x, cableY, color = C.black, cableW = 3) {
  return `<rect x="${x - 28}" y="0" width="56" height="14" rx="7" fill="${color}"/><line x1="${x}" y1="14" x2="${x}" y2="${cableY}" stroke="${color}" stroke-width="${cableW}"/>`;
}

/** Металл гадаргуугийн босоо градиент (гуулин, хар металл г.м.) */
export function metalGrad(base, dark) {
  const id = uid("mt");
  const def = linGrad(
    id,
    [
      [0, base],
      [0.5, base],
      [1, dark],
    ],
    { x1: 0, y1: 0, x2: 1, y2: 0 },
  );
  return { id, def };
}
