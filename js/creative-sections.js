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
    const progressFill = document.getElementById('loadingProgressFill');
    
    if (!loadingScreen) return Promise.resolve();
    
    // Collect all assets to preload
    const videos = document.querySelectorAll('video');
    const images = document.querySelectorAll('img');
    
    let loadedCount = 0;
    const totalAssets = videos.length + images.length;
    
    function updateProgress() {
        loadedCount++;
        const progress = totalAssets > 0 ? (loadedCount / totalAssets) * 100 : 100;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }
    
    // Create promises for all assets
    const videoPromises = Array.from(videos).map(video => {
        return new Promise(resolve => {
            if (video.readyState >= 3) {
                updateProgress();
                resolve();
            } else {
                video.addEventListener('canplaythrough', () => {
                    updateProgress();
                    resolve();
                }, { once: true });
                // Fallback timeout
                setTimeout(() => {
                    updateProgress();
                    resolve();
                }, 5000);
            }
        });
    });
    
    const imagePromises = Array.from(images).map(img => {
        return new Promise(resolve => {
            if (img.complete) {
                updateProgress();
                resolve();
            } else {
                img.addEventListener('load', () => {
                    updateProgress();
                    resolve();
                }, { once: true });
                img.addEventListener('error', () => {
                    updateProgress();
                    resolve();
                }, { once: true });
            }
        });
    });
    
    // Wait for all assets or minimum time
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    
    return Promise.all([
        ...videoPromises,
        ...imagePromises,
        minLoadTime
    ]).then(() => {
        // Fade out loading screen
        loadingScreen.classList.add('loaded');
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 600);
    });
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
        if (!isInViewport(section)) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const clampedProgress = clamp(progress, 0, 1);
        
        if (bgLayer) {
            const bgOffset = (clampedProgress - 0.5) * 50;
            bgLayer.style.transform = `translateY(${bgOffset}px)`;
        }
        
        if (fgLayer) {
            const fgOffset = (1 - clampedProgress) * 150 - 50;
            fgLayer.style.transform = `translateX(-50%) translateY(${fgOffset}px)`;
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

// ========== SECTION 3: TWO BECOME ONE (LOOPING VIDEOS + DELAYED SLIDE) ==========
function initMergeSection() {
    const section = document.getElementById('merge');
    if (!section) return;
    
    const leftPanel = document.getElementById('mergeLeft');
    const rightPanel = document.getElementById('mergeRight');
    const centerText = document.getElementById('mergeText');
    const leftLabel = leftPanel?.querySelector('.merge-label');
    const rightLabel = rightPanel?.querySelector('.merge-label');
    
    // Videos autoplay and loop via HTML attributes
    // We just handle the slide animation with a delay
    
    function updateMerge() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Check if section is visible
        if (rect.bottom < 0 || rect.top > windowHeight) return;
        
        // Calculate progress through section
        // First 40% of scroll: videos play, no movement
        // Last 60% of scroll: panels slide apart
        const scrollStart = windowHeight;
        const scrollEnd = -(sectionHeight - windowHeight);
        const currentPosition = rect.top;
        const rawProgress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(rawProgress, 0, 1);
        
        // Delay the slide - only start after 40% scroll progress
        const slideDelay = 0.4;
        const slideProgress = clampedProgress <= slideDelay ? 0 : (clampedProgress - slideDelay) / (1 - slideDelay);
        const easedSlide = easeOutCubic(slideProgress);
        
        // Panels slide apart (max 100% = fully off screen)
        const slideAmount = easedSlide * 100;
        
        if (leftPanel) {
            leftPanel.style.transform = `translateX(-${slideAmount}%)`;
        }
        
        if (rightPanel) {
            rightPanel.style.transform = `translateX(${slideAmount}%)`;
        }
        
        // Fade out labels as panels start sliding
        const labelOpacity = 1 - slideProgress;
        if (leftLabel) leftLabel.style.opacity = labelOpacity;
        if (rightLabel) rightLabel.style.opacity = labelOpacity;
        
        // Show text when panels are mostly apart (slideProgress > 0.6)
        if (centerText) {
            if (slideProgress > 0.6) {
                centerText.classList.add('visible');
            } else {
                centerText.classList.remove('visible');
            }
        }
    }
    
    // Easing function for smooth slide
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    window.addEventListener('scroll', updateMerge, { passive: true });
    updateMerge();
}

// ========== SECTION 4: CAPTURED IN TIME (SMOOTH VIDEO SCRUB) ==========
function initScrubSection() {
    const section = document.getElementById('scrub');
    if (!section) return;
    
    const video = document.getElementById('scrubVideo');
    if (!video) return;
    
    let videoReady = false;
    let videoDuration = 0;
    let targetTime = 0;
    let currentTime = 0;
    let rafId = null;
    let lastVisibleState = false;
    
    // Wait for video to be ready
    video.addEventListener('loadedmetadata', () => {
        videoReady = true;
        videoDuration = video.duration;
        video.pause();
        video.currentTime = 0;
    });
    
    if (video.readyState >= 1) {
        videoReady = true;
        videoDuration = video.duration;
        video.pause();
    }
    
    // Smooth frame-by-frame update using RAF
    function smoothVideoUpdate() {
        if (!videoReady || videoDuration === 0) {
            rafId = requestAnimationFrame(smoothVideoUpdate);
            return;
        }
        
        // Check visibility
        const rect = section.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        
        if (isVisible) {
            // Smooth interpolation for buttery playback
            currentTime = lerp(currentTime, targetTime, 0.12);
            
            // Only update if difference is significant enough
            if (Math.abs(video.currentTime - currentTime) > 0.001) {
                video.currentTime = currentTime;
            }
        }
        
        rafId = requestAnimationFrame(smoothVideoUpdate);
    }
    
    // Start the animation loop
    smoothVideoUpdate();
    
    function updateScrub() {
        if (!videoReady || videoDuration === 0) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Check if section is visible
        const isVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        if (!isVisible) {
            // Reset to start or end based on position
            if (rect.top >= windowHeight) {
                targetTime = 0;
            } else if (rect.bottom <= 0) {
                targetTime = videoDuration;
            }
            return;
        }
        
        // Calculate progress - video plays through the sticky scroll
        const scrollStart = windowHeight;
        const scrollEnd = -(sectionHeight - windowHeight);
        const currentPosition = rect.top;
        const progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Set target time (the RAF loop will smoothly interpolate to this)
        targetTime = clampedProgress * videoDuration;
    }
    
    window.addEventListener('scroll', updateScrub, { passive: true });
    updateScrub();
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
    
    // Initialize all sections
    initHeightsSection();
    initFilmstripSection();
    initMergeSection();
    initScrubSection();
    initTextRevealAnimations();
    
    console.log('✨ Creative sections initialized');
}

// Start everything
initCreativeSections();
