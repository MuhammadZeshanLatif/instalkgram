// Hero Section Influencer Carousel
class HeroInfluencerCarousel {
    constructor() {
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.influencers = [
            {
                name: "Sarah Johnson",
                handle: "@sarahliving",
                bio: "Lifestyle blogger sharing daily inspiration",
                image: "influencers/sarah-lifestyle.jpg",
                platform: "instagram",
                followers: "125K",
                profileUrl: "https://instagram.com/sarahliving"
            },
            {
                name: "Alex Chen",
                handle: "@techwithalex",
                bio: "Tech reviewer and developer",
                image: "influencers/alex-tech.jpg",
                platform: "youtube",
                followers: "156K",
                profileUrl: "https://youtube.com/@techwithalex"
            },
            {
                name: "Emma Rodriguez",
                handle: "@emmastyle",
                bio: "Fashion enthusiast and stylist",
                image: "influencers/emma-fashion.jpg",
                platform: "instagram",
                followers: "89K",
                profileUrl: "https://instagram.com/emmastyle"
            },
            {
                name: "Mike Thompson",
                handle: "@mikefitness",
                bio: "Certified personal trainer",
                image: "influencers/mike-fitness.jpg",
                platform: "tiktok",
                followers: "203K",
                profileUrl: "https://tiktok.com/@mikefitness"
            },
            {
                name: "Luna Martinez",
                handle: "@lunatravels",
                bio: "Travel photographer worldwide",
                image: "influencers/luna-travel.jpg",
                platform: "instagram",
                followers: "178K",
                profileUrl: "https://instagram.com/lunatravels"
            },
            {
                name: "Chef David Kim",
                handle: "@chefdavid",
                bio: "Professional chef and culinary artist",
                image: "influencers/david-chef.jpg",
                platform: "youtube",
                followers: "142K",
                profileUrl: "https://youtube.com/@chefdavid"
            }
        ];
        this.init();
    }

    init() {
        this.createCarouselHTML();
        this.startAutoplay();
    }

    createCarouselHTML() {
        const phoneContent = document.querySelector('.phone-content');
        if (!phoneContent) return;

        const carouselHTML = `
            <div class="influencer-carousel">
                <div class="influencer-slide active">
                    <div class="influencer-profile">
                        <div class="profile-image">
                            <img src="${this.influencers[0].image}" alt="${this.influencers[0].name}" loading="lazy">
                        </div>
                        <div class="profile-info">
                            <h3 class="profile-name">${this.influencers[0].name}</h3>
                            <p class="profile-handle">${this.influencers[0].handle}</p>
                            <p class="profile-bio">${this.influencers[0].bio}</p>
                            <div class="profile-stats">
                                <span class="followers">${this.influencers[0].followers} followers</span>
                                <i class="fab fa-${this.influencers[0].platform} platform-icon"></i>
                            </div>
                            <a href="${this.influencers[0].profileUrl}" target="_blank" class="follow-btn">
                                <i class="fas fa-plus"></i> Follow
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        phoneContent.innerHTML = carouselHTML;
    }

    updateSlide() {
        const slide = document.querySelector('.influencer-slide');
        if (!slide) return;

        const influencer = this.influencers[this.currentSlide];
        
        // Add fade out effect
        slide.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            slide.querySelector('.profile-image img').src = influencer.image;
            slide.querySelector('.profile-image img').alt = influencer.name;
            slide.querySelector('.profile-name').textContent = influencer.name;
            slide.querySelector('.profile-handle').textContent = influencer.handle;
            slide.querySelector('.profile-bio').textContent = influencer.bio;
            slide.querySelector('.followers').textContent = `${influencer.followers} followers`;
            slide.querySelector('.platform-icon').className = `fab fa-${influencer.platform} platform-icon`;
            slide.querySelector('.follow-btn').href = influencer.profileUrl;
            
            // Fade in
            slide.style.opacity = '1';
        }, 300);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.influencers.length;
        this.updateSlide();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // Change slide every 3 seconds
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroInfluencerCarousel();
});

