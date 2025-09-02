// Hide/Show header on scroll
let lastScrollY = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 80) {
    header.classList.add("hidden"); // hide when scrolling down
  } else {
    header.classList.remove("hidden"); // show when scrolling up
  }
  lastScrollY = window.scrollY;
});

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});
