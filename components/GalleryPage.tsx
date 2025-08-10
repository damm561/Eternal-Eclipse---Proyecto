import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

interface Pastel {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
  categoria: string;
}

const pasteles: Pastel[] = [
  {
    id: 1,
    nombre: "Pastel de Chocolate Supremo",
    precio: 65500,
    imagen: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
    ingredientes: ["Chocolate belga", "Crema de mantequilla", "Fresas frescas", "Almendras"],
    categoria: "Chocolate"
  },
  {
    id: 2,
    nombre: "Torta Red Velvet Clásica",
    precio: 58000,
    imagen: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop",
    ingredientes: ["Masa red velvet", "Queso crema", "Vainilla", "Decoración vintage"],
    categoria: "Especial"
  },
  {
    id: 3,
    nombre: "Cheesecake de Frutos Rojos",
    precio: 52750,
    imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    ingredientes: ["Queso philadelphia", "Frutos rojos", "Base de galleta", "Coulis de frutas"],
    categoria: "Cheesecake"
  },
  {
    id: 4,
    nombre: "Tres Leches Tradicional",
    precio: 45500,
    imagen: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=400&h=300&fit=crop",
    ingredientes: ["Bizcocho esponjoso", "Tres leches", "Crema chantilly", "Canela"],
    categoria: "Tradicional"
  },
  {
    id: 5,
    nombre: "Pastel de Zanahoria Gourmet",
    precio: 49200,
    imagen: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
    ingredientes: ["Zanahoria fresca", "Nueces", "Queso crema", "Especias"],
    categoria: "Saludable"
  },
  {
    id: 6,
    nombre: "Torta de Limón Merengue",
    precio: 56800,
    imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    ingredientes: ["Crema de limón", "Merengue tostado", "Base crocante", "Ralladura de limón"],
    categoria: "Cítrico"
  },
  {
    id: 7,
    nombre: "Chocolate Fondant Intenso",
    precio: 72000,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    ingredientes: ["Chocolate negro 70%", "Mantequilla europea", "Fondant líquido", "Frambuesas"],
    categoria: "Chocolate"
  },
  {
    id: 8,
    nombre: "Pastel de Fresa Silvestre",
    precio: 54200,
    imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    ingredientes: ["Fresas orgánicas", "Crema de vainilla", "Bizcocho de almendra", "Mermelada casera"],
    categoria: "Frutal"
  },
  {
    id: 9,
    nombre: "Cheesecake de Maracuyá",
    precio: 59300,
    imagen: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    ingredientes: ["Queso crema", "Pulpa de maracuyá", "Base de galleta maría", "Coulis tropical"],
    categoria: "Cheesecake"
  },
  {
    id: 10,
    nombre: "Tiramisú Clásico Italiano",
    precio: 61500,
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    ingredientes: ["Mascarpone", "Café espresso", "Bizcochos de soletilla", "Cacao en polvo"],
    categoria: "Gourmet"
  },
  {
    id: 11,
    nombre: "Pastel de Coco Tropical",
    precio: 48900,
    imagen: "https://images.unsplash.com/photo-1562440499-64c9a5d68157?w=400&h=300&fit=crop",
    ingredientes: ["Coco rallado", "Crema de coco", "Piña natural", "Ron blanco"],
    categoria: "Frutal"
  },
  {
    id: 12,
    nombre: "Brownie Supremo con Nueces",
    precio: 43500,
    imagen: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    ingredientes: ["Chocolate semi-amargo", "Nueces pecanas", "Mantequilla", "Vainilla bourbon"],
    categoria: "Chocolate"
  },
  {
    id: 13,
    nombre: "Pastel Vegano de Banana",
    precio: 46800,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    ingredientes: ["Bananas maduras", "Harina integral", "Aceite de coco", "Azúcar de coco"],
    categoria: "Saludable"
  },
  {
    id: 14,
    nombre: "Tarta de Manzana Francesa",
    precio: 51200,
    imagen: "https://images.unsplash.com/photo-1549132047-5d6229c7a6bf?w=400&h=300&fit=crop",
    ingredientes: ["Manzanas verdes", "Masa quebrada", "Canela", "Almendras laminadas"],
    categoria: "Tradicional"
  },
  {
    id: 15,
    nombre: "Opera Cake Parisino",
    precio: 78500,
    imagen: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
    ingredientes: ["Bizcocho de almendra", "Ganache de chocolate", "Crema de mantequilla", "Glaseado espejo"],
    categoria: "Gourmet"
  },
  {
    id: 16,
    nombre: "Pastel de Café Mocca",
    precio: 57600,
    imagen: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=300&fit=crop",
    ingredientes: ["Café colombiano", "Chocolate con leche", "Crema de café", "Granos de café tostado"],
    categoria: "Gourmet"
  }
];

const categories = [
  'Todos', 'Chocolate', 'Especial', 'Cheesecake', 
  'Tradicional', 'Saludable', 'Cítrico', 'Frutal', 'Gourmet'
];

export function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPasteles = selectedCategory === 'Todos' 
    ? pasteles 
    : pasteles.filter(p => p.categoria === selectedCategory);

  const formatPrice = (amount: number) => {
    return '$' + amount.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('.', ',');
  };

  const handleSelectCake = (pastel: Pastel) => {
    // Aquí se podría guardar la selección en localStorage o context
    // para usarla en la página de personalización
    onNavigate('personaliza');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nuestra Galería Completa</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explora nuestra amplia colección de pasteles artesanales. Selecciona tu favorito y personalízalo completamente.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-slide-up">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                  : 'border-pink-300 dark:border-purple-300 text-pink-600 dark:text-purple-400 hover:bg-pink-50 dark:hover:bg-purple-900/20'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPasteles.map((pastel) => (
            <Card 
              key={pastel.id} 
              className="glass-effect overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-200 dark:border-purple-200 group"
            >
              <div className="relative">
                <img 
                  src={pastel.imagen} 
                  alt={pastel.nombre} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  {pastel.categoria}
                </Badge>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {pastel.nombre}
                </h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {formatPrice(pastel.precio)}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {pastel.ingredientes.slice(0, 3).map((ingrediente, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 dark:from-purple-900/30 dark:to-pink-900/30 text-pink-700 dark:text-purple-300"
                      >
                        {ingrediente}
                      </Badge>
                    ))}
                    {pastel.ingredientes.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{pastel.ingredientes.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSelectCake(pastel)}
                  className="w-full btn-primary text-sm group-hover:scale-105 transition-transform"
                >
                  Personalizar este pastel
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="glass-effect p-8 max-w-2xl mx-auto border-pink-200 dark:border-purple-200 animate-glow">
            <h2 className="text-2xl font-semibold text-foreground mb-4">¿Listo para personalizar?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Selecciona cualquier pastel de arriba y personalizalo completamente a tu gusto
            </p>
            <Button 
              onClick={() => onNavigate('personaliza')} 
              className="btn-primary"
            >
              Ir a Personalización
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}