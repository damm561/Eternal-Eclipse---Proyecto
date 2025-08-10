import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface SorteosPageProps {
  onNavigate: (page: string) => void;
}

export function SorteosPage({ onNavigate }: SorteosPageProps) {
  const [participated, setParticipated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleParticipate = async () => {
    setIsLoading(true);
    
    // Simular proceso de registro
    setTimeout(() => {
      setParticipated(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg px-6 py-2 rounded-full mb-4 animate-bounce-gentle">
            ¡SORTEO ACTIVO!
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Sorteo Mensual</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¡Gana un pastel personalizado valorado en $125.000! Participa en nuestro sorteo mensual 
            y llévate a casa una deliciosa sorpresa.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Prize Image */}
          <div className="relative animate-slide-up">
            <Card className="relative rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 border-pink-200 dark:border-purple-200">
              <img 
                src="https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop" 
                alt="Pastel premio del sorteo" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg px-4 py-2 rounded-full font-medium shadow-lg">
                  Premio: $125.000
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Pastel Premium Personalizado</h3>
                  <p className="text-lg opacity-90">Incluye decoración premium y mensaje personalizado</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Instructions */}
          <div className="space-y-6 animate-slide-up">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <h2 className="text-2xl font-semibold text-foreground mb-4">¿Cómo participar?</h2>
              <p className="text-muted-foreground mb-6">Sigue estos sencillos pasos para entrar al sorteo</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shrink-0 shadow-lg">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Compra cualquier pastel</h4>
                    <p className="text-muted-foreground text-sm">Realiza una compra en nuestra pastelería durante este mes</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shrink-0 shadow-lg">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Toma una foto</h4>
                    <p className="text-muted-foreground text-sm">Fotografía tu pastel en el momento más especial</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shrink-0 shadow-lg">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Súbela a Instagram</h4>
                    <p className="text-muted-foreground text-sm">
                      Publica la foto con el hashtag{" "}
                      <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        #DoñaIsabelaMoments
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 hover:scale-105 transition-transform">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shrink-0 shadow-lg">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Etiquétanos</h4>
                    <p className="text-muted-foreground text-sm">
                      Menciona{" "}
                      <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                        @donaIsabelaPasteleria
                      </span>{" "}
                      en tu publicación
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contest Info */}
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <h3 className="text-lg font-semibold text-foreground mb-3">Información del sorteo</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Fecha de inicio:</span>
                  <span className="font-semibold text-foreground">1 de Agosto 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Fecha límite:</span>
                  <span className="font-semibold text-foreground">31 de Agosto 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Anuncio del ganador:</span>
                  <span className="font-semibold text-foreground">3 de Septiembre 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Participantes actuales:</span>
                  <span className="font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    156 personas
                  </span>
                </div>
              </div>
            </Card>

            {/* Participate Button */}
            <div className="text-center">
              {!participated ? (
                <Button 
                  onClick={handleParticipate}
                  disabled={isLoading}
                  className="btn-primary text-lg px-12 py-4 animate-bounce-gentle"
                >
                  {isLoading ? "Registrando..." : "🎉 ¡Participar Ahora!"}
                </Button>
              ) : (
                <Card className="glass-effect p-4 border-green-200 dark:border-green-500">
                  <p className="text-green-800 dark:text-green-300 font-semibold">
                    ✅ ¡Ya estás registrado en el sorteo!
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                    No olvides seguir las instrucciones en Instagram
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="glass-effect p-6 max-w-2xl mx-auto border-pink-200 dark:border-purple-200">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              ¿Necesitas ayuda para participar?
            </h3>
            <p className="text-muted-foreground mb-4">
              Si tienes dudas sobre el sorteo o necesitas ayuda para participar, 
              no dudes en contactarnos por WhatsApp.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={() => onNavigate('contacto')} 
                variant="outline"
                className="btn-secondary"
              >
                Contactar por WhatsApp
              </Button>
              <Button 
                onClick={() => onNavigate('personaliza')} 
                className="btn-primary"
              >
                Hacer un Pedido
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}