/**
 * LADY T'S CLEANING SERVICES - INTERACTIVE JAVASCRIPT ENGINE
 * Handles:
 * 1. WebP Frame scrubbing & interactive canvas animation
 * 2. Web Audio API synthesized sound FX (spray, wipe, sparkle)
 * 3. Drag-to-wipe & particle generation
 * 4. Dynamic cleaning price calculator
 * 5. Before & after comparison slider
 * 6. Booking modal and notifications
 */

// ==========================================
// 1. HERO HD VIDEO CONTROLLER
// ==========================================
class HeroVideoController {
  constructor() {
    this.video = document.getElementById('hero-video-player');
    this.soundToggle = document.getElementById('hero-sound-toggle');
    this.playToggle = document.getElementById('hero-play-toggle');
    this.sparklesLayer = document.getElementById('sparkles-layer');
    this.soundIconWrap = document.getElementById('sound-icon-wrap');
    this.soundLabel = document.getElementById('sound-label-text');
    this.playIconWrap = document.getElementById('play-icon-wrap');
    this.playLabel = document.getElementById('play-label-text');

    this.init();
  }

  init() {
    if (!this.video) return;

    // Enforce mute for guaranteed smooth autoplay across all browsers
    this.video.muted = true;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      const playPromise = this.video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, play on first user interaction
          const resumeOnInteraction = () => {
            this.video.play().catch(() => {});
            window.removeEventListener('click', resumeOnInteraction);
            window.removeEventListener('touchstart', resumeOnInteraction);
            window.removeEventListener('scroll', resumeOnInteraction);
          };
          window.addEventListener('click', resumeOnInteraction, { once: true });
          window.addEventListener('touchstart', resumeOnInteraction, { once: true });
          window.addEventListener('scroll', resumeOnInteraction, { once: true });
        });
      }
    };

    tryPlay();

    this.bindEvents();
    this.startSparkles();
  }

  bindEvents() {
    // Sound Toggle (Mute / Unmute)
    if (this.soundToggle) {
      this.soundToggle.addEventListener('click', () => {
        this.video.muted = !this.video.muted;
        this.updateSoundUI();
      });
    }

    // Play / Pause Toggle
    if (this.playToggle) {
      this.playToggle.addEventListener('click', () => {
        if (this.video.paused) {
          this.video.play();
        } else {
          this.video.pause();
        }
        this.updatePlayUI();
      });
    }

    this.video.addEventListener('play', () => this.updatePlayUI());
    this.video.addEventListener('pause', () => this.updatePlayUI());
    this.video.addEventListener('volumechange', () => this.updateSoundUI());
  }

  updateSoundUI() {
    const isMuted = this.video.muted;
    const iconMuted = this.soundIconWrap?.querySelector('.icon-muted');
    const iconUnmuted = this.soundIconWrap?.querySelector('.icon-unmuted');

    if (iconMuted && iconUnmuted) {
      iconMuted.style.display = isMuted ? 'inline-block' : 'none';
      iconUnmuted.style.display = isMuted ? 'none' : 'inline-block';
    }

    if (this.soundLabel) {
      this.soundLabel.textContent = isMuted ? 'Sound: Off' : 'Sound: On';
    }
  }

  updatePlayUI() {
    const isPaused = this.video.paused;
    const iconPause = this.playIconWrap?.querySelector('.icon-pause');
    const iconPlay = this.playIconWrap?.querySelector('.icon-play');

    if (iconPause && iconPlay) {
      iconPause.style.display = isPaused ? 'none' : 'inline-block';
      iconPlay.style.display = isPaused ? 'inline-block' : 'none';
    }

    if (this.playLabel) {
      this.playLabel.textContent = isPaused ? 'Paused' : 'HD Live';
    }
  }

  spawnSparkle(x, y) {
    if (!this.sparklesLayer) return;
    const star = document.createElement('div');
    star.className = 'sparkle-star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    this.sparklesLayer.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1800);
  }

  startSparkles() {
    if (!this.sparklesLayer) return;
    setInterval(() => {
      if (document.hidden) return;
      const rect = this.sparklesLayer.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        // Spawn subtle sparkle towards right/center area
        const x = rect.width * 0.4 + Math.random() * (rect.width * 0.55);
        const y = Math.random() * (rect.height * 0.85);
        this.spawnSparkle(x, y);
      }
    }, 1200);
  }
}

// ==========================================
// 2. SYNTHETIC AUDIO ENGINE (Web Audio API)
// ==========================================
class AudioEngine {
  constructor() {
    this.ctx = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSpray() {
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      // Audio fallback
    }
  }

  playWipe() {
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      // Audio fallback
    }
  }

  playSparkle() {
    try {
      this.ensureContext();
      if (!this.ctx) return;

      const freqs = [1046.5, 1318.5, 1568.0, 2093.0];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch (e) {
      // Audio fallback
    }
  }
}

// ==========================================
// 3. INTERACTIVE CLEANING COST CALCULATOR
// ==========================================
class CleaningCalculator {
  constructor() {
    this.serviceType = 'residential';
    this.basePrice = 130;
    this.bedrooms = 2;
    this.bathrooms = 2;
    this.sqft = 1400;
    this.frequencyDiscount = 0.15; // default Bi-Weekly
    this.frequencyName = 'Bi-Weekly';
    this.selectedAddonsTotal = 0;

    this.init();
  }

  init() {
    this.bindServiceChips();
    this.bindSteppers();
    this.bindSqftSlider();
    this.bindFrequencyTabs();
    this.bindAddons();
    this.bindBookButton();
    this.calculate();
  }

  bindServiceChips() {
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.serviceType = chip.dataset.type;
        this.basePrice = parseFloat(chip.dataset.base);
        this.calculate();
      });
    });
  }

  bindSteppers() {
    const bedMinus = document.getElementById('bed-minus');
    const bedPlus = document.getElementById('bed-plus');
    const bedCount = document.getElementById('bed-count');

    const bathMinus = document.getElementById('bath-minus');
    const bathPlus = document.getElementById('bath-plus');
    const bathCount = document.getElementById('bath-count');

    if (bedMinus && bedPlus) {
      bedMinus.addEventListener('click', () => {
        if (this.bedrooms > 1) {
          this.bedrooms--;
          bedCount.textContent = this.bedrooms;
          this.calculate();
        }
      });
      bedPlus.addEventListener('click', () => {
        if (this.bedrooms < 8) {
          this.bedrooms++;
          bedCount.textContent = this.bedrooms;
          this.calculate();
        }
      });
    }

    if (bathMinus && bathPlus) {
      bathMinus.addEventListener('click', () => {
        if (this.bathrooms > 1) {
          this.bathrooms--;
          bathCount.textContent = this.bathrooms;
          this.calculate();
        }
      });
      bathPlus.addEventListener('click', () => {
        if (this.bathrooms < 6) {
          this.bathrooms++;
          bathCount.textContent = this.bathrooms;
          this.calculate();
        }
      });
    }
  }

  bindSqftSlider() {
    const slider = document.getElementById('sqft-slider');
    const display = document.getElementById('sqft-display');
    if (slider && display) {
      slider.addEventListener('input', (e) => {
        this.sqft = parseInt(e.target.value, 10);
        display.textContent = `${this.sqft.toLocaleString()} sq.ft`;
        this.calculate();
      });
    }
  }

  bindFrequencyTabs() {
    const tabs = document.querySelectorAll('.freq-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.frequencyDiscount = parseFloat(tab.dataset.discount);
        this.frequencyName = tab.textContent.trim().split('\n')[0];
        this.calculate();
      });
    });
  }

  bindAddons() {
    const addonCheckboxes = document.querySelectorAll('.addon-input');
    addonCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        let total = 0;
        addonCheckboxes.forEach(item => {
          if (item.checked) {
            total += parseFloat(item.dataset.price);
          }
        });
        this.selectedAddonsTotal = total;
        this.calculate();
      });
    });
  }

  calculate() {
    // Formula:
    // Base fee + (bedrooms * 20) + (bathrooms * 25) + ((sqft - 1000) / 100 * 3)
    let rawHomeRate = this.basePrice + ((this.bedrooms - 1) * 20) + ((this.bathrooms - 1) * 25);
    if (this.sqft > 1000) {
      rawHomeRate += Math.round(((this.sqft - 1000) / 100) * 3);
    }

    const discountAmount = Math.round(rawHomeRate * this.frequencyDiscount);
    const subtotal = rawHomeRate - discountAmount;
    const finalTotal = subtotal + this.selectedAddonsTotal;

    // Update UI elements
    const priceDisplay = document.getElementById('estimated-price');
    const summaryServiceName = document.getElementById('summary-service-name');
    const summaryUnit = document.getElementById('summary-unit');
    const savingsBox = document.getElementById('savings-box');
    const savingsAmount = document.getElementById('savings-amount');

    const breakdownBaseLabel = document.getElementById('breakdown-base-label');
    const breakdownBaseVal = document.getElementById('breakdown-base-val');
    const breakdownDiscountVal = document.getElementById('breakdown-discount-val');
    const breakdownAddonsRow = document.getElementById('breakdown-addons-row');
    const breakdownAddonsVal = document.getElementById('breakdown-addons-val');
    const breakdownFinalVal = document.getElementById('breakdown-final-val');
    const modalPriceDisplay = document.getElementById('modal-price-display');

    if (priceDisplay) priceDisplay.textContent = finalTotal;
    if (modalPriceDisplay) modalPriceDisplay.textContent = `$${finalTotal}.00`;

    const serviceTitles = {
      residential: 'Standard Residential Clean',
      deepclean: 'Deep Cleaning & Refresh',
      moveinout: 'Move In / Move Out Clean',
      commercial: 'Commercial Office Clean'
    };

    if (summaryServiceName) summaryServiceName.textContent = serviceTitles[this.serviceType] || 'Standard Clean';
    if (summaryUnit) {
      summaryUnit.textContent = this.frequencyDiscount > 0 ? `/ ${this.frequencyName.toLowerCase()}` : '/ clean';
    }

    if (savingsBox && savingsAmount) {
      if (discountAmount > 0) {
        savingsBox.style.display = 'block';
        savingsAmount.textContent = `$${discountAmount}`;
      } else {
        savingsBox.style.display = 'none';
      }
    }

    if (breakdownBaseLabel) {
      breakdownBaseLabel.textContent = `${this.bedrooms} Beds, ${this.bathrooms} Baths (~${this.sqft.toLocaleString()} sq.ft)`;
    }
    if (breakdownBaseVal) breakdownBaseVal.textContent = `$${rawHomeRate}`;
    if (breakdownDiscountVal) {
      breakdownDiscountVal.textContent = discountAmount > 0 
        ? `-$${discountAmount} (${Math.round(this.frequencyDiscount * 100)}%)` 
        : '$0';
    }

    if (breakdownAddonsRow && breakdownAddonsVal) {
      if (this.selectedAddonsTotal > 0) {
        breakdownAddonsRow.style.display = 'flex';
        breakdownAddonsVal.textContent = `+$${this.selectedAddonsTotal}`;
      } else {
        breakdownAddonsRow.style.display = 'none';
      }
    }

    if (breakdownFinalVal) breakdownFinalVal.textContent = `$${finalTotal}`;
  }

  bindBookButton() {
    const calcBookBtn = document.getElementById('calc-book-btn');
    if (calcBookBtn) {
      calcBookBtn.addEventListener('click', () => {
        openBookingModal(this.serviceType);
      });
    }
  }
}

// ==========================================
// 4. BEFORE & AFTER COMPARISON SLIDER
// ==========================================
class BeforeAfterSlider {
  constructor() {
    this.container = document.getElementById('comparison-slider');
    this.beforeClip = document.getElementById('before-clip');
    this.handle = document.getElementById('slider-handle');
    if (!this.container || !this.beforeClip || !this.handle) return;

    this.isDragging = false;
    this.init();
  }

  init() {
    const setPosition = (clientX) => {
      const rect = this.container.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      pos = Math.max(0, Math.min(1, pos));
      const percent = pos * 100;
      this.beforeClip.style.width = `${percent}%`;
      this.handle.style.left = `${percent}%`;
    };

    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      setPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        setPosition(e.clientX);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch
    this.container.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Room Switcher
    const roomBtns = document.querySelectorAll('.room-btn');
    const afterImg = this.container.querySelector('.after-img');
    const beforeImg = this.container.querySelector('.before-img');

    roomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        roomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (btn.dataset.room === 'kitchen') {
          afterImg.src = '/kitchen-clean.jpg';
          beforeImg.src = '/kitchen-dirty.jpg';
        } else if (btn.dataset.room === 'commercial') {
          afterImg.src = '/service-commercial.jpg';
          beforeImg.src = '/service-residential.jpg';
        }
      });
    });
  }
}

// ==========================================
// 5. ZIP CODE CHECKER
// ==========================================
function setupZipChecker() {
  const zipForm = document.getElementById('zip-form');
  const zipInput = document.getElementById('zip-input');
  const zipResult = document.getElementById('zip-result');

  if (!zipForm) return;

  zipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = zipInput.value.trim();
    if (!val) return;

    zipResult.className = 'zip-result-message success';
    zipResult.innerHTML = `🎉 <strong>Coverage Confirmed!</strong> Lady T provides premium full-service coverage to <strong>${val}</strong> and across Benin City & Edo State. Priority slots available!`;
  });
}

// ==========================================
// 6. BOOKING MODAL & TOASTS
// ==========================================
function setupBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn') || document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-booking-btn');
  const form = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('book-service') || document.getElementById('bm-service');
  const dateInput = document.getElementById('book-date');

  // Set default date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  window.openBookingModal = (serviceType = 'residential') => {
    if (modal) {
      if (serviceSelect && serviceType) {
        serviceSelect.value = serviceType;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.dataset.service || 'residential';
      window.openBookingModal(service);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name')?.value || document.getElementById('bm-name')?.value || 'Valued Client';
      const phone = document.getElementById('book-phone')?.value || document.getElementById('bm-phone')?.value || '';
      const area = document.getElementById('book-address')?.value || document.getElementById('book-zip')?.value || document.getElementById('bm-area')?.value || 'Benin City';
      const service = document.getElementById('book-service')?.value || document.getElementById('bm-service')?.value || 'Cleaning Service';
      const notes = document.getElementById('book-notes')?.value || document.getElementById('bm-notes')?.value || '';

      closeModal();
      showToast(`🎉 Thank you, ${name}! Redirecting to WhatsApp to confirm your ${service}...`);

      const text = encodeURIComponent(`Hello Lady T Cleaning Services,\n\nI would like to book a cleaning service.\n- Name: ${name}\n- Phone: ${phone}\n- Area: ${area}\n- Service: ${service}${notes ? `\n- Notes: ${notes}` : ''}`);
      setTimeout(() => {
        const url = `https://wa.me/2347038750117?text=${text}`;
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = url;
        }
      }, 500);
      form.reset();
    });
  }
}

// ==========================================
// 6B. CONTACT PAGE INQUIRY FORM TO WHATSAPP
// ==========================================
function setupContactPageForm() {
  const contactForm = document.getElementById('contact-page-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim() || 'Valued Client';
    const phone = document.getElementById('contact-phone')?.value.trim() || '';
    const area = document.getElementById('contact-area')?.value.trim() || 'Benin City';
    const service = document.getElementById('contact-service')?.value.trim() || 'Cleaning Service';
    const message = document.getElementById('contact-message')?.value.trim() || '';

    showToast(`🎉 Thank you, ${name}! Redirecting to WhatsApp to send your inquiry...`);

    const text = `*NEW INQUIRY - LADY T'S CLEANING SERVICES*\n\n` +
      `👤 *Full Name:* ${name}\n` +
      `📞 *Phone / WhatsApp:* ${phone}\n` +
      `📍 *Location / Area:* ${area}\n` +
      `🧹 *Service Required:* ${service}` +
      (message ? `\n📝 *Details / Notes:* ${message}` : '') +
      `\n\nSent from Lady T's website (Instant Quote & Booking)`;

    const url = `https://wa.me/2347038750117?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      const win = window.open(url, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = url;
      }
    }, 400);

    contactForm.reset();
  });
}


function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// ==========================================
// 7. MOBILE MENU & SMOOTH SCROLL
// ==========================================
function setupMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!toggle || !drawer) return;

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-menu-open');
  };

  const openMenu = () => {
    toggle.classList.add('is-open');
    drawer.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-menu-open');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking nav links or buttons inside the drawer
  drawer.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside of drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close when resizing window to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// ==========================================
// 8. PHONE INPUT AUTO-FORMATTER
// ==========================================
function setupPhoneAutoFormat() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', 'tel');
    input.addEventListener('input', (e) => {
      let raw = e.target.value;
      // Allow leading plus and digits
      let cleaned = raw.replace(/[^\d+]/g, '');
      
      // Auto format standard 11-digit numbers (e.g. 0703 875 0117)
      if (cleaned.startsWith('0') && cleaned.length <= 11) {
        const p1 = cleaned.slice(0, 4);
        const p2 = cleaned.slice(4, 7);
        const p3 = cleaned.slice(7, 11);
        if (p3) {
          cleaned = `${p1} ${p2} ${p3}`;
        } else if (p2) {
          cleaned = `${p1} ${p2}`;
        } else {
          cleaned = p1;
        }
      }
      e.target.value = cleaned;
    });
  });
}

// ==========================================
// 9. BACK-TO-TOP CONTROLLER
// ==========================================
function setupBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 380) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  new HeroVideoController();
  setupZipChecker();
  setupBookingModal();
  setupContactPageForm();
  setupMobileMenu();
  setupPhoneAutoFormat();
  setupBackToTop();
});

