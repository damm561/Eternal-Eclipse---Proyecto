import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Phone, Calendar, MessageSquare, Package } from "lucide-react";

interface CustomizePageProps {
  onNavigate: (page: string) => void;
}

interface BaseOption {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  ingredientes: string[];
}

interface BoxOption {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
}

const baseOptions: BaseOption[] = [
  {
    id: "chocolate",
    nombre: "Chocolate",
    precio: 48500,
    imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
    ingredientes: ["Masa de chocolate", "Crema de chocolate", "Decoración básica"]
  },
  {
    id: "vainilla",
    nombre: "Vainilla",
    precio: 42000,
    imagen: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=300&h=200&fit=crop",
    ingredientes: ["Masa de vainilla", "Crema de mantequilla", "Decoración básica"]
  },
  {
    id: "red-velvet",
    nombre: "Red Velvet",
    precio: 55500,
    imagen: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=200&fit=crop",
    ingredientes: ["Masa red velvet", "Queso crema", "Decoración vintage"]
  },
  {
    id: "cheesecake",
    nombre: "Cheesecake",
    precio: 52000,
    imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop",
    ingredientes: ["Queso philadelphia", "Base de galleta", "Frutos rojos"]
  }
];

const ingredientesCategories = {
  frutas: ["Fresas frescas", "Frambuesas", "Arándanos", "Moras", "Cerezas", "Mango", "Piña", "Kiwi", "Duraznos", "Bananas"],
  chocolates: ["Chocolate blanco", "Chocolate con leche", "Chocolate negro 70%", "Nutella", "Chips de chocolate", "Dulce de leche"],
  frutos: ["Almendras", "Nueces", "Avellanas", "Pistachos", "Coco rallado", "Nueces pecanas"],
  cremas: ["Crema chantilly", "Crema de mantequilla", "Crema pastelera", "Queso crema", "Mascarpone", "Crema de coco"],
  decoraciones: ["Fondant", "Flores comestibles", "Perlas de azúcar", "Sprinkles", "Confites", "Figuras de azúcar"]
};

const boxOptions: BoxOption[] = [
  {
    id: "basica",
    nombre: "Caja Básica",
    precio: 0,
    descripcion: "Caja de cartón resistente con diseño elegante."
  },
  {
    id: "premium",
    nombre: "Caja Premium",
    precio: 8500,
    descripcion: "Caja de lujo con ventana transparente y acabados especiales."
  },
  {
    id: "regalo",
    nombre: "Caja de Regalo",
    precio: 12000,
    descripcion: "Caja decorativa con lazo y tarjeta personalizada."
  }
];

const INGREDIENT_PRICE = 5500;

export function CustomizePage({ onNavigate }: CustomizePageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCake, setSelectedCake] = useState<string>("");
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [numPersonas, setNumPersonas] = useState("4-6");
  const [pesoLibras, setPesoLibras] = useState("2");
  
  // Paso 2: Mensaje
  const [customMessage, setCustomMessage] = useState("");
  const [ocasion, setOcasion] = useState("");
  
  // Paso 3: Datos de contacto
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  
  // Paso 4: Caja
  const [selectedBox, setSelectedBox] = useState("basica");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configurar fecha mínima (mañana)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    const dateInput = document.getElementById('required-date') as HTMLInputElement;
    if (dateInput) {
      dateInput.min = minDate;
    }
  }, []);

  const formatPrice = (amount: number) => {
    return '$' + amount.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('.', ',');
  };

  const getPersonasMultiplier = (numPersonas: string) => {
    const multipliers: { [key: string]: number } = {
      '4-6': 1,
      '8-10': 1.5,
      '12-15': 2,
      '16-20': 2.5,
      '20-25': 3,
      '25-30': 3.5,
      '30+': 4
    };
    return multipliers[numPersonas] || 1;
  };

  const getPesoMultiplier = (pesoLibras: string) => {
    const peso = parseFloat(pesoLibras);
    if (peso <= 2) return 1;
    if (peso <= 3) return 1.3;
    if (peso <= 4) return 1.6;
    if (peso <= 5) return 2;
    return 2.5;
  };

  const calculateTotal = () => {
    const selectedCakeData = baseOptions.find(cake => cake.id === selectedCake);
    const selectedBoxData = boxOptions.find(box => box.id === selectedBox);
    
    if (!selectedCakeData) return 0;
    
    const basePrice = selectedCakeData.precio;
    const addedPrice = addedIngredients.length * INGREDIENT_PRICE;
    const boxPrice = selectedBoxData ? selectedBoxData.precio : 0;
    
    const personasMultiplier = getPersonasMultiplier(numPersonas);
    const pesoMultiplier = getPesoMultiplier(pesoLibras);
    
    return (basePrice + addedPrice) * personasMultiplier * pesoMultiplier + boxPrice;
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!selectedCake;
      case 2:
        return !!customMessage.trim();
      case 3:
        return !!(customerName.trim() && customerWhatsapp.trim());
      case 4:
        return !!selectedBox;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 4 && validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('galeria');
    }
  };

  const submitQuote = async () => {
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      const customerFirstName = customerName.split(' ')[0];
      alert(`¡Hola ${customerFirstName}! 🎂\n\nTu cotización ha sido enviada correctamente.\n\nTe contactaremos por WhatsApp (${customerWhatsapp}) dentro de las próximas 2 horas para:\n\n✅ Confirmar todos los detalles\n✅ Ajustar el precio final\n✅ Coordinar fecha y entrega\n✅ Resolver cualquier duda\n\n¡Gracias por elegir Doña Isabela! 💕`);
      
      // Reset form
      setCurrentStep(1);
      setSelectedCake("");
      setRemovedIngredients([]);
      setAddedIngredients([]);
      setCustomMessage("");
      setOcasion("");
      setCustomerName("");
      setCustomerWhatsapp("");
      setCustomerEmail("");
      setRequiredDate("");
      setAdditionalComments("");
      setSelectedBox("basica");
      setIsSubmitting(false);
      
      onNavigate('inicio');
    }, 2000);
  };

  const toggleRemovedIngredient = (ingredient: string) => {
    setRemovedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleAddedIngredient = (ingredient: string) => {
    setAddedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const stepTitles = [
    "Paso 1: Personaliza tu pastel",
    "Paso 2: Mensaje personalizado",
    "Paso 3: Información de contacto",
    "Paso 4: Selección de tipo de caja"
  ];

  const stepDescriptions = [
    "Selecciona tu base y personaliza cada detalle",
    "Añade un mensaje especial y ocasión",
    "Proporciona tus datos para coordinar el pedido",
    "Elige la presentación perfecta para tu pastel"
  ];

  const stepIcons = [Package, MessageSquare, Phone, Package];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Personaliza tu Pastel Ideal</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Crea el pastel perfecto para tu ocasión especial. Completa todos los pasos para recibir tu cotización personalizada.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 animate-slide-up">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step, index) => {
              const StepIcon = stepIcons[index];
              return (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                    ${step <= currentStep 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }
                  `}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  {index < 3 && (
                    <div className={`
                      w-16 h-1 mx-2 rounded transition-all duration-300
                      ${step < currentStep 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                        : 'bg-gray-200 dark:bg-gray-700'
                      }
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">{stepTitles[currentStep - 1]}</h2>
          <p className="text-muted-foreground">{stepDescriptions[currentStep - 1]}</p>
        </div>

        {/* Step 1: Base Selection + Ingredients */}
        {currentStep === 1 && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Selección de Base y Especificaciones */}
            <div className="lg:col-span-1">
              <Card className="glass-effect p-6 sticky top-24 border-pink-200 dark:border-purple-200">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Elige tu base</h3>
                <div className="space-y-4 mb-6">
                  {baseOptions.map((cake) => (
                    <div
                      key={cake.id}
                      onClick={() => setSelectedCake(cake.id)}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-all duration-300 border-2
                        ${selectedCake === cake.id 
                          ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 scale-105' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-purple-300'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={cake.imagen} alt={cake.nombre} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{cake.nombre}</h4>
                          <p className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-bold text-sm">
                            {formatPrice(cake.precio)}
                          </p>
                        </div>
                        {selectedCake === cake.id && (
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Especificaciones */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Especificaciones</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Número de personas</label>
                      <Select value={numPersonas} onValueChange={setNumPersonas}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4-6">4-6 personas</SelectItem>
                          <SelectItem value="8-10">8-10 personas</SelectItem>
                          <SelectItem value="12-15">12-15 personas</SelectItem>
                          <SelectItem value="16-20">16-20 personas</SelectItem>
                          <SelectItem value="20-25">20-25 personas</SelectItem>
                          <SelectItem value="25-30">25-30 personas</SelectItem>
                          <SelectItem value="30+">Más de 30 personas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Peso aproximado</label>
                      <Select value={pesoLibras} onValueChange={setPesoLibras}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 libra</SelectItem>
                          <SelectItem value="1.5">1.5 libras</SelectItem>
                          <SelectItem value="2">2 libras</SelectItem>
                          <SelectItem value="2.5">2.5 libras</SelectItem>
                          <SelectItem value="3">3 libras</SelectItem>
                          <SelectItem value="4">4 libras</SelectItem>
                          <SelectItem value="5">5 libras</SelectItem>
                          <SelectItem value="6">6+ libras</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Personalización de Ingredientes */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {selectedCake && (
                  <>
                    {/* Quitar ingredientes */}
                    <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
                      <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Ingredientes a remover</h3>
                      <p className="text-muted-foreground mb-4">Selecciona los ingredientes que NO quieres</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {baseOptions.find(cake => cake.id === selectedCake)?.ingredientes.map((ingredient) => (
                          <div key={ingredient} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <input
                              type="checkbox"
                              id={`remove-${ingredient}`}
                              className="custom-checkbox"
                              checked={removedIngredients.includes(ingredient)}
                              onChange={() => toggleRemovedIngredient(ingredient)}
                            />
                            <label htmlFor={`remove-${ingredient}`} className="text-sm cursor-pointer flex-1">
                              {ingredient}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Agregar ingredientes por categorías */}
                    <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
                      <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Ingredientes adicionales</h3>
                      <p className="text-muted-foreground mb-4">Personaliza tu pastel con ingredientes extra</p>
                      
                      <div className="space-y-6">
                        {Object.entries(ingredientesCategories).map(([category, ingredients]) => (
                          <div key={category}>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center capitalize">
                              <span className="text-lg mr-2">
                                {category === 'frutas' ? '🍓' : 
                                 category === 'chocolates' ? '🍫' : 
                                 category === 'frutos' ? '🥜' : 
                                 category === 'cremas' ? '🥛' : '✨'}
                              </span> 
                              {category}
                            </h4>
                            <div className="grid md:grid-cols-3 gap-3">
                              {ingredients.map((ingredient) => (
                                <div key={ingredient} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  <input
                                    type="checkbox"
                                    id={`add-${ingredient}`}
                                    className="custom-checkbox"
                                    checked={addedIngredients.includes(ingredient)}
                                    onChange={() => toggleAddedIngredient(ingredient)}
                                  />
                                  <label htmlFor={`add-${ingredient}`} className="text-xs cursor-pointer flex-1">
                                    {ingredient}
                                  </label>
                                  <span className="text-xs text-muted-foreground">+{formatPrice(INGREDIENT_PRICE)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Message */}
        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <div className="text-center mb-6">
                <MessageSquare className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-4 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Mensaje personalizado</h3>
                <p className="text-muted-foreground">Añade un mensaje especial para tu pastel</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <span className="text-red-500">*</span> Mensaje en el pastel
                  </label>
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                    placeholder="Ej: Feliz Cumpleaños María!"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Ocasión especial</label>
                  <Select value={ocasion} onValueChange={setOcasion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la ocasión" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                      <SelectItem value="aniversario">Aniversario</SelectItem>
                      <SelectItem value="boda">Boda</SelectItem>
                      <SelectItem value="bautizo">Bautizo</SelectItem>
                      <SelectItem value="graduacion">Graduación</SelectItem>
                      <SelectItem value="baby-shower">Baby Shower</SelectItem>
                      <SelectItem value="despedida">Despedida</SelectItem>
                      <SelectItem value="celebracion">Celebración especial</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <div className="text-center mb-6">
                <Phone className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-4 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Información de contacto</h3>
                <p className="text-muted-foreground">Para coordinar los detalles de tu pedido por WhatsApp</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <span className="text-red-500">*</span> Nombre completo
                  </label>
                  <Input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Escribe tu nombre completo"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <span className="text-red-500">*</span> Número de WhatsApp
                  </label>
                  <Input
                    type="tel"
                    value={customerWhatsapp}
                    onChange={(e) => setCustomerWhatsapp(e.target.value)}
                    placeholder="Ej: +57 300 123 4567"
                    className="w-full"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Incluye el código de país para contactarte mejor
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email (opcional)</label>
                  <Input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Fecha requerida (opcional)</label>
                  <Input
                    type="date"
                    id="required-date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recomendamos solicitar con al menos 48 horas de anticipación
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Comentarios adicionales</label>
                  <Textarea
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                    rows={3}
                    placeholder="Cualquier detalle especial o comentario..."
                    className="w-full"
                  />
                </div>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500 p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-500 text-lg">ℹ️</span>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">¿Qué pasa después?</h4>
                    <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">
                      Te contactaremos por WhatsApp dentro de las próximas 2 horas para confirmar todos los detalles, 
                      precio final y coordinar la entrega.
                    </p>
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        )}

        {/* Step 4: Box Selection */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="glass-effect p-6 border-pink-200 dark:border-purple-200">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Selección de tipo de caja</h3>
              <p className="text-muted-foreground mb-6">Elige la presentación perfecta</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {boxOptions.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box.id)}
                    className={`
                      cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border-2
                      ${selectedBox === box.id 
                        ? 'border-pink-500 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 scale-105' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-purple-300'
                      }
                    `}
                  >
                    <div className="relative">
                      <img 
                        src={`https://images.unsplash.com/photo-${box.id === 'basica' ? '1607478900766-efe13248b125' : box.id === 'premium' ? '1549298916-f52d724204b4' : '1513475382585-d06e58bcb0e0'}?w=300&h=200&fit=crop`}
                        alt={box.nombre} 
                        className="w-full h-48 object-cover"
                      />
                      {selectedBox === box.id && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-lg">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{box.nombre}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{box.descripcion}</p>
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                        {box.precio === 0 ? 'Incluida sin costo' : `+${formatPrice(box.precio)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <Card className="glass-effect p-6 border-pink-100 dark:border-purple-100">
                <h4 className="text-xl font-semibold text-foreground mb-4">Resumen de tu pedido</h4>
                <div className="space-y-3">
                  {customerName && (
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500 p-3">
                      <h5 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">Datos del cliente:</h5>
                      <p className="text-sm text-blue-700 dark:text-blue-200"><strong>Nombre:</strong> {customerName}</p>
                      <p className="text-sm text-blue-700 dark:text-blue-200"><strong>WhatsApp:</strong> {customerWhatsapp}</p>
                      {customerEmail && <p className="text-sm text-blue-700 dark:text-blue-200"><strong>Email:</strong> {customerEmail}</p>}
                      {requiredDate && <p className="text-sm text-blue-700 dark:text-blue-200"><strong>Fecha requerida:</strong> {new Date(requiredDate).toLocaleDateString('es-CO')}</p>}
                    </Card>
                  )}
                  
                  {selectedCake && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pastel base ({baseOptions.find(c => c.id === selectedCake)?.nombre})</span>
                        <span className="text-foreground">{formatPrice(baseOptions.find(c => c.id === selectedCake)?.precio || 0)}</span>
                      </div>
                      
                      {addedIngredients.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ingredientes adicionales ({addedIngredients.length})</span>
                          <span className="text-foreground">+{formatPrice(addedIngredients.length * INGREDIENT_PRICE)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Para {numPersonas} personas</span>
                        <span>{getPersonasMultiplier(numPersonas) > 1 ? `x${getPersonasMultiplier(numPersonas)}` : 'Base'}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Peso: {pesoLibras} libras</span>
                        <span>{getPesoMultiplier(pesoLibras) > 1 ? `x${getPesoMultiplier(pesoLibras)}` : 'Base'}</span>
                      </div>
                      
                      {selectedBox && boxOptions.find(b => b.id === selectedBox)?.precio > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Caja ({boxOptions.find(b => b.id === selectedBox)?.nombre})</span>
                          <span className="text-foreground">+{formatPrice(boxOptions.find(b => b.id === selectedBox)?.precio || 0)}</span>
                        </div>
                      )}
                      
                      {customMessage && (
                        <div className="text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                          <strong>Mensaje:</strong> "{customMessage}"
                        </div>
                      )}
                      
                      {removedIngredients.length > 0 && (
                        <div className="text-sm text-red-600 dark:text-red-400">
                          <strong>Sin:</strong> {removedIngredients.join(', ')}
                        </div>
                      )}
                      
                      {additionalComments && (
                        <div className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <strong>Comentarios:</strong> {additionalComments}
                        </div>
                      )}
                    </>
                  )}
                  
                  <hr className="my-4 border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-foreground">Total estimado</span>
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-xl">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-2">
                    * Precio sujeto a confirmación por WhatsApp
                  </div>
                </div>
              </Card>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            onClick={previousStep}
            variant="outline"
            className="btn-secondary"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Volver a Galería' : 'Anterior'}
          </Button>
          
          <Button 
            onClick={currentStep === 4 ? submitQuote : nextStep}
            disabled={!validateStep(currentStep) || isSubmitting}
            className="btn-primary"
          >
            {isSubmitting 
              ? 'Procesando...' 
              : currentStep === 4 
                ? 'Solicitar Cotización' 
                : 'Siguiente'
            }
            {currentStep < 4 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}