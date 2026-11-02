// Richtone Group LLC NYC — Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Drawer Toggle
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`;
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => drawer.classList.remove('open'));
    });
  }

  // Dynamic Character-by-Character Typewriter
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      'Institutional Renovations',
      'Architectural Carpentry',
      'Commercial Framing & Drywall',
      'Doors & Hardware Fitting',
      'Occupied Facility Upgrades',
      'Luxury Residential Build-Outs'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }

  // Interactive NYC Commercial & Trade Renovation Estimator
  const calcForm = document.getElementById('trade-calc-form');
  if (calcForm) {
    calcForm.addEventListener('input', updateTradeCalculation);
    calcForm.addEventListener('change', updateTradeCalculation);
    updateTradeCalculation();
  }

  function updateTradeCalculation() {
    const tradeSelect = document.getElementById('calc-trade');
    const facilitySelect = document.getElementById('calc-facility');
    const sqftSelect = document.getElementById('calc-sqft');
    const timelineSelect = document.getElementById('calc-timeline');
    const targetDisplay = document.getElementById('calc-target-display');
    const detailsDisplay = document.getElementById('calc-details-display');
    const waInquiryBtn = document.getElementById('calc-wa-btn');

    if (!tradeSelect || !facilitySelect || !sqftSelect || !targetDisplay) return;

    const trade = tradeSelect.value;
    const facility = facilitySelect.value;
    const sqft = parseInt(sqftSelect.value) || 2500;
    const timeline = timelineSelect.value;

    let baseRatePerSqft = 35; // carpentry/drywall base

    if (trade === 'general') baseRatePerSqft = 75;
    else if (trade === 'carpentry') baseRatePerSqft = 45;
    else if (trade === 'doors') baseRatePerSqft = 28;
    else if (trade === 'painting') baseRatePerSqft = 22;

    if (facility === 'institutional') baseRatePerSqft *= 1.25; // higher compliance/occupied protocol
    else if (facility === 'luxury') baseRatePerSqft *= 1.4;

    const lowEstimate = Math.round((baseRatePerSqft * sqft * 0.9) / 1000) * 1000;
    const highEstimate = Math.round((baseRatePerSqft * sqft * 1.2) / 1000) * 1000;

    targetDisplay.innerText = `$${lowEstimate.toLocaleString()} – $${highEstimate.toLocaleString()}`;
    if (detailsDisplay) {
      const tradeName = tradeSelect.options[tradeSelect.selectedIndex].text;
      const facilityName = facilitySelect.options[facilitySelect.selectedIndex].text;
      const sqftName = sqftSelect.options[sqftSelect.selectedIndex].text;
      detailsDisplay.innerText = `Preliminary NYC trade estimate for ${tradeName} across a ${sqftName} ${facilityName}. Self-performed by Richtone Group LLC in-house tradesmen.`;
    }

    if (waInquiryBtn) {
      const tradeLabel = tradeSelect.options[tradeSelect.selectedIndex].text;
      const facilityLabel = facilitySelect.options[facilitySelect.selectedIndex].text;
      const sqftLabel = sqftSelect.options[sqftSelect.selectedIndex].text;
      const message = encodeURIComponent(
        `Hello Richtone Group LLC, I used your website project estimator: ${tradeLabel} for ${sqftLabel} in a ${facilityLabel} (Estimated scope: $${lowEstimate.toLocaleString()} – $${highEstimate.toLocaleString()}). I would like to discuss our RFP / project specifications.`
      );
      waInquiryBtn.href = `https://wa.me/19292996088?text=${message}`;
    }
  }

  // Sticky Filter Rail for Trades & Services
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      serviceCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Animated Telemetry Counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const countTarget = entry.target.dataset.count;
        if (countTarget) {
          let current = 0;
          const target = parseFloat(countTarget);
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.innerText = Math.round(target);
              clearInterval(counter);
            } else {
              entry.target.innerText = Math.round(current);
            }
          }, stepTime);
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.hero-stat-card, .glass-card, .bento-card, .service-card, .review-card').forEach(el => {
    observer.observe(el);
  });
});
