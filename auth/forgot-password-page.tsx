import { useState } from 'react';
import { AuthCard } from './auth-card';
import { EmailInput } from './email-input';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Loader2, KeyRound } from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    if (!email) return 'El correo electrónico es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Introduce un correo electrónico válido';
    return null;
  };

  const handleSendReset = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSent(true);
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'password_reset_requested', {
          event_category: 'auth'
        });
      }

      toast.success('Instrucciones enviadas');
      
    } catch (error) {
      setError('Error al enviar las instrucciones. Inténtalo de nuevo.');
      toast.error('Error al enviar el email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard
        title="Revisa tu email"
        subtitle="Te hemos enviado las instrucciones"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full mx-auto flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-brand-primary" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              Si el correo <strong>{email}</strong> existe en nuestro sistema, 
              te hemos enviado las instrucciones para restablecer tu contraseña.
            </p>
            <p className="text-sm text-gray-600">
              El enlace expira en 1 hora por seguridad.
            </p>
          </div>

          <div className="space-y-4">
            <Button onClick={() => onNavigate('login')} className="w-full">
              Volver al inicio de sesión
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => setSent(false)}
              className="w-full"
            >
              Usar otro email
            </Button>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500">
            <p>¿No recibiste el email?</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Revisa tu carpeta de spam</li>
              <li>• Verifica que el email sea correcto</li>
              <li>• Puede tardar unos minutos en llegar</li>
            </ul>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Recuperar contraseña"
      subtitle="Introduce tu email para recibir instrucciones"
    >
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('login')}
          className="self-start -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al login
        </Button>

        {/* Instructions */}
        <div className="text-center">
          <div className="w-16 h-16 bg-semantic-warn/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-semantic-warn" />
          </div>
          <p className="text-gray-600">
            Te enviaremos un enlace seguro para restablecer tu contraseña.
          </p>
        </div>

        {/* Email Input */}
        <EmailInput
          value={email}
          onChange={(value) => {
            setEmail(value);
            setError('');
          }}
          error={error}
          disabled={loading}
          placeholder="tu@correo.com"
          label="Email de tu cuenta"
        />

        {/* Send Button */}
        <Button
          onClick={handleSendReset}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando instrucciones...
            </>
          ) : (
            'Enviar instrucciones'
          )}
        </Button>

        {/* Security Notice */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Por tu seguridad:</strong> Si el email no existe en nuestro sistema, 
            no te notificaremos para proteger la privacidad de nuestros usuarios.
          </p>
        </div>

        {/* Alternative */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            ¿Recordaste tu contraseña?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-brand-primary hover:underline font-medium"
              disabled={loading}
            >
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}