import { test } from "@playwright/test";

const OUT = "C:/Users/Dell/AppData/Local/Temp/claude/C--Users-Dell-gerel/a73e18f9-d575-4ee2-8097-7bcd890fc478/scratchpad/shots";

test("visual QA screenshots", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto("/");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/home-top.png` });
  await page.screenshot({ path: `${OUT}/home-full.png`, fullPage: true });

  // Mega menu нээгдсэн байдал
  await page.getByRole("link", { name: "Таазны гэрэл" }).first().hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/mega-menu.png` });

  await page.goto("/category/taazny-gerel");
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Шүүлтүүр" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/category-filters.png`, fullPage: true });

  await page.goto("/product/duujin-sarnai");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/product.png`, fullPage: true });

  await page.goto("/about");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/about.png`, fullPage: true });

  // Гар утас
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/mobile-home.png` });
  await page.getByRole("button", { name: "Цэс нээх" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/mobile-menu.png` });
  await page.goto("/category/taazny-gerel");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/mobile-category.png`, fullPage: true });
});
