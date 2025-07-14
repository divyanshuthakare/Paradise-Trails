class EnhancedGallery {
  constructor() {
    this.modal = document.getElementById("imageModal");
    this.modalImage = document.getElementById("modalImage");
    this.modalClose = document.getElementById("modalClose");
    this.modalPrev = document.getElementById("modalPrev");
    this.modalNext = document.getElementById("modalNext");
    this.modalCounter = document.getElementById("modalCounter");
    this.modalLoading = document.getElementById("modalLoading");

    this.images = [];
    this.currentIndex = 0;
    this.isLoading = false;

    this.init();
  }

  init() {
    this.collectImages();
    this.bindEvents();
    this.initializeAnimations();
  }

  collectImages() {
    const galleryItems = document.querySelectorAll("[data-gallery] img");
    this.images = Array.from(galleryItems).map((img) => ({
      src: img.src,
      alt: img.alt,
    }));
  }

  bindEvents() {
    // Gallery item clicks
    document.querySelectorAll("[data-gallery]").forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal(index);
      });
    });

    // Modal controls
    this.modalClose.addEventListener("click", () => this.closeModal());
    this.modalPrev.addEventListener("click", () => this.prevImage());
    this.modalNext.addEventListener("click", () => this.nextImage());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.modal.classList.contains("active")) return;

      switch (e.key) {
        case "Escape":
          this.closeModal();
          break;
        case "ArrowLeft":
          this.prevImage();
          break;
        case "ArrowRight":
          this.nextImage();
          break;
      }
    });

    // Click outside to close
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
  }

  openModal(index) {
    if (this.isLoading) return;

    this.currentIndex = index;
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";

    this.loadImage(this.images[index]);
    this.updateCounter();
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";

    setTimeout(() => {
      this.modalImage.src = "";
      this.modalImage.alt = "";
      this.modalLoading.style.display = "none";
    }, 300);
  }

  loadImage(imageData) {
    this.isLoading = true;
    this.modalLoading.style.display = "block";
    this.modalImage.style.opacity = "0";

    const img = new Image();

    img.onload = () => {
      this.modalImage.src = imageData.src;
      this.modalImage.alt = imageData.alt;
      this.modalImage.style.opacity = "1";
      this.modalLoading.style.display = "none";
      this.isLoading = false;
    };

    img.onerror = () => {
      console.error("Failed to load image:", imageData.src);
      this.modalLoading.style.display = "none";
      this.isLoading = false;
    };

    img.src = imageData.src;
  }

  prevImage() {
    if (this.isLoading) return;

    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.loadImage(this.images[this.currentIndex]);
    this.updateCounter();
  }

  nextImage() {
    if (this.isLoading) return;

    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.loadImage(this.images[this.currentIndex]);
    this.updateCounter();
  }

  updateCounter() {
    this.modalCounter.textContent = `${this.currentIndex + 1} / ${
      this.images.length
    }`;
  }

  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".section-title, .main-gallery, .book-now-container")
      .forEach((el) => {
        observer.observe(el);
      });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new EnhancedGallery();
});
