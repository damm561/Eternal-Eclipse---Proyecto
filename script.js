// Doña Isabela - JavaScript Principal
// Aplicación completa de pastelería con funcionalidad HTML/CSS/JS puro

// ====== DATOS Y CONFIGURACIÓN ======
const PASTELES_DATA = {
    pasteles: [
        {
            id: 1,
            nombre: "Pastel de Chocolate Supremo",
            precio: 30,
            imagen: "assets/imagen1.jpg",
            ingredientes: ["Chocolate belga", "Crema de mantequilla", "Fresas frescas", "Almendras"],
            categoria: "Chocolate"
        },
        {
            id: 2,
            nombre: "Torta Red Velvet Clásica",
            precio: 25,
            imagen: "assets/imagen2.avif",
            ingredientes: ["Masa red velvet", "Queso crema", "Vainilla", "Decoración vintage"],
            categoria: "Especial"
        },
        {
            id: 3,
            nombre: "Cheesecake de Frutos Rojos",
            precio: 20,
            imagen: "assets/imagen3.jpg",
            ingredientes: ["Queso philadelphia", "Frutos rojos", "Base de galleta", "Coulis de frutas"],
            categoria: "Cheesecake"
        },
        {
            id: 4,
            nombre: "Tres Leches Tradicional",
            precio: 25,
            imagen: "assets/imagen4.avif",
            ingredientes: ["Bizcocho esponjoso", "Tres leches", "Crema chantilly", "Canela"],
            categoria: "Tradicional"
        },
        {
            id: 5,
            nombre: "Pastel de Zanahoria Gourmet",
            precio: 20,
            imagen: "assets/imagen5.jpg",
            ingredientes: ["Zanahoria fresca", "Nueces", "Queso crema", "Especias"],
            categoria: "Saludable"
        },
        {
            id: 6,
            nombre: "Torta de Limón Merengue",
            precio: 22,
            imagen: "assets/imagen6.avif",
            ingredientes: ["Crema de limón", "Merengue tostado", "Base crocante", "Ralladura de limón"],
            categoria: "Cítrico"
        },
        {
            id: 7,
            nombre: "Chocolate Fondant Intenso",
            precio: 25,
            imagen: "assets/imagen7.jpg",
            ingredientes: ["Chocolate negro 70%", "Mantequilla europea", "Fondant líquido", "Frambuesas"],
            categoria: "Chocolate"
        },
        {
            id: 8,
            nombre: "Pastel de Fresa Silvestre",
            precio: 20,
            imagen: "assets/imagen8.jpeg",
            ingredientes: ["Fresas orgánicas", "Crema de vainilla", "Bizcocho de almendra", "Mermelada casera"],
            categoria: "Frutal"
        },
        {
            id: 9,
            nombre: "Cheesecake de Maracuyá",
            precio: 20,
            imagen: "assets/imagen9.avif",
            ingredientes: ["Queso crema", "Pulpa de maracuyá", "Base de galleta maría", "Coulis tropical"],
            categoria: "Cheesecake"
        },
        {
            id: 10,
            nombre: "Tiramisú Clásico Italiano",
            precio: 20,
            imagen: "assets/imagen10.jpg",
            ingredientes: ["Mascarpone", "Café espresso", "Bizcochos de soletilla", "Cacao en polvo"],
            categoria: "Gourmet"
        },
        {
            id: 11,
            nombre: "Pastel de Coco Tropical",
            precio: 20,
            imagen: "assets/imagen11.webp",
            ingredientes: ["Coco rallado", "Crema de coco", "Piña natural", "Ron blanco"],
            categoria: "Frutal"
        },
        {
            id: 12,
            nombre: "Brownie Supremo con Nueces",
            precio: 15,
            imagen: "assets/imagen12.avif",
            ingredientes: ["Chocolate semi-amargo", "Nueces pecanas", "Mantequilla", "Vainilla bourbon"],
            categoria: "Chocolate"
        }
    ],
    
    baseOptions: [
        {
            id: "chocolate",
            nombre: "Chocolate",
            precio: 25,
            imagen: "assets/imagen1.jpg",
            ingredientes: ["Masa de chocolate", "Crema de chocolate", "Decoración básica"]
        },
        {
            id: "vainilla",
            nombre: "Vainilla",
            precio: 28,
            imagen: "assets/vainilla.jpg",
            ingredientes: ["Masa de vainilla", "Crema de mantequilla", "Decoración básica"]
        },
        {
            id: "red-velvet",
            nombre: "Red Velvet",
            precio: 25,
            imagen: "assets/imagen2.avif",
            ingredientes: ["Masa red velvet", "Queso crema", "Decoración vintage"]
        },
        {
            id: "cheesecake",
            nombre: "Cheesecake",
            precio: 20,
            imagen: "assets/imagen9.avif",
            ingredientes: ["Queso philadelphia", "Base de galleta", "Frutos rojos"]
        }
    ],
    
    ingredientesCategories: {
        frutas: ["Fresas frescas", "Frambuesas", "Arándanos", "Moras", "Cerezas", "Mango", "Piña", "Kiwi",],
        chocolates: ["Chocolate blanco", "Chocolate con leche", "Chocolate negro 70%", "Nutella", "Chips de chocolate", "Dulce de leche"],
        frutos: ["Almendras", "Nueces", "Avellanas", "Pistachos", "Coco rallado"],
        cremas: ["Crema chantilly", "Crema de mantequilla", "Queso crema", "Mascarpone"],
        decoraciones: ["Fondant", "Flores comestibles", "Perlas de azúcar", "Sprinkles"]
    },
    
    categories: ['Todos', 'Chocolate', 'Especial', 'Cheesecake', 'Tradicional', 'Saludable', 'Cítrico', 'Frutal', 'Gourmet'],
    INGREDIENT_PRICE: 2.5
};

// ====== ESTADO GLOBAL ======
let appState = {
    currentPage: 'inicio',
    darkMode: false,
    customizer: {
        currentStep: 1,
        selectedCake: null,
        removedIngredients: [],
        addedIngredients: [],
        customMessage: '',
        customerName: '',
        customerWhatsapp: '',
        selectedBox: 'basica',
        numPersonas: '4-6',
        pesoLibras: '1'
    },
    participated: false
};

// ====== FUNCIONES UTILITARIAS ======
function formatPrice(amount) {
    return '$' + amount.toLocaleString('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace('.', ',');
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ====== INICIALIZACIÓN ======
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎂 Doña Isabela - Iniciando aplicación...');
    initializeDarkMode();
    initializeApp();
    loadGallery();
    loadCustomizer();
    setupEventListeners();
    setupAnimations();
    console.log('🎂 Aplicación iniciada correctamente');
});

function initializeDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode === 'true') {
        appState.darkMode = true;
        document.documentElement.classList.add('dark');
    } else if (savedDarkMode === 'false') {
        appState.darkMode = false;
        document.documentElement.classList.remove('dark');
    } else {
        appState.darkMode = prefersDarkMode;
        if (prefersDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }
    
    updateDarkModeIcons();
}

function updateDarkModeIcons() {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    if (appState.darkMode) {
        sunIcons.forEach(icon => icon.classList.add('hidden'));
        moonIcons.forEach(icon => icon.classList.remove('hidden'));
    } else {
        sunIcons.forEach(icon => icon.classList.remove('hidden'));
        moonIcons.forEach(icon => icon.classList.add('hidden'));
    }
}

function initializeApp() {
    updateNavigation();
    showPage(appState.currentPage);
    loadDynamicContent();
}

function loadDynamicContent() {
    const currentHour = new Date().getHours();
    const greeting = currentHour < 12 ? '¡Buenos días!' : currentHour < 18 ? '¡Buenas tardes!' : '¡Buenas noches!';
    
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// ====== NAVEGACIÓN ======
function navigateTo(page) {
    console.log(`Navegando a: ${page}`);
    appState.currentPage = page;
    showPage(page);
    updateNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMobileMenu();
    loadPageContent(page);
}

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) targetPage.classList.add('active');
}

function updateNavigation() {
    document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === appState.currentPage) {
            btn.classList.add('active');
        }
    });
}

function loadPageContent(page) {
    switch (page) {
        case 'galeria':
            loadGallery();
            break;
        case 'personaliza':
            loadCustomizer();
            resetCustomizer();
            break;
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.remove('show');
}

// ====== MODO OSCURO ======
function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    
    if (appState.darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
    
    updateDarkModeIcons();
    showNotification(`Modo ${appState.darkMode ? 'oscuro' : 'claro'} activado`, 'info');
}

// ====== GALERÍA ======
function loadGallery() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    renderProducts(PASTELES_DATA.pasteles);
}

function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(pastel => `
        <div class="product-card animate-on-scroll">
            <div style="position: relative;">
                <img src="${pastel.imagen}" alt="${pastel.nombre}" style="width: 100%; height: 12rem; object-fit: cover;" loading="lazy">
                <div class="product-category">${pastel.categoria}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${pastel.nombre}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <span class="product-price">${formatPrice(pastel.precio)}</span>
                </div>
                <div class="product-ingredients">
                    ${pastel.ingredientes.slice(0, 3).map(ing => `
                        <span class="ingredient-tag">${ing}</span>
                    `).join('')}
                    ${pastel.ingredientes.length > 3 ? `<span style="font-size: 0.75rem; color: var(--text-muted);">+${pastel.ingredientes.length - 3} más</span>` : ''}
                </div>
                <button onclick="selectCakeAndNavigate('${pastel.id}')" class="btn btn-primary" style="width: 100%; font-size: 0.875rem;">
                    Personalizar este pastel
                </button>
            </div>
        </div>
    `).join('');

    setupAnimations();
}

function selectCakeAndNavigate(cakeId) {
    const selectedCake = PASTELES_DATA.pasteles.find(p => p.id === parseInt(cakeId));
    if (selectedCake) {
        const baseOption = {
            id: `gallery-${cakeId}`,
            nombre: selectedCake.nombre,
            precio: selectedCake.precio,
            imagen: selectedCake.imagen,
            ingredientes: selectedCake.ingredientes
        };
        
        if (!PASTELES_DATA.baseOptions.find(opt => opt.id === baseOption.id)) {
            PASTELES_DATA.baseOptions.push(baseOption);
        }
        
        appState.customizer.selectedCake = baseOption.id;
        showNotification(`${selectedCake.nombre} seleccionado para personalización`, 'success');
    }
    
    navigateTo('personaliza');
}

function filterCategory(category) {
    console.log(`Filtrando por categoría: ${category}`);
    
    document.querySelectorAll('.filter-badge').forEach(badge => badge.classList.remove('active'));
    event.target.classList.add('active');
    
    const filteredProducts = category === 'Todos' ? PASTELES_DATA.pasteles : PASTELES_DATA.pasteles.filter(p => p.categoria === category);
    renderProducts(filteredProducts);
    
    showNotification(`Mostrando pasteles de: ${category}`, 'info');
}

// ====== PERSONALIZACIÓN ======
function loadCustomizer() {
    renderCakeCards();
    loadIngredientsStep();
    updateStepContent();
    updateOrderSummary();
}

function resetCustomizer() {
    appState.customizer.currentStep = 1;
    appState.customizer.selectedCake = null;
    appState.customizer.removedIngredients = [];
    appState.customizer.addedIngredients = [];
    appState.customizer.customMessage = '';
    appState.customizer.customerName = '';
    appState.customizer.customerWhatsapp = '';
    appState.customizer.selectedBox = 'basica';
    updateStepContent();
    updateOrderSummary();
}

function renderCakeCards() {
    const container = document.getElementById('cake-cards');
    if (!container) return;
    
    container.innerHTML = PASTELES_DATA.baseOptions.map(cake => `
        <div class="cake-card ${appState.customizer.selectedCake === cake.id ? 'selected' : ''}" 
             onclick="selectBaseCake('${cake.id}')">
            <img src="${cake.imagen}" alt="${cake.nombre}" style="width: 100%; height: 12rem; object-fit: cover;" loading="lazy">
            <div class="cake-card-info">
                <h4 class="cake-card-name">${cake.nombre}</h4>
                <div class="cake-card-price">${formatPrice(cake.precio)}</div>
            </div>
            <div class="cake-check ${appState.customizer.selectedCake === cake.id ? '' : 'hidden'}">✓</div>
        </div>
    `).join('');
}

function selectBaseCake(cakeId) {
    console.log(`Pastel base seleccionado: ${cakeId}`);
    appState.customizer.selectedCake = cakeId;
    renderCakeCards();
    loadIngredientsStep();
    updateOrderSummary();
    
    const selectedCake = PASTELES_DATA.baseOptions.find(cake => cake.id === cakeId);
    if (selectedCake) {
        showNotification(`${selectedCake.nombre} seleccionado como base`, 'success');
    }
}

function loadIngredientsStep() {
    if (!appState.customizer.selectedCake) return;
    
    const selectedCakeData = PASTELES_DATA.baseOptions.find(cake => cake.id === appState.customizer.selectedCake);
    if (!selectedCakeData) return;
    
    // Ingredientes para remover
    const removeContainer = document.getElementById('remove-ingredients');
    if (removeContainer) {
        removeContainer.innerHTML = selectedCakeData.ingredientes.map(ingredient => `
            <div class="ingredient-item">
                <input type="checkbox" 
                       id="remove-${ingredient.replace(/\s+/g, '-')}" 
                       class="custom-checkbox"
                       ${appState.customizer.removedIngredients.includes(ingredient) ? 'checked' : ''}
                       onchange="toggleRemovedIngredient('${ingredient}')">
                <label for="remove-${ingredient.replace(/\s+/g, '-')}">${ingredient}</label>
            </div>
        `).join('');
    }
    
    // Ingredientes por categorías
    Object.keys(PASTELES_DATA.ingredientesCategories).forEach(category => {
        const container = document.getElementById(`${category}-ingredients`);
        if (container) {
            container.innerHTML = PASTELES_DATA.ingredientesCategories[category].map(ingredient => `
                <div class="ingredient-item">
                    <input type="checkbox" 
                           id="add-${ingredient.replace(/\s+/g, '-')}" 
                           class="custom-checkbox"
                           ${appState.customizer.addedIngredients.includes(ingredient) ? 'checked' : ''}
                           onchange="toggleAddedIngredient('${ingredient}')">
                    <label for="add-${ingredient.replace(/\s+/g, '-')}">${ingredient}</label>
                    <span class="ingredient-price">+${formatPrice(PASTELES_DATA.INGREDIENT_PRICE)}</span>
                </div>
            `).join('');
        }
    });
}

function updateStepContent() {
    const step = appState.customizer.currentStep;
    
    const titles = [
        "Paso 1: Personaliza tu pastel",
        "Paso 2: Mensaje personalizado", 
        "Paso 3: Información de contacto",
        "Paso 4: Selección de tipo de caja"
    ];
    
    const descriptions = [
        "Selecciona tu base y personaliza cada detalle",
        "Añade un mensaje especial y ocasión",
        "Proporciona tus datos para coordinar el pedido",
        "Elige la presentación perfecta para tu pastel"
    ];
    
    const stepTitle = document.getElementById('step-title');
    const stepDescription = document.getElementById('step-description');
    
    if (stepTitle) stepTitle.textContent = titles[step - 1];
    if (stepDescription) stepDescription.textContent = descriptions[step - 1];
    
    // Actualizar indicadores de paso - NÚMEROS SIEMPRE VISIBLES
    document.querySelectorAll('.step-item').forEach((item, index) => {
        if (index < step) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Mostrar contenido del paso actual
    document.querySelectorAll('.step-content').forEach((content, index) => {
        if (index === step - 1) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    updateNavigationButtons();
    updateBoxSelection();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const step = appState.customizer.currentStep;
    
    if (prevBtn) {
        if (step === 1) {
            prevBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Volver a Galería
            `;
            prevBtn.onclick = () => navigateTo('galeria');
        } else {
            prevBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Anterior
            `;
            prevBtn.onclick = previousStep;
        }
    }
    
    if (nextBtn) {
        if (step === 4) {
            nextBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l-4-4m0 0l4-4m-4 4h16"/>
                </svg>
                Solicitar Cotización
            `;
            nextBtn.onclick = submitOrder;
        } else {
            nextBtn.innerHTML = `
                Siguiente
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            `;
            nextBtn.onclick = nextStep;
        }
    }
}

function updateBoxSelection() {
    if (appState.customizer.currentStep === 4) {
        document.querySelectorAll('.box-card').forEach(card => {
            const boxType = card.dataset.box;
            if (boxType === appState.customizer.selectedBox) {
                card.classList.add('selected');
                const checkmark = card.querySelector('.box-check');
                if (checkmark) checkmark.classList.remove('hidden');
            } else {
                card.classList.remove('selected');
                const checkmark = card.querySelector('.box-check');
                if (checkmark) checkmark.classList.add('hidden');
            }
        });
    }
}

function toggleRemovedIngredient(ingredient) {
    const index = appState.customizer.removedIngredients.indexOf(ingredient);
    if (index > -1) {
        appState.customizer.removedIngredients.splice(index, 1);
        showNotification(`${ingredient} será incluido`, 'info');
    } else {
        appState.customizer.removedIngredients.push(ingredient);
        showNotification(`${ingredient} será removido`, 'warning');
    }
    updateOrderSummary();
}

function toggleAddedIngredient(ingredient) {
    const index = appState.customizer.addedIngredients.indexOf(ingredient);
    if (index > -1) {
        appState.customizer.addedIngredients.splice(index, 1);
        showNotification(`${ingredient} removido de extras`, 'info');
    } else {
        appState.customizer.addedIngredients.push(ingredient);
        showNotification(`${ingredient} agregado (+${formatPrice(PASTELES_DATA.INGREDIENT_PRICE)})`, 'success');
    }
    updateOrderSummary();
}

function updateOrderSummary() {
    const summaryContainer = document.getElementById('summary-content');
    if (!summaryContainer || appState.customizer.currentStep !== 4) return;
    
    const selectedCake = PASTELES_DATA.baseOptions.find(cake => cake.id === appState.customizer.selectedCake);
    if (!selectedCake) return;
    
    let total = selectedCake.precio;
    const addedIngredientsPrice = appState.customizer.addedIngredients.length * PASTELES_DATA.INGREDIENT_PRICE;
    total += addedIngredientsPrice;
    
    let boxPrice = 0;
    let boxLabel = "Incluida";
    if (appState.customizer.selectedBox === 'premium') {
        boxPrice = 3.5;
        boxLabel = "+$3,50";
    } else if (appState.customizer.selectedBox === 'regalo') {
        boxPrice = 2.5;
        boxLabel = "+$2,50";
    }
    total += boxPrice;
    
    summaryContainer.innerHTML = `
        <div class="summary-item">
            <span>Pastel base: ${selectedCake.nombre}</span>
            <span>${formatPrice(selectedCake.precio)}</span>
        </div>
        ${appState.customizer.addedIngredients.length > 0 ? `
        <div class="summary-item">
            <span>Ingredientes adicionales (${appState.customizer.addedIngredients.length})</span>
            <span>+${formatPrice(addedIngredientsPrice)}</span>
        </div>
        ` : ''}
        <div class="summary-item">
            <span>Caja ${appState.customizer.selectedBox}</span>
            <span>${boxLabel}</span>
        </div>
        <div class="summary-item">
            <span>Total estimado</span>
            <span class="summary-total">${formatPrice(total)}</span>
        </div>
    `;
}

function nextStep() {
    if (appState.customizer.currentStep === 1) {
        if (!appState.customizer.selectedCake) {
            showNotification('Por favor selecciona un pastel base', 'warning');
            return;
        }
    }
    
    if (appState.customizer.currentStep === 2) {
        const message = document.getElementById('custom-message')?.value?.trim();
        if (!message) {
            showNotification('Por favor ingresa un mensaje para el pastel', 'warning');
            return;
        }
        appState.customizer.customMessage = message;
    }
    
    if (appState.customizer.currentStep === 3) {
        const name = document.getElementById('customer-name')?.value?.trim();
        const whatsapp = document.getElementById('customer-whatsapp')?.value?.trim();
        
        if (!name || !whatsapp) {
            showNotification('Por favor completa nombre y WhatsApp', 'warning');
            return;
        }
        
        appState.customizer.customerName = name;
        appState.customizer.customerWhatsapp = whatsapp;
    }
    
    if (appState.customizer.currentStep < 4) {
        appState.customizer.currentStep++;
        updateStepContent();
        updateOrderSummary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function previousStep() {
    if (appState.customizer.currentStep > 1) {
        appState.customizer.currentStep--;
        updateStepContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function selectBox(boxId) {
    appState.customizer.selectedBox = boxId;
    updateBoxSelection();
    updateOrderSummary();
    
    const boxNames = {
        'basica': 'Caja Básica',
        'premium': 'Caja Premium',
        'regalo': 'Caja de Regalo'
    };
    
    showNotification(`${boxNames[boxId]} seleccionada`, 'success');
}


//Mensaje en Whatsapp

function submitOrder() {
    const selectedCake = PASTELES_DATA.baseOptions.find(cake => cake.id === appState.customizer.selectedCake);
    if (!selectedCake) return;

    // Leer valores del formulario
    const additionalComments = document.getElementById('additional-comments').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    const requiredDate = document.getElementById('required-date').value.trim();

    let total = selectedCake.precio + (appState.customizer.addedIngredients.length * PASTELES_DATA.INGREDIENT_PRICE);
    if (appState.customizer.selectedBox === 'premium') total += 3.5;
    if (appState.customizer.selectedBox === 'regalo') total += 2.5;

    // Construir mensaje con formato limpio
    let orderDetails = `==============================\n`;
    orderDetails += `PEDIDO PERSONALIZADO - DOÑA ISABELA\n`;
    orderDetails += `==============================\n\n`;

    orderDetails += `CLIENTE: ${appState.customizer.customerName}\n`;
    orderDetails += `WHATSAPP: ${appState.customizer.customerWhatsapp}\n`;
    if (customerEmail) orderDetails += `EMAIL: ${customerEmail}\n`;
    if (requiredDate) orderDetails += `FECHA REQUERIDA: ${requiredDate}\n\n`;

    orderDetails += `DETALLES DEL PASTEL:\n`;
    orderDetails += `• Base: ${selectedCake.nombre}\n`;
    orderDetails += `• Personas: ${appState.customizer.numPersonas}\n`;
    orderDetails += `• Peso: ${appState.customizer.pesoLibras} libra(s)\n`;
    orderDetails += `• Mensaje en el pastel: "${appState.customizer.customMessage}"\n\n`;

    if (appState.customizer.removedIngredients.length > 0) {
        orderDetails += `INGREDIENTES A REMOVER:\n`;
        orderDetails += appState.customizer.removedIngredients.map(ing => `• ${ing}`).join('\n') + '\n\n';
    }

    if (appState.customizer.addedIngredients.length > 0) {
        orderDetails += `INGREDIENTES ADICIONALES:\n`;
        orderDetails += appState.customizer.addedIngredients.map(ing => `• ${ing}`).join('\n') + '\n\n';
    }

    orderDetails += `TIPO DE CAJA: ${appState.customizer.selectedBox}\n`;
    orderDetails += `TOTAL ESTIMADO: ${formatPrice(total)}\n\n`;

    if (additionalComments) {
        orderDetails += `COMENTARIOS ADICIONALES:\n`;
        orderDetails += `• ${additionalComments}\n\n`;
    }

    orderDetails += `==============================\n`;
    orderDetails += `¡Gracias por elegir Doña Isabela!\n`;
    orderDetails += `==============================`;

    const whatsappUrl = `https://wa.me/593994402118?text=${encodeURIComponent(orderDetails)}`;

    showNotification('Redirigiendo a WhatsApp...', 'success');

    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}







// ====== SORTEOS ======
function participate() {
    const participateBtn = document.getElementById('participate-btn');
    const participatedMessage = document.getElementById('participated-message');
    
    if (!appState.participated) {
        appState.participated = true;
        
        if (participateBtn) {
            participateBtn.innerHTML = 'Registrando...';
            participateBtn.disabled = true;
        }
        
        setTimeout(() => {
            if (participateBtn) participateBtn.classList.add('hidden');
            if (participatedMessage) participatedMessage.classList.remove('hidden');
            
            setTimeout(() => {
                showNotification('¡Registrado en el sorteo! Revisa las instrucciones para Instagram.', 'success');
            }, 500);
        }, 1500);
    }
}

// ====== VIDEO SECTION ======
function showMainVideo() {
    const videoPreview = document.getElementById('video-preview');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoPreview && videoPlayer) {
        videoPreview.style.display = 'none';
        videoPlayer.classList.remove('hidden');
        videoPlayer.classList.add('show');
        
        showNotification('Video cargado correctamente', 'success');
    }
}

function hideMainVideo() {
    const videoPreview = document.getElementById('video-preview');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoPreview && videoPlayer) {
        videoPreview.style.display = 'block';
        videoPlayer.classList.add('hidden');
        videoPlayer.classList.remove('show');
    }
}

// ====== CONTACTO ======
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name')?.value?.trim();
    const whatsapp = document.getElementById('contact-whatsapp')?.value?.trim();
    const message = document.getElementById('contact-message')?.value?.trim();
    
    if (!name || !whatsapp || !message) {
        showNotification('Por favor completa todos los campos requeridos.', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado! Te contactaremos pronto por WhatsApp.', 'success');
        
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('contact-success');
        
        if (form && successMessage) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }
        
        e.target.reset();
        if (submitBtn) {
            submitBtn.innerHTML = 'Enviar Mensaje';
            submitBtn.disabled = false;
        }
    }, 1500);
}

function resetContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    if (form && successMessage) {
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }
}

// ====== EVENT LISTENERS ======
function setupEventListeners() {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }
    
    // Dark mode toggles
    const darkToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkToggle = document.getElementById('mobile-dark-toggle');
    
    if (darkToggle) {
        darkToggle.addEventListener('click', toggleDarkMode);
    }
    if (mobileDarkToggle) {
        mobileDarkToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Form inputs tracking
    const customMessageInput = document.getElementById('custom-message');
    const customerNameInput = document.getElementById('customer-name');
    const customerWhatsappInput = document.getElementById('customer-whatsapp');
    
    if (customMessageInput) {
        customMessageInput.addEventListener('input', (e) => {
            appState.customizer.customMessage = e.target.value;
        });
    }
    
    if (customerNameInput) {
        customerNameInput.addEventListener('input', (e) => {
            appState.customizer.customerName = e.target.value;
        });
    }
    
    if (customerWhatsappInput) {
        customerWhatsappInput.addEventListener('input', (e) => {
            appState.customizer.customerWhatsapp = e.target.value;
        });
    }
    
    window.addEventListener('resize', closeMobileMenu);
}

// ====== ANIMACIONES ======
function setupAnimations() {
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

console.log('🎂 Doña Isabela - Script principal cargado');