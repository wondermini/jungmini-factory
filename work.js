const works = window.JUNGMINI_WORKS || [];
const params = new URLSearchParams(window.location.search);
const requestedId = params.get("id") || works[0]?.id;
const currentIndex = Math.max(
  0,
  works.findIndex((work) => work.id === requestedId)
);
const work = works[currentIndex];

if (!work) {
  throw new Error("No work data found.");
}

document.title = `${work.number} - ${work.title} | JUNGMINI FACTORY`;
document.getElementById("detail-id").textContent = work.number;
document.getElementById("detail-number").textContent = work.number;
document.getElementById("detail-title").textContent = work.title;
document.getElementById("detail-year").textContent = work.year;
document.getElementById("detail-category").textContent = work.category;
document.getElementById("detail-format").textContent = work.format;
document.getElementById("detail-note").textContent = work.note;
document.getElementById("detail-tags").textContent = (work.tags || []).join(" ");

const image = document.getElementById("detail-image");
image.src = work.image;
image.alt = `${work.title} image`;
image.classList.toggle("personal-work-image", work.category === "Personal Work");
image.classList.toggle(
  "no-shadow-image",
  [
    "roboco-t-shirt-logo",
    "roboco-summer-t-shirt-2026",
    "roboco-t-shirt-2026-summer-yellow",
  ].includes(work.id)
);

const previous = works[currentIndex - 1];
const next = works[currentIndex + 1];

if (previous) {
  document.getElementById("prev-work").href = `./work.html?id=${previous.id}`;
} else {
  document.getElementById("prev-work").setAttribute("aria-disabled", "true");
}

if (next) {
  document.getElementById("next-work").href = `./work.html?id=${next.id}`;
} else {
  document.getElementById("next-work").setAttribute("aria-disabled", "true");
}
