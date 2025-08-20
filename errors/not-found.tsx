import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Home, 
  Search, 
  ArrowLeft,
  FileQuestion,
  MapPin
} from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
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
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FileQuestion className="w-12 h-12 text-gray-400" />
          </div>

          {/* Error Message */}
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-4">
            Página no encontrada
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La página que buscas no existe o ha sido movida.
          </p>

          {/* Suggested Actions */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-poppins text-lg font-semibold text-gray-900 mb-4">
                ¿Qué puedes hacer?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('home')}
                  className="btn-lg justify-start"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir al inicio
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('explore-garages')}
                  className="btn-lg justify-start"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar garajes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('cities')}
                  className="btn-lg justify-start"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver ciudades
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="btn-lg justify-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Página anterior
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Code */}
          <p className="text-sm text-gray-500">
            Error 404 - Página no encontrada
          </p>
        </main>
      </div>
    </div>
  );
}