/* ================================================
   STORYBOOK WEDDINGS - WEB COMPONENTS
   Reusable Header, Footer, and Mobile Nav
   ================================================ */

// ========== SITE HEADER ==========
class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const currentPage = this.getAttribute('current') || '';
        
        this.innerHTML = `
            <nav class="navbar" id="navbar">
                <div class="container">
                    <div class="navbar-inner">
                        <a href="index.html" class="nav-logo">
                            <img src="assets/icons/icon-192x192.png" alt="Storybook Weddings" class="nav-logo-img">
                        </a>
                        <div class="nav-links">
                            <a href="index.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Home</a>
                            <a href="portfolio.html" class="nav-link ${currentPage === 'portfolio' ? 'active' : ''}">Portfolio</a>
                            <a href="about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">About</a>
                            <a href="pricing.html" class="nav-link ${currentPage === 'pricing' ? 'active' : ''}">Pricing</a>
                            <a href="faq.html" class="nav-link ${currentPage === 'faq' ? 'active' : ''}">FAQ</a>
                            <a href="index.html#contact" class="nav-link ${currentPage === 'contact' ? 'active' : ''}">Contact</a>
                        </div>
                        <div class="nav-login-wrapper">
                            <a href="portal/login.html" class="nav-login">Login</a>
                        </div>
                    </div>
                </div>
            </nav>
            
            <!-- Download App Button (Mobile Only) -->
            <button class="download-app-btn" id="downloadAppBtn" onclick="installPWA()">Get App</button>
        `;
    }
}

// ========== SITE FOOTER ==========
class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-brand-col">
                            <div class="footer-logo">
                                <img src="assets/icons/icon-192x192.png" alt="Storybook Weddings" class="footer-logo-img">
                                <span>Storybook Weddings</span>
                            </div>
                            <p class="footer-tagline">Capturing your love story</p>
                            <div class="footer-powered">
                                <span>Powered by</span>
                                <a href="https://tempero.nz" target="_blank">Tempero Creative</a>
                            </div>
                        </div>
                        <div class="footer-links-col">
                            <h4 class="footer-col-title">Explore</h4>
                            <a href="index.html">Home</a>
                            <a href="portfolio.html">Portfolio</a>
                            <a href="about.html">About</a>
                        </div>
                        <div class="footer-links-col">
                            <h4 class="footer-col-title">Info</h4>
                            <a href="pricing.html">Pricing</a>
                            <a href="faq.html">FAQ</a>
                            <a href="index.html#contact">Contact</a>
                        </div>
                        <div class="footer-links-col">
                            <h4 class="footer-col-title">Resources</h4>
                            <a href="portal/login.html">Client Portal</a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p class="footer-copyright">© 2025 Storybook Weddings. All rights reserved.</p>
                        <div class="footer-legal">
                            <a href="privacy.html">Privacy Policy</a>
                            <a href="terms.html">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// ========== MOBILE BOTTOM NAV ==========
class MobileNav extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const currentPage = this.getAttribute('current') || '';
        
        this.innerHTML = `
            <nav class="mobile-bottom-nav">
                <div class="mobile-bottom-nav-inner">
                    <a href="portfolio.html" class="bottom-nav-item ${currentPage === 'portfolio' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="7" height="7" rx="1"/>
                            <rect x="14" y="3" width="7" height="7" rx="1"/>
                            <rect x="3" y="14" width="7" height="7" rx="1"/>
                            <rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                        <span>Work</span>
                    </a>
                    <a href="about.html" class="bottom-nav-item ${currentPage === 'about' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            <circle cx="12" cy="10" r="3"/>
                            <path d="M6.5 19.5c1.5-2.5 3.5-3.5 5.5-3.5s4 1 5.5 3.5"/>
                        </svg>
                        <span>About</span>
                    </a>
                    <a href="pricing.html" class="bottom-nav-item ${currentPage === 'pricing' ? 'active' : ''}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="4" y="2" width="16" height="20" rx="2"/>
                            <path d="M8 6h8M8 10h8M8 14h3M8 18h3M14 14h2M14 18h2"/>
                        </svg>
                        <span>Quote</span>
                    </a>
                    <a href="index.html#contact" class="bottom-nav-item contact-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"/>
                            <path d="M3 7l9 6 9-6"/>
                        </svg>
                        <span>Contact</span>
                    </a>
                </div>
            </nav>
        `;
    }
}

// ========== VIDEO MODAL ==========
class VideoModal extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div class="video-modal" id="videoModal">
                <button class="video-modal-close" id="videoModalClose">&times;</button>
                <div class="video-modal-content">
                    <iframe id="videoFrame" src="" allowfullscreen allow="autoplay"></iframe>
                </div>
            </div>
        `;
    }
}

// ========== TESTIMONIALS SECTION ==========
class TestimonialsSection extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = `
            <section class="section testimonial-section" id="testimonials">
                <div class="container">
                    <div class="testimonial-header fade-in">
                        <h2 class="heading-section">What Couples Say</h2>
                    </div>
                    <div class="testimonial-carousel">
                        <div class="testimonial-track" id="testimonialTrack">
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/mattbritt.png" alt="Brittany & Matt"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"Joel and Rachel are the most amazing videographers we could have ever asked for. The whole process was made simple and easy and they tailored the end result to our exact wishes. We ended up with a video that captured our day perfectly."</p>
                                <p class="testimonial-author">— Brittany & Matt</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/kellyrick.png" alt="Kelly & Rick"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"The video is absolutely INCREDIBLE! I cried so much, it is exactly what I wanted!!"</p>
                                <p class="testimonial-author">— Kelly & Rick</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/brookemark.png" alt="Brooke & Mark"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"Joel was the videographer for our wedding and provided exceptional service! He went above and beyond to make the day relaxed and fun! We are so happy with how the videos turned out as he captured our day perfectly."</p>
                                <p class="testimonial-author">— Brooke & Mark</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/leahgreg.png" alt="Leah & Greg"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"Phenomenal. Personable. Skilled. These are 3 words I'll use to describe our amazing editor, Joel! He took our whole day and made it into a crafted masterpiece that we'll cherish forever."</p>
                                <p class="testimonial-author">— Leah & Greg</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/jameslou.png" alt="Lou & James"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"We are so in love with our wedding videography, the most beautiful way to relive the day. Joel and the team managed to beautifully capture the whole feeling and emotions of the day without us even noticing their presence."</p>
                                <p class="testimonial-author">— Lou & James</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/stevenbuzzy.png" alt="Steven & Buzzy"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"Very easy to have at the wedding, felt like having a friend there. Very impressed by the quality of the short and long films we received. Definitely recommend!"</p>
                                <p class="testimonial-author">— Steven & Buzzy</p>
                            </div>
                            <div class="testimonial-slide">
                                <div class="testimonial-image"><img src="assets/images/joshgloria.png" alt="Josh & Gloria"></div>
                                <div class="testimonial-stars">★★★★★</div>
                                <p class="testimonial-quote">"A big thank you to Storybook NZ for their videography services and free wedding website! We're so stoked."</p>
                                <p class="testimonial-author">— Josh & Gloria</p>
                            </div>
                        </div>
                        <div class="testimonial-nav" id="testimonialNav"></div>
                    </div>
                </div>
            </section>
        `;
    }
}

// Register all custom elements
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
customElements.define('mobile-nav', MobileNav);
customElements.define('video-modal', VideoModal);
customElements.define('testimonials-section', TestimonialsSection);
