import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Footer } from './footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { 
  MapPin, 
  Calendar, 
  Camera, 
  Users, 
  HandshakeIcon, 
  FileText, 
  Search, 
  CheckCircle, 
  Eye, 
  Star,
  Shield,
  Clock,
  Euro,
  MessageCircle,
  Download,
  Calculator,
  Sun,
  Moon,
  Target,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  const [priceSlider, setPriceSlider] = useState([120]);
  const [selectedZone, setSelectedZone] = useState('Centro');
  
  // Mock data para el cálculo de precio
  const zoneData = {
    'Centro': { avg: 150, demand: 'Alta', trend: 'up' },
    'Ensanche': { avg: 120, demand: 'Media', trend: 'stable' },
    'Periferia': { avg: 80, demand: 'Baja', trend: 'down' }
  };

  const currentZoneData = zoneData[selectedZone as keyof typeof zoneData];
  const suggestedPrice = Math.round((priceSlider[0] + currentZoneData.avg) / 2);

  const handleRoleSelection = (role: 'parker' | 'driver') => {
    if (role === 'parker') {
      onNavigate('parker-onboarding', { analytics: 'howitworks_publish_clicked' });
    } else {
      onNavigate('driver-onboarding', { analytics: 'howitworks_request_clicked' });
    }
  };

  const handleContractView = () => {
    // Mock contract viewing - in real app would open PDF or dedicated page
    window.open('/modelo-contrato.pdf', '_blank');
  };

  const handleWhatsAppContact = () => {
    // Deep link to WhatsApp
    window.open('https://wa.me/34666666666?text=Hola%2C%20tengo%20dudas%20sobre%20Parkiduo', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-semantic-success/10 text-semantic-success border-semantic-success/20">
              <CheckCircle className="w-4 h-4 mr-2" />
              Publicar es GRATIS
            </Badge>
            
            <h1 className="font-poppins text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Comparte tu garaje. Ahorra y simplifica el parking en tu ciudad
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Conecta con conductores compatibles y cierra acuerdos con pago único por contrato.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button 
                size="lg" 
                className="btn-primary btn-lg w-full sm:w-auto"
                onClick={() => handleRoleSelection('parker')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Publicar garaje
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-secondary btn-lg w-full sm:w-auto"
                onClick={() => handleRoleSelection('driver')}
              >
                <Search className="w-5 h-5 mr-2" />
                Solicitar garaje
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-semantic-success" />
              Publicar es GRATIS. Sólo pagas si cierras contrato.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo funciona para Parker */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Cómo funciona para Parker
              </h2>
              <p className="text-lg text-gray-600">
                Propietario o inquilino con permiso de subarriendo
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StepCard
                number="1"
                icon={<MapPin className="w-8 h-8" />}
                title="Publica tu plaza"
                description="Dirección, disponibilidad y fotos de tu garaje"
                color="brand-primary"
              />
              <StepCard
                number="2"
                icon={<Users className="w-8 h-8" />}
                title="Recibe candidatos"
                description="Te enviamos perfiles compatibles según horario y zona. Elige con quién hablar"
                color="brand-primary"
              />
              <StepCard
                number="3"
                icon={<Eye className="w-8 h-8" />}
                title="Enseña la plaza"
                description="Visita presencial para acordar condiciones"
                color="brand-primary"
              />
              <StepCard
                number="4"
                icon={<FileText className="w-8 h-8" />}
                title="Genera contrato"
                description="Realiza el pago único y empieza a ganar"
                color="brand-primary"
              />
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="btn-primary btn-lg"
                  onClick={() => handleRoleSelection('parker')}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Publicar garaje
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleContractView}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Ver modelo de contrato
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona para Driver */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Cómo funciona para Driver
              </h2>
              <p className="text-lg text-gray-600">
                Encuentra tu plaza perfecta en pocos pasos
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StepCard
                number="1"
                icon={<Search className="w-8 h-8" />}
                title="Crea tu búsqueda"
                description="Zona, horario y presupuesto deseado"
                color="brand-secondary"
              />
              <StepCard
                number="2"
                icon={<Calendar className="w-8 h-8" />}
                title="Solicita visita"
                description="Contacta con el propietario y espera aprobación"
                color="brand-secondary"
              />
              <StepCard
                number="3"
                icon={<HandshakeIcon className="w-8 h-8" />}
                title="Visita y confirma"
                description="Conoce la plaza y confirma que es perfecta para ti"
                color="brand-secondary"
              />
              <StepCard
                number="4"
                icon={<CheckCircle className="w-8 h-8" />}
                title="Firma y usa"
                description="Firma contrato y empieza a usar tu plaza"
                color="brand-secondary"
              />
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="btn-primary btn-lg"
                  onClick={() => handleRoleSelection('driver')}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Solicitar garaje
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/30 hover:bg-semantic-warn/20"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Activar prioridad 24h
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es un DUO? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                ¿Qué es un DUO?
              </h2>
              <p className="text-lg text-gray-600">
                Optimizamos el uso de tu plaza con parejas Diurno/Nocturno
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-poppins text-xl font-semibold mb-4">
                      Horarios complementarios
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                        <Sun className="w-8 h-8 text-yellow-600" />
                        <div>
                          <p className="font-medium">Diurno (8:00 - 20:00)</p>
                          <p className="text-sm text-gray-600">Trabajadores de oficina</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                        <Moon className="w-8 h-8 text-indigo-600" />
                        <div>
                          <p className="font-medium">Nocturno (20:00 - 8:00)</p>
                          <p className="text-sm text-gray-600">Residentes locales</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-8">
                      <Target className="w-16 h-16 text-brand-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-brand-primary mb-2">≥60%</div>
                      <p className="text-sm text-gray-600 mb-2">Ocupación objetivo</p>
                      <p className="text-xs text-gray-500">En radio &lt;500m</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      <strong>Ejemplo:</strong> "Oficina + Casa"
                    </p>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Configurar disponibilidad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Precio y Comisión */}
      <section id="precio-comision" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Precio y comisión
              </h2>
              <p className="text-lg text-gray-600">
                Transparencia total en nuestro modelo de negocio
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Transparencia de precio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-brand-primary" />
                    Pago único por contrato
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-brand-primary mb-2">29,95€</div>
                    <p className="text-gray-600">A la firma del contrato</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Publicar plaza</span>
                      <span className="text-semantic-success font-medium">GRATIS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gestión candidatos</span>
                      <span className="text-semantic-success font-medium">GRATIS</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modelo de contrato</span>
                      <span className="text-semantic-success font-medium">GRATIS</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-medium">
                      <span>Comisión por éxito</span>
                      <span>29,95€</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-semantic-success/10 rounded-lg">
                    <p className="text-sm text-semantic-success font-medium">
                      Sin comisiones mensuales. Solo cobramos si cobras tú.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Calculadora de precio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-secondary" />
                    Calcula precio sugerido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tu precio deseado
                      </label>
                      <div className="px-3">
                        <Slider
                          value={priceSlider}
                          onValueChange={setPriceSlider}
                          min={50}
                          max={300}
                          step={10}
                          className="mb-2"
                        />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-brand-primary">
                            {priceSlider[0]}€/mes
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Zona
                      </label>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                      >
                        <option value="Centro">Centro</option>
                        <option value="Ensanche">Ensanche</option>
                        <option value="Periferia">Periferia</option>
                      </select>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Media de zona</span>
                        <span className="font-medium">{currentZoneData.avg}€/mes</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Demanda</span>
                        <div className="flex items-center gap-1">
                          {currentZoneData.trend === 'up' && <TrendingUp className="w-4 h-4 text-semantic-success" />}
                          {currentZoneData.trend === 'stable' && <Minus className="w-4 h-4 text-semantic-warn" />}
                          {currentZoneData.trend === 'down' && <TrendingDown className="w-4 h-4 text-semantic-danger" />}
                          <span className={`text-sm font-medium ${
                            currentZoneData.demand === 'Alta' ? 'text-semantic-success' :
                            currentZoneData.demand === 'Media' ? 'text-semantic-warn' :
                            'text-semantic-danger'
                          }`}>
                            {currentZoneData.demand}
                          </span>
                        </div>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Precio sugerido</span>
                        <span className="text-xl font-bold text-brand-secondary">
                          {suggestedPrice}€/mes
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Legal, Seguridad y Convivencia */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Legal, seguridad y convivencia
              </h2>
              <p className="text-lg text-gray-600">
                Protección y transparencia en cada acuerdo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <FeatureCard
                icon={<FileText className="w-8 h-8 text-brand-primary" />}
                title="Contrato recomendado"
                description="Modelo legal descargable para proteger ambas partes del acuerdo"
                highlight="Recomendado"
              />
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8 text-brand-secondary" />}
                title="Comunicación abierta"
                description="Reglas claras de notificación anticipada y tiempo de cortesía"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-semantic-success" />}
                title="Flexibilidad"
                description="Penalización económica opcional y responsabilidad compartida"
              />
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleContractView}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Ver modelo de contrato
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hablar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios y Prueba Social */}
      <section className="py-20 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir Parkiduo?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Beneficios Parker */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-brand-primary mb-6 text-center">
                  Para Parker (Propietarios)
                </h3>
                <div className="space-y-4">
                  <BenefitItem 
                    icon={<Euro className="w-5 h-5 text-brand-primary" />}
                    title="Ingresa más con tu plaza infrautilizada"
                    description="Monetiza espacios vacíos las 24 horas"
                  />
                  <BenefitItem 
                    icon={<Shield className="w-5 h-5 text-brand-primary" />}
                    title="Cero comisiones mensuales"
                    description="Solo pagas una vez si cierras contrato"
                  />
                  <BenefitItem 
                    icon={<Star className="w-5 h-5 text-brand-primary" />}
                    title="Libertad total"
                    description="Tú fijas precio, horarios y normas"
                  />
                </div>
              </div>
              
              {/* Beneficios Driver */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-brand-secondary mb-6 text-center">
                  Para Driver (Conductores)
                </h3>
                <div className="space-y-4">
                  <BenefitItem 
                    icon={<Calculator className="w-5 h-5 text-brand-secondary" />}
                    title="Paga la mitad del alquiler"
                    description="Ahorro significativo vs. plazas comerciales"
                  />
                  <BenefitItem 
                    icon={<Clock className="w-5 h-5 text-brand-secondary" />}
                    title="Rutina estable con plaza fija"
                    description="Mismo sitio todos los días, sin buscar"
                  />
                  <BenefitItem 
                    icon={<TrendingUp className="w-5 h-5 text-brand-secondary" />}
                    title="Ahorro anual estimado: 600-1200€"
                    description="Según zona y tipo de plaza"
                  />
                </div>
              </div>
            </div>
            
            {/* Testimonios */}
            <div className="text-center">
              <h3 className="font-poppins text-xl font-semibold mb-8">
                Lo que dicen nuestros usuarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TestimonialCard 
                  quote="Mi garaje infrautilizado ahora me genera 150€/mes extra"
                  author="María S."
                  role="Parker en Madrid Centro"
                  rating={5}
                />
                <TestimonialCard 
                  quote="Ahorro 80€ al mes comparado con mi antiguo parking comercial"
                  author="Carlos R."
                  role="Driver en Barcelona"
                  rating={5}
                />
                <TestimonialCard 
                  quote="Proceso súper fácil, todo cerrado en menos de una semana"
                  author="Ana L."
                  role="Driver en Valencia"
                  rating={5}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Destacado */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-lg text-gray-600">
                Resolvemos tus dudas más comunes
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Puedo subarrendar mi plaza si soy inquilino?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Sí, siempre que tengas permiso expreso del propietario. Te recomendamos verificar tu contrato de alquiler y, si es necesario, solicitar autorización por escrito.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Qué pasa si llego tarde y mi pareja DUO está esperando?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Recomendamos establecer un tiempo de cortesía de 15-30 minutos. Para situaciones excepcionales, la comunicación previa es clave. Algunos usuarios optan por incluir una pequeña penalización económica en el contrato.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Cómo os contactáis entre vosotros?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Una vez que ambas partes aprueban el match, intercambiáis números de teléfono a través de nuestra plataforma. También podéis usar WhatsApp o cualquier método que os resulte cómodo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Qué parámetros usa Parkiduo para crear un DUO?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Analizamos horarios complementarios, proximidad geográfica (&lt;500m), presupuesto compatible y objetivo de ocupación ≥60%. El algoritmo busca el máximo aprovechamiento de cada plaza.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿El contrato es obligatorio?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  No es obligatorio, pero sí muy recomendable para proteger ambas partes. Proporcionamos un modelo gratuito que cubre los aspectos más importantes del acuerdo.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">
                  ¿Se puede hacer para largo plazo?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  ¡Absolutamente! Muchos de nuestros DUOs funcionan durante meses o incluso años. La estabilidad es uno de los grandes beneficios del sistema.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('faq')}
              >
                Ver FAQ completo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// Componente StepCard mejorado con alineación centrada y espaciado consistente
interface StepCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function StepCard({ number, icon, title, description, color }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center group h-full">
      <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-150`}>
        <div className={`text-${color === 'brand-primary' ? 'brand-primary' : 'brand-secondary'}`}>
          {icon}
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${color === 'brand-primary' ? 'brand-primary' : 'brand-secondary'} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
          {number}
        </div>
      </div>
      <h3 className="font-poppins font-semibold mb-3 min-h-[3rem] flex items-center">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
    </div>
  );
}

// Componente FeatureCard mejorado con Badge posicionado como overlay
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

function FeatureCard({ icon, title, description, highlight }: FeatureCardProps) {
  return (
    <div className="relative flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-150 h-full">
      {/* Badge posicionado como overlay en la esquina superior derecha */}
      {highlight && (
        <Badge className="absolute -top-2 -right-2 bg-semantic-success/10 text-semantic-success border-semantic-success/20 shadow-sm z-10">
          {highlight}
        </Badge>
      )}
      
      <div className="mb-6 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-poppins font-semibold mb-3 min-h-[2.5rem] flex items-center">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
    </div>
  );
}

// Componente BenefitItem mejorado con alineación consistente
interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl">
      <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium mb-2 leading-snug">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Componente TestimonialCard mejorado con alineación centrada
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex justify-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <blockquote className="text-sm italic mb-6 text-center flex-1 flex items-center">
          "{quote}"
        </blockquote>
        <div className="text-center mt-auto">
          <p className="font-medium text-sm">{author}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}