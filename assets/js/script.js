/* ========================================
   FITHUB - MAIN JAVASCRIPT FILE
   Web Development Semester 5 Project
   ======================================== */

/**
 * Document Ready Function
 * All code runs after the DOM is fully loaded
 * This ensures all HTML elements exist before we try to manipulate them
 */
$(document).ready(() => {
  /* ========================================
     1. MOBILE MENU TOGGLE
     ======================================== */
  /**
   * Handles the hamburger menu for mobile devices
   * Clicking the menu button slides the mobile menu up/down
   */
  $("#menu-btn").on("click", () => {
    $("#mobile-menu").slideToggle(300); // 300ms animation duration
  });

  // Close mobile menu when a link is clicked (better UX)
  $("#mobile-menu a").on("click", () => {
    $("#mobile-menu").slideUp(300);
  });

  /* ========================================
     2. FAQ ACCORDION LOGIC
     ======================================== */
  /**
   * Creates expandable FAQ sections
   * Only one FAQ can be open at a time
   * Features smooth slide animation and rotating arrow icon
   */
  $(".faq-question").on("click", function () {
    // 'this' refers to the clicked question button
    const $answer = $(this).next(".faq-answer");
    const $arrow = $(this).find("span");

    // Check if this FAQ is already open
    const isOpen = $answer.is(":visible");

    // Close all FAQs first (accordion behavior)
    $(".faq-answer").slideUp(300);
    $(".faq-question span").removeClass("rotate-180");

    // If this FAQ wasn't open, open it now
    if (!isOpen) {
      $answer.slideDown(300);
      $arrow.addClass("rotate-180");
    }
  });

  /* ========================================
     3. PRICING TOGGLE LOGIC
     ======================================== */
  /**
   * Handles switching between monthly, 6-month, and yearly pricing
   * Updates all prices and billing labels dynamically
   * Data structure holds all pricing information
   */

  // Pricing data for all plans and periods
  const pricingData = {
    monthly: [29, 49, 79, 129], // Starter, Standard, Pro, Elite
    sixMonth: [159, 269, 429, 699], // 6-month prices
    yearly: [299, 499, 799, 1299], // Annual prices (best value)
  };

  // Handle clicks on pricing toggle buttons
  $(".pricing-toggle-btn").on("click", function () {
    // Update button styles (active state)
    $(".pricing-toggle-btn")
      .removeClass("bg-destructive text-white shadow-md")
      .addClass("bg-transparent text-muted-foreground");

    $(this).removeClass("bg-transparent text-muted-foreground").addClass("bg-destructive text-white shadow-md");

    // Get the selected period (monthly/sixMonth/yearly)
    const period = $(this).data("period");
    const prices = pricingData[period];

    // Determine the billing label text
    const label = period === "monthly" ? "/month" : period === "sixMonth" ? "/6 months" : "/year";

    // Update each price with fade animation
    $(".price-amount").each(function (index) {
      $(this).fadeOut(200, function () {
        // After fade out, change text and fade back in
        $(this)
          .text("$" + prices[index])
          .fadeIn(200);
      });
    });

    // Update billing label with fade animation
    $(".billing-text").fadeOut(200, function () {
      $(this).text(label).fadeIn(200);
    });
  });

  /* ========================================
     4. SCROLL-TRIGGERED ANIMATIONS
     ======================================== */
  /**
   * Detects when elements scroll into view
   * Adds 'is-visible' class to trigger CSS animations
   * Creates a smooth, professional user experience
   */

  // Cache the fade-in sections for better performance
  const $sections = $(".fade-in-section");

  /**
   * Check which sections are in viewport
   * Called on scroll and page load
   */
  function checkScroll() {
    const scrollTop = $(window).scrollTop(); // Current scroll position
    const windowHeight = $(window).height(); // Viewport height

    $sections.each(function () {
      const $this = $(this);
      const elementTop = $this.offset().top;

      // If element is in viewport (with 50px threshold for early trigger)
      if (elementTop < scrollTop + windowHeight - 50) {
        $this.addClass("is-visible");
      }
    });
  }

  // Attach scroll listener (throttled for performance)
  let scrollTimer;
  $(window).on("scroll", () => {
    // Use timer to limit how often function runs (performance optimization)
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(checkScroll, 10);
  });

  // Run on page load to catch elements already in view
  checkScroll();

  /* ========================================
     5. FORM SUBMISSION HANDLING
     ======================================== */
  /**
   * Prevents default form submission and shows success message
   * In a real application, this would send data to a server
   */

  // Contact form submission
  $("form").on("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    // Get form data
    const formData = {
      firstName: $(this).find('input[placeholder="John"]').val(),
      lastName: $(this).find('input[placeholder="Doe"]').val(),
      email: $(this).find('input[type="email"]').val(),
      message: $(this).find("textarea").val(),
    };

    // Basic validation
    if (!formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }

    // Show success message
    alert("Thank you! We'll get back to you within 24 hours.");

    // Reset form
    this.reset();

    // In a real application, you would send this data to a server:
    // $.ajax({
    //   url: '/api/contact',
    //   method: 'POST',
    //   data: formData,
    //   success: function(response) { ... }
    // });
  });

  // Newsletter form submission
  $('form:has(input[placeholder*="email"])').on("submit", function (e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();

    if (!email) {
      alert("Please enter your email address!");
      return;
    }

    alert("Thank you for subscribing to our newsletter!");
    this.reset();
  });

  /* ========================================
     6. SMOOTH SCROLL FOR ANCHOR LINKS
     ======================================== */
  /**
   * Creates smooth scrolling when clicking links that point to page sections
   * Example: <a href="#about">About</a>
   */
  $('a[href^="#"]').on("click", function (e) {
    const target = $(this.getAttribute("href"));

    if (target.length) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80, // Offset for fixed navbar
        },
        800 // Animation duration in milliseconds
      );
    }
  });

  /* ========================================
     7. IMAGE LAZY LOADING (Optional Enhancement)
     ======================================== */
  /**
   * Only loads images when they're about to come into view
   * Improves initial page load performance
   * Modern browsers support this natively with loading="lazy"
   */

  // Add loading attribute to all images (if not already present)
  $("img").each(function () {
    if (!$(this).attr("loading")) {
      $(this).attr("loading", "lazy");
    }
  });

  /* ========================================
     8. TESTIMONIAL ROTATION (Bonus Feature)
     ======================================== */
  /**
   * Optional: Automatically cycle through testimonials
   * Uncomment this section if you want auto-rotation
   */
  /*
  let currentTestimonial = 0;
  const testimonials = $(".testimonial-card");

  function rotateTestimonials() {
    testimonials.fadeOut(300);
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials.eq(currentTestimonial).fadeIn(300);
  }

  // Rotate every 5 seconds
  setInterval(rotateTestimonials, 5000);
  */

  /* ========================================
     9. CONSOLE GREETING (Fun Touch)
     ======================================== */
  /**
   * Leave a message for anyone inspecting the code
   * Shows attention to detail for your college project!
   */
  console.log("%cFitHub 💪", "font-size: 24px; font-weight: bold; color: #dc2626;");
  console.log(
    "%cWeb Development Semester 5 Project\nBuilt with HTML, CSS, JavaScript & jQuery",
    "font-size: 12px; color: #9ca3af;"
  );
  console.log("%cLooking for a developer? Check out the contact page! 🚀", "font-size: 14px; color: #10b981;");

  /* ========================================
     10. PERFORMANCE MONITORING (Development)
     ======================================== */
  /**
   * Log page load time (helpful for optimization)
   * Remove or comment out in production
   */
  $(window).on("load", () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
  });
}); // End of document ready

/* ========================================
   UTILITY FUNCTIONS (Outside document ready)
   ======================================== */

/**
 * Debounce function - limits how often a function can run
 * Useful for scroll/resize events to improve performance
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 * Can be used for various scroll-triggered effects
 *
 * @param {HTMLElement} el - Element to check
 * @returns {boolean} - True if element is visible
 */
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Format currency for display
 * Example: formatCurrency(1299) returns "$1,299"
 *
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount) {
  return "$" + amount.toLocaleString("en-US");
}
