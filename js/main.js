/* ================================================
   STORYBOOK WEDDINGS - SHARED JAVASCRIPT
   Premium Wedding Photography & Videography
   ================================================ */

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Check initial scroll position
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

// ========== VIDEO MODAL ==========
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoModalClose = document.getElementById('videoModalClose');
    
    if (!videoModal) return;
    
    document.querySelectorAll('.portfolio-item[data-video], .mosaic-item[data-video], .mosaic-video[data-video]').forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.dataset.video;
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            videoModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeVideoModal() {
        videoFrame.src = '';
        videoModal.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }
    
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('open')) {
            closeVideoModal();
        }
    });
}

// ========== TESTIMONIAL CAROUSEL ==========
function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const nav = document.getElementById('testimonialNav');
    
    if (!track || !nav) return;
    
    const slides = track.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        nav.appendChild(dot);
    });

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        nav.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Auto-advance every 6 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 6000);
}

// ========== FAQ ACCORDION ==========
function initFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });
}

// ========== FADE-IN ON SCROLL ==========
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Create notification element if it doesn't exist
    let notification = document.getElementById('formNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'formNotification';
        notification.className = 'form-notification';
        form.appendChild(notification);
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showFormNotification(notification, 'Thanks for your message! We\'ll be in touch soon.', 'success');
                form.reset();
            } else {
                showFormNotification(notification, 'Sorry, something went wrong. Please try again or email us directly at joel@tempero.nz', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormNotification(notification, 'Sorry, something went wrong. Please try again or email us directly at joel@tempero.nz', 'error');
        }
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showFormNotification(element, message, type) {
    element.textContent = message;
    element.className = `form-notification ${type}`;
    element.style.display = 'block';
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 8000);
}

// ========== ABOUT SLIDESHOW ==========
function initAboutSlideshow() {
    const slideshow = document.getElementById('aboutSlideshow');
    if (!slideshow) return;
    
    const images = slideshow.querySelectorAll('img');
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(function() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 4000);
}

// ========== MOBILE BOTTOM NAV ==========
function initBottomNav() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const currentPath = window.location.pathname;
    
    bottomNavItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href.replace('.html', '')) && href !== 'index.html') {
            item.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && href === 'index.html') {
            item.classList.add('active');
        }
    });
}

// ========== PWA INSTALL ==========
let deferredPrompt;

function initPWA() {
    const downloadBtn = document.getElementById('downloadAppBtn');

    // Hide button if already installed or not supported
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        if (downloadBtn) downloadBtn.style.display = 'none';
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (downloadBtn) downloadBtn.style.display = 'block';
    });

    window.addEventListener('appinstalled', () => {
        console.log('App was installed');
        if (downloadBtn) downloadBtn.style.display = 'none';
        deferredPrompt = null;
    });
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
                const downloadBtn = document.getElementById('downloadAppBtn');
                if (downloadBtn) downloadBtn.style.display = 'none';
            }
            deferredPrompt = null;
        });
    } else {
        // Fallback for iOS or browsers that don't support beforeinstallprompt
        alert('To install this app:\n\n• iOS Safari: Tap the Share button, then "Add to Home Screen"\n• Android Chrome: Tap the menu (⋮), then "Add to Home Screen"\n• Desktop: Look for the install icon in your browser\'s address bar');
    }
}

// ========== CALCULATOR FUNCTIONS ==========
const pricing = {
    photography: { half: 2000, full: 2850, second: 550 },
    videography: { half: 2450, full: 3450, second: 550 },
    combo: { half: 3350, full: 5000 },
    documentary: { price: 'quote', label: 'From $6,500' },
    screensaver: 150,
    recordingCeremony: 400,
    recordingSpeeches: 300,
    socialVideo: 130,
    couplesStandalone: 850,
    couplesWithPackage: 450,
    photoBase: { half: 650, full: 1000 },
    photoExtra: 75,
    photoMax: 2000
};

const calcState = {
    photography: { selected: false, duration: 'half', second: false, photos: 650 },
    videography: { selected: false, duration: 'half', second: false },
    combo: { selected: false, duration: 'half', photos: 650 },
    documentary: { selected: false }
};

function handleServiceChange() {
    const services = ['photography', 'videography', 'combo', 'documentary'];
    services.forEach(service => {
        const checkbox = document.getElementById(service);
        if (!checkbox) return;
        const options = checkbox.closest('.service-group').querySelector('.service-options');
        if (checkbox.checked) {
            options.classList.add('show');
        } else {
            options.classList.remove('show');
        }
    });

    const hasService = hasMainPackage();
    const addonsSection = document.getElementById('addons-section');
    
    if (addonsSection) {
        if (hasService) {
            addonsSection.classList.remove('disabled');
            const websiteCheckbox = document.getElementById('website');
            if (websiteCheckbox) websiteCheckbox.checked = true;
        } else {
            addonsSection.classList.add('disabled');
            // Reset all addons
            ['website', 'screensaver', 'recording-ceremony', 'recording-speeches', 'events'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.checked = false;
            });
            const socialSlider = document.getElementById('social-slider');
            if (socialSlider) socialSlider.value = 0;
        }
    }

    updatePhotoSliderBases();
    updateCalculator();
}

function setDuration(service, duration) {
    calcState[service].duration = duration;
    
    document.querySelectorAll(`[data-service="${service}"]`).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.duration === duration);
    });

    const priceEl = document.getElementById(`${service}-price`);
    if (priceEl && pricing[service]) {
        const price = pricing[service][duration];
        priceEl.textContent = `$${price.toLocaleString()}`;
    }

    if (service === 'photography' || service === 'combo') {
        updatePhotoSliderBases();
    }

    updateCalculator();
}

function updatePhotoSliderBases() {
    const photoDuration = calcState.photography.duration;
    const photoBase = pricing.photoBase[photoDuration];
    const photoSlider = document.getElementById('photo-slider');
    if (photoSlider) {
        photoSlider.min = photoBase;
        if (parseInt(photoSlider.value) < photoBase) {
            photoSlider.value = photoBase;
        }
    }

    const comboDuration = calcState.combo.duration;
    const comboBase = pricing.photoBase[comboDuration];
    const comboSlider = document.getElementById('combo-photo-slider');
    if (comboSlider) {
        comboSlider.min = comboBase;
        if (parseInt(comboSlider.value) < comboBase) {
            comboSlider.value = comboBase;
        }
    }
}

function hasMainPackage() {
    return document.getElementById('photography')?.checked || 
           document.getElementById('videography')?.checked || 
           document.getElementById('combo')?.checked ||
           document.getElementById('documentary')?.checked;
}

function updateCalculator() {
    let subtotal = 0;
    let summaryHTML = '';
    let hasQuoteItems = false;

    // Photography
    if (document.getElementById('photography')?.checked) {
        const duration = calcState.photography.duration;
        const basePrice = pricing.photography[duration];
        const durationLabel = duration === 'half' ? 'Half Day' : 'Full Day';
        
        const photoBase = pricing.photoBase[duration];
        const photoSlider = document.getElementById('photo-slider');
        const photoCount = parseInt(photoSlider?.value || photoBase);
        const extraPhotos = photoCount - photoBase;
        const photoExtraCost = (extraPhotos / 50) * pricing.photoExtra;
        
        const photoCountDisplay = document.getElementById('photo-count-display');
        const photoExtraCostDisplay = document.getElementById('photo-extra-cost');
        
        if (photoCountDisplay) photoCountDisplay.textContent = `${photoCount} photos`;
        if (photoExtraCostDisplay) {
            photoExtraCostDisplay.textContent = photoExtraCost > 0 
                ? `+$${photoExtraCost} for ${extraPhotos} extra photos` 
                : 'Base amount included';
        }

        const totalPhotoPrice = basePrice + photoExtraCost;
        subtotal += totalPhotoPrice;
        
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Photography</div><div class="summary-item-detail">${durationLabel} · ${photoCount} photos</div></div><span class="summary-item-price">$${totalPhotoPrice.toLocaleString()}</span></div>`;

        if (document.getElementById('photography-2nd')?.checked) {
            subtotal += pricing.photography.second;
            summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">2nd Photographer</div></div><span class="summary-item-price">$${pricing.photography.second}</span></div>`;
        }
    }

    // Videography
    if (document.getElementById('videography')?.checked) {
        const duration = calcState.videography.duration;
        const price = pricing.videography[duration];
        const durationLabel = duration === 'half' ? 'Half Day' : 'Full Day';
        subtotal += price;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Videography</div><div class="summary-item-detail">${durationLabel}</div></div><span class="summary-item-price">$${price.toLocaleString()}</span></div>`;

        if (document.getElementById('videography-2nd')?.checked) {
            subtotal += pricing.videography.second;
            summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">2nd Videographer</div></div><span class="summary-item-price">$${pricing.videography.second}</span></div>`;
        }
    }

    // Combo Package
    if (document.getElementById('combo')?.checked) {
        const duration = calcState.combo.duration;
        const basePrice = pricing.combo[duration];
        const durationLabel = duration === 'half' ? 'Half Day' : 'Full Day';
        
        const photoBase = pricing.photoBase[duration];
        const comboSlider = document.getElementById('combo-photo-slider');
        const photoCount = parseInt(comboSlider?.value || photoBase);
        const extraPhotos = photoCount - photoBase;
        const photoExtraCost = (extraPhotos / 50) * pricing.photoExtra;
        
        const comboCountDisplay = document.getElementById('combo-photo-count-display');
        const comboExtraCostDisplay = document.getElementById('combo-photo-extra-cost');
        
        if (comboCountDisplay) comboCountDisplay.textContent = `${photoCount} photos`;
        if (comboExtraCostDisplay) {
            comboExtraCostDisplay.textContent = photoExtraCost > 0 
                ? `+$${photoExtraCost} for ${extraPhotos} extra photos` 
                : 'Base amount included';
        }

        const totalComboPrice = basePrice + photoExtraCost;
        subtotal += totalComboPrice;
        
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Photo + Video Package</div><div class="summary-item-detail">${durationLabel} · ${photoCount} photos</div></div><span class="summary-item-price">$${totalComboPrice.toLocaleString()}</span></div>`;
    }

    // Documentary
    if (document.getElementById('documentary')?.checked) {
        hasQuoteItems = true;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Wedding Documentary</div><div class="summary-item-detail">Custom quote required</div></div><span class="summary-item-price" style="color: var(--color-text-muted);">TBD</span></div>`;
    }

    // Website (FREE)
    if (document.getElementById('website')?.checked) {
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Wedding Website</div></div><span class="summary-item-price" style="color: var(--color-success);">FREE</span></div>`;
    }

    // Screensaver
    if (document.getElementById('screensaver')?.checked) {
        subtotal += pricing.screensaver;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Screensaver</div></div><span class="summary-item-price">$${pricing.screensaver}</span></div>`;
    }

    // Recordings
    let recordingsTotal = 0;
    if (document.getElementById('recording-ceremony')?.checked) recordingsTotal += pricing.recordingCeremony;
    if (document.getElementById('recording-speeches')?.checked) recordingsTotal += pricing.recordingSpeeches;
    
    const recordingsPrice = document.getElementById('recordings-price');
    if (recordingsPrice) recordingsPrice.textContent = `$${recordingsTotal}`;
    
    if (recordingsTotal > 0) {
        subtotal += recordingsTotal;
        const parts = [];
        if (document.getElementById('recording-ceremony')?.checked) parts.push('Ceremony');
        if (document.getElementById('recording-speeches')?.checked) parts.push('Speeches');
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Recordings</div><div class="summary-item-detail">${parts.join(' + ')}</div></div><span class="summary-item-price">$${recordingsTotal}</span></div>`;
    }

    // Social Videos
    const socialSlider = document.getElementById('social-slider');
    const socialCount = parseInt(socialSlider?.value || 0);
    const socialValue = document.getElementById('social-value');
    if (socialValue) socialValue.textContent = `${socialCount} reel${socialCount !== 1 ? 's' : ''}`;
    
    const socialTotal = socialCount * pricing.socialVideo;
    const socialPrice = document.getElementById('social-price');
    if (socialPrice) socialPrice.textContent = `$${socialTotal}`;
    
    if (socialCount > 0) {
        subtotal += socialTotal;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Social Videos</div><div class="summary-item-detail">${socialCount} reel${socialCount !== 1 ? 's' : ''}</div></div><span class="summary-item-price">$${socialTotal}</span></div>`;
    }

    // Events
    if (document.getElementById('events')?.checked) {
        hasQuoteItems = true;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Events</div><div class="summary-item-detail">Quote on request</div></div><span class="summary-item-price" style="color: var(--color-text-muted);">TBD</span></div>`;
    }

    // Couples Photography
    const hasPackage = hasMainPackage();
    const couplesPrice = hasPackage ? pricing.couplesWithPackage : pricing.couplesStandalone;
    const couplesPriceEl = document.getElementById('couples-price');
    const couplesNote = document.getElementById('couples-note');
    
    if (couplesPriceEl) couplesPriceEl.textContent = `$${couplesPrice}`;
    if (couplesNote) {
        couplesNote.textContent = hasPackage 
            ? '$450 with your wedding package (save $400!)' 
            : '$850 standalone or $450 with a wedding package';
    }
    
    if (document.getElementById('couples')?.checked) {
        subtotal += couplesPrice;
        summaryHTML += `<div class="summary-item"><div><div class="summary-item-name">Couples Photography</div>${hasPackage ? '<div class="summary-item-detail">Package discount applied</div>' : ''}</div><span class="summary-item-price">$${couplesPrice}</span></div>`;
    }

    // Update summary display
    const summaryEl = document.getElementById('summary-items');
    if (summaryEl) {
        summaryEl.innerHTML = summaryHTML || '<div class="summary-empty">Select services to build your quote</div>';
    }

    // Calculate totals
    const gst = subtotal * 0.15;
    const total = subtotal + gst;

    const subtotalEl = document.getElementById('subtotal');
    const gstEl = document.getElementById('gst');
    const totalEl = document.getElementById('total');
    const quoteNote = document.getElementById('quote-note');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (gstEl) gstEl.textContent = `$${gst.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (totalEl) totalEl.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (quoteNote) quoteNote.style.display = hasQuoteItems ? 'block' : 'none';
}

// ========== PHOTO GALLERY LIGHTBOX ==========
function initPhotoGallery() {
    // Photo lightbox for portfolio page
    const photoLightbox = document.getElementById('photoLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const photoLightboxClose = document.getElementById('photoLightboxClose');
    
    if (photoLightbox) {
        // Handle photo clicks
        document.querySelectorAll('.mosaic-photo[data-photo]').forEach(item => {
            item.addEventListener('click', () => {
                const photoSrc = item.dataset.photo;
                lightboxImage.src = photoSrc;
                photoLightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closePhotoLightbox() {
            photoLightbox.classList.remove('open');
            document.body.style.overflow = '';
            lightboxImage.src = '';
        }
        
        if (photoLightboxClose) {
            photoLightboxClose.addEventListener('click', closePhotoLightbox);
        }
        
        photoLightbox.addEventListener('click', (e) => {
            if (e.target === photoLightbox) closePhotoLightbox();
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && photoLightbox.classList.contains('open')) {
                closePhotoLightbox();
            }
        });
    }
    
    // Simple lightbox for photo gallery on other pages
    document.querySelectorAll('.photo-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                console.log('Gallery image clicked:', img.src);
            }
        });
    });
}

// ========== INITIALIZE ALL ==========
function initAll() {
    initNavbar();
    initVideoModal();
    initTestimonialCarousel();
    initFaqAccordion();
    initScrollAnimations();
    initContactForm();
    initAboutSlideshow();
    initBottomNav();
    initPWA();
    initPhotoGallery();
    
    // Initialize calculator if present
    if (document.getElementById('photography')) {
        updateCalculator();
    }
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initVideoModal,
        initTestimonialCarousel,
        initFaqAccordion,
        initScrollAnimations,
        initContactForm,
        initAboutSlideshow,
        initBottomNav,
        initPWA,
        installPWA,
        handleServiceChange,
        setDuration,
        updateCalculator
    };
}
