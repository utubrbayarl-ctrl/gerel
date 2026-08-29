import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const base = "C:/Users/Dell/gerel/web/public/images";
const out = "C:/Users/Dell/AppData/Local/Temp/claude/C--Users-Dell-gerel/a73e18f9-d575-4ee2-8097-7bcd890fc478/scratchpad/sheets";
mkdirSync(out, { recursive: true });

const files = [];
for (const dir of ["products", "subcategories", "categories", "heroes", "rooms"]) {
  for (const f of readdirSync(join(base, dir))) files.push(join(base, dir, f));
}

const CELL = 250, COLS = 6, ROWS = 8;
const per = COLS * ROWS;
const sheets = Math.ceil(files.length / per);
for (let s = 0; s < sheets; s++) {
  const chunk = files.slice(s * per, (s + 1) * per);
  const comps = [];
  for (let i = 0; i < chunk.length; i++) {
    const png = await sharp(chunk[i], { density: 72 })
      .resize(CELL - 10, CELL - 10, { fit: "contain", background: "#ffffff" })
      .png()
      .toBuffer();
    comps.push({ input: png, left: (i % COLS) * CELL + 5, top: Math.floor(i / COLS) * CELL + 5 });
  }
  await sharp({
    create: { width: COLS * CELL, height: ROWS * CELL, channels: 3, background: "#dddddd" },
  })
    .composite(comps)
    .png()
    .toFile(join(out, `sheet-${s}.png`));
  console.log("sheet", s, chunk.length, "imgs:", chunk.map(f=>f.split(/[\/]/).slice(-2).join("/")).join(", "));
}
