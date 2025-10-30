// Homepage-specific JavaScript for IGCE

// Hero Slider with continuous loop
class HeroSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".hero-slide");
    this.track = document.querySelector(".hero-slider-track");
    this.prevBtn = document.querySelector(".hero-slider-prev");
    this.nextBtn = document.querySelector(".hero-slider-next");
    this.dots = document.querySelectorAll(".hero-slider-dot");
    this.autoPlayInterval = null;
    this.isTransitioning = false;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    // Clone first and last slides
    if (this.slides.length > 0) {
      const firstClone = this.slides[0].cloneNode(true);
      const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
      this.track.appendChild(firstClone);
      this.track.insertBefore(lastClone, this.slides[0]);

      // Move to first real slide (skip clone)
      this.currentSlide = 1;
      this.updateSlidePosition(false);
    }

    // Add click handlers
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index + 1));
    });

    // Auto-play
    this.startAutoPlay();

    // Pause on hover
    this.track?.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.track?.addEventListener("mouseleave", () => this.startAutoPlay());

    // Handle transition end
    this.track?.addEventListener("transitionend", () => {
      this.handleTransitionEnd();
    });

    // Initialize first dot
    this.updateDots();
  }

  updateSlidePosition(animate = true) {
    if (!animate) {
      this.track.style.transition = "none";
    }
    const offset = -100 * this.currentSlide;
    this.track.style.transform = `translateX(${offset}%)`;
    if (!animate) {
      // Force reflow
      this.track.offsetHeight;
      this.track.style.transition = "";
    }
  }

  handleTransitionEnd() {
    this.isTransitioning = false;
    const totalSlides = this.slides.length;

    // If we're at the cloned last slide
    if (this.currentSlide >= totalSlides + 1) {
      this.currentSlide = 1;
      this.updateSlidePosition(false);
    }
    // If we're at the cloned first slide
    else if (this.currentSlide === 0) {
      this.currentSlide = totalSlides;
      this.updateSlidePosition(false);
    }

    this.updateDots();
  }

  goToSlide(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentSlide = index;
    this.updateSlidePosition();
    this.updateDots();
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentSlide++;
    this.updateSlidePosition();
    this.updateDots();
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentSlide--;
    this.updateSlidePosition();
    this.updateDots();
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      // Adjust for cloned slides in dot display
      const actualIndex = this.currentSlide - 1;
      const normalizedIndex =
        actualIndex < 0
          ? this.slides.length - 1
          : actualIndex >= this.slides.length
          ? 0
          : actualIndex;
      dot.classList.toggle("active", index === normalizedIndex);
    });
  }

  startAutoPlay() {
    if (!this.autoPlayInterval) {
      // Set initial active slide
      this.updateActiveSlide();
      // Start the interval
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
        this.updateActiveSlide();
      }, 7000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  updateActiveSlide() {
    // Remove active class from all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    // Add active class to current slide
    const activeSlide = this.slides[this.currentSlide];
    if (activeSlide) {
      activeSlide.classList.add("active");
    }
  }
}

// Simplified Announcement Ticker
class AnnouncementTicker {
  constructor() {
    this.container = document.querySelector(".announcement-ticker-container");
    this.list = document.querySelector(".announcement-ticker-list");
    this.playPauseBtn = document.getElementById("announcementPlayPause");
    this.isPaused = false;

    if (this.list) {
      this.init();
    }
  }

  init() {
    // Clone items for seamless loop
    const items = this.list.querySelectorAll("li");
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      this.list.appendChild(clone);
    });

    // Single Play/Pause button
    this.playPauseBtn?.addEventListener("click", () => this.togglePause());

    // Pause on hover
    this.container?.addEventListener("mouseenter", () => this.pause());
    this.container?.addEventListener("mouseleave", () => this.resume());
  }

  togglePause() {
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  pause() {
    this.list?.classList.add("paused");
    this.isPaused = true;
    if (this.playPauseBtn) {
      const icon = this.playPauseBtn.querySelector("i");
      icon?.setAttribute("data-feather", "play");
      this.playPauseBtn.setAttribute("aria-label", "Play announcements");
      feather.replace();
    }
  }

  resume() {
    this.list?.classList.remove("paused");
    this.isPaused = false;
    if (this.playPauseBtn) {
      const icon = this.playPauseBtn.querySelector("i");
      icon?.setAttribute("data-feather", "pause");
      this.playPauseBtn.setAttribute("aria-label", "Pause announcements");
      feather.replace();
    }
  }
}

// Testimonial Slider
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial-slide");
    this.track = document.querySelector(".testimonial-slides");
    this.prevBtn = document.querySelector(".testimonial-prev");
    this.nextBtn = document.querySelector(".testimonial-next");

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.prevBtn?.addEventListener("click", () => this.prevSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Touch/swipe support
    this.addSwipeSupport();
  }

  goToSlide(index) {
    this.currentSlide = index;
    const offset = -100 * this.currentSlide;
    this.track.style.transform = `translateX(${offset}%)`;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(this.currentSlide);
  }

  addSwipeSupport() {
    let startX = 0;
    let endX = 0;

    this.track?.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.track?.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}

// Stats Counter Animation
class StatsCounter {
  constructor() {
    this.counters = document.querySelectorAll("[data-counter]");
    this.animated = new Set();

    if (this.counters.length > 0) {
      this.init();
    }
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animateCounter(entry.target);
            this.animated.add(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-counter"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        // show interim value with a plus symbol as requested
        element.textContent = Math.floor(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        // final value includes a + symbol
        element.textContent = target + "+";
      }
    };

    updateCounter();
  }
}

// Initialize all components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider();
  new AnnouncementTicker();
  new TestimonialSlider();
  new StatsCounter();

  // Initialize Feather icons after all content is loaded
  if (typeof feather !== "undefined") {
    feather.replace();
  }
});

// Keyboard Navigation for Sliders
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    document.querySelector(".hero-slider-prev")?.click();
  } else if (e.key === "ArrowRight") {
    document.querySelector(".hero-slider-next")?.click();
  }
});
