import { useState } from 'react';
import { AuthCard } from './auth-card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { PhoneInput } from './phone-input';
import { StepperIconRow } from '../ui/stepper';
import { toast } from 'sonner@2.0.3';
import { Loader2, User, Phone, MapPin, FileText } from 'lucide-react';

interface CompleteProfilePageProps {
  onNavigate: (page: string, options?: any) => void;
  userType?: 'parker' | 'driver' | 'both';
  redirectTo?: string;
  verified?: boolean;
  provider?: string;
}

export function CompleteProfilePage({ 
  onNavigate, 
  userType = 'driver',
  redirectTo,
  verified = false,
  provider
}: CompleteProfilePageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    dni: '',
    phoneVerified: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Create steps compatible with StepperIconRow
  const createSteps = () => {
    const baseSteps = [
      { id: 'personal', title: 'Datos personales', shortTitle: 'Personales', icon: 'user-round' as const },
      { id: 'contact', title: 'Contacto', shortTitle: 'Contacto', icon: 'calendar-clock' as const },
      { id: 'address', title: 'Dirección', shortTitle: 'Dirección', icon: 'map-pin' as const },
      { id: 'identification', title: 'Identificación', shortTitle: 'ID', icon: 'file-text' as const }
    ];

    return baseSteps.map((step, index) => ({
      ...step,
      state: index < currentStep - 1 ? 'complete' as const : 
             index === currentStep - 1 ? 'active' as const : 
             'inactive' as const,
      isClickable: index < currentStep
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'El nombre es obligatorio';
        if (!formData.lastName) newErrors.lastName = 'Los apellidos son obligatorios';
        break;
      case 2:
        if (!formData.phone) newErrors.phone = 'El teléfono es obligatorio';
        break;
      case 3:
        if (!formData.address) newErrors.address = 'La dirección es obligatoria';
        if (!formData.city) newErrors.city = 'La ciudad es obligatoria';
        if (!formData.postalCode) newErrors.postalCode = 'El código postal es obligatorio';
        break;
      case 4:
        if (!formData.dni) newErrors.dni = 'El DNI/NIE es obligatorio';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 2 && !formData.phoneVerified) {
      // Navigate to OTP verification
      onNavigate('otp-verification', {
        phone: formData.phone,
        type: 'register',
        redirectTo: 'complete-profile'
      });
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    if (!validateStep(4)) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'profile_completed', {
          event_category: 'onboarding',
          event_label: userType,
          method: provider || 'email'
        });
      }

      toast.success('¡Perfil completado! Bienvenido a Parkiduo');

      // Navigate to appropriate dashboard
      if (redirectTo) {
        onNavigate(redirectTo, { userType });
      } else {
        onNavigate(`${userType}-dashboard`, { userType });
      }

    } catch (error) {
      toast.error('Error al completar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="form-field">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                placeholder="Juan"
                className={errors.firstName ? 'border-semantic-danger' : ''}
              />
              {errors.firstName && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor="lastName">Apellidos *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                placeholder="García López"
                className={errors.lastName ? 'border-semantic-danger' : ''}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <PhoneInput
              value={formData.phone}
              onChange={(value) => updateFormData('phone', value)}
              error={errors.phone}
              required={true}
            />
            
            {formData.phone && !formData.phoneVerified && (
              <div className="p-4 bg-semantic-warn/10 border border-semantic-warn/20 rounded-lg">
                <p className="text-sm text-semantic-warn">
                  Necesitarás verificar tu teléfono en el siguiente paso
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="form-field">
              <Label htmlFor="address">Dirección *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Calle Mayor, 123"
                className={errors.address ? 'border-semantic-danger' : ''}
              />
              {errors.address && (
                <p className="error-text">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-field">
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Madrid"
                  className={errors.city ? 'border-semantic-danger' : ''}
                />
                {errors.city && (
                  <p className="error-text">{errors.city}</p>
                )}
              </div>

              <div className="form-field">
                <Label htmlFor="postalCode">Código postal *</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  placeholder="28001"
                  className={errors.postalCode ? 'border-semantic-danger' : ''}
                />
                {errors.postalCode && (
                  <p className="error-text">{errors.postalCode}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="form-field">
              <Label htmlFor="dni">DNI/NIE *</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => updateFormData('dni', e.target.value.toUpperCase())}
                placeholder="12345678Z"
                className={errors.dni ? 'border-semantic-danger' : ''}
              />
              {errors.dni && (
                <p className="error-text">{errors.dni}</p>
              )}
              <p className="help-text">
                Necesario para generar contratos legales
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AuthCard
      title="Completa tu perfil"
      subtitle="Solo unos datos más para empezar"
      showLogo={false}
    >
      <div className="space-y-6">
        {/* Progress */}
        <StepperIconRow currentStep={currentStep - 1} steps={createSteps()} />

        {/* Step content */}
        <div className="min-h-[200px]">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={loading}
              className="flex-1"
            >
              Anterior
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Completando...
              </>
            ) : currentStep === 4 ? (
              'Completar perfil'
            ) : currentStep === 2 && !formData.phoneVerified ? (
              'Verificar teléfono'
            ) : (
              'Siguiente'
            )}
          </Button>
        </div>

        {/* Skip option for non-critical steps */}
        {(currentStep === 2 && formData.phone) && (
          <div className="text-center">
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              disabled={loading}
            >
              Verificar más tarde
            </button>
          </div>
        )}
      </div>
    </AuthCard>
  );
}