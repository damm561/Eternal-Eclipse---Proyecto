import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="text-lg text-pink-600 dark:text-purple-400 mb-4 font-medium">
              ¡Bienvenidos!
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Bienvenidos a{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Doña Isabela
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Creamos pasteles artesanales únicos con amor, tradición y los mejores ingredientes. 
              Cada pastel cuenta una historia especial.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={() => onNavigate('galeria')} 
                className="btn-primary text-lg px-8 py-3 animate-bounce-gentle"
              >
                Ver Galería
              </Button>
              <Button 
                onClick={() => onNavigate('personaliza')} 
                variant="outline"
                className="btn-secondary text-lg px-8 py-3"
              >
                Personaliza tu Pastel
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=500&fit=crop" 
              alt="Pasteles artesanales Doña Isabela" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">Pasteles hechos con amor</h3>
                <p className="text-lg opacity-90">Más de 15 años creando momentos dulces e inolvidables</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
            ¿Por qué elegir Doña Isabela?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-200 dark:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎂</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">100% Artesanal</h3>
              <p className="text-muted-foreground">
                Cada pastel es único, hecho a mano con recetas tradicionales y técnicas artesanales.
              </p>
            </Card>
            
            <Card className="glass-effect p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-200 dark:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Personalización Total</h3>
              <p className="text-muted-foreground">
                Adapta cada detalle a tu gusto: sabores, decoración y mensaje especial.
              </p>
            </Card>
            
            <Card className="glass-effect p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-pink-200 dark:border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Ingredientes Premium</h3>
              <p className="text-muted-foreground">
                Solo utilizamos los mejores ingredientes frescos y naturales para garantizar el mejor sabor.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect p-8 text-center border-pink-200 dark:border-purple-200 animate-glow">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿Listo para crear tu pastel ideal?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explora nuestra galería completa o comienza personalizando tu pastel perfecto ahora mismo.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={() => onNavigate('galeria')} 
                className="btn-primary"
              >
                Explorar Galería
              </Button>
              <Button 
                onClick={() => onNavigate('personaliza')} 
                variant="outline"
                className="btn-secondary"
              >
                Comenzar Personalización
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}