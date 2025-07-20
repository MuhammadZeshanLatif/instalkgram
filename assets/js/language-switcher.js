// Multilingual Support JavaScript
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'pt': 'Português',
            'it': 'Italiano',
            'nl': 'Nederlands',
            'ja': '日本語',
            'ar': 'العربية',
            'ru': 'Русский',
            'tr': 'Türkçe',
            'id': 'Bahasa Indonesia'
        };
        this.init();
    }

    init() {
        this.detectBrowserLanguage();
        this.createLanguageDropdown();
        this.loadTranslations();
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        
        if (this.supportedLanguages[langCode]) {
            this.currentLanguage = langCode;
        }
        
        // Check for saved language preference
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages[savedLang]) {
            this.currentLanguage = savedLang;
        }
    }

    createLanguageDropdown() {
        const navbar = document.querySelector('.navbar-nav');
        if (!navbar) return;

        const languageDropdown = document.createElement('li');
        languageDropdown.className = 'nav-item dropdown';
        languageDropdown.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-globe me-1"></i>
                <span id="currentLanguageName">${this.supportedLanguages[this.currentLanguage]}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                ${Object.entries(this.supportedLanguages).map(([code, name]) => 
                    `<li><a class="dropdown-item ${code === this.currentLanguage ? 'active' : ''}" href="#" data-lang="${code}">${name}</a></li>`
                ).join('')}
            </ul>
        `;

        // Insert before the theme toggle
        const themeToggle = navbar.querySelector('.theme-toggle').parentElement;
        navbar.insertBefore(languageDropdown, themeToggle);

        // Add event listeners
        const dropdownItems = languageDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const langCode = e.target.getAttribute('data-lang');
                this.changeLanguage(langCode);
            });
        });
    }

    async loadTranslations() {
        try {
            const response = await fetch(`lang/${this.currentLanguage}.json`);
            if (response.ok) {
                this.translations = await response.json();
                this.applyTranslations();
            }
        } catch (error) {
            console.warn(`Failed to load translations for ${this.currentLanguage}:`, error);
        }
    }

    applyTranslations() {
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;

        // Apply translations to elements with data-i18n attribute
        const translatableElements = document.querySelectorAll('[data-i18n]');
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = this.translations[key];
                } else {
                    element.textContent = this.translations[key];
                }
            }
        });

        // Update meta description if translation exists
        if (this.translations.meta_description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', this.translations.meta_description);
            }
        }

        // Update title if translation exists
        if (this.translations.page_title) {
            document.title = this.translations.page_title;
        }
    }

    changeLanguage(langCode) {
        if (!this.supportedLanguages[langCode]) return;

        this.currentLanguage = langCode;
        localStorage.setItem('preferred-language', langCode);

        // Update dropdown display
        const currentLanguageName = document.getElementById('currentLanguageName');
        if (currentLanguageName) {
            currentLanguageName.textContent = this.supportedLanguages[langCode];
        }

        // Update active state in dropdown
        const dropdownItems = document.querySelectorAll('#languageDropdown + .dropdown-menu .dropdown-item');
        dropdownItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-lang') === langCode) {
                item.classList.add('active');
            }
        });

        // Load and apply new translations
        this.loadTranslations();
    }

    // Method to get translation by key
    t(key) {
        return this.translations[key] || key;
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.languageSwitcher = new LanguageSwitcher();
});

