(function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  var heroSection = document.getElementById("hero");
  var siteFooter = document.querySelector(".site-footer");
  var backToTopButton = document.querySelector(".back-to-top");
  var mobileStickyCta = document.querySelector(".mobile-sticky-cta");
  var year = document.getElementById("year");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a[href^="#"], .footer-links a[href^="#"]'));
  var sectionIds = navLinks
    .map(function (link) { return link.getAttribute("href"); })
    .filter(function (href) { return href && href.startsWith("#"); })
    .map(function (href) { return href.slice(1); })
    .filter(function (value, index, list) { return list.indexOf(value) === index; });
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setMenuState(isOpen) {
    if (!nav || !menuToggle) {
      return;
    }

    nav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      setMenuState(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) {
        return;
      }

      var clickedInsideNav = nav.contains(event.target);
      var clickedToggle = menuToggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) {
        setMenuState(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenuState(false);
      }
    });
  }

  function handleScrollState() {
    var showBackToTop = window.scrollY > 360;
    var footerIsVisible = false;
    var isSmallViewport = window.matchMedia("(max-width: 640px)").matches;
    var showStickyCta = false;

    if (siteFooter) {
      var footerTop = siteFooter.getBoundingClientRect().top;
      footerIsVisible = footerTop <= window.innerHeight - 40;
    }

    showStickyCta = isSmallViewport && window.scrollY > 700 && !footerIsVisible;

    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", showBackToTop && !footerIsVisible && !showStickyCta);
    }

    if (mobileStickyCta) {
      mobileStickyCta.classList.toggle("is-visible", showStickyCta);
    }
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", handleScrollState, { passive: true });
  window.addEventListener("resize", handleScrollState);
  handleScrollState();

  function setActiveSection(sectionId) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + sectionId);
    });
  }

  if (document.getElementById("hero")) {
    setActiveSection("hero");
  }

  if (sections.length > 0 && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-35% 0px -50% 0px", threshold: 0.05 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function trackClick(label) {
    try {
      var current = Number(localStorage.getItem("sportida_clicks_" + label) || "0");
      localStorage.setItem("sportida_clicks_" + label, String(current + 1));
    } catch (_error) {}

    window.dispatchEvent(new CustomEvent("sportida:click", { detail: { label: label, at: Date.now() } }));
  }

  document.querySelectorAll("a, button").forEach(function (element) {
    element.addEventListener("click", function () {
      var explicit = element.getAttribute("data-track");
      var href = element.getAttribute("href");
      var label = explicit || href || element.className || element.textContent.trim().slice(0, 32) || "unknown";
      trackClick(label);
    });
  });

  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var slides = slider.querySelectorAll(".hero-slide");
    var nextBtn = slider.querySelector("[data-next]");
    var prevBtn = slider.querySelector("[data-prev]");
    var current = 0;
    var timer;

    function show(index) {
      slides[current].classList.remove("is-active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("is-active");
    }

    function next() {
      show(current + 1);
    }

    function prev() {
      show(current - 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, 5500);
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        startAuto();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        startAuto();
      });
    }

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    startAuto();
  }

})();
