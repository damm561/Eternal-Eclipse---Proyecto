// Doña Isabela - Módulo de Modo Oscuro
import { showNotification, getLocalStorage, setLocalStorage } from '../utils/helpers.js';

export class DarkModeManager {
    constructor() {
        this.darkMode = false;
        this.init();
    }

    init() {
        this.initializeDarkMode();
        this.setupEventListeners();
        this.updateDarkModeIcons();
    }

    initializeDarkMode() {
        const savedDarkMode = getLocalStorage('darkMode', null);
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedDarkMode === true) {
            this.darkMode = true;
            document.documentElement.classList.add('dark');
        } else if (savedDarkMode === false) {
            this.darkMode = false;
            document.documentElement.classList.remove('dark');
        } else {
            this.darkMode = prefersDarkMode;
            if (prefersDarkMode) {
                document.documentElement.classList.add('dark');
            }
        }
        
        console.log(`🌙 Modo oscuro inicializado: ${this.darkMode ? 'activado' : 'desactivado'}`);
    }

    updateDarkModeIcons() {
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');
        
        if (this.darkMode) {
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        } else {
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
            moonIcons.forEach(icon => icon.classList.add('hidden'));
        }
    }

    toggle() {
        this.darkMode = !this.darkMode;
        
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
            setLocalStorage('darkMode', true);
        } else {
            document.documentElement.classList.remove('dark');
            setLocalStorage('darkMode', false);
        }
        
        this.updateDarkModeIcons();
        showNotification(`Modo ${this.darkMode ? 'oscuro' : 'claro'} activado`, 'info');
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('darkModeChanged', { 
            detail: { darkMode: this.darkMode } 
        }));
        
        return this;
    }

    setupEventListeners() {
        // Desktop dark mode toggle
        const darkToggle = document.getElementById('dark-mode-toggle');
        if (darkToggle) {
            darkToggle.addEventListener('click', () => this.toggle());
        }

        // Mobile dark mode toggle  
        const mobileDarkToggle = document.getElementById('mobile-dark-toggle');
        if (mobileDarkToggle) {
            mobileDarkToggle.addEventListener('click', () => this.toggle());
        }

        // System dark mode preference change
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const savedPreference = getLocalStorage('darkMode', null);
                if (savedPreference === null) {
                    this.darkMode = e.matches;
                    document.documentElement.classList.toggle('dark', e.matches);
                    this.updateDarkModeIcons();
                    console.log('🌙 Modo oscuro cambiado por preferencia del sistema');
                }
            });
        }
    }

    // Getters
    isDarkMode() {
        return this.darkMode;
    }

    // Métodos para integración externa
    setDarkMode(enabled, save = true) {
        this.darkMode = enabled;
        document.documentElement.classList.toggle('dark', enabled);
        
        if (save) {
            setLocalStorage('darkMode', enabled);
        }
        
        this.updateDarkModeIcons();
        return this;
    }
}

// Instancia global del gestor de modo oscuro
export const darkModeManager = new DarkModeManager();

// Función global para compatibilidad
window.toggleDarkMode = () => darkModeManager.toggle();