import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Clock, Users, Heart } from "lucide-react";

interface BehindCakePageProps {
  onNavigate: (page: string) => void;
}

export function BehindCakePage({ onNavigate }: BehindCakePageProps) {
  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Detrás del Pastel
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubre el amor y dedicación que ponemos en cada creación. 
            Cada pastel tiene su propia historia y proceso único.
          </p>
        </div>

        {/* Video principal */}
        <div className="mb-12 animate-slide-up">
          <Card className="glass-effect overflow-hidden border-pink-200 dark:border-purple-200">
            <div className="relative">
              {!showVideo ? (
                <div 
                  className="relative cursor-pointer hover:scale-105 transition-transform duration-300" 
                  onClick={handleShowVideo}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop"
                    alt="Proceso artesanal de creación de pasteles"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button className="btn-primary text-lg px-8 py-4 animate-bounce-gentle">
                      <Play className="w-6 h-6 mr-2" />
                      Ver Proceso Completo
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    8:32 min
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-96 bg-gray-900 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Video de YouTube</h3>
                    <p className="text-gray-300 mb-4">
                      Aquí se mostraría el video embebido de YouTube
                    </p>
                    <code className="text-sm bg-gray-800 px-3 py-1 rounded">
                      &lt;iframe src="https://youtube.com/embed/VIDEO_ID" ...&gt;&lt;/iframe&gt;
                    </code>
                    <div className="mt-4">
                      <Button 
                        onClick={() => setShowVideo(false)}
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-gray-900"
                      >
                        Volver al Preview
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                El Arte de Crear Pasteles Únicos
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                En este video podrás ver todo el proceso artesanal que llevamos a cabo en Doña Isabela. 
                Desde la selección de ingredientes frescos hasta los toques finales de decoración, 
                cada paso es realizado con amor y dedicación por nuestro equipo de expertos pasteleros.
              </p>
            </div>
          </Card>
        </div>

        {/* Servicio personalizado */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Tu Pastel, Tu Historia
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Video Personalizado</h3>
                    <p className="text-muted-foreground">Para pedidos especiales</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">
                    Cuando realizas un <strong>pedido especial</strong> con nosotros, no solo recibes un pastel único, 
                    sino también un recuerdo especial del proceso de creación.
                  </p>
                  
                  <Card className="glass-effect p-4 border-pink-100 dark:border-purple-100">
                    <h4 className="font-semibold text-foreground mb-2">¿Cómo funciona?</h4>
                    <ol className="space-y-2 text-sm text-foreground">
                      <li className="flex items-start gap-2 hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          1
                        </span>
                        Realizas tu pedido especial personalizado
                      </li>
                      <li className="flex items-start gap-2 hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          2
                        </span>
                        Grabamos todo el proceso de creación de tu pastel
                      </li>
                      <li className="flex items-start gap-2 hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          3
                        </span>
                        Recibes tu pastel en una caja especial con código QR
                      </li>
                      <li className="flex items-start gap-2 hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          4
                        </span>
                        Escaneas el QR y accedes al video de tu pastel
                      </li>
                    </ol>
                  </Card>
                </div>
              </Card>
            </div>
            
            <div className="space-y-6 animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1607478900766-efe13248b125?w=500&h=300&fit=crop"
                alt="Caja especial con código QR"
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
              
              <Card className="glass-effect p-4 border-pink-200 dark:border-purple-200">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-pink-500" />
                  <div>
                    <h4 className="font-semibold text-foreground">Un Recuerdo Especial</h4>
                    <p className="text-sm text-muted-foreground">
                      Tu video personalizado será un recuerdo único del proceso artesanal 
                      que hizo posible tu pastel especial.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
          <Card className="glass-effect text-center p-6 hover:scale-105 transition-transform duration-300 border-pink-200 dark:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">4-6 horas</h3>
            <p className="text-muted-foreground">Tiempo promedio de creación por pastel</p>
          </Card>

          <Card className="glass-effect text-center p-6 hover:scale-105 transition-transform duration-300 border-pink-200 dark:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
            <p className="text-muted-foreground">Videos personalizados creados</p>
          </Card>

          <Card className="glass-effect text-center p-6 hover:scale-105 transition-transform duration-300 border-pink-200 dark:border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-r from-green-300 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">100%</h3>
            <p className="text-muted-foreground">Satisfacción de nuestros clientes</p>
          </Card>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Card className="glass-effect p-6 max-w-2xl mx-auto border-pink-200 dark:border-purple-200 animate-glow">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿Quieres tu Video Personalizado?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Los videos personalizados están disponibles para pedidos especiales. 
              Contáctanos para crear un pastel único y recibir tu video exclusivo del proceso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                onClick={() => onNavigate('personaliza')} 
                className="btn-primary"
              >
                <Play className="w-5 h-5 mr-2" />
                Hacer Pedido Especial
              </Button>
              <Button 
                onClick={() => onNavigate('contacto')} 
                variant="outline"
                className="btn-secondary"
              >
                Más Información
              </Button>
            </div>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500 p-4">
              <p className="text-sm text-foreground">
                💡 <strong>Nota:</strong> Los videos personalizados se incluyen automáticamente 
                en pedidos especiales superiores a $60.000,00
              </p>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
}