import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const source = process.env.SOURCE_IMAGE_DIR;
if (!source) throw new Error("Set SOURCE_IMAGE_DIR to the folder holding original generated PNGs.");

const images = {
  "coastal-house-01": "exec-ed3efeee-f388-4876-b491-ae11426039d1.png",
  "coastal-house-02": "exec-925003c9-f4e6-42f3-aaa5-9e4f3e4e0ce8.png",
  "coastal-house-03": "exec-ba40f656-01e0-415c-b574-bd19d35e7edd.png",
  "courtyard-residence-01": "exec-df84de35-d35b-41c8-8e35-06b9a9907f25.png",
  "courtyard-residence-02": "exec-3b10637b-f70a-4091-8d4d-a2c3e5889de4.png",
  "courtyard-residence-03": "exec-ed4658b3-e45b-46e1-ae9a-105ae9777ba6.png",
  "gallery-hotel-01": "exec-ffd6fa6b-326e-433c-a9d9-7266aa7546e7.png",
  "gallery-hotel-02": "exec-673aa69d-a450-44f2-a7de-d4793b7e07ca.png",
  "gallery-hotel-03": "exec-38a44438-3316-43f8-b156-7bf7dea79f37.png",
  "north-light-apartment-01": "exec-df5ffc05-fc7e-4ae9-9a56-e3ca9b7e255f.png",
  "north-light-apartment-02": "exec-710328ef-79ad-4bf8-8ede-dfa7da4cf8e5.png",
  "north-light-apartment-03": "exec-daa34157-55df-4558-9a70-202963c2809b.png",
  "urban-pavilion-01": "exec-14bfab6c-b3d9-4ccf-a971-41d7d8649edb.png",
  "urban-pavilion-02": "exec-303d5dcf-5be8-49ce-b552-ed482df6c8c7.png",
  "urban-pavilion-03": "exec-b5543483-77cb-4915-a9d2-21d21c4f5762.png",
};

(async () => {
  const output = path.join(__dirname, "..", "public", "images");
  await fs.mkdir(output, { recursive: true });
  for (const [name, file] of Object.entries(images)) {
    const src = path.join(source, file);
    const dest = path.join(output, `${name}.webp`);
    const info = await sharp(src).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 83, effort: 6 }).toFile(dest);
    console.log(`${name}: ${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
