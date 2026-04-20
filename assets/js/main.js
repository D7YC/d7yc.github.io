/* =========================================================
   Small interactions only:
   - header becomes more solid on scroll
   - sections reveal smoothly when they enter the viewport
   - archive tabs on the homepage
   ========================================================= */

const header = document.getElementById("site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);
}

/* Reveal animation */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* Homepage tabs */
const tabButtons = document.querySelectorAll("[data-tab-button]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

if (tabButtons.length && tabPanels.length) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabButton;

      tabButtons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("is-active");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      const activePanel = document.querySelector(`[data-tab-panel="${target}"]`);
      if (activePanel) {
        activePanel.classList.add("is-active");
      }
    });
  });
}
