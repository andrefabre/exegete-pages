class ThemeToggle {
    constructor() {
        this.themeKey = 'preferred-theme';
        this.button = document.getElementById('themeToggle');
        if (!this.button) {
            return;
        }

        this.applyInitialTheme();
        this.button.addEventListener('click', () => this.toggleTheme());
        this.updateToggleIcon();
    }

    applyInitialTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'cyber-theme' : 'light-theme');
        this.setTheme(theme, false);
    }

    setTheme(theme, persist = true) {
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');

        document.body.classList.remove('light-theme', 'cyber-theme');
        document.body.classList.add(theme);

        if (nav) {
            nav.classList.remove('light-nav', 'cyber-nav');
            nav.classList.add(theme === 'light-theme' ? 'light-nav' : 'cyber-nav');
        }

        if (main) {
            main.classList.remove('light-main', 'cyber-main');
            main.classList.add(theme === 'light-theme' ? 'light-main' : 'cyber-main');

            const sectionClassPairs = [
                ['light-hero', 'cyber-hero'],
                ['light-beyond-software', 'cyber-beyond-software'],
                ['light-services', 'cyber-services'],
                ['light-partner', 'cyber-partner']
            ];

            sectionClassPairs.forEach(([lightClass, cyberClass]) => {
                const section = main.querySelector(`.${lightClass}, .${cyberClass}`);
                if (section) {
                    section.classList.remove(lightClass, cyberClass);
                    section.classList.add(theme === 'light-theme' ? lightClass : cyberClass);
                }
            });
        }

        if (footer) {
            footer.classList.remove('light-footer', 'cyber-footer');
            footer.classList.add(theme === 'light-theme' ? 'light-footer' : 'cyber-footer');
        }

        if (persist) {
            localStorage.setItem(this.themeKey, theme);
        }

        this.updateToggleIcon();
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('cyber-theme') ? 'cyber-theme' : 'light-theme';
        this.setTheme(currentTheme === 'light-theme' ? 'cyber-theme' : 'light-theme');
    }

    updateToggleIcon() {
        const sunIcon = this.button.querySelector('.sun-icon');
        const moonIcon = this.button.querySelector('.moon-icon');
        const isLight = document.body.classList.contains('light-theme');

        if (sunIcon && moonIcon) {
            sunIcon.style.display = isLight ? 'none' : 'block';
            moonIcon.style.display = isLight ? 'block' : 'none';
        }

        this.button.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});
