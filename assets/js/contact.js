// Contact Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeNavigation();
  initializeScrollEffects();
  initializeModalFunctionality();
  initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavbarScroll() {
    const navbar = document.getElementById("navbar");
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)";
      navbar.style.backdropFilter = "blur(10px)";
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Scroll effects and animations
function initializeScrollEffects() {
  // Scroll reveal animation
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach((reveal, index) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        // Add staggered animation delay
        setTimeout(() => {
          reveal.classList.add("revealed");
        }, index * 100);
      }
    });
  }

  // Parallax effect for hero section
  function handleParallax() {
    const heroSection = document.querySelector(".hero");
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroSection) {
      const heroBackground = heroSection.querySelector(".hero-bg");
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Throttled scroll handler
  let scrollTicking = false;
  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        revealOnScroll();
        handleParallax();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Initial reveal check
  revealOnScroll();
}

// Modal functionality
function initializeModalFunctionality() {
  const modal = document.getElementById("detailModal");
  const modalBody = document.getElementById("modalBody");

  // Modal data
  const modalData = {
    tiger: {
      icon: "🐅",
      title: "Tiger Safari Experience",
      content: `
        <p>Tadoba is home to over 80 tigers, making it one of Maharashtra's premier tiger reserves. Our morning and evening safaris offer the best chances to spot these magnificent creatures.</p>
        <div class="modal-details">
          <div class="detail-item">
            <strong>Safari Duration:</strong> 3-4 hours
          </div>
          <div class="detail-item">
            <strong>Best Time:</strong> October to June
          </div>
          <div class="detail-item">
            <strong>Price:</strong> ₹3,500 per person
          </div>
          <div class="detail-item">
            <strong>Includes:</strong> Professional guide, vehicle, entry fees
          </div>
        </div>
        <div class="modal-features">
          <h4>What to Expect:</h4>
          <ul>
            <li>Early morning or evening game drives</li>
            <li>Expert naturalist guide</li>
            <li>High-quality binoculars provided</li>
            <li>Photography opportunities</li>
            <li>Refreshments included</li>
          </ul>
        </div>
      `
    },
    birds: {
      icon: "🦅",
      title: "Bird Watching Tours",
      content: `
        <p>Discover over 200 bird species including rare migratory birds. Perfect for photography enthusiasts and nature lovers.</p>
        <div class="modal-details">
          <div class="detail-item">
            <strong>Duration:</strong> 2-3 hours
          </div>
          <div class="detail-item">
            <strong>Best Time:</strong> Early morning (6 AM - 9 AM)
          </div>
          <div class="detail-item">
            <strong>Price:</strong> ₹1,500 per person
          </div>
          <div class="detail-item">
            <strong>Includes:</strong> Binoculars, bird guide, refreshments
          </div>
        </div>
        <div class="modal-features">
          <h4>Featured Species:</h4>
          <ul>
            <li>Indian Pitta</li>
            <li>Orange-headed Thrush</li>
            <li>Crested Serpent Eagle</li>
            <li>Paradise Flycatcher</li>
            <li>Various migratory species</li>
          </ul>
        </div>
      `
    },
    nature: {
      icon: "🌿",
      title: "Guided Nature Walks",
      content: `
        <p>Explore the forest on foot with our experienced naturalists. Learn about medicinal plants, animal tracks, and forest ecosystems.</p>
        <div class="modal-details">
          <div class="detail-item">
            <strong>Duration:</strong> 2 hours
          </div>
          <div class="detail-item">
            <strong>Difficulty:</strong> Easy to moderate
          </div>
          <div class="detail-item">
            <strong>Price:</strong> ₹800 per person
          </div>
          <div class="detail-item">
            <strong>Includes:</strong> Expert guide, forest documentation
          </div>
        </div>
        <div class="modal-features">
          <h4>Learning Opportunities:</h4>
          <ul>
            <li>Medicinal plant identification</li>
            <li>Animal tracking techniques</li>
            <li>Forest ecosystem understanding</li>
            <li>Photography tips</li>
            <li>Conservation awareness</li>
          </ul>
        </div>
      `
    }
  };

  // Global functions for modal
  window.showDetails = function(type) {
    if (modalData[type]) {
      const data = modalData[type];
      modalBody.innerHTML = `
        <div class="modal-header">
          <div class="modal-icon">${data.icon}</div>
          <h3>${data.title}</h3>
        </div>
        <div class="modal-content-body">
          ${data.content}
        </div>
        <div class="modal-footer">
          <button class="modal-book-btn" onclick="bookNow('${type}')">Book Now</button>
          <button class="modal-info-btn" onclick="getMoreInfo('${type}')">Get More Info</button>
        </div>
      `;
      
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      
      // Add entrance animation
      setTimeout(() => {
        modal.classList.add("modal-active");
      }, 10);
    }
  };

  window.closeModal = function() {
    modal.classList.remove("modal-active");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  };

  window.bookNow = function(type) {
    // Scroll to contact section and highlight it
    closeModal();
    setTimeout(() => {
      const contactSection = document.getElementById("contactsection");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        contactSection.classList.add("highlight");
        setTimeout(() => {
          contactSection.classList.remove("highlight");
        }, 3000);
      }
    }, 300);
  };

  window.getMoreInfo = function(type) {
    // Open email with pre-filled subject
    const subject = `Inquiry about ${type} experience`;
    const email = "paradisetrailslk@gmail.com";
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}`);
  };

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
}

// Additional animations and effects
function initializeAnimations() {
  // Animate contact cards on hover
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Animate feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) rotateY(5deg)";
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateY(0deg)";
    });
  });

  // Add loading animation
  const animatedButton = document.querySelector(".animated-button");
  if (animatedButton) {
    animatedButton.addEventListener("click", function(e) {
      e.preventDefault();
      
      // Add loading state
      this.classList.add("loading");
      this.innerHTML = '<span class="loading-spinner"></span><span class="text">Loading...</span>';
      
      // Simulate loading and then scroll to contact
      setTimeout(() => {
        this.classList.remove("loading");
        this.innerHTML = `
          <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span class="text">Get In Touch</span>
          <span class="circle"></span>
          <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        `;
        
        // Scroll to contact section
        const contactSection = document.getElementById("contactsection");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    });
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance optimization
function optimizeForPerformance() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
if ('IntersectionObserver' in window) {
  optimizeForPerformance();
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden, pause animations
    document.body.classList.add('page-hidden');
  } else {
    // Page is visible, resume animations
    document.body.classList.remove('page-hidden');
  }
});

// Touch device detection
function detectTouchDevice() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
  } else {
    document.body.classList.add('no-touch');
  }
}

detectTouchDevice();