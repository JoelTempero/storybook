/* ================================================
   STORYBOOK WEDDINGS - CREATIVE SECTIONS JS
   Scroll-based interactions and effects
   ================================================ */

// ========== UTILITY FUNCTIONS ==========
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function getScrollProgress(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementTop = rect.top - windowHeight + offset;
    const elementBottom = rect.bottom - offset;
    const scrollDistance = elementBottom - elementTop;
    const progress = -elementTop / scrollDistance;
    return clamp(progress, 0, 1);
}

// ========== SECTION 1: HEIGHTS PARALLAX ==========
function initHeightsSection() {
    const section = document.getElementById('heights');
    if (!section) return;
    
    const bgLayer = section.querySelector('.heights-bg-layer');
    const fgLayer = section.querySelector('.heights-fg-layer');
    const particlesContainer = document.getElementById('heightsParticles');
    
    // Create floating particles
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'heights-particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${5 + Math.random() * 10}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 3}s`;
            particle.style.animationDuration = `${2 + Math.random() * 2}s`;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Parallax scroll handler
    function updateHeightsParallax() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only animate when section is in view
        if (rect.bottom < 0 || rect.top > windowHeight) return;
        
        // Calculate scroll progress through section
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Background moves slower (subtle parallax)
        if (bgLayer) {
            const bgOffset = (clampedProgress - 0.5) * 50;
            bgLayer.style.transform = `translateY(${bgOffset}px)`;
        }
        
        // Foreground (groom) moves faster and more dramatically
        if (fgLayer) {
            // Groom rises as you scroll down
            const fgOffset = (1 - clampedProgress) * 150 - 50;
            fgLayer.style.transform = `translateX(-50%) translateY(${fgOffset}px)`;
        }
    }
    
    window.addEventListener('scroll', updateHeightsParallax, { passive: true });
    updateHeightsParallax();
}

// ========== SECTION 2: FILM STRIP ==========
function initFilmstripSection() {
    const section = document.getElementById('filmstrip');
    if (!section) return;
    
    const track = document.getElementById('filmstripTrack');
    if (!track) return;
    
    const filmstrip = track.querySelector('.filmstrip');
    if (!filmstrip) return;
    
    // Calculate total scroll distance needed
    const filmWidth = filmstrip.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = filmWidth - viewportWidth + 100; // Extra padding
    
    function updateFilmstrip() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Only animate when section is in view
        if (rect.bottom < 0 || rect.top > windowHeight) return;
        
        // Calculate progress based on section position
        // Start moving when section top reaches viewport bottom
        // End when section bottom reaches viewport top
        const scrollStart = windowHeight;
        const scrollEnd = -sectionHeight;
        const currentPosition = rect.top;
        const progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Apply horizontal transform
        const translateX = -clampedProgress * maxScroll;
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    window.addEventListener('scroll', updateFilmstrip, { passive: true });
    window.addEventListener('resize', () => {
        // Recalculate on resize
        initFilmstripSection();
    });
    updateFilmstrip();
}

// ========== SECTION 3: TWO BECOME ONE (MERGE) ==========
function initMergeSection() {
    const section = document.getElementById('merge');
    if (!section) return;
    
    const leftPanel = document.getElementById('mergeLeft');
    const rightPanel = document.getElementById('mergeRight');
    const centerText = document.getElementById('mergeText');
    
    function updateMerge() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only animate when section is in view
        if (rect.bottom < 0 || rect.top > windowHeight) return;
        
        // Calculate progress
        // We want the merge to happen as the section scrolls through the viewport
        const progress = getScrollProgress(section, 100);
        
        // Panels slide apart as progress increases
        // Start at 0% (fully closed) and end at 50% (fully open)
        const slideAmount = progress * 100;
        
        if (leftPanel) {
            leftPanel.style.transform = `translateX(-${slideAmount}%)`;
        }
        
        if (rightPanel) {
            rightPanel.style.transform = `translateX(${slideAmount}%)`;
        }
        
        // Show text when mostly merged (progress > 0.7)
        if (centerText) {
            if (progress > 0.5) {
                centerText.classList.add('visible');
            } else {
                centerText.classList.remove('visible');
            }
        }
    }
    
    window.addEventListener('scroll', updateMerge, { passive: true });
    updateMerge();
}

// ========== SECTION 4: VIDEO SCRUB ==========
function initScrubSection() {
    const section = document.getElementById('scrub');
    if (!section) return;
    
    const video = document.getElementById('scrubVideo');
    const progressBar = document.getElementById('scrubProgressBar');
    const timeDisplay = document.getElementById('scrubTime');
    
    if (!video) return;
    
    let videoReady = false;
    let videoDuration = 0;
    
    // Wait for video metadata to load
    video.addEventListener('loadedmetadata', () => {
        videoReady = true;
        videoDuration = video.duration;
        // Pause the video - we'll control it with scroll
        video.pause();
        updateScrub();
    });
    
    // Also handle case where video is already loaded
    if (video.readyState >= 1) {
        videoReady = true;
        videoDuration = video.duration;
        video.pause();
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateScrub() {
        if (!videoReady || videoDuration === 0) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Only update when section is in view
        if (rect.bottom < 0 || rect.top > windowHeight) return;
        
        // Calculate progress through the tall section
        // The section is 300vh tall, so we have lots of scroll room
        const scrollStart = windowHeight;
        const scrollEnd = -(sectionHeight - windowHeight);
        const currentPosition = rect.top;
        const progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Set video current time based on scroll
        const targetTime = clampedProgress * videoDuration;
        
        // Only update if significantly different (prevents jitter)
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
        }
        
        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${clampedProgress * 100}%`;
        }
        
        // Update time display
        if (timeDisplay) {
            timeDisplay.textContent = formatTime(targetTime);
        }
    }
    
    window.addEventListener('scroll', updateScrub, { passive: true });
    
    // Initial update
    if (videoReady) {
        updateScrub();
    }
}

// ========== TEXT REVEAL ON SCROLL ==========
function initTextRevealAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all headings in creative sections
    document.querySelectorAll('.creative-section h2').forEach(heading => {
        observer.observe(heading);
    });
}

// ========== SMOOTH SCROLL PHYSICS ==========
let scrollY = 0;
let currentScrollY = 0;
let rafId = null;

function smoothScrollUpdate() {
    // Lerp towards target scroll position for smoother animations
    currentScrollY = lerp(currentScrollY, scrollY, 0.1);
    
    // Continue animation loop
    rafId = requestAnimationFrame(smoothScrollUpdate);
}

// ========== INITIALIZE ALL SECTIONS ==========
function initCreativeSections() {
    // Wait for DOM and fonts to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
    
    function initAll() {
        initHeightsSection();
        initFilmstripSection();
        initMergeSection();
        initScrubSection();
        initTextRevealAnimations();
        
        console.log('✨ Creative sections initialized');
    }
}

// Track scroll position
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
}, { passive: true });

// Start everything
initCreativeSections();

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeightsSection,
        initFilmstripSection,
        initMergeSection,
        initScrubSection
    };
}
