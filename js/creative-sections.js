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
        
        // Foreground (groom) moves more dramatically - 3x speed
        if (fgLayer) {
            const fgOffset = (1 - clampedProgress) * 360;
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

// ========== SECTION 3: TWO BECOME ONE (3 PANEL REVEAL) ==========
function initMergeSection() {
    const section = document.getElementById('merge');
    if (!section) return;
    
    const panels = document.getElementById('mergePanels');
    if (!panels) return;
    
    // Get all videos in the merge section and ensure smooth looping
    const mergeVideos = section.querySelectorAll('video');
    mergeVideos.forEach(video => {
        // Ensure loop attribute is set
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // Handle loop restart to prevent gaps
        video.addEventListener('timeupdate', () => {
            // If near the end, prepare for seamless loop
            if (video.duration && video.currentTime > video.duration - 0.1) {
                video.currentTime = 0;
            }
        });
        
        // Ensure video plays when visible
        video.addEventListener('pause', () => {
            if (isInViewport(section)) {
                video.play().catch(() => {});
            }
        });
        
        // Handle any loading errors gracefully
        video.addEventListener('error', () => {
            console.warn('Video loading error, retrying...');
            video.load();
        });
        
        // Start playing
        video.play().catch(() => {});
    });
    
    // Use IntersectionObserver to trigger the panel expansion
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                // Trigger the reveal - center expands, sides shrink
                panels.classList.add('revealed');
                // Ensure videos are playing
                mergeVideos.forEach(v => v.play().catch(() => {}));
            } else if (!entry.isIntersecting) {
                // Reset when scrolled away
                panels.classList.remove('revealed');
            }
        });
    }, {
        threshold: [0, 0.3, 0.5, 0.7]
    });
    
    observer.observe(section);
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
    const allVideos = document.querySelectorAll('video[loop]');
    
    allVideos.forEach(video => {
        // Skip the scrub video as it's controlled separately
        if (video.id === 'scrubVideo') return;
        
        // Ensure proper attributes
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // Seamless loop - restart slightly before end to prevent flash
        video.addEventListener('timeupdate', () => {
            if (video.duration && video.currentTime > video.duration - 0.05) {
                video.currentTime = 0;
                video.play().catch(() => {});
            }
        });
        
        // Auto-restart if paused unexpectedly
        video.addEventListener('pause', () => {
            // Only restart if it should be playing (in viewport)
            const rect = video.getBoundingClientRect();
            const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
            if (inViewport && !video.ended) {
                setTimeout(() => {
                    video.play().catch(() => {});
                }, 100);
            }
        });
        
        // Handle stalled video
        video.addEventListener('stalled', () => {
            video.load();
            video.play().catch(() => {});
        });
        
        // Handle waiting state
        video.addEventListener('waiting', () => {
            // Video is buffering - this is normal, don't intervene
        });
        
        // Attempt to play
        video.play().catch(() => {
            // Autoplay blocked - will play on user interaction
        });
    });
    
    // Visibility change handler - pause/play based on tab visibility
    document.addEventListener('visibilitychange', () => {
        allVideos.forEach(video => {
            if (video.id === 'scrubVideo') return;
            
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(() => {});
            }
        });
    });
}

// Start everything
initCreativeSections();
