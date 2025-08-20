import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  CheckCircle,
  Download,
  Mail,
  Calendar,
  MessageCircle,
  ArrowRight,
  Share2,
  Star,
  MapPin,
  Euro
} from 'lucide-react';

interface ContractSuccessProps {
  onNavigate: (page: string, options?: any) => void;
  userType: 'parker' | 'driver' | 'admin' | null;
}

export function ContractSuccess({ onNavigate, userType }: ContractSuccessProps) {
  const contractNumber = `PKD-${Date.now().toString().slice(-6)}`;
  const garageTitle = 'Plaza céntrica Malasaña';
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7);

  const handleDownloadContract = () => {
    // Mock contract download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Contrato de alquiler de plaza de garaje...';
    element.download = `contrato-${contractNumber}.pdf`;
    element.click();
  };

  const handleContactOwner = () => {
    // Open WhatsApp or contact modal
    window.open('https://wa.me/34666666666?text=Hola%2C%20soy%20el%20nuevo%20inquilino%20de%20tu%20plaza%20de%20garaje', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'He alquilado una plaza con Parkiduo',
        text: '¡Ya tengo mi plaza de garaje! Te recomiendo Parkiduo para encontrar la tuya.',
        url: window.location.origin
      });
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(`¡Ya tengo mi plaza de garaje! Te recomiendo Parkiduo: ${window.location.origin}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-6 py-8">
        <main id="main-content" className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-semantic-success" />
            </div>
            <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-4">
              ¡Contrato firmado con éxito!
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Tu plaza de garaje ya está reservada
            </p>
            <Badge className="bg-semantic-success text-white">
              Contrato #{contractNumber}
            </Badge>
          </div>

          {/* Contract Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                Resumen del contrato
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900">{garageTitle}</h3>
                    <p className="text-gray-600">Calle Fuencarral, 45, Madrid</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Inicio</p>
                      <p className="font-medium">{startDate.toLocaleDateString('es-ES')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Precio</p>
                      <p className="font-medium">120€/mes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
                Próximos pasos
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-brand-primary/5 rounded-lg">
                  <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Descarga tu contrato</h4>
                    <p className="text-sm text-gray-600">También lo enviaremos por email</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contacta con el propietario</h4>
                    <p className="text-sm text-gray-600">Coordina la entrega de llaves y acceso</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">¡Empieza a usar tu plaza!</h4>
                    <p className="text-sm text-gray-600">Desde el {startDate.toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={handleDownloadContract}
                className="btn-primary btn-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar contrato
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleContactOwner}
                className="btn-lg"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar propietario
              </Button>
            </div>

            <Button 
              variant="outline"
              onClick={handleShare}
              className="w-full btn-lg"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir mi experiencia
            </Button>
          </div>

          {/* Email Confirmation */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary" />
                <div>
                  <p className="font-medium text-gray-900">Confirmación enviada</p>
                  <p className="text-sm text-gray-600">
                    Hemos enviado toda la información a tu email
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Request */}
          <Card className="mb-8 bg-gradient-to-r from-semantic-warn/10 to-semantic-warn/5 border-semantic-warn/20">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-semantic-warn mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Qué te ha parecido el proceso?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tu opinión nos ayuda a mejorar la experiencia para todos
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="w-8 h-8 rounded-full border border-semantic-warn/30 hover:bg-semantic-warn hover:text-white transition-colors"
                    aria-label={`Valorar con ${rating} estrella${rating !== 1 ? 's' : ''}`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center">
            <Button 
              onClick={() => onNavigate(userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard')}
              className="btn-primary btn-lg"
            >
              Ir a mi dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}