import { useState } from 'react';
import { AuthCard } from './auth-card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Shield, RefreshCw, Loader2 } from 'lucide-react';

interface CaptchaPageProps {
  onNavigate: (page: string, options?: any) => void;
  returnTo?: string;
  reason?: 'security' | 'attempts' | 'suspicious';
}

export function CaptchaPage({ onNavigate, returnTo = 'login', reason = 'security' }: CaptchaPageProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleCaptchaVerification = async () => {
    setLoading(true);
    
    try {
      // Simulate CAPTCHA verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 90% success rate for demo
      if (Math.random() > 0.1) {
        setIsVerified(true);
        toast.success('Verificación completada');
        
        // Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'captcha_completed', {
            event_category: 'security',
            event_label: reason
          });
        }
        
        // Auto-redirect after verification
        setTimeout(() => {
          onNavigate(returnTo, { captchaVerified: true });
        }, 1500);
        
      } else {
        throw new Error('Verification failed');
      }
      
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        toast.error('Demasiados intentos. Contacta con soporte.');
        setTimeout(() => {
          onNavigate('account-blocked', { reason: 'security' });
        }, 2000);
      } else {
        toast.error('Verificación fallida. Inténtalo de nuevo.');
        setIsVerified(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshCaptcha = () => {
    setIsVerified(false);
    toast.info('CAPTCHA actualizado');
  };

  const getReasonText = () => {
    switch (reason) {
      case 'attempts':
        return 'Múltiples intentos de acceso detectados';
      case 'suspicious':
        return 'Actividad sospechosa detectada';
      default:
        return 'Verificación de seguridad requerida';
    }
  };

  if (isVerified) {
    return (
      <AuthCard
        title="¡Verificación completada!"
        subtitle="Redirigiendo..."
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-semantic-success/10 rounded-full mx-auto flex items-center justify-center">
            <Shield className="w-8 h-8 text-semantic-success" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              Has pasado la verificación de seguridad correctamente.
            </p>
            <p className="text-sm text-gray-600">
              Continuando con tu solicitud...
            </p>
          </div>

          <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verificación de seguridad"
      subtitle={getReasonText()}
    >
      <div className="space-y-6">
        {/* Security notice */}
        <div className="text-center">
          <div className="w-16 h-16 bg-semantic-warn/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-8 h-8 text-semantic-warn" />
          </div>
          <p className="text-gray-600">
            Para proteger tu cuenta y nuestra plataforma, necesitamos verificar que eres humano.
          </p>
        </div>

        {/* Mock CAPTCHA */}
        <div className="p-6 border-2 border-gray-200 rounded-lg bg-gray-50">
          <div className="space-y-4">
            {/* CAPTCHA Challenge */}
            <div className="text-center">
              <div className="w-full h-32 bg-white border rounded mb-4 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-2xl font-mono text-gray-700 mb-2 tracking-wider bg-gray-100 px-4 py-2 rounded">
                    8K4N7P
                  </div>
                  <p className="text-xs text-gray-500">Introduce el código de la imagen</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefreshCaptcha}
                  className="absolute top-2 right-2"
                  title="Actualizar CAPTCHA"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <input
                type="text"
                placeholder="Introduce el código"
                className="w-full p-3 border rounded-lg text-center font-mono uppercase tracking-wider"
                maxLength={6}
                disabled={loading}
              />
            </div>

            {/* reCAPTCHA-style checkbox */}
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="robot-check"
                checked={isVerified}
                onCheckedChange={(checked) => {
                  if (checked && !loading) {
                    handleCaptchaVerification();
                  }
                }}
                disabled={loading}
              />
              <label htmlFor="robot-check" className="text-sm font-medium cursor-pointer">
                No soy un robot
              </label>
              
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin text-brand-primary ml-auto" />
              )}
            </div>
          </div>
        </div>

        {/* Demo hint */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Para la demo, simplemente marca la casilla "No soy un robot"
          </p>
        </div>

        {/* Attempts warning */}
        {attempts > 0 && (
          <div className="p-4 bg-semantic-warn/10 border border-semantic-warn/20 rounded-lg">
            <p className="text-sm text-semantic-warn">
              {attempts === 1 ? 'Primer intento fallido' : 
               attempts === 2 ? 'Segundo intento fallido' : 
               'Último intento antes del bloqueo'}
            </p>
          </div>
        )}

        {/* Help */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            ¿Tienes problemas con la verificación?{' '}
            <button
              onClick={() => onNavigate('contact-support')}
              className="text-brand-primary hover:underline"
            >
              Contacta soporte
            </button>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}