const path = window.location.pathname.split("/").pop() || "index.html";
const navMap = {
  "index.html": "home",
  "de-index.html": "home",
  "": "home",
  "about.html": "about",
  "de-about.html": "about",
  "technical.html": "technical",
  "de-technical.html": "technical",
  "contact.html": "contact",
  "de-contact.html": "contact",
};

const currentKey = navMap[path];
if (currentKey) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === currentKey) {
      link.setAttribute("aria-current", "page");
    }
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

document.body.classList.add("motion-ready");

const menuButton = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const form = document.getElementById("contact-form");
if (form) {
  const status = document.getElementById("form-status");
  const invalidMsg =
    form.dataset.invalidMsg || "Please complete all required fields.";
  const sentMsg =
    form.dataset.sentMsg ||
    "Opening your email app with the prepared message.";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      if (status) {
        status.textContent = invalidMsg;
      }
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`Website inquiry: ${topic}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:idris.zuncevski@example.com?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = sentMsg;
    }
  });
}

const revealNodes = document.querySelectorAll(".js-reveal");
if (revealNodes.length > 0) {
  revealNodes.forEach((node) => {
    const delay = Number(node.dataset.delay || 0);
    node.style.setProperty("--delay", `${delay}s`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

// ── Carousel ────────────────────────────────────────────────────────────────
document.querySelectorAll(".carousel-track").forEach((track) => {
  const items = Array.from(track.querySelectorAll(".carousel-item"));
  const total = items.length;
  let active = 0;

  function render() {
    items.forEach((item, i) => {
      item.dataset.slot = String((i - active + total) % total);
    });
  }

  render();

  const wrapper = track.closest(".carousel-wrapper");
  if (!wrapper) return;

  wrapper.querySelector(".carousel-next").addEventListener("click", () => {
    active = (active + 1) % total;
    render();
  });

  wrapper.querySelector(".carousel-prev").addEventListener("click", () => {
    active = (active - 1 + total) % total;
    render();
  });

  // Keyboard navigation
  wrapper.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { active = (active + 1) % total; render(); }
    if (e.key === "ArrowLeft")  { active = (active - 1 + total) % total; render(); }
  });
});

// ── Counters ────────────────────────────────────────────────────────────────
const counters = document.querySelectorAll("[data-counter]");
if (counters.length > 0) {
  const animateCounter = (node) => {
    const target = Number(node.dataset.counter || 0);
    const suffix = node.dataset.suffix || "";
    const duration = 1100;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      node.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}
