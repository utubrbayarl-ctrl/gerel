import { expect, test } from "@playwright/test";

test("нүүр → ангилал → бараа гэсэн гол урсгал ажиллана", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ГЭРЭЛ/);
  await expect(page.getByRole("heading", { name: "Гэрэл орон зайг өөрчилнө" })).toBeVisible();

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
  await expect(count).toHaveText("14 бүтээгдэхүүн");
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
  await page.goto("/category/taazny-gerel?sub=duujin");
  const count = page.getByText(/^\d+ бүтээгдэхүүн$/);
  await expect(count).toHaveText("4 бүтээгдэхүүн");
  // Ижил route дээр байхдаа mega menu-гээс өөр дэд ангилал сонгоно
  await page.getByRole("link", { name: "Таазны гэрэл" }).first().hover();
  await page.getByRole("link", { name: "Чандельер" }).click();
  await expect(page).toHaveURL(/sub=chandelier/);
  await expect(count).toHaveText("3 бүтээгдэхүүн");
});
