/**
 * Бүх SVG зургийг үүсгэнэ: node scripts/generate-images.mjs
 *
 * Бараа бүрт 2 харагдац:
 *   -1.svg — цайвар студи (g=0.5)
 *   -2.svg — бүрий орчин, гэрэл бүрэн асаалттай (g=1)
 * Мөн ангиллын карт/hero, дэд ангиллын товчлол, өрөөний зураг,
 * нүүрийн hero-г үүсгэнэ.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { grain, productBg, svgDoc } from "./svg/helpers.mjs";
import * as ceil from "./svg/archetypes-ceiling.mjs";
import * as lamp from "./svg/archetypes-lamps.mjs";
import * as misc from "./svg/archetypes-outdoor-led.mjs";
import {
  categoryCard,
  categoryHero,
  homeHero,
  roomDrawers,
  roomScene,
} from "./svg/scenes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

/** slug → archetype зурагч функц */
const productDrawers = {
  "chandelier-mandal": (g) => ceil.chandelierBrass(g),
  "chandelier-bolor": (g) => ceil.chandelierCrystal(g),
  "chandelier-tsatsal": (g) => ceil.chandelierRings(g),
  "duujin-sarnai": (g) => ceil.pendantDrum(g),
  "duujin-tuya": (g) => ceil.pendantGlobe(g),
  "duujin-naran": (g) => ceil.pendantDome(g),
  "duujin-shines": (g) => ceil.pendantWoodTriple(g),
  "naamal-saran": (g) => ceil.flushDrum(g),
  "naamal-khar-sar": (g) => ceil.flushDrum(g, { color: "#26231f", dark: "#121110", w: 210, h: 96 }),
  "shugaman-jim": (g) => ceil.linearPendant(g),
  "shugaman-solongo": (g) => ceil.linearPendant(g, { color: "#e8e4da", len: 520 }),
  "spot-tsegleg": (g) => ceil.recessedSpots(g),
  "relsen-zam": (g) => ceil.trackLight(g),
  "relsen-urt": (g) => ceil.trackLight(g, { heads: 6, len: 620 }),
  "bra-egshig": (g) => lamp.sconceBrassFabric(g),
  "bra-suuder": (g) => lamp.sconceUpDown(g),
  "bra-nomin": (g) => lamp.sconceGlobe(g),
  "toliny-gegee": (g) => lamp.vanityBar(g),
  "toliny-tsagaan": (g) => lamp.vanityBar(g, { len: 420 }),
  "zurgiin-muzei": (g) => lamp.pictureLight(g),
  "shalny-nuudelchin": (g) => lamp.floorArc(g),
  "shalny-uyakhan": (g) => lamp.floorTripod(g),
  "shalny-tund": (g) => lamp.floorReading(g),
  "shireeny-oyu": (g) => lamp.tableCeramic(g),
  "shireeny-buzhin": (g) => lamp.tableBunny(g),
  "shireeny-altan": (g) => lamp.tableBanker(g),
  "azhlyn-tugsgul": (g) => lamp.taskClamp(g),
  "azhlyn-arkhitektor": (g) => lamp.taskArchitect(g),
  "tsetserleg-zul": (g) => misc.bollard(g),
  "tsetserleg-nar": (g) => misc.solarStakes(g),
  "fasadny-tulga": (g) => misc.facadeUpDown(g),
  "fasadny-gerelt": (g) => misc.floodlight(g),
  "zamyn-shon": (g) => misc.pathPole(g),
  "zurvas-solongo": (g) => misc.ledStripRgb(g),
  "zurvas-tsagaan": (g) => misc.ledStripWarm(g),
  "panel-durvulj": (g) => misc.ledPanel(g),
  "panel-urgun": (g) => misc.ledPanel(g, { w: 520, h: 150 }),
  "udriin-tuya-120": (g) => ceil.linearPendant(g, { color: "#e9e2d0", len: 480 }),
  "udriin-tuya-60": (g) => ceil.linearPendant(g, { color: "#e9e2d0", len: 340 }),
  "aguulakhyn-orgil": (g) => ceil.pendantDome(g),
  "aguulakhyn-titem": (g) => ceil.pendantDome(g, "#26231f", "#121110"),
  "avjur-zendmene": (g) => ceil.pendantDrum(g),
  "avjur-suljmel": (g) => ceil.pendantDrum(g, "#d9c39a", "#c4ab82"),
};

/** Дэд ангилалд төлөөлөл болох archetype */
const subcategoryDrawers = {
  soronzon: (g) => ceil.trackLight(g),
  bra: (g) => lamp.sconceBrassFabric(g),
  toliny: (g) => lamp.vanityBar(g),
  zurgiin: (g) => lamp.pictureLight(g),
  shalny: (g) => lamp.floorArc(g),
  shireeny: (g) => lamp.tableCeramic(g),
  azhlyn: (g) => lamp.taskArchitect(g),
  tsetserlegiin: (g) => misc.bollard(g),
  fasadny: (g) => misc.facadeUpDown(g),
  zamyn: (g) => misc.pathPole(g),
  prozhektor: (g) => misc.floodlight(g),
  "shongiin-tolgoi": (g) => misc.pathPole(g),
  zurvas: (g) => misc.ledStripRgb(g),
  panel: (g) => misc.ledPanel(g),
  udriin: (g) => ceil.linearPendant(g, { color: "#e9e2d0", len: 480 }),
  offis: (g) => misc.ledPanel(g, { w: 520, h: 150 }),
  aguulakhyn: (g) => ceil.pendantDome(g),
  avjur: (g) => ceil.pendantDrum(g),
};

/** Ангиллын карт ба hero-д гарах гол дүрс (scene доторх байрлалтай) */
const categoryFeature = {
  "taazny-gerel": (scale, x, y) => (g) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${ceil.pendantDrum(g)}</g>`,
  "khanany-gerel": (scale, x, y) => (g) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${lamp.sconceBrassFabric(g)}</g>`,
  chiiden: (scale, x, y) => (g) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${lamp.floorArc(g)}</g>`,
  "gadna-gerel": (scale, x, y) => (g) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${misc.pathPole(g)}</g>`,
  "led-ukhaalag": (scale, x, y) => (g) =>
    `<g transform="translate(${x} ${y}) scale(${scale})">${misc.smartCeiling(g)}</g>`,
};

function write(rel, content) {
  const path = join(root, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, "utf8");
}

let count = 0;
const emit = (rel, content) => {
  write(rel, content);
  count += 1;
};

/* --- Бараа: 2 харагдац --- */
for (const [slug, draw] of Object.entries(productDrawers)) {
  emit(
    `products/${slug}-1.svg`,
    svgDoc(800, 800, productBg("studio") + draw(0.5) + grain(800, 800, 0.035)),
  );
  emit(
    `products/${slug}-2.svg`,
    svgDoc(800, 800, productBg("ambient") + draw(1) + grain(800, 800, 0.05)),
  );
}

/* --- Дэд ангиллын товчлол (mega menu) — цайвар суурин дээр жижиг render --- */
for (const [slug, draw] of Object.entries(subcategoryDrawers)) {
  emit(
    `subcategories/${slug}.svg`,
    svgDoc(
      800,
      800,
      productBg("studio") + draw(0.85) + grain(800, 800, 0.03),
    ),
  );
}

/* --- Ангиллын карт (800×1000) ба hero (1600×700) --- */
/** Хананы гэрэл цонхон дээр давхцахгүйн тулд картын байрлалыг ангилал бүрээр тохируулна */
const cardOffset = {
  "taazny-gerel": [40, 120],
  "khanany-gerel": [-80, 120],
  chiiden: [10, 120],
  "gadna-gerel": [40, 140],
  "led-ukhaalag": [-30, 220],
};

for (const slug of Object.keys(categoryFeature)) {
  const [ox, oy] = cardOffset[slug];
  emit(
    `categories/${slug}.svg`,
    svgDoc(800, 1000, categoryCard((/* w,h */) => categoryFeature[slug](0.9, ox, oy)(1))),
  );
  emit(
    `heroes/${slug}.svg`,
    svgDoc(
      1600,
      700,
      categoryHero(() =>
        [
          categoryFeature[slug](0.72, 140, 40)(1),
          categoryFeature[slug](0.55, 940, 120)(0.9),
        ].join(""),
      ),
    ),
  );
}

/* --- Өрөөнүүд --- */
for (const [slug, furniture] of Object.entries(roomDrawers)) {
  emit(`rooms/${slug}.svg`, svgDoc(800, 600, roomScene(furniture)));
}

/* --- Нүүрийн hero --- */
emit("heroes/home.svg", svgDoc(1920, 900, homeHero()));

console.log(`OK: ${count} SVG file(s) written to public/images`);
