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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
}

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return Promise.resolve();
    
    // Simple approach: show for 1.5 seconds max then fade out
    // Don't wait for assets - they'll load in background
    return new Promise(resolve => {
        setTimeout(() => {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
                resolve();
            }, 600);
        }, 1500);
    });
}

// ========== SECTION 1: HEIGHTS PARALLAX ==========
function initHeightsSection() {
    const section = document.getElementById('heights');
    if (!section) return;
    
    const bgLayer = section.querySelector('.heights-bg-layer');
    const fgLayer = section.querySelector('.heights-fg-layer');
    
    // Letter-by-letter animation
    const lines = section.querySelectorAll('.heights-line');
    let totalDelay = 300; // Start after a small delay
    
    lines.forEach((line, lineIndex) => {
        const text = line.textContent.trim();
        const isAccent = line.classList.contains('heights-accent');
        line.innerHTML = ''; // Clear text content
        
        // Add delay between lines
        if (lineIndex > 0) totalDelay += 200;
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${totalDelay + (i * 50)}ms`;
            line.appendChild(span);
        });
        
        totalDelay += text.length * 50;
    });
    
    // Parallax scroll handler
    function updateHeightsParallax() {
        if (!isInViewport(section)) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Background subtle movement
        if (bgLayer) {
            const bgOffset = (clampedProgress - 0.5) * 30;
            bgLayer.style.transform = `translateY(${bgOffset}px)`;
        }
        
        // Foreground (groom) moves faster upward - starts aligned, moves up as you scroll
        if (fgLayer) {
            const fgOffset = -(clampedProgress * 400);
            fgLayer.style.transform = `translateY(${fgOffset}px)`;
        }
    }
    
    window.addEventListener('scroll', updateHeightsParallax, { passive: true });
    updateHeightsParallax();
}

// ========== SECTION 2: FILM STRIP (Now CSS animated - no JS needed) ==========
function initFilmstripSection() {
    // Filmstrip is now purely CSS animated with infinite loop
    // No scroll-based control needed
    console.log('Filmstrip: CSS animation active');
}

// ========== SECTION 3: TWO BECOME ONE (3 PANEL REVEAL) ==========
function initMergeSection() {
    const section = document.getElementById('merge');
    if (!section) return;
    
    const panels = document.getElementById('mergePanels');
    if (!panels) return;
    
    // Get all videos in the merge section
    const mergeVideos = section.querySelectorAll('video');
    
    // Setup each video with minimal interference
    mergeVideos.forEach(video => {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        
        // Simple ended handler as backup
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        });
        
        video.play().catch(() => {});
    });
    
    // Use setInterval instead of RAF to avoid conflicts with scrub section
    const mergeVideoCheck = setInterval(() => {
        if (!document.hidden) {
            mergeVideos.forEach(video => {
                if (video.paused && video.readyState >= 2) {
                    video.play().catch(() => {});
                }
            });
        }
    }, 250);
    
    // Use IntersectionObserver to trigger the panel expansion
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                panels.classList.add('revealed');
            } else if (!entry.isIntersecting) {
                panels.classList.remove('revealed');
            }
        });
    }, {
        threshold: [0, 0.3, 0.5, 0.6, 0.8]
    });
    
    observer.observe(section);
}

// ========== SECTION 4: CAPTURED IN TIME (VIDEO PLAYS ON VIEW) ==========
function initScrubSection() {
    const section = document.getElementById('scrub');
    if (!section) return;
    
    const video = document.getElementById('scrubVideo');
    if (!video) return;
    
    // Setup video
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    
    // Play when in view, pause when out
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(section);
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
    
    document.querySelectorAll('.creative-section h2').forEach(heading => {
        observer.observe(heading);
    });
}

// ========== INITIALIZE ALL SECTIONS ==========
async function initCreativeSections() {
    // Wait for DOM
    if (document.readyState === 'loading') {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });
    }
    
    // Show loading screen while assets load
    await initLoadingScreen();
    
    // Initialize robust video looping for ALL videos on page
    initGlobalVideoLooping();
    
    // Initialize all sections
    initHeightsSection();
    initFilmstripSection();
    initMergeSection();
    initScrubSection();
    initTextRevealAnimations();
    
    console.log('✨ Creative sections initialized');
}

// ========== GLOBAL VIDEO LOOPING INFRASTRUCTURE ==========
function initGlobalVideoLooping() {
    // Only handle hero video - merge section has its own handler
    const heroVideo = document.querySelector('.hero-bg video');
    
    if (heroVideo) {
        heroVideo.loop = true;
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            heroVideo.play().catch(() => {});
        });
        
        heroVideo.play().catch(() => {});
    }
    
    // Visibility change handler for hero video
    document.addEventListener('visibilitychange', () => {
        if (heroVideo) {
            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(() => {});
            }
        }
    });
}

// Start everything
initCreativeSections();
