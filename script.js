const SITE_CONFIG = {
  phone: "+917011891843",
  phoneDisplay: "+91 70118 91843",
  whatsapp: "917011891843",
  email: "pankaj9810776115@pankajelectricalsandbattery.com",
  address: "Shop No. 345, GF, Shakti Khand I, Indirapuram, Ghaziabad, Uttar Pradesh 201014",
  gbpUrl: "https://www.google.com/maps/place/Pankaj+Electricals+and+Electrician+services/@28.647373,77.3599948,17z/data=!4m8!3m7!1s0x390cfab0a101d15f:0xde86f8678eadf18c!8m2!3d28.647373!4d77.3625697!9m1!1b1!16s%2Fg%2F11f39rkvvg?entry=ttu",
  gbpReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ1R3RAoEDDTkR2G-o2G6G7t4",
  googleRating: "5",
  googleReviewCount: "260",
  formAction: "https://formsubmit.co/pankaj9810776115@pankajelectricalsandbattery.com",
  mapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8476647797586!2d77.3599948!3d28.647373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfab0a101d15f%3A0xde86f8678eadf18c!2sPankaj%20Electricals%20and%20Electrician%20services!5e0!3m2!1sen!2sin!4v1721721600000!5m2!1sen!2sin"
};

document.addEventListener("DOMContentLoaded", function () {
  applySiteConfig();
  initMobileNav();
  initContactForm();
  initProductSearch();
  initContactFormSent();
  initLazyEmbeds();
  initGoogleReviewsWidget();
});

function applySiteConfig() {
  document.querySelectorAll("[data-phone]").forEach(function (el) {
    el.setAttribute("href", "tel:" + SITE_CONFIG.phone.replace(/\s/g, ""));
    if (el.hasAttribute("data-phone-text")) {
      el.textContent = SITE_CONFIG.phoneDisplay;
    }
  });

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    var text = encodeURIComponent("Hi Pankaj Electricals, I need help with electrical products/services.");
    el.setAttribute("href", "https://wa.me/" + SITE_CONFIG.whatsapp + "?text=" + text);
  });

  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.setAttribute("href", "mailto:" + SITE_CONFIG.email);
    if (el.hasAttribute("data-email-text")) {
      el.textContent = SITE_CONFIG.email;
    }
  });

  document.querySelectorAll("[data-gbp]").forEach(function (el) {
    el.setAttribute("href", SITE_CONFIG.gbpUrl);
  });

  document.querySelectorAll("[data-rating]").forEach(function (el) {
    el.textContent = SITE_CONFIG.googleRating;
  });

  document.querySelectorAll("[data-review-count]").forEach(function (el) {
    el.textContent = SITE_CONFIG.googleReviewCount + "+";
  });

  var form = document.getElementById("contact-form");
  if (form && SITE_CONFIG.formAction) {
    form.setAttribute("action", SITE_CONFIG.formAction);
  }

  document.querySelectorAll("[data-address]").forEach(function (el) {
    el.textContent = SITE_CONFIG.address;
  });
}

function initMobileNav() {
  var toggle = document.getElementById("mobile-toggle");
  var navbar = document.getElementById("navbar");
  if (!toggle || !navbar) return;

  toggle.addEventListener("click", function () {
    var isOpen = navbar.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.innerHTML = isOpen
      ? '<svg class="icon" aria-hidden="true"><use href="#icon-times"></use></svg>'
      : '<svg class="icon" aria-hidden="true"><use href="#icon-bars"></use></svg>';
  });

  navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#icon-bars"></use></svg>';
    });
  });
}

function initContactFormSent() {
  if (new URLSearchParams(window.location.search).get("sent") !== "1") return;
  var status = document.getElementById("form-status");
  if (!status) return;
  status.textContent = "Thank you! Your message has been sent. We will call you shortly.";
  status.className = "form-status success";
}

function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function () {
    var status = document.getElementById("form-status");
    if (!form.checkValidity()) return;
    if (status) {
      status.textContent = "Sending your message…";
      status.className = "form-status";
    }
  });
}

function initProductSearch() {
  var searchBox = document.getElementById("search-box");
  var searchBtn = document.getElementById("search-btn");
  if (!searchBox) return;

  function runSearch() {
    var query = searchBox.value.trim().toLowerCase();
    if (!query) return;

    var cards = document.querySelectorAll("#product1 .pro, .products-page .pro");
    if (!cards.length) {
      window.location.href = "products.html?q=" + encodeURIComponent(query);
      return;
    }

    var visible = 0;
    cards.forEach(function (card) {
      var match = card.textContent.toLowerCase().indexOf(query) !== -1;
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });

    var noResults = document.getElementById("no-results");
    if (noResults) noResults.hidden = visible > 0;
  }

  if (searchBtn) searchBtn.addEventListener("click", runSearch);

  searchBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (window.location.pathname.indexOf("products") === -1 && searchBox.value.trim()) {
        window.location.href = "products.html?q=" + encodeURIComponent(searchBox.value.trim());
      } else {
        runSearch();
      }
    }
  });

  var q = new URLSearchParams(window.location.search).get("q");
  if (q && searchBox) {
    searchBox.value = q;
    runSearch();
  }
}

function initLazyEmbeds() {
  document.querySelectorAll("[data-lazy-embed]").forEach(function (wrap) {
    var loaded = false;

    function loadEmbed() {
      if (loaded) return;
      loaded = true;
      var iframe = document.createElement("iframe");
      iframe.src = wrap.getAttribute("data-embed-src") || SITE_CONFIG.mapsEmbedSrc;
      iframe.title = wrap.getAttribute("data-embed-title") || "Google Maps";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
      wrap.classList.add("is-loaded");
    }

    var facade = wrap.querySelector(".embed-facade");
    if (facade) {
      facade.addEventListener("click", loadEmbed);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadEmbed();
            observer.disconnect();
          }
        });
      }, { rootMargin: "200px" }).observe(wrap);
    } else if (facade) {
      facade.addEventListener("click", loadEmbed);
    }
  });
}

function initGoogleReviewsWidget() {
  var container = document.getElementById("google-reviews-embed");
  if (!container || !("IntersectionObserver" in window)) return;

  new IntersectionObserver(function (entries, observer) {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();

    var iframe = document.createElement("iframe");
    iframe.src = SITE_CONFIG.mapsEmbedSrc;
    iframe.title = "Pankaj Electricals Google Reviews";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.setAttribute("allowfullscreen", "");
    container.innerHTML = "";
    container.appendChild(iframe);
    container.classList.add("is-loaded");
  }, { rootMargin: "250px" }).observe(container);
}
