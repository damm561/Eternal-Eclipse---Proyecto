// Doña Isabela - Módulo de Navegación
import { smoothScrollTo, closeMobileMenu, showNotification } from '../utils/helpers.js';

export class NavigationManager {
    constructor() {
        this.currentPage = 'inicio';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateNavigation();
    }

    setupEventListeners() {
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('show');
            });
        }

        // Close mobile menu on resize
        window.addEventListener('resize', closeMobileMenu);

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !e.target.closest('.nav-mobile') && !e.target.closest('#mobile-menu')) {
                closeMobileMenu();
            }
        });
    }

    navigateTo(page) {
        console.log(`🧭 Navegando a: ${page}`);
        this.currentPage = page;
        this.showPage(page);
        this.updateNavigation();
        smoothScrollTo();
        closeMobileMenu();
        
        // Evento personalizado para notificar cambio de página
        window.dispatchEvent(new CustomEvent('pageChanged', { 
            detail: { page } 
        }));
        
        return this;
    }

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(`page-${page}`);
        if (targetPage) {
            targetPage.classList.add('active');
        } else {
            console.warn(`Página no encontrada: page-${page}`);
        }
    }

    updateNavigation() {
        document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page === this.currentPage) {
                btn.classList.add('active');
            }
        });
    }

    getCurrentPage() {
        return this.currentPage;
    }

    // Método para integración con sistemas externos
    setPage(page, silent = false) {
        this.currentPage = page;
        if (!silent) {
            this.showPage(page);
            this.updateNavigation();
        }
        return this;
    }
}

// Instancia global del navegador
export const navigationManager = new NavigationManager();

// Función global para compatibilidad con HTML onclick
window.navigateTo = (page) => navigationManager.navigateTo(page);