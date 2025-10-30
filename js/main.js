// Common JavaScript for IGCE Website

// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {
  if (typeof feather !== "undefined") {
    feather.replace();
  }
});

// Sticky Header & Quick Links Animation
let lastScroll = 0;
const quickLinks = document.getElementById("quickLinks");
const mainHeader = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Hide quick links on scroll down, show on scroll up
  if (currentScroll > 100) {
    if (currentScroll > lastScroll) {
      quickLinks?.classList.add("hidden");
    } else {
      quickLinks?.classList.remove("hidden");
    }
  } else {
    quickLinks?.classList.remove("hidden");
  }

  // Add shadow to main header on scroll
  if (currentScroll > 50) {
    mainHeader?.classList.add("scrolled");
  } else {
    mainHeader?.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Intersection Observer for Fade-In Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements with fade-in animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".highlight-item, .stat-item, .news-card"
  );

  animatedElements.forEach((el) => {
    fadeInObserver.observe(el);
  });
});

// Mobile Menu Toggle (if needed in future)
const createMobileMenu = () => {
  const nav = document.querySelector("nav");
  if (!nav) return;

  const menuBtn = document.createElement("button");
  menuBtn.className = "md:hidden text-primary-900 focus:outline-none";
  menuBtn.setAttribute("aria-label", "Toggle menu");
  menuBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });

  return menuBtn;
};

// Form Validation Helper
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Newsletter Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.querySelector("footer form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (emailInput && validateEmail(emailInput.value)) {
        // Show success message
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Keyboard Navigation Enhancement
document.addEventListener("keydown", (e) => {
  // Escape key to close modals (if any)
  if (e.key === "Escape") {
    // Close any open modals
    const modals = document.querySelectorAll(".modal.open");
    modals.forEach((modal) => modal.classList.remove("open"));
  }
});

// Performance: Lazy Load Images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Console message for developers
console.log(
  "%cIGCE Website",
  "color: #002B5B; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cBuilt with care for Indra Ganesan College of Engineering",
  "color: #FFD700; font-size: 14px;"
);

// Dropdowns: click-to-open, ARIA, chevron injection, and keyboard support
document.addEventListener("DOMContentLoaded", () => {
  // Find all groups that contain a dropdown-menu
  const dropdownGroups = document.querySelectorAll(".group");

  dropdownGroups.forEach((group, index) => {
    const btn = group.querySelector("button");
    const menu = group.querySelector(".dropdown-menu");
    if (!btn || !menu) return;

    // Add ARIA attributes
    const btnId = `dropdown-btn-${index}`;
    const menuId = `dropdown-menu-${index}`;
    btn.setAttribute("id", btnId);
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", menuId);
    menu.setAttribute("id", menuId);
    menu.setAttribute("role", "menu");
    menu
      .querySelectorAll("a")
      .forEach((a) => a.setAttribute("role", "menuitem"));

    // Inject chevron if not present
    if (!btn.querySelector('[data-feather="chevron-down"]')) {
      const icon = document.createElement("i");
      icon.setAttribute("data-feather", "chevron-down");
      icon.className = "ml-1 w-4 h-4";
      btn.appendChild(icon);
      if (typeof feather !== "undefined") feather.replace();
    }

    // Toggle handler
    const toggle = (open) => {
      const isOpen =
        typeof open === "boolean" ? open : !menu.classList.contains("open");
      if (isOpen) {
        menu.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    };

    // Click toggles
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    // Keyboard support: Enter/Space to toggle, Escape to close
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      } else if (e.key === "Escape") {
        toggle(false);
        btn.focus();
      }
    });
  });

  // Close dropdowns on outside click or Escape
  document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu.open").forEach((menu) => {
      menu.classList.remove("open");
      const btn = document.querySelector(`[aria-controls="${menu.id}"]`);
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".dropdown-menu.open").forEach((menu) => {
        menu.classList.remove("open");
        const btn = document.querySelector(`[aria-controls="${menu.id}"]`);
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Announcement controls: play/pause + speed
  const ticker = document.querySelector(".announcement-ticker-list");
  const pauseBtn = document.querySelector(".announcement-pause");
  const playPauseBtn = document.getElementById("announcementPlayPause");
  const speedSelect = document.getElementById("announcementSpeed");

  if (pauseBtn) {
    pauseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (ticker) {
        const paused = ticker.classList.toggle("paused");
        // update icon
        const icon = pauseBtn.querySelector("i");
        if (icon) icon.setAttribute("data-feather", paused ? "play" : "pause");
        if (typeof feather !== "undefined") feather.replace();
      }
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!ticker) return;
      const isPaused = ticker.classList.toggle("paused");
      playPauseBtn.setAttribute("aria-pressed", String(isPaused));
      const icon = playPauseBtn.querySelector("i");
      if (icon) icon.setAttribute("data-feather", isPaused ? "play" : "pause");
      if (typeof feather !== "undefined") feather.replace();
    });
  }

  if (speedSelect && ticker) {
    speedSelect.addEventListener("change", (e) => {
      const val = speedSelect.value; // seconds
      ticker.style.animationDuration = `${val}s`;
    });
  }
});
