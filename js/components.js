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
                            <a href="contact.html" class="nav-link ${currentPage === 'contact' ? 'active' : ''}">Contact</a>
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
                    <div class="footer-nav">
                        <a href="index.html">Home</a>
                        <a href="portfolio.html">Portfolio</a>
                        <a href="about.html">About</a>
                        <a href="pricing.html">Pricing</a>
                        <a href="faq.html">FAQ</a>
                        <a href="contact.html">Contact</a>
                        <a href="portal/login.html">Client Portal</a>
                    </div>
                    <div class="footer-content">
                        <div class="footer-brand">Storybook Weddings</div>
                        <div class="footer-socials">
                            <a href="https://www.facebook.com/storybook.nz" class="social-link" target="_blank" rel="noopener" aria-label="Facebook">
                                <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/storybook.nz/" class="social-link" target="_blank" rel="noopener" aria-label="Instagram">
                                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                            <a href="https://www.youtube.com/@storybookweddingsnz" class="social-link" target="_blank" rel="noopener" aria-label="YouTube">
                                <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p class="footer-copyright">© Storybook NZ 2025. All rights reserved.</p>
                        <p class="footer-powered">Powered by <a href="https://tempero.nz" target="_blank">tempero.nz</a></p>
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
                    <a href="contact.html" class="bottom-nav-item contact-btn">
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
