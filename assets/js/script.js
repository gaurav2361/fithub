$(document).ready(() => {
  // --- 1. Mobile Menu Toggle ---
  $("#menu-btn").on("click", () => {
    $("#mobile-menu").slideToggle(300); // jQuery Slide Animation
  });

  // --- 2. Pricing Toggle Logic ---
  const pricingData = {
    monthly: [29, 49, 79, 129],
    sixMonth: [159, 269, 429, 699],
    yearly: [299, 499, 799, 1299],
  };

  $(".pricing-toggle-btn").on("click", function () {
    // Toggle Active Classes
    $(".pricing-toggle-btn")
      .removeClass("bg-primary text-primary-foreground")
      .addClass("bg-secondary text-secondary-foreground");
    $(this).removeClass("bg-secondary text-secondary-foreground").addClass("bg-primary text-primary-foreground");

    const period = $(this).data("period");
    const prices = pricingData[period];
    const label = period === "monthly" ? "/month" : period === "sixMonth" ? "/6 months" : "/year";

    // Animate Price Change
    $(".price-amount").fadeOut(200, () => {
      // This runs after fadeOut finishes
      // 'this' refers to the specific .price-amount element being animated
      // Since there are multiple prices, we need to map the index correctly
      // Note: In jQuery 'each' loop inside here might be safer
    });

    // Better approach for multiple elements sync:
    $(".price-amount").each(function (index) {
      $(this).fadeOut(200, function () {
        $(this)
          .text("$" + prices[index])
          .fadeIn(200);
      });
    });

    $(".billing-text").fadeOut(200, function () {
      $(this).text(label).fadeIn(200);
    });
  });

  // --- 3. Scroll Fade-In Animation ---
  // Select all elements with the class 'fade-in-section'
  const $sections = $(".fade-in-section");

  function checkScroll() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    $sections.each(function () {
      const $this = $(this);
      const elementTop = $this.offset().top;

      // If element is within viewport
      if (elementTop < scrollTop + windowHeight - 50) {
        $this.addClass("is-visible");
      }
    });
  }

  // Run on scroll and initial load
  $(window).on("scroll", checkScroll);
  checkScroll(); // Trigger once on load
});
