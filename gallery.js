const gallery = document.getElementById("works");
const works = window.JUNGMINI_WORKS || [];

gallery.replaceChildren(
  ...works.map((work) => {
    const link = document.createElement("a");
    link.className = "work-item";
    link.href = `./work.html?id=${work.id}`;

    const image = document.createElement("img");
    image.src = work.image;
    image.alt = `${work.title} ${work.category}`;

    link.append(image);
    return link;
  })
);
