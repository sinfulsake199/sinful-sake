// ==============================
// Utility Functions
// ==============================
// Determine base path depending on environment
function getBasePath() {
    const repo = "sinful-sake";
    return window.location.hostname.includes("github.io") ? `/${repo}/` : "/";
}

// Load an external HTML component into a target element
async function loadComponent(id, file) {
    const el = document.getElementById(id);
    if (!el) return;

    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
}

// ==============================
// DOM Ready
// ==============================
document.addEventListener("DOMContentLoaded", async () => {
    const base = getBasePath();

    // Load shared components
    await loadComponent("navbar", base + "components/navbar.html");
    await loadComponent("footer", base + "components/footer.html");

    // ------------------------------
    // Mobile Navigation Toggle
    // ------------------------------
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    if (toggle && nav) {
        const links = nav.querySelectorAll("a");

        // Toggle nav visibility
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });

        // Close nav when a link is clicked
        links.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
            });
        });
    }

    // ------------------------------
    // Blog Filter System
    // ------------------------------
    const buttons = document.querySelectorAll(".filter-btn");
    const posts = document.querySelectorAll(".post-card");

    if (buttons.length && posts.length) {
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Update active button
                document.querySelector(".filter-btn.active")?.classList.remove("active");
                btn.classList.add("active");

                // Filter posts
                const filter = btn.dataset.filter;
                posts.forEach(post => {
                    post.style.display =
                        filter === "all" || post.dataset.type === filter
                            ? "block"
                            : "none";
                });
            });
        });
    }
});

// ==============================
// Rating Cards
// ==============================
document.querySelectorAll('.final-rating-card').forEach(card => {
    const score = parseFloat(card.dataset.score);

    const number = card.querySelector('.rating-number');

    if (!number) return;

    number.textContent = score;

    let tier, text, line, badge;

    if (score >= 9) {
        tier = "rating-masterpiece";
        text = "Masterpiece";
        line = "Some stories don’t just stay good… they grow with you.";
        badge = "REWATCH APPROVED";
    } else if (score >= 7) {
        tier = "rating-great";
        text = "Great Watch";
        line = "A strong experience with lasting moments.";
        badge = "WORTH YOUR TIME";
    } else if (score >= 5) {
        tier = "rating-mid";
        text = "Mixed";
        line = "Good ideas, but doesn’t fully land.";
        badge = "MISSED POTENTIAL";
    } else {
        tier = "rating-bad";
        text = "Not Worth It";
        line = "You can safely skip this one.";
        badge = "TRASH";
    }

    card.classList.add(tier);
});

// ==============================
// Character Grid Styling
// ==============================
document.querySelectorAll('.character-grid').forEach(grid => {
    const count = grid.children.length;

    if (count <= 2) {
        grid.classList.add('spotlight'); // Highlight small casts
    } else if (count === 3) {
        grid.parentElement.classList.add('compact'); // Compact layout for trios
    }
});

// ==============================
// Lightbox Gallery
// ==============================
const images = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0;

// Open lightbox on image click
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.classList.add('active');
    });
});

// Display current image
function showImage() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
}

// Close lightbox
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.onclick = () => {
            lightbox.classList.remove('active');
        };
    }
});

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

if (nextBtn && prevBtn) {
    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    };

    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    };
}

// Close when clicking outside image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox) return; // 👈 guard first

    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    }

    if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
    }

    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    const wrapper = document.querySelector(".gallery-wrapper");

    if (!gallery || !wrapper) return;

    const items = gallery.querySelectorAll(".gallery-item");

    if (items.length > 8) {
        gallery.classList.add("carousel");
        wrapper.classList.add("carousel");
    }
});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
    const filter = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll(".archive-list li");
    
    posts.forEach(post => {
        const text = post.textContent.toLowerCase();
        post.style.display = text.includes(filter) ? "" : "none";
    });
});

