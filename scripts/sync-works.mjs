import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, parse } from "node:path";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const stickerWorks = [
  ["awskrug-seoul-summit-2026", "AWSKRUG Seoul Summit 2026", "Event / Sticker", "images/thumbs/awskrug-seoul-summit-2026.png", "files/awskrug sticker_seoul sumit_2026.pdf"],
  ["ausg", "AUSG", "Sticker", "images/thumbs/ausg.png", "files/ausg.pdf"],
  ["busan", "Busan", "Sticker", "images/thumbs/busan.png", "files/busan.pdf"],
  ["frontend", "Frontend", "Sticker", "images/thumbs/frontend.png", "files/frontend.pdf"],
  ["kiro-and-grumi-love", "Kiro and Grumi Love", "Sticker", "images/thumbs/kiro-and-grumi-love.png", "files/kiro and grumi love.pdf"],
  ["women-in-cloud", "Women in Cloud", "Sticker", "images/thumbs/women-in-cloud.png", "files/women in cloud.pdf"],
  ["architecture", "Architecture", "Sticker", "images/thumbs/architecture.png", "files/Architecture.pdf"],
  ["devops", "DevOps", "Sticker", "images/thumbs/devops.png", "files/DevOps.pdf"],
  ["gametech", "Gametech", "Sticker", "images/thumbs/gametech.png", "files/gametech.pdf"],
  ["serverless", "Serverless", "Sticker", "images/thumbs/severless.png", "files/severless.pdf"],
  ["security", "Security", "Sticker", "images/thumbs/security.png", "files/ security.pdf"],
  ["data", "Data", "Sticker", "images/thumbs/data.png", "files/data.pdf"],
  ["kiro-ghost-gurumi", "Kiro Ghost Gurumi", "Sticker", "images/thumbs/kiro-ghost-gurumi.png", "files/kiro ghost gurumi.pdf"],
  ["iot", "IoT", "Sticker", "images/thumbs/iot.png", "files/IOT.pdf"],
  ["platform", "Platform", "Sticker", "images/thumbs/platform.png", "files/plateform.pdf"],
  ["magok", "Magok", "Sticker", "images/thumbs/magok.png", "files/magok.pdf"],
  ["inchun", "Inchun", "Sticker", "images/thumbs/inchun.png", "files/inchun.pdf"],
  ["euljiro", "Euljiro", "Sticker", "images/thumbs/euljiro.png", "files/euljiro.pdf"],
  ["certified", "Certified", "Sticker", "images/thumbs/certified.png", "files/certified.pdf"],
  ["guro", "Guro", "Sticker", "images/thumbs/guro.png", "files/guro.pdf"],
  ["container", "Container", "Sticker", "images/thumbs/container.png", "files/container.pdf"],
  ["beginner", "Beginner", "Sticker", "images/thumbs/beginner.png", "files/beginner.pdf"],
];

const manualWorks = [
  {
    id: "roboco-summer-t-shirt-2026",
    title: "ROBOCO T SHIRT 2026 summer",
    year: "2026",
    category: "Work",
    format: "Image, T-shirt mockup",
    note: "T-shirt mockup featuring the ROBOCO logo design.",
    tags: ["#TShirtDesign", "#GoodsDesign", "#LogoDesign"],
    image: "./images/thumbs/roboco-summer-t-shirt-2026.png?v=20260613-yellow",
    pdf: "",
    originalIndex: 9998,
  },
  {
    id: "roboco-t-shirt-2026-summer-yellow",
    title: "ROBOCO T SHIRT 2026 SUMMER",
    year: "2026",
    category: "Work",
    format: "Image, T-shirt mockup",
    note: "T-shirt mockup featuring the ROBOCO logo design.",
    tags: ["#TShirtDesign", "#GoodsDesign", "#LogoDesign"],
    image: "./images/thumbs/roboco-t-shirt-2026-summer-yellow.png?v=20260613-pink",
    pdf: "",
    originalIndex: 9999,
  },
  {
    id: "roboco-t-shirt-logo",
    title: "ROBOCO T SHIRT",
    year: "2026",
    category: "Work",
    format: "PDF, T-shirt logo design",
    note: "Logo design created for T-shirt production.",
    tags: ["#LogoDesign", "#TShirtDesign", "#GoodsDesign"],
    image: "./images/thumbs/roboco-t-shirt-logo.png?v=20260613-wide",
    pdf: "./files/roboco-t-shirt-logo.pdf",
    originalIndex: 10000,
  },
  {
    id: "jawsday-2026-sticker",
    title: "JAWSDAY 2026 sticker",
    year: "2026",
    category: "Sticker",
    format: "Image, sticker design",
    note: "Sticker design for JAWSDAY 2026.",
    tags: ["#CharacterDesign", "#StickerDesign", "#JAWSDAY"],
    image: "./images/thumbs/jawsday-2026-sticker.png",
    pdf: "",
    originalIndex: 10001,
  },
];

const folders = [
  ["personal", "Personal Work"],
  ["events", "Event"],
  ["goods", "Goods"],
  ["characters", "Character"],
  ["works", "Work"],
];

const orderConfig = JSON.parse(readFileSync("works-order.json", "utf8"));
const categoryOrder = orderConfig.categoryOrder || [];
const pinnedIds = orderConfig.pinnedIds || [];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

const titleize = (value) =>
  parse(value).name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

const customTitles = new Map([
  ["personal-gemini-generated-image-5okxiy5okxiy5okx", "Kitty on My Hat 🐱🎩"],
  ["personal-gemini-generated-image-h9m3mdh9m3mdh9m3", "Kitty on My Hat 🐱🎩"],
]);

const customImageVersions = new Map([
  ["personal-gemini-generated-image-5okxiy5okxiy5okx", "20260611-clean"],
  ["personal-gemini-generated-image-h9m3mdh9m3mdh9m3", "20260611-clean"],
]);

const works = [];

const addFolderWorks = (folder, category) => {
  const directory = join("images", folder);
  let files = [];

  try {
    files = readdirSync(directory)
      .map((file) => ({
        file,
        modified: statSync(join(directory, file)).mtimeMs,
      }))
      .sort((a, b) => b.modified - a.modified)
      .map(({ file }) => file);
  } catch {
    return;
  }

  for (const file of files) {
    const extension = extname(file).toLowerCase();
    if (!imageExtensions.has(extension)) continue;

    const id = `${folder}-${slugify(file)}`;
    const title = customTitles.get(id) || titleize(file);
    const imageVersion = customImageVersions.get(id);
    works.push({
      id,
      title,
      year: "2026",
      category,
      format: "Image",
      note: `${category} by Jungmini.`,
      tags: category === "Personal Work" ? ["#PersonalWork"] : [],
      image: `./images/${folder}/${file}${imageVersion ? `?v=${imageVersion}` : ""}`,
      pdf: "",
    });
  }
};

works.push(...stickerWorks.map(([id, title, category, image, pdf], index) => ({
  id,
  title: "AWS SUMMIT 2026",
  year: "2026",
  category: "Sticker",
  format: "PDF, sticker design",
  note: `${title} sticker design for AWS SUMMIT 2026.`,
  tags: ["#CharacterDesign", "#StickerDesign", "#AWSKRUG"],
  image: `./${image}`,
  pdf: `./${pdf}`,
  originalIndex: index,
})));

for (const [folder, category] of folders) {
  addFolderWorks(folder, category);
}

works.push(...manualWorks);

const orderIndex = (items, value) => {
  const index = items.indexOf(value);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
};

const orderedWorks = works.sort((first, second) => {
  const pinnedDifference =
    orderIndex(pinnedIds, first.id) - orderIndex(pinnedIds, second.id);
  if (pinnedDifference !== 0) return pinnedDifference;

  const categoryDifference =
    orderIndex(categoryOrder, first.category) -
    orderIndex(categoryOrder, second.category);
  if (categoryDifference !== 0) return categoryDifference;

  return (first.originalIndex ?? 0) - (second.originalIndex ?? 0);
});

const numberedWorks = orderedWorks.map((work, index) => ({
  ...work,
  originalIndex: undefined,
  number: `No.${String(index + 1).padStart(3, "0")}`,
}));

writeFileSync(
  "works-data.js",
  `window.JUNGMINI_WORKS = ${JSON.stringify(numberedWorks, null, 2)};\n`
);

console.log(`Synced ${numberedWorks.length} works.`);
