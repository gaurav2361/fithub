// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Pricing Toggle Logic
const pricingData = {
  monthly: [29, 49, 79, 129],
  sixMonth: [159, 269, 429, 699], // Approx 10% discount
  yearly: [299, 499, 799, 1299], // Approx 15-20% discount
};

const priceElements = document.querySelectorAll(".price-amount");
const billingTextElements = document.querySelectorAll(".billing-text");
const toggleButtons = document.querySelectorAll(".pricing-toggle-btn");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    toggleButtons.forEach((b) => {
      b.classList.remove("bg-primary", "text-primary-foreground");
      b.classList.add("bg-secondary", "text-secondary-foreground");
    });

    // Add active class to clicked
    btn.classList.remove("bg-secondary", "text-secondary-foreground");
    btn.classList.add("bg-primary", "text-primary-foreground");

    const period = btn.dataset.period; // 'monthly', 'sixMonth', 'yearly'
    updatePrices(period);
  });
});

function updatePrices(period) {
  const prices = pricingData[period];
  const billingLabels = {
    monthly: "/month",
    sixMonth: "/6 months",
    yearly: "/year",
  };

  priceElements.forEach((el, index) => {
    // Simple animation effect
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = `$${prices[index]}`;
      el.style.opacity = 1;
    }, 200);
  });

  billingTextElements.forEach((el) => {
    el.textContent = billingLabels[period];
  });
}
