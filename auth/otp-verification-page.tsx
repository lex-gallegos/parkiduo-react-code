import { useState, useEffect } from 'react';
import { AuthCard } from './auth-card';
import { OTPInput } from './otp-input';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Smartphone, RefreshCw, Edit, CheckCircle } from 'lucide-react';

interface OTPVerificationPageProps {
  onNavigate: (page: string, options?: any) => void;
  phone?: string;
  type?: 'login' | 'register' | 'profile';
  redirectTo?: string;
}

export function OTPVerificationPage({ 
  onNavigate, 
  phone = '+34 600 123 456',
  type = 'register',
  redirectTo
}: OTPVerificationPageProps) {
  const [otpValue, setOtpValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(30);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (otpValue.length === 6 && !loading) {
      handleVerifyOTP();
    }
  }, [otpValue]);

  const handleVerifyOTP = async () => {
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate validation - accept '123456' as valid for demo
      if (otpValue === '123456' || Math.random() > 0.3) {
        setVerified(true);
        toast.success('¡Teléfono verificado correctamente!');

        // Analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'otp_verified', {
            event_category: 'auth',
            event_label: type
          });
        }

        // Redirect after success
        setTimeout(() => {
          if (type === 'profile') {
            onNavigate('profile', { section: 'contact', verified: true });
          } else if (redirectTo) {
            onNavigate(redirectTo);
          } else {
            onNavigate('complete-profile');
          }
        }, 2000);
        
      } else {
        throw new Error('Invalid OTP');
      }
      
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setError('Demasiados intentos fallidos. Solicita un nuevo código.');
        toast.error('Código bloqueado por seguridad');
      } else {
        setError(`Código incorrecto. Te quedan ${3 - newAttempts} intentos.`);
        toast.error('Código incorrecto');
      }

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'otp_failed', {
          event_category: 'auth',
          event_label: `attempt_${newAttempts}`
        });
      }

      setOtpValue('');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCount >= 3) {
      toast.error('Máximo de reenvíos alcanzado');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setResendCount(resendCount + 1);
      setCooldownTime(30);
      setAttempts(0);
      setError('');
      setOtpValue('');
      
      toast.success('Nuevo código enviado');

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'otp_resent', {
          event_category: 'auth',
          event_label: `attempt_${resendCount + 1}`
        });
      }
      
    } catch (error) {
      toast.error('Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhone = () => {
    if (type === 'profile') {
      onNavigate('profile', { section: 'contact' });
    } else {
      onNavigate(type === 'register' ? 'register' : 'login');
    }
  };

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return phone;
    
    const masked = digits.slice(0, -4).replace(/\d/g, '•') + digits.slice(-4);
    return phone.replace(/\d/g, (digit, index) => {
      const digitIndex = phone.substring(0, index).replace(/\D/g, '').length;
      return masked[digitIndex] || digit;
    });
  };

  if (verified) {
    return (
      <AuthCard
        title="¡Teléfono verificado!"
        subtitle="Tu número ha sido verificado correctamente"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-semantic-success/10 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-semantic-success" />
          </div>

          <div>
            <p className="text-gray-600 mb-4">
              {type === 'profile' 
                ? 'Volviendo a tu perfil...'
                : 'Continuando con el registro...'
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
      title="Verifica tu teléfono"
      subtitle="Introduce el código que te hemos enviado"
    >
      <div className="text-center space-y-6">
        {/* Phone Icon */}
        <div className="w-16 h-16 bg-brand-secondary/10 rounded-full mx-auto flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-brand-secondary" />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <p className="text-gray-700">
            Código enviado por SMS a:
          </p>
          <p className="font-medium text-gray-900">
            {maskPhone(phone)}
          </p>
          <p className="text-sm text-gray-600">
            El código expira en 5 minutos
          </p>
        </div>

        {/* OTP Input */}
        <OTPInput
          value={otpValue}
          onChange={setOtpValue}
          error={error}
          disabled={loading || attempts >= 3}
        />

        {/* Hint for demo */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Para la demo, usa el código: <strong>123456</strong>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {/* Manual verify button (if needed) */}
          {otpValue.length === 6 && !loading && (
            <Button
              onClick={handleVerifyOTP}
              disabled={loading || attempts >= 3}
              className="w-full"
            >
              Verificar código
            </Button>
          )}

          {/* Resend */}
          <Button
            variant="outline"
            onClick={handleResendOTP}
            disabled={loading || cooldownTime > 0 || resendCount >= 3 || attempts >= 3}
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : cooldownTime > 0 ? (
              `Reenviar en ${cooldownTime}s`
            ) : resendCount >= 3 ? (
              'Máximo de reenvíos alcanzado'
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reenviar código
              </>
            )}
          </Button>

          {/* Change Phone */}
          <Button
            variant="ghost"
            onClick={handleChangePhone}
            className="w-full"
          >
            <Edit className="w-4 h-4 mr-2" />
            Cambiar número
          </Button>
        </div>

        {/* Help */}
        <div className="pt-4 border-t text-sm text-gray-500">
          <p>¿No recibiste el código?</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• Verifica que el número sea correcto</li>
            <li>• Puede tardar hasta 2 minutos</li>
            <li>• Revisa si tienes mensajes bloqueados</li>
          </ul>
        </div>
      </div>
    </AuthCard>
  );
}