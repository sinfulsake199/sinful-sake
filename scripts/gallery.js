document.querySelectorAll('#gallery').forEach(gallery => {
  const prefix = gallery.dataset.prefix;
  const start = parseInt(gallery.dataset.start, 10);
  const end = parseInt(gallery.dataset.end, 10);
  const alt = gallery.dataset.alt;
  const ext = gallery.dataset.ext || "webp";

  let html = "";

  for (let i = start; i <= end; i++) {
    html += `
      <div class="gallery-item">
        <a href="${prefix}${String(i).padStart(2, "0")}.${ext}" data-lightbox="gallery">
          <img src="${prefix}${String(i).padStart(2, "0")}.${ext}" alt="${alt}">
        </a>
      </div>
    `;
  }

  gallery.innerHTML = html;

  // Carousel logic
  const wrapper = gallery.closest(".gallery-wrapper");
  const items = gallery.querySelectorAll(".gallery-item");

  if (wrapper && items.length > 8) {
    gallery.classList.add("carousel");
    wrapper.classList.add("carousel");
  }
});
