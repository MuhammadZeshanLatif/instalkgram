// Instagram-style Hero Mockup JavaScript
class HeroMockup {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.slideInterval = null;
        this.init();
    }

    init() {
        this.createMockup();
        this.startClock();
        this.startCarousel();
    }

    createMockup() {
        const heroImageDiv = document.querySelector('.hero-image');
        if (!heroImageDiv) return;

        heroImageDiv.innerHTML = `
            <div class="hero-mockup-container">
                <!-- Floating Icons -->
                <div class="floating-icon"><i class="fas fa-heart"></i></div>
                <div class="floating-icon"><i class="fas fa-star"></i></div>
                <div class="floating-icon"><i class="fas fa-check-circle"></i></div>
                <div class="floating-icon"><i class="fas fa-thumbs-up"></i></div>
                <div class="floating-icon"><i class="fas fa-sparkles"></i></div>
                <div class="floating-icon"><i class="fas fa-camera"></i></div>

                <!-- Phone Mockup -->
                <div class="phone-mockup">
                    <div class="phone-screen">
                        <!-- Phone Header -->
                        <div class="phone-header">
                            <div>
                                <div class="phone-time" id="phoneTime">06:37:37 PM</div>
                                <div class="phone-date" id="phoneDate">18 July 2025</div>
                            </div>
                            <div class="phone-battery">
                                <div class="phone-battery-fill"></div>
                            </div>
                        </div>

                        <!-- Carousel Container -->
                        <div class="carousel-container" id="carouselContainer">
                            <div class="carousel-slide active">
                                <div class="slide-content">
                                    <div class="slide-icon"><i class="fab fa-instagram"></i></div>
                                    <div class="slide-title">View Stories</div>
                                    <div class="slide-subtitle">Watch anonymously</div>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <div class="slide-content">
                                    <div class="slide-icon"><i class="fas fa-download"></i></div>
                                    <div class="slide-title">Download Content</div>
                                    <div class="slide-subtitle">Save in HD quality</div>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <div class="slide-content">
                                    <div class="slide-icon"><i class="fas fa-user-secret"></i></div>
                                    <div class="slide-title">Stay Anonymous</div>
                                    <div class="slide-subtitle">100% private browsing</div>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <div class="slide-content">
                                    <div class="slide-icon"><i class="fas fa-mobile-alt"></i></div>
                                    <div class="slide-title">All Devices</div>
                                    <div class="slide-subtitle">Works everywhere</div>
                                </div>
                            </div>
                            <div class="carousel-slide">
                                <div class="slide-content">
                                    <div class="slide-icon"><i class="fas fa-bolt"></i></div>
                                    <div class="slide-title">Super Fast</div>
                                    <div class="slide-subtitle">Instant results</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.slides = document.querySelectorAll('.carousel-slide');
    }

    updateClock() {
        const now = new Date();
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const dateOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        const timeElement = document.getElementById('phoneTime');
        const dateElement = document.getElementById('phoneDate');

        if (timeElement && dateElement) {
            timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
            dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
        }
    }

    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    nextSlide() {
        if (this.slides.length === 0) return;

        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    startCarousel() {
        this.slideInterval = setInterval(() => this.nextSlide(), 3000);
    }

    stopCarousel() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    destroy() {
        this.stopCarousel();
    }
}

// Initialize the hero mockup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the homepage and the hero section exists
    if (document.querySelector('.hero-section') && document.querySelector('.hero-image')) {
        window.heroMockup = new HeroMockup();
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    if (window.heroMockup) {
        window.heroMockup.destroy();
    }
});

