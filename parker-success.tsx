import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock,
  ArrowRight,
  Share2,
  Settings,
  Eye,
  MessageSquare,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ParkerSuccessProps {
  onNavigate: (page: string) => void;
}

export function ParkerSuccess({ onNavigate }: ParkerSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const marketInsights = {
    zoneActivity: 'alta',
    averageResponseTime: '4 horas',
    estimatedRequests: '3-5',
    nearbyGarages: 23
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 py-12 relative overflow-hidden">
      {/* Subtle confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-brand-primary rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-16 right-1/3 w-1 h-1 bg-brand-secondary rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-8 right-1/4 w-1.5 h-1.5 bg-semantic-success rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-12 left-1/3 w-1 h-1 bg-semantic-warn rounded-full animate-pulse opacity-60"></div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl relative z-20">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-semantic-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="h-14 w-14 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            ¡Garaje publicado!
          </h1>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-5 w-5 text-semantic-success" />
            <p className="text-xl text-gray-600">
              Listo. Empieza a recibir solicitudes
            </p>
            <Sparkles className="h-5 w-5 text-semantic-success" />
          </div>

          <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 px-6 py-2 text-lg">
            Activo y visible para conductores
          </Badge>
        </div>

        {/* Market Insights */}
        <Card className="mb-8 shadow-lg border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Excelentes noticias para tu zona
                </h3>
                <p className="text-gray-700 mb-4">
                  Tu garaje está en una zona de <strong>demanda {marketInsights.zoneActivity}</strong> con 
                  <strong> {marketInsights.nearbyGarages} garajes activos</strong>. Los propietarios reciben solicitudes 
                  en promedio cada <strong>{marketInsights.averageResponseTime}</strong>.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-semantic-success" />
                    <div>
                      <span className="text-gray-600">Respuesta promedio:</span>
                      <div className="font-semibold text-semantic-success">{marketInsights.averageResponseTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-brand-primary" />
                    <div>
                      <span className="text-gray-600">Solicitudes esperadas:</span>
                      <div className="font-semibold text-brand-primary">{marketInsights.estimatedRequests} en 48h</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-brand-secondary" />
                    <div>
                      <span className="text-gray-600">Competencia:</span>
                      <div className="font-semibold text-brand-secondary">{marketInsights.nearbyGarages} garajes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover-lift cursor-pointer" onClick={() => onNavigate('parker-dashboard')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Ver mi dashboard</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Gestiona solicitudes, edita tu anuncio y ve las estadísticas de visualizaciones.
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
                <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-brand-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Compartir anuncio</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Acelera las solicitudes compartiendo tu garaje en redes sociales o con conocidos.
              </p>
              <Button variant="outline" size="sm" className="border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white">
                Compartir link
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-semantic-info/10 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-semantic-info" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Optimizar anuncio</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ajusta precio, fotos o disponibilidad en cualquier momento para maximizar solicitudes.
              </p>
              <Button variant="outline" size="sm" className="border-semantic-info text-semantic-info hover:bg-semantic-info hover:text-white">
                Editar garaje
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Gestión de visitas</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Cuando recibas solicitudes, podrás aprobar visitas y coordinar directamente.
              </p>
              <Button variant="outline" size="sm" className="border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                Ver guía
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Process Timeline */}
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
                  <h4 className="font-medium text-gray-900">Conductores ven tu anuncio</h4>
                  <p className="text-sm text-gray-600">
                    Tu garaje aparece en búsquedas de conductores compatibles según ubicación y horarios
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Recibes solicitudes de visita</h4>
                  <p className="text-sm text-gray-600">
                    Te notificamos por email y app. Puedes ver perfiles y aprobar las visitas que te interesen
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Coordinas y realizas visitas</h4>
                  <p className="text-sm text-gray-600">
                    Contactas directamente con el conductor para coordinar día y hora de la visita
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="text-white h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Generas el contrato</h4>
                  <p className="text-sm text-gray-600">
                    Si hay match, creas el contrato legal con un clic y recibes el pago seguro
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              💡 Consejos para maximizar solicitudes
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Responde solicitudes en menos de 6 horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Mantén fotos actualizadas y bien iluminadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Sé flexible con los horarios de visita</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Define normas claras desde el principio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Ajusta precio según demanda de la zona</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <span>Mantén el garaje limpio y accesible</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            size="lg"
            onClick={() => onNavigate('parker-dashboard')}
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
              Guía completa propietarios
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

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            ¿Necesitas ayuda o tienes dudas?
          </p>
          <Button variant="outline" size="sm">
            Contactar soporte 24/7
          </Button>
        </div>
      </div>
    </div>
  );
}