import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Footer } from './footer';
import { CookieBanner } from './legal/cookie-banner';
import { CookiePreferences } from './legal/cookie-preferences';
import { analytics, setupScrollTracking, trackElementVisibility } from './analytics';
import { PriceCalculator } from './ui/price-calculator';
import { 
  Car, 
  Home, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  FileText,
  Calculator,
  Star,
  Award,
  Zap,
  HeartHandshake,
  Target,
  TrendingUp
} from 'lucide-react';

interface HomePageRefinedProps {
  onNavigate: (page: string, options?: any) => void;
}

export function HomePageRefined({ onNavigate }: HomePageRefinedProps) {
  const [selectedRole, setSelectedRole] = useState<'parker' | 'driver' | null>(null);
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const benefitsRef = useRef<HTMLElement>(null);

  // Setup analytics and scroll tracking
  useEffect(() => {
    // Track page view
    analytics.trackPageView('home');
    
    // Setup scroll tracking
    const cleanupScrollTracking = setupScrollTracking();
    
    // Track element visibility
    trackElementVisibility('precio-section', 'PRK_Price_View');
    trackElementVisibility('testimonials-section', 'PRK_Testimonials_View');
    trackElementVisibility('cities-section', 'PRK_Cities_View');
    
    // Track calculator view when section becomes visible
    trackElementVisibility('precio-section', 'calc_view');
    
    return cleanupScrollTracking;
  }, []);

  // Handle cookie consent
  const handleCookieAcceptAll = () => {
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: true,
      advertising: true
    };
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
    analytics.trackCookieConsent('accept_all');
  };

  const handleCookieRejectAll = () => {
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: false,
      advertising: false
    };
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
    analytics.trackCookieConsent('reject_all');
  };

  const handleCookieConfigure = () => {
    setShowCookiePreferences(true);
    analytics.trackCookieConsent('customize');
  };

  // Enhanced cities data with SEO copy
  const cities = [
    { 
      name: 'Madrid', 
      slug: 'madrid',
      garages: 1240, 
      demands: 3200,
      demandLevel: 'Alta',
      avgPrice: '€95/mes',
      available: true,
      seoDescription: 'Aparcar en Madrid es más fácil con Parkiduo. Descubre plazas disponibles cerca de Sol, Malasaña y Chamberí.'
    },
    { 
      name: 'Barcelona', 
      slug: 'barcelona',
      garages: 890, 
      demands: 2100,
      demandLevel: 'Alta',
      avgPrice: '€110/mes',
      available: true,
      seoDescription: 'Encuentra tu plaza de garaje en Barcelona. Zonas como Eixample, Gràcia y Born disponibles.'
    },
    { 
      name: 'Valencia', 
      slug: 'valencia',
      garages: 450, 
      demands: 1200,
      demandLevel: 'Media',
      avgPrice: '€75/mes',
      available: true,
      seoDescription: 'Aparcar en Valencia centro. Plazas cerca de la Ciutat Vella y Ruzafa.'
    },
    { 
      name: 'Sevilla', 
      slug: 'sevilla',
      garages: 320, 
      demands: 850,
      demandLevel: 'Media',
      avgPrice: '€65/mes',
      available: true,
      seoDescription: 'Garajes en Sevilla centro. Encuentra tu plaza cerca de la Catedral y Triana.'
    },
  ];

  // Enhanced testimonials with full names and context
  const testimonials = [
    {
      id: 1,
      name: 'María G.',
      city: 'Madrid',
      role: 'Conductora',
      content: 'Resolvimos en 2 días y firmamos desde el móvil. Cómodo.',
      rating: 5,
      savings: '60€/mes'
    },
    {
      id: 2,
      name: 'Carlos M.',
      city: 'Barcelona',
      role: 'Propietario',
      content: 'Gano 95€ extra al mes con mi plaza libre. Proceso súper fácil.',
      rating: 5,
      income: '95€/mes'
    },
    {
      id: 3,
      name: 'Ana R.',
      city: 'Valencia',
      role: 'Conductora',
      content: 'Sin comisiones mensuales, solo pagas si hay acuerdo. Transparente.',
      rating: 5,
      experience: 'Sin comisiones'
    },
    {
      id: 4,
      name: 'Pedro L.',
      city: 'Madrid',
      role: 'Propietario',
      content: 'La firma digital es genial. Todo se resuelve en la visita.',
      rating: 5,
      feature: 'Firma digital'
    },
    {
      id: 5,
      name: 'Isabel F.',
      city: 'Sevilla',
      role: 'Conductora',
      content: 'Encontré plaza en mi barrio en menos de una semana.',
      rating: 5,
      timeframe: '< 1 semana'
    }
  ];

  // Handle city card click with analytics
  const handleCityClick = (citySlug: string, cityName: string) => {
    analytics.trackCityClick(cityName);
    onNavigate(`cities`);
  };

  // Enhanced CTA handlers with analytics
  const handleDriverCTA = (destination: string = 'driver-onboarding') => {
    analytics.trackDriverCTA(destination);
    onNavigate(destination);
  };

  const handleParkerCTA = (destination: string = 'parker-onboarding') => {
    analytics.trackParkerCTA(destination);
    onNavigate(destination);
  };

  const handleCalculatorClick = () => {
    analytics.trackCalculatorClick();
    onNavigate('how-it-works', { scrollToSection: 'precio-comision' });
  };

  const handlePriceCalculatorHowItWorks = () => {
    analytics.trackCalculatorClick();
    onNavigate('how-it-works', { scrollToSection: 'precio-comision' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      {/* Hero Section - Zone 1: Very High Priority */}
      <section 
        className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 md:py-32 relative overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 
                  id="hero-title"
                  className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight text-[64px]"
                >
                  Encuentra garaje cerca,{' '}
                  <span className="text-brand-primary">
                    sin rodeos.
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto text-center">
                  Conecta con quien necesita o ofrece plaza de garaje. Rápido, seguro y con soporte humano.
                </p>

                {/* Direct CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => handleDriverCTA('driver-onboarding')}
                    className="bg-brand-primary hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold focus-enhanced"
                    aria-describedby="driver-cta-description"
                  >
                    <Car className="mr-2 h-5 w-5" />
                    Soy Driver — Buscar garaje
                  </Button>
                  <div id="driver-cta-description" className="sr-only">
                    Registro como conductor para buscar plaza de garaje
                  </div>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleParkerCTA('parker-onboarding')}
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg font-semibold focus-enhanced"
                    aria-describedby="parker-cta-description"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Soy Parker — Publicar garaje
                  </Button>
                  <div id="parker-cta-description" className="sr-only">
                    Registro como propietario para monetizar mi plaza
                  </div>
                </div>

                {/* Trust badges - enhanced with analytics */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                  <button
                    onClick={() => {
                      analytics.trackTrustBadgeClick('users');
                      window.open('https://g.page/parkiduo/review', '_blank');
                    }}
                    className="flex items-center gap-2 hover:text-brand-primary transition-colors focus-enhanced"
                    aria-label="Ver opiniones de usuarios"
                  >
                    <Users className="h-4 w-4 text-semantic-success" />
                    <span>+1.000 personas ya usan Parkiduo</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      analytics.trackTrustBadgeClick('reviews');
                      window.open('https://g.page/parkiduo/review', '_blank');
                    }}
                    className="flex items-center gap-2 hover:text-brand-primary transition-colors focus-enhanced"
                    aria-label="Ver reseñas en Google"
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span>5/5 en Google</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-semantic-success" />
                    <span>Contratos legales</span>
                  </div>
                </div>

                {/* First match time indicator */}
                <div className="inline-flex items-center gap-2 bg-semantic-success/10 text-semantic-success px-4 py-2 rounded-full text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  <span>Primer match en 24-72h (de media)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator Section - Zone 2: High Priority */}
      <section 
        id="precio-section"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30" 
        aria-labelledby="pricing-title"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Service Info */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-semantic-success/10 text-semantic-success px-4 py-2 rounded-full text-sm font-medium">
                  <Target className="h-4 w-4" />
                  <span>Precio transparente</span>
                </div>
                
                <div className="space-y-6">
                  <h2 id="pricing-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900">
                    Solo pagas si cerráis acuerdo
                  </h2>
                  
                  <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-6 border border-brand-primary/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-semantic-success/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-semantic-success" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Sin riesgo inicial</h3>
                          <p className="text-sm text-gray-600">Solo pagas cuando hay acuerdo exitoso</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="h-6 w-6 text-brand-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Gestión completa</h3>
                          <p className="text-sm text-gray-600">Contratos legales y firma digital incluida</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center">
                          <HeartHandshake className="h-6 w-6 text-brand-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Soporte humano</h3>
                          <p className="text-sm text-gray-600">Asistencia personal durante todo el proceso</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Price Calculator */}
              <div>
                <PriceCalculator 
                  onHowItWorksClick={handlePriceCalculatorHowItWorks}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section - Zone 2: High Priority */}
      <section className="py-20 bg-gray-50" aria-labelledby="roles-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="roles-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              ¿Qué necesitas?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige tu rol y descubre cómo Parkiduo puede ayudarte
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Driver Card */}
            <Card className="role-selector-button hover-lift border-0 shadow-md p-8 text-center cursor-pointer transition-all duration-200" 
                  onClick={() => handleDriverCTA('driver-onboarding')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleDriverCTA('driver-onboarding')}
                  aria-label="Registro como conductor">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="h-10 w-10 text-brand-primary" />
                </div>
                <CardTitle className="text-2xl mb-4 text-left">Para Conductores</CardTitle>
                <p className="text-gray-600 mb-6 text-left">
                  Encuentra tu plaza de garaje ideal
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-brand-primary flex-shrink-0" />
                    <span>Rápido: matching en 24-72h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-semantic-success flex-shrink-0" />
                    <span>Sin comisiones mensuales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                    <span>Firma desde el móvil</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-brand-primary hover:bg-blue-600 text-white"
                >
                  Buscar garaje
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Parker Card */}
            <Card className="role-selector-button hover-lift border-0 shadow-md p-8 text-center cursor-pointer transition-all duration-200" 
                  onClick={() => handleParkerCTA('parker-onboarding')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleParkerCTA('parker-onboarding')}
                  aria-label="Publicar garaje como propietario">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="h-10 w-10 text-brand-secondary" />
                </div>
                <CardTitle className="text-2xl mb-4 text-left">Para Parkers</CardTitle>
                <p className="text-gray-600 mb-6 text-left">
                  Monetiza tu plaza disponible
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-semantic-success flex-shrink-0" />
                    <span>Ingresos extra hasta €120/mes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-brand-primary flex-shrink-0" />
                    <span>Control total y seguridad</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                    <span>Firma desde el móvil</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white"
                >
                  Publicar garaje
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works - Zone 3: Medium Priority */}
      <section className="py-20 bg-white" aria-labelledby="how-it-works-title" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proceso simple en 4 pasos para propietarios y conductores
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Drivers */}
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Car className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900">
                  Para Conductores
                </h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Indica zona y fechas</h4>
                    <p className="text-gray-600">
                      Define tu ubicación preferida, horarios necesarios y presupuesto. 
                      Nuestro algoritmo encuentra el match perfecto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Recibe propuestas</h4>
                    <p className="text-gray-600">
                      Te notificamos cuando hay garajes disponibles que coinciden con tus criterios.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Visita y confirma</h4>
                    <p className="text-gray-600">
                      Contacta con el propietario, programa una visita y confirma que es lo que buscas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Firma el contrato en el móvil</h4>
                    <p className="text-gray-600">
                      Si hay acuerdo tras la visita, firma el contrato digital desde tu móvil y paga los 29,95€.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Parkers */}
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center mr-3">
                  <Home className="h-6 w-6 text-brand-secondary" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-gray-900">
                  Para Propietarios
                </h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Publica tu plaza</h4>
                    <p className="text-gray-600">
                      Añade fotos, disponibilidad horaria y precio. Te ayudamos con la valoración de mercado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Recibe solicitudes</h4>
                    <p className="text-gray-600">
                      Conductores interesados te contactan. Puedes revisar sus perfiles antes de decidir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Acordad visita</h4>
                    <p className="text-gray-600">
                      Coordina una visita para que el conductor vea la plaza y os conozcáis en persona.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Firma el contrato en el móvil</h4>
                    <p className="text-gray-600">
                      Si os ponéis de acuerdo, genera el contrato legal con un clic. Todo se gestiona digitalmente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('how-it-works')}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-enhanced"
            >
              Ver guía completa
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Zone 3: Medium Priority */}
      <section 
        id="testimonials-section"
        className="py-20 bg-gray-50" 
        aria-labelledby="testimonials-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="testimonials-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Más de 1.000 personas confían en Parkiduo para sus necesidades de aparcamiento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="testimonial-card hover-lift border-0 shadow-md p-6"
                onLoad={() => analytics.trackTestimonialView(index)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge className="ml-auto bg-brand-primary/10 text-brand-primary">
                      {testimonial.role}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.city}</div>
                    </div>
                    
                    {testimonial.savings && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Ahorra</div>
                        <div className="font-bold text-semantic-success">{testimonial.savings}</div>
                      </div>
                    )}
                    
                    {testimonial.income && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Ingresos</div>
                        <div className="font-bold text-semantic-success">{testimonial.income}</div>
                      </div>
                    )}
                    
                    {testimonial.experience && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Ventaja</div>
                        <div className="font-bold text-brand-primary">{testimonial.experience}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                analytics.trackTrustBadgeClick('all-reviews');
                window.open('https://g.page/parkiduo/review', '_blank');
              }}
              className="inline-flex items-center gap-2 text-brand-primary hover:text-blue-600 transition-colors focus-enhanced"
            >
              <span>Ver todas las opiniones</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Cities Section - Zone 3: Medium Priority */}
      <section 
        id="cities-section"
        className="py-20 bg-white" 
        aria-labelledby="cities-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="cities-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Ciudades disponibles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expandiéndonos por España con alta demanda en estas ubicaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <Card 
                key={index} 
                className="city-card hover-lift cursor-pointer border-0 shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={() => handleCityClick(city.slug, city.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCityClick(city.slug, city.name)}
                aria-label={`Ver garajes en ${city.name}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                    <MapPin className="h-5 w-5 text-brand-primary" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {city.seoDescription}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Garajes</span>
                      <span className="font-medium text-semantic-success">{city.garages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Demanda</span>
                      <span className="font-medium text-brand-primary">{city.demands}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Precio medio</span>
                      <span className="font-medium text-gray-900">{city.avgPrice}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <Badge className={`${
                      city.demandLevel === 'Alta' 
                        ? 'bg-semantic-success/10 text-semantic-success border-semantic-success/20' 
                        : 'bg-semantic-warn/10 text-semantic-warn border-semantic-warn/20'
                    }`}>
                      {city.demandLevel} demanda
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('cities')}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-enhanced"
            >
              Ver todas las ciudades
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section - Zone 4: Low Priority */}
      <section className="py-20 bg-gray-50" aria-labelledby="faq-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Resolvemos tus dudas sobre el proceso y funcionamiento
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid gap-4">
              {[
                {
                  question: "¿Cuándo pago?",
                  answer: "Solo si hay acuerdo: 29,95€ por contrato. Si no hay match, no pagas nada."
                },
                {
                  question: "¿Hay comisión mensual?",
                  answer: "No. Solo cobras el pago mensual acordado. Sin comisiones adicionales."
                },
                {
                  question: "¿Cómo se firma?",
                  answer: "Firma digital desde el móvil en la visita. Todo el proceso es digital y seguro."
                },
                {
                  question: "¿Qué pasa si no hay acuerdo?",
                  answer: "No hay coste. El pago de 29,95€ solo se cobra cuando ambas partes firman el contrato."
                },
                {
                  question: "¿Es seguro?",
                  answer: "Sí. Verificaciones básicas de identidad, contratos legales y soporte humano durante todo el proceso."
                },
                {
                  question: "¿Puedo cancelar?",
                  answer: "Sí, puedes cancelar en cualquier momento antes de firmar el contrato sin coste alguno."
                }
              ].map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <button
                      className="w-full text-left flex items-center justify-between"
                      onClick={() => analytics.trackFAQToggle(faq.question)}
                      aria-expanded="false"
                    >
                      <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <ChevronRight className="h-5 w-5 text-gray-400 transform transition-transform" />
                    </button>
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('faq')}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-enhanced"
            >
              Ver todas las FAQ
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Zone 5: Very Low */}
      <Footer onNavigate={onNavigate} />

      {/* Cookie Banner */}
      <CookieBanner
        onAcceptAll={handleCookieAcceptAll}
        onRejectAll={handleCookieRejectAll}
        onConfigure={handleCookieConfigure}
        onNavigate={onNavigate}
      />

      {/* Cookie Preferences Modal */}
      <CookiePreferences
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
        onNavigate={onNavigate}
      />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50 mobile-sticky-cta">
        <div className="flex gap-2">
          <Button
            size="lg"
            onClick={() => handleDriverCTA('driver-onboarding')}
            className="flex-1 bg-brand-primary hover:bg-blue-600 text-white py-4 font-semibold focus-enhanced"
          >
            <Car className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleParkerCTA('parker-onboarding')}
            className="flex-1 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-4 font-semibold focus-enhanced"
          >
            <Home className="mr-2 h-4 w-4" />
            Publicar
          </Button>
        </div>
      </div>
    </div>
  );
}