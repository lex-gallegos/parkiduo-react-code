import { useState } from 'react';
import { AuthCard } from './auth-card';
import { EmailInput } from './email-input';
import { PasswordInput } from './password-input';
import { SocialButton } from './social-button';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { Loader2, Users, Car, ParkingCircle } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (page: string, options?: any) => void;
  redirectTo?: string;
}

export function RegisterPage({ onNavigate, redirectTo }: RegisterPageProps) {
  const [mode, setMode] = useState<'magic-link' | 'password'>('magic-link');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'parker' | 'driver' | 'both'>('driver');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    general?: string;
  }>({});

  const validateEmail = (email: string) => {
    if (!email) return 'El correo electrónico es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Introduce un correo electrónico válido';
    return null;
  };

  const validatePassword = (password: string) => {
    if (mode === 'password') {
      if (!password) return 'La contraseña es obligatoria';
      if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return 'Debe contener mayúsculas, minúsculas y números';
      }
    }
    return null;
  };

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (mode === 'password') {
      if (!confirmPassword) return 'Confirma tu contraseña';
      if (confirmPassword !== password) return 'Las contraseñas no coinciden';
    }
    return null;
  };

  const handleRegister = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    const termsError = !acceptTerms ? 'Debes aceptar los términos y condiciones' : null;

    if (emailError || passwordError || confirmPasswordError || termsError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
        terms: termsError || undefined,
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'signup_started', {
          event_category: 'auth',
          event_label: role,
          method: mode
        });
      }

      // Navigate to email verification
      onNavigate('verify-email', {
        email,
        type: 'register',
        role,
        redirectTo,
        method: mode
      });

    } catch (error) {
      setErrors({ general: 'Error al crear la cuenta. Inténtalo de nuevo.' });
      toast.error('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider: 'google' | 'apple') => {
    try {
      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'sso_started', {
          event_category: 'auth',
          event_label: `${provider}_register`
        });
      }

      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`¡Cuenta creada exitosamente con ${provider === 'google' ? 'Google' : 'Apple'}!`);
      
      // Navigate to profile completion
      onNavigate('complete-profile', { 
        userType: role,
        redirectTo,
        provider 
      });
      
    } catch (error) {
      toast.error(`Error al conectar con ${provider === 'google' ? 'Google' : 'Apple'}`);
    }
  };

  const handleBack = () => {
    onNavigate('home');
  };

  const roleOptions = [
    {
      value: 'driver',
      label: 'Conductor',
      description: 'Busco plazas de garaje para aparcar',
      icon: Car
    },
    {
      value: 'parker',
      label: 'Propietario',
      description: 'Tengo garajes para compartir',
      icon: ParkingCircle
    },
    {
      value: 'both',
      label: 'Ambos',
      description: 'Quiero aparcar y compartir mis garajes',
      icon: Users
    }
  ];

  return (
    <AuthCard
      title="Crea tu cuenta"
      subtitle="Únete a la comunidad de Parkiduo en segundos"
      showBackButton={true}
      onBack={handleBack}
      backLabel="Volver al inicio"
    >
      <div className="space-y-6">
        {/* General error */}
        {errors.general && (
          <div className="p-4 bg-semantic-danger/10 border border-semantic-danger/20 rounded-lg">
            <p className="text-sm text-semantic-danger">{errors.general}</p>
          </div>
        )}

        {/* Role Selection */}
        <div className="space-y-4">
          <Label>¿Cómo participas en Parkiduo? *</Label>
          <RadioGroup value={role} onValueChange={(value: any) => setRole(value)}>
            {roleOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer bg-[rgba(255,255,255,1)]">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1" onClick={() => setRole(option.value as any)}>
                  <div className="flex items-center gap-2 mb-1">
                    <option.icon className="w-4 h-4 text-brand-primary" />
                    <Label htmlFor={option.value} className="cursor-pointer font-medium">
                      {option.label}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Social Register */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            onClick={() => handleSocialRegister('google')}
            disabled={loading}
          />
          <SocialButton
            provider="apple"
            onClick={() => handleSocialRegister('apple')}
            disabled={loading}
          />
        </div>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">o regístrate con correo</span>
          </div>
        </div>

        {/* Email Input */}
        <EmailInput
          value={email}
          onChange={setEmail}
          error={errors.email}
          disabled={loading}
          placeholder="tu@correo.com"
        />

        {/* Password Mode Toggle */}
        {mode === 'password' && (
          <div className="space-y-4">
            <PasswordInput
              value={password}
              onChange={setPassword}
              error={errors.password}
              disabled={loading}
              showStrength={true}
              placeholder="Crea una contraseña segura"
            />

            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              disabled={loading}
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
            />
          </div>
        )}

        {/* Terms and Marketing */}
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              disabled={loading}
              className="mt-1"
            />
            <div className="flex-1">
              <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
                <span>Acepto los </span>
                <button
                  type="button"
                  onClick={() => onNavigate('terms')}
                  className="text-brand-primary hover:underline underline-offset-2 transition-all"
                >
                  Términos y Condiciones
                </button>
                <span> y la </span>
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="text-brand-primary hover:underline underline-offset-2 transition-all"
                >
                  Política de Privacidad
                </button>
                <span className="text-semantic-danger"> *</span>
              </Label>
              {errors.terms && (
                <p className="text-xs text-semantic-danger mt-2 flex items-center gap-1">
                  <span>⚠</span>
                  {errors.terms}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing"
              checked={acceptMarketing}
              onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
              disabled={loading}
              className="mt-1"
            />
            <Label htmlFor="marketing" className="cursor-pointer text-sm text-gray-600 leading-relaxed">
              Quiero recibir ofertas especiales y novedades de Parkiduo
            </Label>
          </div>

          {/* Information note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-700 leading-relaxed">
              <span className="inline-flex items-center gap-1 mb-2">
                <span>🔒</span>
                <span className="font-medium">Tu privacidad es importante</span>
              </span>
              <br />
              Cumplimos con el RGPD y nunca compartiremos tus datos sin tu consentimiento. 
              Puedes modificar tus preferencias de comunicación en cualquier momento desde tu perfil.
            </p>
          </div>
        </div>

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            'Crear cuenta'
          )}
        </Button>

        {/* Password Mode Toggle */}
        {mode === 'magic-link' && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode('password')}
              className="text-sm text-brand-primary hover:underline"
              disabled={loading}
            >
              Usar contraseña personalizada
            </button>
          </div>
        )}

        {mode === 'password' && (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode('magic-link')}
              className="text-sm text-brand-primary hover:underline"
              disabled={loading}
            >
              Volver al enlace mágico
            </button>
          </div>
        )}

        {/* Login Link */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => onNavigate('login', { redirectTo })}
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