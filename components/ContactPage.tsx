import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, MapPin, Clock, Phone, Instagram, Facebook } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.whatsapp || !formData.message) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', whatsapp: '', message: '' });
    }, 1500);
  };

  const handleWhatsAppDirect = () => {
    window.open('https://wa.me/573001234567', '_blank');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contáctanos</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta o quieres hacer un pedido especial? 
            Estamos aquí para ayudarte a crear el pastel perfecto para tu ocasión especial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Envíanos un mensaje</h2>
              <p className="text-muted-foreground mb-6">Completa el formulario y te contactaremos pronto</p>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Escribe tu nombre completo"
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Número de WhatsApp *
                    </label>
                    <Input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="Ej: +57 300 123 4567"
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Incluye el código de país para contactarte mejor
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      placeholder="Cuéntanos sobre tu evento, preferencias de sabor, fecha requerida, número de personas, etc."
                      className="w-full"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              ) : (
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-500 p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-green-600 dark:text-green-400 mb-4">
                    Te contactaremos pronto por WhatsApp para coordinar los detalles.
                  </p>
                  <Button 
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    Enviar otro mensaje
                  </Button>
                </Card>
              )}
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-up">
            {/* WhatsApp Direct */}
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full p-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">WhatsApp Directo</h3>
                  <p className="text-muted-foreground mb-2">+57 300 123 4567</p>
                  <Button 
                    onClick={handleWhatsAppDirect}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chatear ahora
                  </Button>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-pink-500" />
                <h3 className="text-lg font-semibold text-foreground">Horarios de Atención</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lunes - Viernes</span>
                  <span className="font-medium text-foreground">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sábados</span>
                  <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Domingos</span>
                  <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                      Abierto ahora
                    </span>
                    <span className="text-sm text-muted-foreground">Cerramos a las 7:00 PM</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-pink-500" />
                <h3 className="text-lg font-semibold text-foreground">Nuestra Ubicación</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">Calle 123 #45-67</p>
                  <p className="text-muted-foreground">Barrio Centro, Medellín</p>
                  <p className="text-muted-foreground">Antioquia, Colombia</p>
                </div>
                <Button 
                  onClick={() => window.open('https://maps.google.com', '_blank')}
                  variant="outline"
                  className="btn-secondary"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en Google Maps
                </Button>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <h3 className="text-lg font-semibold text-foreground mb-4">Síguenos en redes sociales</h3>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => window.open('https://instagram.com/donaisabelapasteleria', '_blank')}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-3 rounded-full"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => window.open('https://facebook.com/donaisabelapasteleria', '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-3 rounded-full"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => window.open('https://wa.me/573001234567', '_blank')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">Preguntas Frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-foreground mb-2">¿Con cuánta anticipación debo hacer mi pedido?</h4>
              <p className="text-muted-foreground text-sm">
                Recomendamos hacer pedidos con al menos 48 horas de anticipación para pasteles estándar y 1 semana para diseños personalizados.
              </p>
            </Card>
            
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-foreground mb-2">¿Hacen envíos a domicilio?</h4>
              <p className="text-muted-foreground text-sm">
                Sí, realizamos entregas en el área metropolitana de Medellín. El costo del envío varía según la distancia.
              </p>
            </Card>
            
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-foreground mb-2">¿Pueden hacer pasteles sin gluten o veganos?</h4>
              <p className="text-muted-foreground text-sm">
                ¡Por supuesto! Ofrecemos opciones sin gluten, veganas y para diferentes restricciones alimentarias. Solo menciona tus necesidades al hacer el pedido.
              </p>
            </Card>
            
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-foreground mb-2">¿Cuál es el tamaño mínimo de pedido?</h4>
              <p className="text-muted-foreground text-sm">
                No tenemos tamaño mínimo. Hacemos desde cupcakes individuales hasta pasteles para grandes celebraciones.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}