const gallery = document.getElementById("works");
const works = window.JUNGMINI_WORKS || [];

gallery.replaceChildren(
  ...works.map((work) => {
    const link = document.createElement("a");
    const categoryClass = work.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.className = `work-item work-item-${categoryClass}`;
    link.href = `./work.html?id=${work.id}`;

    const image = document.createElement("img");
    image.src = work.image;
    image.alt = `${work.title} ${work.category}`;

    link.append(image);
    return link;
  })
);
