import fs from "fs";
import { join } from "path";

const FONT_DIR = join(process.cwd(), "public/fonts");

const FONT_MAP: Record<string, Record<number, string>> = {
  Geist: {
    400: "Geist-Regular.ttf",
    700: "Geist-Bold.ttf",
  },
};

export function loadFont(family: string, weight: number): Buffer {
  const filename = FONT_MAP[family]?.[weight];
  if (!filename) {
    throw new Error(`Font not mapped: ${family} weight ${weight}`);
  }
  return fs.readFileSync(join(FONT_DIR, filename));
}
