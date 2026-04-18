console.log("Test");
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav-menu");

    if (!toggle || !nav) return;

    const links = nav.querySelectorAll("a");

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
});
    