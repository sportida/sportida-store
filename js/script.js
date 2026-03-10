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
    var reviewSlides = reviewRotator.querySelectorAll(".hero-review-slide");
    var reviewIndex = 0;
    var reviewTimer;
    var reviewAnimationMs = 550;

    function showReview(index) {
      if (reviewRotator.classList.contains("is-sliding-out") || reviewRotator.classList.contains("is-sliding-in")) {
        return;
      }

      reviewRotator.classList.add("is-sliding-out");

      window.setTimeout(function () {
        reviewSlides[reviewIndex].classList.remove("is-active");
        reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
        reviewSlides[reviewIndex].classList.add("is-active");

        reviewRotator.classList.remove("is-sliding-out");
        reviewRotator.classList.add("is-sliding-in");
        reviewRotator.offsetWidth;

        window.requestAnimationFrame(function () {
          reviewRotator.classList.remove("is-sliding-in");
        });
      }, reviewAnimationMs);
    }

    function startReviewAuto() {
      stopReviewAuto();
      reviewTimer = window.setInterval(function () {
        showReview(reviewIndex + 1);
      }, 4200);
    }

    function stopReviewAuto() {
      if (reviewTimer) {
        window.clearInterval(reviewTimer);
      }
    }

    if (reviewSlides.length > 1) {
      reviewRotator.addEventListener("mouseenter", stopReviewAuto);
      reviewRotator.addEventListener("mouseleave", startReviewAuto);
      startReviewAuto();
    }
  }

})();
