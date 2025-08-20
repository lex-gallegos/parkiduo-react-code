import { useState } from 'react';
import { AuthCard } from './auth-card';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Clock, RefreshCw, LogIn } from 'lucide-react';

interface SessionExpiredPageProps {
  onNavigate: (page: string, options?: any) => void;
  returnTo?: string;
  action?: string;
}

export function SessionExpiredPage({ 
  onNavigate, 
  returnTo,
  action = 'continuar'
}: SessionExpiredPageProps) {
  const [loading, setLoading] = useState(false);

  const handleReauth = async () => {
    setLoading(true);
    
    try {
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'reauth_required', {
          event_category: 'auth',
          event_label: action
        });
      }

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to login with return context
      onNavigate('login', { 
        redirectTo: returnTo,
        reauthReason: action,
        message: 'Por seguridad, necesitas iniciar sesión de nuevo'
      });
      
    } catch (error) {
      toast.error('Error al redirigir');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    onNavigate('home');
  };

  return (
    <AuthCard
      title="Sesión expirada"
      subtitle={`Para ${action}, necesitas iniciar sesión de nuevo`}
    >
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 bg-semantic-warn/10 rounded-full mx-auto flex items-center justify-center">
          <Clock className="w-8 h-8 text-semantic-warn" />
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          <p className="text-gray-700">
            Tu sesión ha expirado por seguridad.
          </p>
          <p className="text-sm text-gray-600">
            Inicia sesión de nuevo para continuar con: <strong>{action}</strong>
          </p>
        </div>

        {/* Security info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900">
                ¿Por qué expiran las sesiones?
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Por tu seguridad, las sesiones expiran después de un período de inactividad. 
                Esto protege tu cuenta si olvidas cerrar sesión.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handleReauth}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Redirigiendo...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Iniciar sesión
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleGoHome}
            className="w-full"
          >
            Volver al inicio
          </Button>
        </div>

        {/* Help */}
        <div className="pt-4 border-t text-sm text-gray-500">
          <p>
            ¿Problemas para acceder?{' '}
            <button
              onClick={() => onNavigate('forgot-password')}
              className="text-brand-primary hover:underline"
            >
              Recuperar contraseña
            </button>
            {' '}o{' '}
            <button
              onClick={() => onNavigate('contact-support')}
              className="text-brand-primary hover:underline"
            >
              contactar soporte
            </button>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}