import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Settings, 
  Clock, 
  MessageCircle,
  Twitter,
  Mail
} from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface MaintenancePageProps {
  onNavigate: (page: string) => void;
}

export function MaintenancePage({ onNavigate }: MaintenancePageProps) {
  const estimatedTime = new Date();
  estimatedTime.setHours(estimatedTime.getHours() + 2);

  const handleContactSupport = () => {
    window.open('mailto:soporte@parkiduo.com?subject=Consulta durante mantenimiento', '_blank');
  };

  const handleTwitter = () => {
    window.open('https://twitter.com/parkiduo', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-6 py-16">
        <main id="main-content" className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={parkiduoLogo} 
              alt="Parkiduo" 
              className="h-16 w-auto mx-auto mb-8"
            />
          </div>

          {/* Maintenance Icon */}
          <div className="w-24 h-24 bg-semantic-warn/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Settings className="w-12 h-12 text-semantic-warn animate-spin" />
          </div>

          {/* Header */}
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
            Mantenimiento programado
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Estamos mejorando Parkiduo para ofrecerte una mejor experiencia.
          </p>

          {/* Status Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-semantic-warn" />
                <h2 className="font-semibold text-gray-900">
                  Tiempo estimado de finalización
                </h2>
              </div>
              <p className="text-2xl font-bold text-semantic-warn mb-2">
                {estimatedTime.toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
              <p className="text-sm text-gray-600">
                Horario aproximado - te avisaremos cuando esté listo
              </p>
            </CardContent>
          </Card>

          {/* What's happening */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                ¿Qué estamos mejorando?
              </h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
                  Optimización del sistema de búsqueda
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
                  Mejoras en la velocidad de carga
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
                  Nuevas funcionalidades de seguridad
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
                  Actualización de la base de datos
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                ¿Necesitas ayuda urgente?
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={handleContactSupport}
                  className="w-full btn-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar email de soporte
                </Button>
                <Button
                  variant="outline"
                  onClick={handleTwitter}
                  className="w-full btn-lg"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Síguenos en Twitter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thank you message */}
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-6">
            <h3 className="font-semibold text-brand-primary mb-2">
              Gracias por tu paciencia
            </h3>
            <p className="text-sm text-gray-600">
              Sabemos que es molesto, pero estas mejoras harán que Parkiduo sea aún mejor. 
              Te avisaremos tan pronto como esté disponible.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}