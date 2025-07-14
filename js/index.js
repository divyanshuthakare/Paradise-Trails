// Enhanced JavaScript functionality
const header = document.getElementById("header");
const mobileToggle = document.getElementById("mobile-toggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const logoSection = document.querySelector(".logo-section");
const logo = document.querySelector(".logo");
// Add scroll listener for enhanced glassmorphism effect
let ticking = false;

function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  ticking = false;
}
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}
window.addEventListener("scroll", requestTick);
// Active navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  // Update active navigation link
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveNavigation);

// Initialize active navigation on page load
updateActiveNavigation();
// Enhanced mobile menu toggle
mobileToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileToggle.classList.toggle("active");
  nav.classList.toggle("active");
});
// Close mobile menu when clicking nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Add click animation
    link.style.transform = "scale(0.95)";
    setTimeout(() => {
      link.style.transform = "";
    }, 150);

    // Close mobile menu
    mobileToggle.classList.remove("active");
    nav.classList.remove("active");
  });
});
// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!header.contains(e.target)) {
    mobileToggle.classList.remove("active");
    nav.classList.remove("active");
  }
});
// Enhanced smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
// Add mouse move effect to logo
logoSection.addEventListener("mousemove", (e) => {
  const rect = logoSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  logoSection.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
logoSection.addEventListener("mouseleave", () => {
  logoSection.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
});
// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mobileToggle.classList.remove("active");
    nav.classList.remove("active");
  }
});
// Add focus management for accessibility
mobileToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    mobileToggle.click();
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all scroll-trigger elements
document.querySelectorAll(".scroll-trigger").forEach((el) => {
  observer.observe(el);
});

// Add hover effects for enhanced interactivity
document.querySelectorAll(".expedition-tile").forEach((tile) => {
  tile.addEventListener("mouseenter", () => {
    tile.style.transform = "translateY(-10px)";
    tile.style.boxShadow = "0 20px 40px rgba(74, 222, 128, 0.2)";
  });

  tile.addEventListener("mouseleave", () => {
    tile.style.transform = "translateY(0)";
    tile.style.boxShadow = "none";
  });
});

function handleKnowMore() {
  window.location.href = "./about.html";
}
