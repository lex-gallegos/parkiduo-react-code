import { useState } from 'react';
import { AuthCard } from './auth-card';
import { PasswordInput } from './password-input';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { KeyRound, Loader2, CheckCircle } from 'lucide-react';

interface ResetPasswordPageProps {
  onNavigate: (page: string, options?: any) => void;
  token?: string;
  email?: string;
}

export function ResetPasswordPage({ onNavigate, token, email }: ResetPasswordPageProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validatePassword = (password: string) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Debe contener mayúsculas, minúsculas y números';
    }
    return null;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) return 'Confirma tu nueva contraseña';
    if (confirmPassword !== password) return 'Las contraseñas no coinciden';
    return null;
  };

  const handleResetPassword = async () => {
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    
    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate token validation (could fail if expired)
      if (!token || Math.random() < 0.1) { // 10% failure rate for demo
        throw new Error('Token expired or invalid');
      }

      setSuccess(true);
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'password_reset_completed', {
          event_category: 'auth'
        });
      }

      toast.success('¡Contraseña actualizada correctamente!');
      
      // Auto-redirect to login after success
      setTimeout(() => {
        onNavigate('login');
      }, 3000);
      
    } catch (error) {
      if (error instanceof Error && error.message === 'Token expired or invalid') {
        setErrors({ 
          general: 'El enlace ha expirado o no es válido. Solicita uno nuevo.' 
        });
      } else {
        setErrors({ 
          general: 'Error al actualizar la contraseña. Inténtalo de nuevo.' 
        });
      }
      toast.error('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (success) {
    return (
      <AuthCard
        title="¡Contraseña actualizada!"
        subtitle="Ya puedes iniciar sesión con tu nueva contraseña"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-semantic-success/10 rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-semantic-success" />
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              Tu contraseña ha sido actualizada correctamente.
            </p>
            <p className="text-sm text-gray-600">
              Redirigiendo al inicio de sesión...
            </p>
          </div>

          <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />

          <Button onClick={() => onNavigate('login')} className="w-full">
            Iniciar sesión ahora
          </Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Nueva contraseña"
      subtitle="Crea una contraseña segura para tu cuenta"
    >
      <div className="space-y-6">
        {/* Icon */}
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-brand-primary" />
          </div>
          {email && (
            <p className="text-sm text-gray-600">
              Actualizando contraseña para: <strong>{email}</strong>
            </p>
          )}
        </div>

        {/* General error */}
        {errors.general && (
          <div className="p-4 bg-semantic-danger/10 border border-semantic-danger/20 rounded-lg">
            <p className="text-sm text-semantic-danger">{errors.general}</p>
            {errors.general.includes('expirado') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('forgot-password')}
                className="mt-2 h-auto p-0 text-semantic-danger hover:text-semantic-danger"
              >
                Solicitar nuevo enlace
              </Button>
            )}
          </div>
        )}

        {/* Password inputs */}
        <div className="space-y-4">
          <PasswordInput
            value={password}
            onChange={setPassword}
            error={errors.password}
            disabled={loading}
            label="Nueva contraseña"
            placeholder="Crea una contraseña segura"
            showStrength={true}
          />

          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            disabled={loading}
            label="Confirmar contraseña"
            placeholder="Repite tu nueva contraseña"
          />
        </div>

        {/* Security tips */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-2">
            Tips para una contraseña segura:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Al menos 8 caracteres</li>
            <li>• Combina mayúsculas y minúsculas</li>
            <li>• Incluye números</li>
            <li>• Evita información personal</li>
          </ul>
        </div>

        {/* Update button */}
        <Button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Actualizando contraseña...
            </>
          ) : (
            'Actualizar contraseña'
          )}
        </Button>

        {/* Back to login */}
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