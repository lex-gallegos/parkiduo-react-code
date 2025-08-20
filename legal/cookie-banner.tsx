import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { X, Settings, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CookieBannerProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onConfigure: () => void;
  onNavigate: (page: string) => void;
}

export function CookieBanner({ onAcceptAll, onRejectAll, onConfigure, onNavigate }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('parkiduo_cookie_consent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = (action: 'accept' | 'reject' | 'configure') => {
    setIsClosing(true);
    
    setTimeout(() => {
      setIsVisible(false);
      
      switch (action) {
        case 'accept':
          onAcceptAll();
          toast.success('Preferencias guardadas: todas las cookies aceptadas');
          break;
        case 'reject':
          onRejectAll();
          toast.success('Preferencias guardadas: solo cookies técnicas');
          break;
        case 'configure':
          onConfigure();
          break;
      }
    }, 150);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/20 z-40 md:hidden" />
      
      {/* Banner */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ${
          isClosing ? 'translate-y-full' : 'translate-y-0'
        }`}
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h2 id="cookie-banner-title" className="font-medium text-gray-900 mb-2">
                    Usamos cookies para mejorar tu experiencia
                  </h2>
                  <p id="cookie-banner-description" className="text-sm text-gray-600 leading-relaxed">
                    Usamos cookies para mejorar tu experiencia, analizar el tráfico y mostrar publicidad personalizada. 
                    Puedes aceptar, rechazar o configurar tus preferencias.
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 text-sm">
                <button
                  onClick={() => onNavigate('cookies')}
                  className="text-brand-primary hover:underline font-medium"
                >
                  Leer política completa
                </button>
                <button
                  onClick={() => onConfigure()}
                  className="text-brand-primary hover:underline font-medium"
                >
                  Ver detalles y configurar
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <Button
                variant="ghost"
                onClick={() => handleClose('reject')}
                className="btn btn-md order-2 sm:order-1"
              >
                Rechazar todo
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleClose('configure')}
                className="btn btn-md order-3 sm:order-2"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurar
              </Button>
              
              <Button
                onClick={() => handleClose('accept')}
                className="btn btn-primary btn-md order-1 sm:order-3"
              >
                Aceptar todo
              </Button>
            </div>
          </div>

          {/* Close button for desktop */}
          <button
            onClick={() => handleClose('configure')}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors hidden lg:block"
            aria-label="Configurar cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile close indicator */}
        <div className="bg-gray-100 py-2 lg:hidden">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>
      </div>
    </>
  );
}