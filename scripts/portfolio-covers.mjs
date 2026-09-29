import sharp from "sharp";
import { fileURLToPath } from "node:url";

for (const [source, target, width, height] of [
  ["homepage-desktop", "homepage-cover", 1440, 1280],
  ["homepage-mobile", "mobile-cover", 390, 1450],
]) {
  await sharp(fileURLToPath(new URL(`../screenshots/${source}.png`, import.meta.url)))
    .extract({ left: 0, top: 0, width, height })
    .toFile(fileURLToPath(new URL(`../screenshots/${target}.png`, import.meta.url)));
}
console.log("Portfolio preview covers saved.");
