/* Update your contact details here */
const SITE_CONFIG = {
  phone: "+917011891843",
  phoneDisplay: "+91 70118 91843",
  whatsapp: "917011891843",
  email: "info@pankajelectricalsandbattery.com",
  address: "Shop No. 345, GF, Shakti Khand I, Indirapuram, Ghaziabad, Uttar Pradesh 201014",
  gbpUrl: "https://www.google.com/maps/place/Pankaj+Electricals+and+Electrician+services/@28.647373,77.3599948,17z/data=!3m1!4b1!4m6!3m5!1s0x390cfab0a101d15f:0xde86f8678eadf18c!8m2!3d28.647373!4d77.3625697!16s%2Fg%2F11f39rkvvg?entry=ttu",
  formAction: "https://formsubmit.co/info@pankajelectricalsandbattery.com"
};

document.addEventListener("DOMContentLoaded", function () {
  applySiteConfig();
  initMobileNav();
  initHeroSlider();
  initContactForm();
  initProductSearch();
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
    toggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  navbar.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

function initHeroSlider() {
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dot");
  if (!slides.length) return;

  var index = 0;
  var timer;

  function showSlide(i) {
    slides.forEach(function (slide, idx) {
      slide.classList.toggle("active", idx === i);
    });
    dots.forEach(function (dot, idx) {
      dot.classList.toggle("active", idx === i);
    });
    index = i;
  }

  function nextSlide() {
    showSlide((index + 1) % slides.length);
  }

  showSlide(0);
  timer = setInterval(nextSlide, 5000);

  dots.forEach(function (dot, idx) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      showSlide(idx);
      timer = setInterval(nextSlide, 5000);
    });
  });
}

function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
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
      var text = card.textContent.toLowerCase();
      var match = text.indexOf(query) !== -1;
      card.style.display = match ? "" : "none";
      if (match) visible++;
    });

    var noResults = document.getElementById("no-results");
    if (noResults) {
      noResults.hidden = visible > 0;
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", runSearch);
  }

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

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  if (q && searchBox) {
    searchBox.value = q;
    runSearch();
  }
}
