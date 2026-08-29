import type { Product } from "@/lib/types";
import { taaznyProducts } from "./taazny";
import { khananyProducts } from "./khanany";
import { chiidenProducts } from "./chiiden";
import { gadnaProducts } from "./gadna";
import { ledProducts } from "./led";

/** Бүх барааны нэгдсэн жагсаалт */
export const products: readonly Product[] = [
  ...taaznyProducts,
  ...khananyProducts,
  ...chiidenProducts,
  ...gadnaProducts,
  ...ledProducts,
];
