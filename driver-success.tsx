import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Bell, 
  Search, 
  Clock,
  MapPin,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface DriverSuccessProps {
  onNavigate: (page: string) => void;
}

export function DriverSuccess({ onNavigate }: DriverSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-semantic-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            ¡Búsqueda creada con éxito!
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Te avisaremos cuando encontremos garajes que coincidan con tus criterios. 
            Mientras tanto, explora lo que puedes hacer en tu dashboard.
          </p>

          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 px-4 py-2">
            Tiempo estimado de match: 24-48 horas
          </Badge>
        </div>

        {/* Search Summary */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen de tu búsqueda
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Zona</p>
                  <p className="text-sm text-gray-600">Centro Madrid, 2km</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-brand-secondary" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Horario</p>
                  <p className="text-sm text-gray-600">24 horas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-semantic-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-semantic-success" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Presupuesto</p>
                  <p className="text-sm text-gray-600">Hasta 80€/mes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Insight */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Buenas noticias sobre tu zona
                </h3>
                <p className="text-gray-700 mb-4">
                  En Centro Madrid hay <strong>47 garajes activos</strong> y una 
                  <strong> demanda alta</strong> que asegura múltiples opciones. 
                  El precio promedio es de <strong>85€/mes</strong>.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Garajes disponibles:</span>
                    <span className="font-semibold text-semantic-success ml-2">47</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tiempo promedio:</span>
                    <span className="font-semibold text-brand-primary ml-2">2 días</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover-lift cursor-pointer" onClick={() => onNavigate('driver-dashboard')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Ver mi dashboard</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Gestiona tus búsquedas, ve el estado de solicitudes y actualiza tus preferencias.
              </p>
              <div className="flex items-center text-brand-primary">
                <span className="text-sm font-medium">Ir al dashboard</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Configurar notificaciones</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Recibe alertas por email y WhatsApp cuando aparezcan garajes compatibles.
              </p>
              <Button variant="outline" size="sm" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                Configurar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* What happens next */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ¿Qué pasa ahora?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Te notificaremos de matches</h4>
                  <p className="text-sm text-gray-600">
                    Cuando encuentres garajes compatibles, recibirás un email y notificación push
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Solicita visitas</h4>
                  <p className="text-sm text-gray-600">
                    Podrás ver los detalles del garaje y solicitar una visita directamente al propietario
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Confirma y paga</h4>
                  <p className="text-sm text-gray-600">
                    Si hay match tras la visita, genera el contrato y realiza el pago único seguro
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button
            size="lg"
            onClick={() => onNavigate('driver-dashboard')}
            className="bg-brand-primary hover:bg-blue-600 text-white px-8"
          >
            Ir a mi dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('how-it-works')}
              className="text-gray-600 hover:text-brand-primary"
            >
              Ver guía completa
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate('faq')}
              className="text-gray-600 hover:text-brand-primary"
            >
              Preguntas frecuentes
            </Button>
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            ¿Tienes dudas o necesitas cambiar algo?
          </p>
          <Button variant="outline" size="sm">
            Contactar soporte
          </Button>
        </div>
      </div>
    </div>
  );
}