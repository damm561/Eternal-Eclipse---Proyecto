// Doña Isabela - Módulo de Galería
import { PASTELES_DATA } from '../constants/pasteles-data.js';
import { formatPrice, filterByCategory, setupScrollAnimations, showNotification } from '../utils/helpers.js';

export class GalleryManager {
    constructor() {
        this.selectedCategory = 'Todos';
        this.products = PASTELES_DATA.pasteles;
        this.filteredProducts = this.products;
    }

    init() {
        this.loadGallery();
        this.setupEventListeners();
    }

    loadGallery() {
        console.log('🖼️ Cargando galería de productos...');
        this.renderProducts(this.products);
        setupScrollAnimations();
    }

    renderProducts(products) {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) {
            console.warn('products-grid no encontrado');
            return;
        }
        
        this.filteredProducts = products;
        
        const productHTML = products.map(pastel => this.createProductCard(pastel)).join('');
        productsGrid.innerHTML = productHTML;

        // Re-setup animations after rendering
        setTimeout(() => setupScrollAnimations(), 100);
    }

    createProductCard(pastel) {
        const ingredientsHTML = pastel.ingredientes.slice(0, 3)
            .map(ing => `<span class="ingredient-tag">${ing}</span>`)
            .join('');
        
        const moreIngredients = pastel.ingredientes.length > 3 
            ? `<span style="font-size: 0.75rem; color: var(--text-muted);">+${pastel.ingredientes.length - 3} más</span>`
            : '';

        return `
            <div class="product-card animate-on-scroll">
                <div style="position: relative;">
                    <img src="${pastel.imagen}" 
                         alt="${pastel.nombre}" 
                         style="width: 100%; height: 12rem; object-fit: cover;" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'">
                    <div class="product-category">${pastel.categoria}</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${pastel.nombre}</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                        <span class="product-price">${formatPrice(pastel.precio)}</span>
                    </div>
                    <div class="product-ingredients">
                        ${ingredientsHTML}
                        ${moreIngredients}
                    </div>
                    <button onclick="galleryManager.selectCakeAndNavigate('${pastel.id}')" 
                            class="btn btn-primary" 
                            style="width: 100%; font-size: 0.875rem;">
                        Personalizar este pastel
                    </button>
                </div>
            </div>
        `;
    }

    filterCategory(category) {
        console.log(`🏷️ Filtrando por categoría: ${category}`);
        this.selectedCategory = category;
        
        // Actualizar filtros activos
        document.querySelectorAll('.filter-badge').forEach(badge => {
            badge.classList.remove('active');
        });
        
        // Activar filtro actual
        const currentFilter = document.querySelector(`[onclick*="filterCategory('${category}')"]`);
        if (currentFilter) {
            currentFilter.classList.add('active');
        }
        
        const filteredProducts = filterByCategory(this.products, category);
        this.renderProducts(filteredProducts);
        
        showNotification(`Mostrando pasteles de: ${category}`, 'info');
        
        // Evento personalizado
        window.dispatchEvent(new CustomEvent('categoryChanged', { 
            detail: { category, count: filteredProducts.length } 
        }));
    }

    selectCakeAndNavigate(cakeId) {
        console.log(`🎯 Pastel seleccionado para personalización: ${cakeId}`);
        
        const selectedCake = this.products.find(p => p.id === parseInt(cakeId));
        if (!selectedCake) {
            showNotification('Error: Pastel no encontrado', 'error');
            return;
        }

        // Crear opción base desde galería
        const baseOption = {
            id: `gallery-${cakeId}`,
            nombre: selectedCake.nombre,
            precio: selectedCake.precio,
            imagen: selectedCake.imagen,
            ingredientes: selectedCake.ingredientes
        };
        
        // Agregar a opciones base si no existe
        if (!PASTELES_DATA.baseOptions.find(opt => opt.id === baseOption.id)) {
            PASTELES_DATA.baseOptions.push(baseOption);
        }
        
        // Guardar selección en evento personalizado
        window.dispatchEvent(new CustomEvent('cakeSelectedFromGallery', { 
            detail: { 
                cakeId: baseOption.id,
                cake: selectedCake 
            } 
        }));
        
        showNotification(`${selectedCake.nombre} seleccionado para personalización`, 'success');
        
        // Navegar a personalización
        if (window.navigateTo) {
            window.navigateTo('personaliza');
        }
    }

    setupEventListeners() {
        // Escuchar cambios de página
        window.addEventListener('pageChanged', (e) => {
            if (e.detail.page === 'galeria') {
                this.refreshGallery();
            }
        });
    }

    refreshGallery() {
        console.log('🔄 Refrescando galería...');
        this.loadGallery();
    }

    // API pública
    getFilteredProducts() {
        return this.filteredProducts;
    }

    getCurrentCategory() {
        return this.selectedCategory;
    }

    searchProducts(query) {
        const filtered = this.products.filter(product => 
            product.nombre.toLowerCase().includes(query.toLowerCase()) ||
            product.categoria.toLowerCase().includes(query.toLowerCase()) ||
            product.ingredientes.some(ing => ing.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.renderProducts(filtered);
        showNotification(`${filtered.length} pasteles encontrados`, 'info');
        return filtered;
    }
}

// Instancia global
export const galleryManager = new GalleryManager();

// Función global para compatibilidad con HTML onclick
window.filterCategory = (category) => galleryManager.filterCategory(category);
window.galleryManager = galleryManager;