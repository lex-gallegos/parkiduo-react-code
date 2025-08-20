import { useState, useEffect } from 'react';
import { AuthCard } from './auth-card';
import { EmailInput } from './email-input';
import { PasswordInput } from './password-input';
import { SocialButton } from './social-button';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Loader2 } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string, options?: any) => void;
  redirectTo?: string;
}

export function LoginPage({ onNavigate, redirectTo }: LoginPageProps) {
  const [mode, setMode] = useState<'magic-link' | 'password'>('magic-link');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<Date | null>(null);

  // Check if account is blocked
  useEffect(() => {
    if (blockedUntil && new Date() > blockedUntil) {
      setBlockedUntil(null);
      setAttempts(0);
    }
  }, [blockedUntil]);

  const validateEmail = (email: string) => {
    if (!email) return 'El correo electrónico es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Introduce un correo electrónico válido';
    return null;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'La contraseña es obligatoria';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  };

  const handleMagicLinkLogin = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'magiclink_sent', {
          event_category: 'auth',
          event_label: 'login'
        });
      }

      // Navigate to verification screen
      onNavigate('verify-email', { 
        email, 
        type: 'login',
        redirectTo 
      });
      
    } catch (error) {
      setErrors({ general: 'Error al enviar el enlace. Inténtalo de nuevo.' });
      toast.error('Error al enviar el enlace de acceso');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (blockedUntil && new Date() < blockedUntil) {
      const remainingTime = Math.ceil((blockedUntil.getTime() - new Date().getTime()) / 1000 / 60);
      toast.error(`Cuenta bloqueada. Espera ${remainingTime} minutos o contacta soporte.`);
      return;
    }

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setErrors({ email: emailError || undefined, password: passwordError || undefined });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random failure for demo
      if (Math.random() > 0.7) {
        throw new Error('Invalid credentials');
      }

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'password_login_success', {
          event_category: 'auth'
        });
      }

      toast.success('¡Bienvenido de vuelta!');
      
      // Navigate based on redirect or default
      if (redirectTo) {
        onNavigate(redirectTo, { userType: 'driver' }); // Default to driver for demo
      } else {
        onNavigate('driver-dashboard', { userType: 'driver' });
      }
      
    } catch (error) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        const blockTime = new Date();
        blockTime.setMinutes(blockTime.getMinutes() + Math.min(30, newAttempts * 5));
        setBlockedUntil(blockTime);
        setErrors({ general: 'Demasiados intentos fallidos. Cuenta bloqueada temporalmente.' });
      } else {
        setErrors({ general: 'Credenciales incorrectas. Inténtalo de nuevo.' });
      }

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'password_login_failed', {
          event_category: 'auth',
          event_label: `attempt_${newAttempts}`
        });
      }

      toast.error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sso_started', {
          event_category: 'auth',
          event_label: provider
        });
      }

      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`¡Acceso exitoso con ${provider === 'google' ? 'Google' : 'Apple'}!`);
      
      // Navigate based on redirect or default
      if (redirectTo) {
        onNavigate(redirectTo, { userType: 'driver' });
      } else {
        onNavigate('driver-dashboard', { userType: 'driver' });
      }
      
    } catch (error) {
      toast.error(`Error al conectar con ${provider === 'google' ? 'Google' : 'Apple'}`);
    }
  };

  const handleBack = () => {
    onNavigate('home');
  };

  const isBlocked = blockedUntil && new Date() < blockedUntil;
  const remainingTime = isBlocked ? Math.ceil((blockedUntil!.getTime() - new Date().getTime()) / 1000 / 60) : 0;

  return (
    <AuthCard
      title="Accede a tu cuenta"
      subtitle="Accede en segundos con tu correo o redes sociales"
      showBackButton={true}
      onBack={handleBack}
      backLabel="Volver al inicio"
    >
      <div className="space-y-6">
        {/* Account blocked warning */}
        {isBlocked && (
          <div className="p-4 bg-semantic-danger/10 border border-semantic-danger/20 rounded-lg">
            <p className="text-sm text-semantic-danger font-medium">
              Cuenta bloqueada temporalmente
            </p>
            <p className="text-xs text-semantic-danger/80 mt-1">
              Espera {remainingTime} minutos o{' '}
              <button 
                className="underline hover:no-underline"
                onClick={() => onNavigate('contact-support')}
              >
                contacta soporte
              </button>
            </p>
          </div>
        )}

        {/* General error */}
        {errors.general && !isBlocked && (
          <div className="p-4 bg-semantic-danger/10 border border-semantic-danger/20 rounded-lg">
            <p className="text-sm text-semantic-danger">{errors.general}</p>
          </div>
        )}

        {/* Social Login */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            onClick={() => handleSocialLogin('google')}
            disabled={loading || isBlocked}
          />
          <SocialButton
            provider="apple"
            onClick={() => handleSocialLogin('apple')}
            disabled={loading || isBlocked}
          />
        </div>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">o continúa con correo</span>
          </div>
        </div>

        {/* Email Input */}
        <EmailInput
          value={email}
          onChange={setEmail}
          error={errors.email}
          disabled={loading || isBlocked}
          placeholder="tu@correo.com"
        />

        {/* Password Mode Toggle */}
        {mode === 'magic-link' ? (
          <div className="space-y-4">
            <Button
              onClick={handleMagicLinkLogin}
              disabled={loading || isBlocked}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando enlace...
                </>
              ) : (
                'Enviar enlace de acceso'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('password')}
                className="text-sm text-brand-primary hover:underline"
                disabled={loading || isBlocked}
              >
                Usar contraseña
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <PasswordInput
              value={password}
              onChange={setPassword}
              error={errors.password}
              disabled={loading || isBlocked}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={loading || isBlocked}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Mantener sesión
                </label>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm text-brand-primary hover:underline"
                disabled={loading || isBlocked}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              onClick={handlePasswordLogin}
              disabled={loading || isBlocked}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('magic-link')}
                className="text-sm text-brand-primary hover:underline"
                disabled={loading || isBlocked}
              >
                Volver al enlace mágico
              </button>
            </div>
          </div>
        )}

        {/* Register Link */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('register', { redirectTo })}
              className="text-brand-primary hover:underline font-medium"
              disabled={loading}
            >
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
    </AuthCard>
  );
}