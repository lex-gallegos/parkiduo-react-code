import image_af6598debc61d56bb4c06bf98a6e360231169767 from 'figma:asset/af6598debc61d56bb4c06bf98a6e360231169767.png';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Footer } from './footer';
import { WhatsAppCTA } from './whatsapp-cta';
import { CookieBanner } from './legal/cookie-banner';
import { CookiePreferences } from './legal/cookie-preferences';
import { 
  Car, 
  Home, 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  MapPin, 
  Star,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const handleCookieAcceptAll = () => {
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: true,
      advertising: true
    };
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
  };

  const handleCookieRejectAll = () => {
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: false,
      advertising: false
    };
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
  };

  const handleCookieConfigure = () => {
    setShowCookiePreferences(true);
  };
  const cities = [
    { name: 'Madrid', garages: 1240, demands: 3200 },
    { name: 'Barcelona', garages: 890, demands: 2100 },
    { name: 'Valencia', garages: 450, demands: 1200 },
    { name: 'Sevilla', garages: 320, demands: 850 },
  ];

  const testimonials = [
    {
      name: 'María González',
      type: 'Propietaria',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=64&h=64&fit=crop&crop=face',
      text: 'Rentabilizo mi garaje que estaba vacío. Ya llevo 3 contratos cerrados sin complicaciones.',
      rating: 5
    },
    {
      name: 'Carlos Ruiz',
      type: 'Conductor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      text: 'Encontré garaje cerca de mi trabajo en menos de 48h. El proceso es súper sencillo.',
      rating: 5
    },
    {
      name: 'Ana Martín',
      type: 'Propietaria',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      text: 'La plataforma se encarga de todo: contratos, pagos y comunicación. Muy recomendable.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 md:py-32 bg-[rgba(0,0,0,1)]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 text-sm px-3 py-1">
                  Nuevo en España
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight">
                  Descubre la nueva forma de{' '}
                  <span className="text-brand-primary">alquilar un garaje</span>
                  : compartirlo
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Conecta con conductores compatibles y reduce gastos. 
                  Plataforma segura con contratos y pagos protegidos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  onClick={() => onNavigate('driver-onboarding')}
                  className="bg-brand-primary hover:bg-blue-600 text-white px-12 py-6 text-xl font-bold hover-lift h-16 min-w-[240px]"
                >
                  <Car className="mr-3 h-8 w-8" />
                  Solicitar garaje
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('parker-onboarding')}
                  className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-12 py-6 text-xl font-bold hover-lift h-16 min-w-[240px]"
                >
                  <Home className="mr-3 h-6 w-6" />
                  Publicar garaje
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-semantic-success" />
                  <span>Contratos legales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-semantic-success" />
                  <span>Pagos seguros</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-semantic-success" />
                  <span>Sin intermediarios</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <ImageWithFallback
                  src={image_af6598debc61d56bb4c06bf98a6e360231169767}
                  alt="Plaza de garaje en sótano iluminado"
                  className="shadow-2xl rounded-[20px]"
                  width={600}
                  height={400}
                />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-semantic-success rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Disponible</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Centro Madrid</p>
                <p className="text-lg font-bold text-brand-primary">85€/mes</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">4.9</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">+200 reseñas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              ¿Por qué elegir Parkiduo?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simplificamos el proceso de compartir garajes con tecnología y confianza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Seguro</h3>
                <p className="text-gray-600 text-sm">
                  Contratos legales, verificación de identidad y pagos protegidos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-brand-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rápido</h3>
                <p className="text-gray-600 text-sm">
                  Matching inteligente y contrato generado en 24-48 horas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-semantic-success" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rentable</h3>
                <p className="text-gray-600 text-sm">
                  Propietarios ganan hasta 120€/mes extra por plaza compartida
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-semantic-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-semantic-info" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidad</h3>
                <p className="text-gray-600 text-sm">
                  Red de confianza con perfiles verificados y reseñas reales
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proceso simple en 3 pasos para propietarios y conductores
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Owners */}
            <div>
              <div className="flex items-center mb-8">
                <Home className="h-6 w-6 text-brand-primary mr-3" />
                <h3 className="text-2xl font-poppins font-bold text-gray-900">
                  Para Propietarios
                </h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Publica tu garaje</h4>
                    <p className="text-gray-600">
                      Añade fotos, disponibilidad horaria y precio sugerido. 
                      Te ayudamos con la valoración de mercado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recibe solicitudes</h4>
                    <p className="text-gray-600">
                      Conductores interesados te contactan. Puedes aprobar visitas 
                      y conocer a tu futuro inquilino.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Genera el contrato</h4>
                    <p className="text-gray-600">
                      Tras la visita, crea el contrato legal con un clic. 
                      Pago seguro y documentación automática.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Drivers */}
            <div>
              <div className="flex items-center mb-8">
                <Car className="h-6 w-6 text-brand-secondary mr-3" />
                <h3 className="text-2xl font-poppins font-bold text-gray-900">
                  Para Conductores
                </h3>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Define tu búsqueda</h4>
                    <p className="text-gray-600">
                      Zona preferida, horarios necesarios y presupuesto. 
                      Algoritmo inteligente para matching perfecto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solicita visitas</h4>
                    <p className="text-gray-600">
                      Te notificamos cuando hay garajes disponibles. 
                      Contacta directamente con el propietario.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Confirma y paga</h4>
                    <p className="text-gray-600">
                      Si hay match tras la visita, firma el contrato digital 
                      y realiza el pago único seguro.
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
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              Ver guía completa
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Ciudades disponibles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expandiéndonos por España con alta demanda en estas ubicaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city, index) => (
              <Card key={index} className="hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                    <MapPin className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Garajes</span>
                      <span className="font-medium text-semantic-success">{city.garages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Demanda</span>
                      <span className="font-medium text-brand-primary">{city.demands}</span>
                    </div>
                  </div>
                  <Badge className="mt-3 bg-semantic-success/10 text-semantic-success">
                    Alta demanda
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => onNavigate('cities')}
              variant="outline"
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              Ver todas las ciudades
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Más de 500 contratos exitosos en los últimos 6 meses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a cientos de propietarios y conductores que ya confían en Parkiduo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onNavigate('driver-onboarding')}
              className="bg-white text-brand-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Car className="mr-2 h-5 w-5" />
              Necesito garaje
            </Button>
            <Button
              size="lg"
              onClick={() => onNavigate('parker-onboarding')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-primary px-8 py-4 text-lg font-semibold"
            >
              <Home className="mr-2 h-5 w-5" />
              Tengo garaje
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
      
      {/* WhatsApp CTA */}
      <WhatsAppCTA show={true} />

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
    </div>
  );
}