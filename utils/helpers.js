// Doña Isabela - Funciones Utilitarias
// Funciones helper reutilizables para toda la aplicación

// Formateo de precios en formato colombiano
export function formatPrice(amount) {
    return '$' + amount.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace('.', ',');
}

// Multiplicadores para cálculo de precios
export function getPersonasMultiplier(numPersonas) {
    const multipliers = {
        '4-6': 1,
        '8-10': 1.5,
        '12-15': 2,
        '16-20': 2.5,
        '20-25': 3,
        '25-30': 3.5,
        '30+': 4
    };
    return multipliers[numPersonas] || 1;
}

export function getPesoMultiplier(pesoLibras) {
    const peso = parseFloat(pesoLibras);
    if (peso <= 2) return 1;
    if (peso <= 3) return 1.3;
    if (peso <= 4) return 1.6;
    if (peso <= 5) return 2;
    return 2.5;
}

// Validaciones
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone) {
    const phoneRegex = /^(\+57|57)?[\s-]?[3][0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
}

// Sistema de notificaciones
export function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Mostrar
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar y remover
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Utilidades de navegación y scroll
export function smoothScrollTo(top = 0) {
    window.scrollTo({ 
        top: top, 
        behavior: 'smooth' 
    });
}

export function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('show');
}

// Utilidades de fecha
export function setMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('required-date');
    if (dateInput) {
        dateInput.min = minDate;
    }
}

export function getCurrentGreeting() {
    const currentHour = new Date().getHours();
    return currentHour < 12 ? '¡Buenos días!' : currentHour < 18 ? '¡Buenas tardes!' : '¡Buenas noches!';
}

// Utilidades de DOM
export function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

// Utilidades de datos
export function findById(array, id) {
    return array.find(item => item.id === id || item.id === parseInt(id));
}

export function filterByCategory(array, category) {
    return category === 'Todos' ? array : array.filter(item => item.categoria === category);
}

// Utilidades de localStorage
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Error guardando en localStorage:', error);
    }
}

export function getLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn('Error leyendo localStorage:', error);
        return defaultValue;
    }
}

// Utilidades de animaciones
export function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Utilidades de debugging
export function logDebug(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`🎂 ${message}`, data || '');
    }
}

export function logError(message, error = null) {
    console.error(`🎂 ERROR: ${message}`, error || '');
}

// Utilidades de eventos
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utilidades de generación de HTML
export function createHTML(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key.startsWith('data-')) {
            element.setAttribute(key, attributes[key]);
        } else {
            element[key] = attributes[key];
        }
    });
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

// Utilidades de carga de imágenes
export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Error cargando imagen: ${src}`));
        img.src = src;
    });
}