// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.focus();
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.focus();
}
hamburger.addEventListener('click', openMobileMenu);
hamburger.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') openMobileMenu();
});
mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuClose.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') closeMobileMenu();
});
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
// Trap focus inside mobile menu
mobileMenu.addEventListener('keydown', function(e) {
  if (!mobileMenu.classList.contains('open')) return;
  const focusable = mobileMenu.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  if (e.key === 'Escape') closeMobileMenu();
});

// Smooth scroll and active nav
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});
// Highlight active nav on scroll
const sections = ['home', 'products', 'about', 'testimonials', 'contact'];
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 80;
  sections.forEach(id => {
    const sec = document.getElementById(id);
    if (sec && scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
    }
  });
});
// Product card scroll animation
function revealOnScroll(selector) {
  const elements = document.querySelectorAll(selector);
  const reveal = () => {
    const trigger = window.innerHeight * 0.92;
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add('visible');
    });
  };
  window.addEventListener('scroll', reveal);
  reveal();
}
revealOnScroll('.product-card');
revealOnScroll('.contact-form');
revealOnScroll('.contact-info');
revealOnScroll('.testimonial');
// Product Modal Quick View
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const modalBuyBtn = document.getElementById('modalBuyBtn');
let lastFocusedEl = null;
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-cart-btn')) return;
    modalImg.src = card.querySelector('img').src;
    modalImg.alt = card.querySelector('img').alt;
    modalTitle.textContent = card.querySelector('.product-name').textContent;
    modalPrice.textContent = card.querySelector('.product-price').textContent;
    modalDesc.textContent = card.querySelector('.product-desc') ? card.querySelector('.product-desc').textContent : '';
    modal.classList.add('open');
    lastFocusedEl = document.activeElement;
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  });
  card.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });
});

// Add click event listeners to all Buy Now buttons
document.querySelectorAll('.add-cart-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    
    // Create WhatsApp message
    const message = `Hello Boss, am interested in the ${productName} - ${productPrice}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233241491069?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  });
});
modalClose.addEventListener('click', closeModal);
modalBuyBtn.addEventListener('click', function() {
  const productName = modalTitle.textContent;
  const productPrice = modalPrice.textContent;
  
  // Create WhatsApp message
  const message = `Hello Boss, am interested in the ${productName} - ${productPrice}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/233241491069?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
  closeModal();
});
modal.addEventListener('click', function(e) {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', function(e) {
  if (modal.classList.contains('open')) {
    if (e.key === 'Escape') closeModal();
    // Focus trap
    const focusable = modal.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
    if (e.key === 'Tab') {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }
});
function closeModal() {
  modal.classList.remove('open');
  if (lastFocusedEl) lastFocusedEl.focus();
}
// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
let testimonialIndex = 0;
const prevBtn = document.getElementById('testimonialPrev');
const nextBtn = document.getElementById('testimonialNext');
function showTestimonial(idx) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
}
prevBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});
nextBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});
// Auto-advance testimonials every 7s
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 7000);
// Newsletter Signup
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');
newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = newsletterForm.newsletterEmail.value.trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    return;
  }
  newsletterMessage.textContent = 'Subscribing...';
  setTimeout(() => {
    newsletterMessage.textContent = 'Thank you for subscribing!';
    newsletterForm.reset();
  }, 1200);
});
// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = '';
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  let valid = true;
  if (!name) {
    formMessage.textContent = 'Please enter your name.';
    valid = false;
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    valid = false;
  } else if (!message) {
    formMessage.textContent = 'Please enter your message.';
    valid = false;
  }
  if (!valid) return;
  formMessage.textContent = 'Sending...';
  setTimeout(() => {
    formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
    contactForm.reset();
  }, 1200);
});
// Animate hero headline, badges, CTA on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-title').style.opacity = 1;
  document.querySelectorAll('.hero-badge').forEach(badge => badge.style.opacity = 1);
  document.querySelector('.hero-left p').style.opacity = 1;
  document.querySelector('.hero-left .cta-btn').style.opacity = 1;
});

// New Arrivals slider controls
const arrivalsSlider = document.getElementById('newArrivalsSlider');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
sliderPrev.addEventListener('click', () => {
  arrivalsSlider.scrollBy({ left: -220, behavior: 'smooth' });
});
sliderNext.addEventListener('click', () => {
  arrivalsSlider.scrollBy({ left: 220, behavior: 'smooth' });
});

// Animate trusted brands, new arrivals, and USP sections on scroll
function revealSectionOnScroll(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const reveal = () => {
    const trigger = window.innerHeight * 0.92;
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.style.opacity = 1;
  };
  window.addEventListener('scroll', reveal);
  reveal();
}
revealSectionOnScroll('.trusted-brands');
revealSectionOnScroll('.new-arrivals-section');
revealSectionOnScroll('.usp-section'); 