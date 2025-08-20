import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Home, 
  TrendingUp, 
  Clock, 
  Sun, 
  Moon, 
  Users, 
  CheckCircle,
  Star,
  Calculator,
  FileText,
  ChevronRight,
  Target,
  Shield,
  Euro,
  Calendar
} from 'lucide-react';
import { analytics } from './analytics';

interface ParkerLandingProps {
  onNavigate: (page: string, options?: any) => void;
}

export function ParkerLanding({ onNavigate }: ParkerLandingProps) {
  useEffect(() => {
    analytics.trackPageView('parker_landing');
  }, []);

  // Rental types data
  const rentalTypes = [
    {
      id: '24h',
      title: '24 horas',
      icon: <Clock className="h-8 w-8" />,
      description: 'Un inquilino fijo',
      highlights: ['Mayor estabilidad', 'Ingresos constantes', 'Menos gestión'],
      priceRange: '€80-120/mes',
      color: 'bg-brand-primary/10 text-brand-primary'
    },
    {
      id: 'diurno',
      title: 'Diurno',
      icon: <Sun className="h-8 w-8" />,
      description: '8h-20h laborables',
      highlights: ['Flexibilidad personal', 'Uso nocturno libre', 'Precio competitivo'],
      priceRange: '€50-80/mes',
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 'nocturno', 
      title: 'Nocturno',
      icon: <Moon className="h-8 w-8" />,
      description: '20h-8h diarias',
      highlights: ['Uso diurno libre', 'Complemento perfecto', 'Alta demanda'],
      priceRange: '€40-70/mes',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'compartido',
      title: 'Compartido 24h',
      icon: <Users className="h-8 w-8" />,
      description: 'Dos inquilinos compatibles',
      highlights: ['Máximos ingresos', '+30-50% rentabilidad', 'Gestión Parkiduo'],
      priceRange: '€100-160/mes',
      color: 'bg-brand-secondary/10 text-brand-secondary',
      badge: 'Recomendado'
    }
  ];

  // Success stories
  const testimonials = [
    {
      name: 'Carlos M.',
      city: 'Barcelona',
      type: 'Compartido 24h',
      income: '€140/mes',
      quote: 'Con el modo compartido gano casi el doble. Parkiduo gestiona todo.',
      rating: 5
    },
    {
      name: 'Ana R.',
      city: 'Madrid',
      type: '24 horas',
      income: '€95/mes',
      quote: 'Ingresos fijos cada mes sin preocuparme de nada.',
      rating: 5
    },
    {
      name: 'Pedro L.',
      city: 'Valencia',
      type: 'Diurno',
      income: '€65/mes',
      quote: 'Perfecto para mi. Uso la plaza por las noches y gano dinero de día.',
      rating: 5
    }
  ];

  const handleRentalTypeClick = (typeId: string) => {
    analytics.trackEvent('landing_type_card_click', { type: typeId });
    // Scroll to how it works section or navigate to onboarding
    onNavigate('parker-onboarding', { initialType: typeId });
  };

  const handleStartOnboarding = () => {
    analytics.trackEvent('parker_onboard_start', { source: 'landing' });
    onNavigate('my-garages', { action: 'create' });
  };

  const handleContractExample = () => {
    analytics.trackEvent('landing_contract_view');
    // In a real app, this would open a modal with contract example
    window.open('/ejemplo-contrato.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-secondary/10 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Home className="h-4 w-4" />
              <span>Para Parkers</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-gray-900 leading-tight mb-6">
              Convierte tu plaza en{' '}
              <span className="text-brand-secondary">
                ingresos extra
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Monetiza tu plaza de garaje disponible con total seguridad. Desde €40 hasta €160 mensuales según modalidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={handleStartOnboarding}
                className="bg-brand-secondary hover:bg-teal-600 text-white px-8 py-4 text-lg font-semibold"
              >
                <Home className="mr-2 h-5 w-5" />
                Publicar mi garaje
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('how-it-works', { scrollToSection: 'parker-flow' })}
                className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-8 py-4 text-lg font-semibold"
              >
                <FileText className="mr-2 h-5 w-5" />
                Cómo funciona
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-semantic-success" />
                <span>Contratos legales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-semantic-success" />
                <span>Pagos garantizados</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-semantic-success" />
                <span>+500 parkers activos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Elige tu modalidad de alquiler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada plaza es única. Encuentra la modalidad que mejor se adapte a tu situación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {rentalTypes.map((type) => (
              <Card 
                key={type.id}
                className="relative cursor-pointer hover-lift border-0 shadow-md transition-all duration-200"
                onClick={() => handleRentalTypeClick(type.id)}
              >
                {type.badge && (
                  <div className="absolute -top-3 -right-3">
                    <Badge className="bg-brand-secondary text-white">
                      {type.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${type.color}`}>
                    {type.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                  <p className="text-sm text-gray-500 mb-2">{type.description}</p>
                  <div className="text-lg font-bold text-brand-secondary">
                    {type.priceRange}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {type.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-semantic-success flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue boost banner */}
          <div className="bg-gradient-to-r from-brand-secondary/10 to-brand-primary/10 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-brand-secondary" />
              <h3 className="text-xl font-bold text-gray-900">Modo Compartido 24h</h3>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              <strong>+30-50% de ingresos adicionales</strong> con dos inquilinos compatibles
            </p>
            <p className="text-sm text-gray-600">
              Parkiduo gestiona la compatibilidad de horarios y se encarga de toda la coordinación
            </p>
          </div>
        </div>
      </section>

      {/* How it Works for Parkers */}
      <section className="py-20 bg-gray-50" id="parker-flow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Cómo funciona para Parkers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proceso simple y seguro para empezar a generar ingresos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Publica tu plaza</h3>
              <p className="text-sm text-gray-600">
                Añade ubicación, disponibilidad y fotos. Te sugerimos el precio óptimo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recibe solicitudes</h3>
              <p className="text-sm text-gray-600">
                Conductores interesados te contactan. Revisas perfiles y eliges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Coordina visita</h3>
              <p className="text-sm text-gray-600">
                Programa una visita para conocer al conductor y mostrar la plaza.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Firma y cobra</h3>
              <p className="text-sm text-gray-600">
                Si hay acuerdo, genera el contrato legal desde el móvil y empiezas a cobrar.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={handleContractExample}
              variant="outline"
              className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white"
            >
              <FileText className="mr-2 h-4 w-4" />
              Ver ejemplo de contrato
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Casos de éxito reales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Parkers como tú ya están generando ingresos extra con Parkiduo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge className="bg-brand-secondary/10 text-brand-secondary">
                      {testimonial.type}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.city}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-secondary">
                        {testimonial.income}
                      </div>
                      <div className="text-xs text-gray-500">ingresos/mes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-secondary to-brand-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            ¿Listo para monetizar tu plaza?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Únete a cientos de parkers que ya generan ingresos extra con Parkiduo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleStartOnboarding}
              className="bg-white text-brand-secondary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Home className="mr-2 h-5 w-5" />
              Publicar mi garaje
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('how-it-works')}
              className="border-white text-white hover:bg-white hover:text-brand-secondary px-8 py-4 text-lg font-semibold"
            >
              Saber más
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75">
            Registro gratuito • Sin comisiones mensuales • Contratos legales
          </div>
        </div>
      </section>
    </div>
  );
}