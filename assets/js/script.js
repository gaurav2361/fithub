$(document).ready(() => {
  // 1. Mobile Menu
  $("#menu-btn").on("click", () => {
    $("#mobile-menu").slideToggle(300);
  });

  // 2. FAQ Accordion Logic (NEW)
  $(".faq-question").on("click", function () {
    // Toggle the answer for the clicked question
    $(this).next(".faq-answer").slideToggle(300);

    // Rotate the arrow icon (optional visual flair)
    $(this).find("span").toggleClass("rotate-180");

    // Optional: Close other answers when one is opened
    $(".faq-answer").not($(this).next()).slideUp(300);
    $(".faq-question").not($(this)).find("span").removeClass("rotate-180");
  });

  // 3. Pricing Logic (Existing)
  const pricingData = {
    monthly: [29, 49, 79, 129],
    sixMonth: [159, 269, 429, 699],
    yearly: [299, 499, 799, 1299],
  };

  $(".pricing-toggle-btn").on("click", function () {
    $(".pricing-toggle-btn")
      .removeClass("bg-primary text-primary-foreground")
      .addClass("bg-secondary text-secondary-foreground");
    $(this).removeClass("bg-secondary text-secondary-foreground").addClass("bg-primary text-primary-foreground");

    const period = $(this).data("period");
    const prices = pricingData[period];
    const label = period === "monthly" ? "/month" : period === "sixMonth" ? "/6 months" : "/year";

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

  // 4. Scroll Animation
  const $sections = $(".fade-in-section");
  function checkScroll() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    $sections.each(function () {
      const $this = $(this);
      if ($this.offset().top < scrollTop + windowHeight - 50) {
        $this.addClass("is-visible");
      }
    });
  }
  $(window).on("scroll", checkScroll);
  checkScroll();
});
