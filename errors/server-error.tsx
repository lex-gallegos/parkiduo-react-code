import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  RefreshCw, 
  Home, 
  MessageCircle,
  AlertTriangle
} from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface ServerErrorPageProps {
  onNavigate: (page: string) => void;
}

export function ServerErrorPage({ onNavigate }: ServerErrorPageProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleContactSupport = () => {
    window.open('https://wa.me/34666666666?text=Hola%2C%20tengo%20un%20problema%20técnico%20en%20Parkiduo', '_blank');
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

          {/* Error Icon */}
          <div className="w-24 h-24 bg-semantic-danger/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-semantic-danger" />
          </div>

          {/* Error Message */}
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
            Error del servidor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Estamos experimentando problemas técnicos. Por favor, inténtalo de nuevo en unos minutos.
          </p>

          {/* Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-poppins text-lg font-semibold text-gray-900 mb-4">
                ¿Qué puedes hacer?
              </h2>
              <div className="space-y-4">
                <Button
                  onClick={handleRefresh}
                  className="btn-primary btn-lg w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recargar página
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('home')}
                    className="btn-lg"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Ir al inicio
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleContactSupport}
                    className="btn-lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar soporte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Si el problema persiste:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Verifica tu conexión a internet</li>
              <li>• Limpia la caché de tu navegador</li>
              <li>• Intenta acceder desde otro dispositivo</li>
              <li>• Contacta con nuestro equipo de soporte</li>
            </ul>
          </div>

          {/* Error Code */}
          <p className="text-sm text-gray-500 mt-8">
            Error 500 - Error interno del servidor
          </p>
        </main>
      </div>
    </div>
  );
}