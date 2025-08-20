import { useState, useEffect } from 'react';
import { AuthCard } from './auth-card';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Mail, RefreshCw, Edit, CheckCircle, AlertCircle } from 'lucide-react';

interface VerifyEmailPageProps {
  onNavigate: (page: string, options?: any) => void;
  email?: string;
  type?: 'login' | 'register';
  role?: 'parker' | 'driver' | 'both';
  redirectTo?: string;
  method?: 'magic-link' | 'password';
}

export function VerifyEmailPage({ 
  onNavigate, 
  email = 'tu@correo.com',
  type = 'login',
  role,
  redirectTo,
  method = 'magic-link'
}: VerifyEmailPageProps) {
  const [resendCount, setResendCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  // Simulate email verification check (in real app, this would be handled by magic link)
  useEffect(() => {
    // Simulate verification after 5 seconds for demo
    const timer = setTimeout(() => {
      if (Math.random() > 0.3) { // 70% success rate for demo
        handleVerificationSuccess();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleVerificationSuccess = () => {
    setVerified(true);
    toast.success('¡Email verificado correctamente!');

    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type === 'register' ? 'signup_completed' : 'login_completed', {
        event_category: 'auth',
        method: 'email_verification'
      });
    }

    // Redirect after success
    setTimeout(() => {
      if (type === 'register') {
        onNavigate('complete-profile', { 
          userType: role, 
          redirectTo,
          verified: true 
        });
      } else {
        if (redirectTo) {
          onNavigate(redirectTo, { userType: role || 'driver' });
        } else {
          onNavigate(`${role || 'driver'}-dashboard`, { userType: role || 'driver' });
        }
      }
    }, 2000);
  };

  const handleResend = async () => {
    if (resendCount >= 3) {
      toast.error('Máximo de reenvíos alcanzado. Contacta soporte si necesitas ayuda.');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendCount(resendCount + 1);
      setCooldownTime(30); // 30 second cooldown
      
      toast.success('Enlace reenviado correctamente');

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'email_resent', {
          event_category: 'auth',
          event_label: `attempt_${resendCount + 1}`
        });
      }
      
    } catch (error) {
      toast.error('Error al reenviar el enlace');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    onNavigate(type === 'register' ? 'register' : 'login', { redirectTo });
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    
    const maskedLocal = local[0] + '•'.repeat(Math.max(0, local.length - 2)) + local[local.length - 1];
    const [domainName, extension] = domain.split('.');
    const maskedDomain = domainName.length > 3 ? 
      domainName.substring(0, 2) + '•'.repeat(domainName.length - 2) :
      domainName;
    
    return `${maskedLocal}@${maskedDomain}.${extension}`;
  };

  if (verified) {
    return (
      <AuthCard
        title="¡Email verificado!"
        subtitle="Tu email ha sido verificado correctamente"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-semantic-success/10 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-semantic-success" />
          </div>

          <div>
            <p className="text-gray-600 mb-4">
              {type === 'register' 
                ? 'Te estamos redirigiendo para completar tu perfil...'
                : 'Te damos la bienvenida de vuelta. Redirigiendo...'
              }
            </p>
            
            <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Verifica tu email"
      subtitle={type === 'register' ? 'Ya casi terminamos' : 'Último paso para acceder'}
    >
      <div className="text-center space-y-6">
        {/* Email Icon */}
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full mx-auto flex items-center justify-center">
          <Mail className="w-8 h-8 text-brand-primary" />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <p className="text-gray-700">
            Te hemos enviado un enlace de verificación a:
          </p>
          <p className="font-medium text-gray-900">
            {maskEmail(email)}
          </p>
          <p className="text-sm text-gray-600">
            Ábrelo desde este dispositivo para {type === 'register' ? 'activar tu cuenta' : 'acceder'}.
          </p>
        </div>

        {/* Status */}
        <div className="p-4 bg-semantic-info/10 border border-semantic-info/20 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-semantic-info">
            <div className="w-4 h-4 border-2 border-semantic-info border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Esperando verificación...</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {/* Resend */}
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={loading || cooldownTime > 0 || resendCount >= 3}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Reenviando...
              </>
            ) : cooldownTime > 0 ? (
              `Reenviar en ${cooldownTime}s`
            ) : resendCount >= 3 ? (
              'Máximo de reenvíos alcanzado'
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reenviar enlace
              </>
            )}
          </Button>

          {/* Change Email */}
          <Button
            variant="ghost"
            onClick={handleChangeEmail}
            className="w-full"
          >
            <Edit className="w-4 h-4 mr-2" />
            Cambiar email
          </Button>
        </div>

        {/* Help */}
        <div className="pt-4 border-t text-sm text-gray-500">
          <p>¿No recibiste el email?</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Revisa tu carpeta de spam</li>
            <li>• Asegúrate de que el email sea correcto</li>
            <li>• El enlace expira en 10 minutos</li>
          </ul>
          
          {resendCount >= 3 && (
            <div className="mt-4 p-3 bg-semantic-warn/10 border border-semantic-warn/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-semantic-warn mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-semantic-warn font-medium">
                    ¿Sigues teniendo problemas?
                  </p>
                  <button
                    onClick={() => onNavigate('contact-support')}
                    className="text-xs text-semantic-warn hover:underline mt-1"
                  >
                    Contacta con soporte
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthCard>
  );
}