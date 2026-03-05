(function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("main-nav");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

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

  var reviewRotator = document.querySelector("[data-review-rotator]");
  if (reviewRotator) {
    var reviews = reviewRotator.querySelectorAll(".hero-review");
    var activeIndex = 0;

    setInterval(function () {
      reviews[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % reviews.length;
      reviews[activeIndex].classList.add("is-active");
    }, 5000);
  }
})();
