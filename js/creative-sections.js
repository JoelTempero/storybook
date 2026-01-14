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
    
    // Robust video play function
    function playVideo(video) {
        if (video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Retry after a short delay
                    setTimeout(() => video.play().catch(() => {}), 100);
                });
            }
        }
    }
    
    // Setup each video
    mergeVideos.forEach(video => {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        
        // Force restart when ended (backup for loop)
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            playVideo(video);
        });
        
        // Restart if paused unexpectedly
        video.addEventListener('pause', () => {
            if (!document.hidden) {
                setTimeout(() => playVideo(video), 50);
            }
        });
        
        // Handle stall
        video.addEventListener('stalled', () => {
            video.load();
            playVideo(video);
        });
        
        // Handle waiting/buffering - don't do anything drastic
        video.addEventListener('waiting', () => {
            // Just wait for it to buffer
        });
        
        // Start playing
        playVideo(video);
    });
    
    // Visibility change - pause when hidden, play when visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            mergeVideos.forEach(v => v.pause());
        } else {
            mergeVideos.forEach(v => playVideo(v));
        }
    });
    
    // Keep videos alive with periodic check
    setInterval(() => {
        if (!document.hidden && isInViewport(section)) {
            mergeVideos.forEach(video => {
                if (video.paused || video.ended) {
                    video.currentTime = video.currentTime || 0;
                    playVideo(video);
                }
            });
        }
    }, 500);
    
    // Use IntersectionObserver to trigger the panel expansion - trigger at 70%
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                panels.classList.add('revealed');
                mergeVideos.forEach(v => playVideo(v));
            } else if (!entry.isIntersecting) {
                panels.classList.remove('revealed');
            }
        });
    }, {
        threshold: [0, 0.3, 0.5, 0.7, 0.8]
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
