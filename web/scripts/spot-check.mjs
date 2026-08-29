import sharp from "sharp";
import { join } from "node:path";
const base = "C:/Users/Dell/gerel/web/public/images/products";
const files = [
  "shireeny-oyu-1.svg", "shireeny-oyu-2.svg",
  "duujin-tuya-1.svg", "duujin-tuya-2.svg",
  "fasadny-tulga-1.svg", "toliny-gegee-1.svg",
  "spot-tsegleg-1.svg", "panel-durvulj-1.svg",
];
const CELL = 280, COLS = 4;
const comps = [];
for (let i = 0; i < files.length; i++) {
  const png = await sharp(join(base, files[i]), { density: 72 })
    .resize(CELL - 8, CELL - 8, { fit: "contain", background: "#ffffff" })
    .png().toBuffer();
  comps.push({ input: png, left: (i % COLS) * CELL + 4, top: Math.floor(i / COLS) * CELL + 4 });
}
await sharp({ create: { width: COLS * CELL, height: 2 * CELL, channels: 3, background: "#dddddd" } })
  .composite(comps).png()
  .toFile("C:/Users/Dell/AppData/Local/Temp/claude/C--Users-Dell-gerel/a73e18f9-d575-4ee2-8097-7bcd890fc478/scratchpad/sheets/spot.png");
console.log("ok");
