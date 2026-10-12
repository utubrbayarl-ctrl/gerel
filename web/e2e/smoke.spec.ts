import { expect, test } from "@playwright/test";

test("нүүр → ангилал → бараа гэсэн гол урсгал ажиллана", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Tes Sky/);
  await expect(
    page.getByRole("heading", { name: "Гэрэл орон зайг өөрчилнө", level: 1 }),
  ).toBeVisible();

  // Ангиллын grid-ээс Таазны гэрэл рүү
  await page.getByRole("link", { name: /Таазны гэрэл/ }).first().click();
  await expect(page).toHaveURL(/category\/taazny-gerel/);
  await expect(page.getByRole("heading", { name: "Таазны гэрэл" })).toBeVisible();
  await expect(page.getByText(/бүтээгдэхүүн/).first()).toBeVisible();

  // Эхний бараа руу
  await page.getByRole("link", { name: /Чандельер «Мандал»/ }).first().click();
  await expect(page).toHaveURL(/product\/chandelier-mandal/);
  await expect(page.getByRole("heading", { name: /Чандельер «Мандал»/ })).toBeVisible();
  await expect(page.getByText("Техник үзүүлэлт")).toBeVisible();
  await expect(page.getByText("2,890,000₮").first()).toBeVisible();
});

test("шүүлтүүр ажиллана — dimmable сонгоход тоо цөөрнө", async ({ page }) => {
  await page.goto("/category/taazny-gerel");
  const count = page.getByText(/^\d+ бүтээгдэхүүн$/);
  await expect(count).toHaveText("16 бүтээгдэхүүн");
  await page.getByRole("button", { name: "Шүүлтүүр" }).click();
  await page.getByRole("button", { name: "Бүдэгшүүлэх боломжтой" }).click();
  await expect(count).toHaveText("5 бүтээгдэхүүн");
});

test("хайлт ажиллана", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Хайх" }).click();
  await page.getByPlaceholder("Бүтээгдэхүүн хайх…").fill("чандельер");
  await expect(page.getByText(/илэрц/)).toBeVisible();
  await expect(page.getByRole("link", { name: /Чандельер/ }).first()).toBeVisible();
});

test("mega menu-гээс дэд ангилал солиход шүүлтүүр URL-ийг дагана", async ({ page }) => {
  await page.goto("/category/taazny-gerel?sub=soronzon");
  const count = page.getByText(/^\d+ бүтээгдэхүүн$/);
  await expect(count).toHaveText("2 бүтээгдэхүүн");
  // Ижил route дээр байхдаа mega menu-гээс өөр дэд ангилал сонгоно
  await page.getByRole("link", { name: "Дотор гэрэлтүүлэг" }).hover();
  await page.getByRole("link", { name: "Авжур", exact: true }).click();
  await expect(page).toHaveURL(/sub=avjur/);
  await expect(count).toHaveText("9 бүтээгдэхүүн");
});

test("тооцоолуур ажиллана", async ({ page }) => {
  await page.goto("/tooluur");
  await page.getByLabel("Өрөөний төрөл").selectOption("zochny");
  await page.getByLabel("Талбай (м²)").fill("20");
  await page.getByLabel("Таазны өндөр (м)").fill("2.5");
  await page.getByRole("button", { name: "Тооцоолох" }).click();

  const result = page.getByRole("status");
  await expect(result).toContainText("3,000 лм");
  await expect(result).toContainText("2700K");
});

test("тооцоолуур буруу оролтод алдаа харуулна", async ({ page }) => {
  await page.goto("/tooluur");
  await page.getByLabel("Талбай (м²)").fill("900");
  await page.getByRole("button", { name: "Тооцоолох" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "1-500 м²",
  );
});
