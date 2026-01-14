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

// ========== SECTION 2: FILM STRIP ==========
function initFilmstripSection() {
    const section = document.getElementById('filmstrip');
    if (!section) return;
    
    const track = document.getElementById('filmstripTrack');
    if (!track) return;
    
    const filmstrip = track.querySelector('.filmstrip');
    if (!filmstrip) return;
    
    let maxScroll = 0;
    
    function calculateMaxScroll() {
        const filmWidth = filmstrip.scrollWidth;
        const viewportWidth = window.innerWidth;
        maxScroll = filmWidth - viewportWidth + 100;
    }
    
    calculateMaxScroll();
    
    function updateFilmstrip() {
        if (!isInViewport(section)) return;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        const scrollStart = windowHeight;
        const scrollEnd = -sectionHeight;
        const currentPosition = rect.top;
        const progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(progress, 0, 1);
        
        const translateX = -clampedProgress * maxScroll;
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    window.addEventListener('scroll', updateFilmstrip, { passive: true });
    window.addEventListener('resize', calculateMaxScroll);
    updateFilmstrip();
}

// ========== SECTION 3: TWO BECOME ONE (MERGE WITH VIDEOS) ==========
function initMergeSection() {
    const section = document.getElementById('merge');
    if (!section) return;
    
    const leftPanel = document.getElementById('mergeLeft');
    const rightPanel = document.getElementById('mergeRight');
    const centerText = document.getElementById('mergeText');
    const brideVideo = document.getElementById('mergeBrideVideo');
    const groomVideo = document.getElementById('mergeGroomVideo');
    
    // Video state
    let brideReady = false;
    let groomReady = false;
    let brideDuration = 0;
    let groomDuration = 0;
    
    // Setup videos
    if (brideVideo) {
        brideVideo.addEventListener('loadedmetadata', () => {
            brideReady = true;
            brideDuration = brideVideo.duration;
            brideVideo.pause();
        });
        if (brideVideo.readyState >= 1) {
            brideReady = true;
            brideDuration = brideVideo.duration;
            brideVideo.pause();
        }
    }
    
    if (groomVideo) {
        groomVideo.addEventListener('loadedmetadata', () => {
            groomReady = true;
            groomDuration = groomVideo.duration;
            groomVideo.pause();
        });
        if (groomVideo.readyState >= 1) {
            groomReady = true;
            groomDuration = groomVideo.duration;
            groomVideo.pause();
        }
    }
    
    // Smooth video scrubbing with RAF
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;
    
    function smoothVideoUpdate() {
        // Lerp for smooth transitions
        currentProgress = lerp(currentProgress, targetProgress, 0.15);
        
        // Update bride video
        if (brideReady && brideDuration > 0) {
            const brideTime = currentProgress * brideDuration;
            if (Math.abs(brideVideo.currentTime - brideTime) > 0.01) {
                brideVideo.currentTime = brideTime;
            }
        }
        
        // Update groom video
        if (groomReady && groomDuration > 0) {
            const groomTime = currentProgress * groomDuration;
            if (Math.abs(groomVideo.currentTime - groomTime) > 0.01) {
                groomVideo.currentTime = groomTime;
            }
        }
        
        rafId = requestAnimationFrame(smoothVideoUpdate);
    }
    
    // Start animation loop
    smoothVideoUpdate();
    
    function updateMerge() {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Check if section is visible
        const isVisible = rect.bottom > 0 && rect.top < windowHeight;
        
        if (!isVisible) return;
        
        // Calculate progress through section
        const scrollStart = windowHeight;
        const scrollEnd = -(sectionHeight - windowHeight);
        const currentPosition = rect.top;
        const progress = (scrollStart - currentPosition) / (scrollStart - scrollEnd);
        const clampedProgress = clamp(progress, 0, 1);
        
        // Update target for smooth video scrubbing
        targetProgress = clampedProgress;
        
        // Panels slide apart
        const slideAmount = clampedProgress * 100;
        
        if (leftPanel) {
            leftPanel.style.transform = `translateX(-${slideAmount}%)`;
        }
        
        if (rightPanel) {
            rightPanel.style.transform = `translateX(${slideAmount}%)`;
        }
        
        // Show text when mostly merged
        if (centerText) {
            if (clampedProgress > 0.5) {
                centerText.classList.add('visible');
            } else {
                centerText.classList.remove('visible');
            }
        }
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
