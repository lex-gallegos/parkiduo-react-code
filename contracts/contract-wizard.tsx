import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { SimpleStepper } from '../ui/simple-stepper';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft, 
  ArrowRight,
  FileText,
  User,
  CreditCard,
  CheckCircle,
  MapPin,
  Clock,
  Euro,
  Shield,
  Calendar,
  Phone,
  Mail,
  Car,
  AlertCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContractWizardProps {
  onNavigate: (page: string, options?: any) => void;
  userType: 'parker' | 'driver' | 'admin' | null;
}

interface ContractData {
  // Garage info
  garageTitle: string;
  garageAddress: string;
  price: number;
  availability: string;
  startDate: string;
  endDate: string;
  
  // Personal data
  fullName: string;
  email: string;
  phone: string;
  dni: string;
  
  // Additional terms
  specialConditions: string;
  deposit: number;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  
  // Payment
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
}

const steps = [
  {
    id: 1,
    title: 'Resumen',
    icon: FileText
  },
  {
    id: 2,
    title: 'Datos',
    icon: User
  },
  {
    id: 3,
    title: 'Términos',
    icon: Shield
  },
  {
    id: 4,
    title: 'Pago',
    icon: CreditCard
  },
  {
    id: 5,
    title: 'Confirmación',
    icon: CheckCircle
  }
];

// Move step components outside of main component to prevent re-creation
const SummaryStep = React.memo(({ contractData, updateContractData, errors }: { contractData: ContractData, updateContractData: (field: string, value: any) => void, errors: Record<string, string> }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-primary" />
          Detalles de la plaza
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">{contractData.garageTitle}</h3>
          <p className="text-gray-600">{contractData.garageAddress}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-500">Precio mensual</Label>
            <p className="text-2xl font-bold text-brand-primary">{contractData.price}€</p>
          </div>
          <div>
            <Label className="text-sm text-gray-500">Disponibilidad</Label>
            <p className="text-lg font-medium capitalize">{contractData.availability}</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-primary" />
          Período del contrato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-field">
            <Label htmlFor="startDate">Fecha de inicio *</Label>
            <Input
              id="startDate"
              type="date"
              value={contractData.startDate}
              onChange={(e) => updateContractData('startDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.startDate && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.startDate}
              </p>
            )}
          </div>
          
          <div className="form-field">
            <Label htmlFor="endDate">Fecha de fin *</Label>
            <Input
              id="endDate"
              type="date"
              value={contractData.endDate}
              onChange={(e) => updateContractData('endDate', e.target.value)}
              min={contractData.startDate || new Date().toISOString().split('T')[0]}
            />
            {errors.endDate && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.endDate}
              </p>
            )}
          </div>
        </div>
        
        {contractData.startDate && contractData.endDate && (
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-4">
            <p className="text-sm text-brand-primary">
              <strong>Duración:</strong> {Math.ceil((new Date(contractData.endDate).getTime() - new Date(contractData.startDate).getTime()) / (1000 * 60 * 60 * 24))} días
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
));

const PersonalDataStep = React.memo(({ contractData, updateContractData, errors }: { contractData: ContractData, updateContractData: (field: string, value: any) => void, errors: Record<string, string> }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-brand-primary" />
          Información personal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-field">
          <Label htmlFor="fullName">Nombre completo *</Label>
          <Input
            id="fullName"
            placeholder="Nombre y apellidos"
            value={contractData.fullName}
            onChange={(e) => updateContractData('fullName', e.target.value)}
          />
          {errors.fullName && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-field">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={contractData.email}
              onChange={(e) => updateContractData('email', e.target.value)}
            />
            {errors.email && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+34 600 000 000"
              value={contractData.phone}
              onChange={(e) => updateContractData('phone', e.target.value)}
            />
            {errors.phone && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="form-field">
          <Label htmlFor="dni">DNI/NIE *</Label>
          <Input
            id="dni"
            placeholder="12345678A"
            value={contractData.dni}
            onChange={(e) => updateContractData('dni', e.target.value)}
          />
          {errors.dni && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {errors.dni}
            </p>
          )}
        </div>

        <div className="form-field">
          <Label htmlFor="specialConditions">Condiciones especiales (opcional)</Label>
          <Textarea
            id="specialConditions"
            placeholder="Cualquier condición especial que quieras añadir al contrato..."
            value={contractData.specialConditions}
            onChange={(e) => updateContractData('specialConditions', e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  </div>
));

const TermsStep = React.memo(({ contractData, updateContractData, errors }: { contractData: ContractData, updateContractData: (field: string, value: any) => void, errors: Record<string, string> }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-brand-primary" />
          Términos y condiciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 max-h-64 overflow-y-auto">
          <h4 className="font-semibold text-gray-900 mb-4">Contrato de alquiler de plaza de garaje</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>OBJETO:</strong> Alquiler de plaza de garaje situada en {contractData.garageAddress}.</p>
            <p><strong>DURACIÓN:</strong> Desde {contractData.startDate} hasta {contractData.endDate}.</p>
            <p><strong>RENTA:</strong> {contractData.price}€ mensuales, pagaderos por meses anticipados.</p>
            <p><strong>FIANZA:</strong> {contractData.deposit}€ (equivalente a 2 mensualidades).</p>
            <p><strong>HORARIO:</strong> Acceso {contractData.availability}.</p>
            <p><strong>OBLIGACIONES DEL ARRENDATARIO:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Pagar puntualmente la renta mensual</li>
              <li>Usar la plaza exclusivamente para aparcar vehículos</li>
              <li>Mantener la plaza en buen estado</li>
              <li>Respetar las normas del garaje</li>
              <li>Notificar con 30 días de antelación la rescisión del contrato</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptedTerms"
              checked={contractData.acceptedTerms}
              onCheckedChange={(checked) => updateContractData('acceptedTerms', checked)}
            />
            <Label htmlFor="acceptedTerms" className="cursor-pointer">
              He leído y acepto los términos y condiciones del contrato *
            </Label>
          </div>
          {errors.acceptedTerms && (
            <p className="error-text ml-6">
              <AlertCircle className="w-4 h-4" />
              {errors.acceptedTerms}
            </p>
          )}

          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptedPrivacy"
              checked={contractData.acceptedPrivacy}
              onCheckedChange={(checked) => updateContractData('acceptedPrivacy', checked)}
            />
            <Label htmlFor="acceptedPrivacy" className="cursor-pointer">
              Acepto la{' '}
              <button className="text-brand-primary hover:underline">
                política de privacidad
              </button>{' '}
              y el tratamiento de mis datos *
            </Label>
          </div>
          {errors.acceptedPrivacy && (
            <p className="error-text ml-6">
              <AlertCircle className="w-4 h-4" />
              {errors.acceptedPrivacy}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg">
          <Download className="w-4 h-4 text-brand-primary" />
          <span className="text-sm text-brand-primary">
            Podrás descargar una copia del contrato firmado tras el pago
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
));

const PaymentStep = React.memo(({ contractData, updateContractData, errors }: { contractData: ContractData, updateContractData: (field: string, value: any) => void, errors: Record<string, string> }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Euro className="w-5 h-5 text-brand-primary" />
          Resumen de pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Renta primer mes</span>
            <span>{contractData.price}€</span>
          </div>
          <div className="flex justify-between">
            <span>Fianza (2 mensualidades)</span>
            <span>{contractData.deposit}€</span>
          </div>
          <div className="flex justify-between">
            <span>Comisión Parkiduo</span>
            <span>29,95€</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total a pagar</span>
            <span className="text-brand-primary">{contractData.price + contractData.deposit + 29.95}€</span>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-primary" />
          Datos de pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="form-field">
          <Label htmlFor="cardName">Nombre del titular *</Label>
          <Input
            id="cardName"
            placeholder="Nombre como aparece en la tarjeta"
            value={contractData.cardName}
            onChange={(e) => updateContractData('cardName', e.target.value)}
          />
          {errors.cardName && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {errors.cardName}
            </p>
          )}
        </div>

        <div className="form-field">
          <Label htmlFor="cardNumber">Número de tarjeta *</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={contractData.cardNumber}
            onChange={(e) => {
              const formatted = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
              updateContractData('cardNumber', formatted);
            }}
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-field">
            <Label htmlFor="cardExpiry">Caducidad *</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/AA"
              value={contractData.cardExpiry}
              onChange={(e) => {
                const formatted = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
                updateContractData('cardExpiry', formatted);
              }}
              maxLength={5}
            />
            {errors.cardExpiry && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.cardExpiry}
              </p>
            )}
          </div>

          <div className="form-field">
            <Label htmlFor="cardCVC">CVC *</Label>
            <Input
              id="cardCVC"
              placeholder="123"
              value={contractData.cardCVC}
              onChange={(e) => updateContractData('cardCVC', e.target.value.replace(/\D/g, ''))}
              maxLength={3}
            />
            {errors.cardCVC && (
              <p className="error-text">
                <AlertCircle className="w-4 h-4" />
                {errors.cardCVC}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-semantic-success/5 border border-semantic-success/20 rounded-lg">
          <Shield className="w-4 h-4 text-semantic-success" />
          <span className="text-sm text-semantic-success">
            Pago 100% seguro. Tus datos están protegidos con encriptación SSL.
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
));

const ConfirmationStep = React.memo(({ contractData }: { contractData: ContractData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="w-16 h-16 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-semantic-success" />
      </div>
      <h3 className="font-poppins text-2xl font-bold text-gray-900 mb-2">
        ¿Confirmar contrato?
      </h3>
      <p className="text-gray-600">
        Revisa todos los datos antes de proceder al pago
      </p>
    </div>

    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Plaza</h4>
            <div className="space-y-1 text-sm">
              <p>{contractData.garageTitle}</p>
              <p className="text-gray-600">{contractData.garageAddress}</p>
              <p>Desde {contractData.startDate} hasta {contractData.endDate}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Arrendatario</h4>
            <div className="space-y-1 text-sm">
              <p>{contractData.fullName}</p>
              <p className="text-gray-600">{contractData.email}</p>
              <p className="text-gray-600">{contractData.phone}</p>
              <p className="text-gray-600">DNI: {contractData.dni}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Pago</h4>
            <div className="space-y-1 text-sm">
              <p>Total: <span className="font-bold text-brand-primary">{contractData.price + contractData.deposit + 29.95}€</span></p>
              <p className="text-gray-600">Tarjeta: ****{contractData.cardNumber.slice(-4)}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Próximos pasos</h4>
            <div className="space-y-1 text-sm">
              <p>• Procesaremos el pago</p>
              <p>• Enviaremos el contrato por email</p>
              <p>• Contacto directo con el propietario</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
));

export function ContractWizard({ onNavigate, userType }: ContractWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState<ContractData>({
    garageTitle: 'Plaza céntrica Malasaña',
    garageAddress: 'Calle Fuencarral, 45, Madrid',
    price: 120,
    availability: '24h',
    startDate: '',
    endDate: '',
    fullName: '',
    email: '',
    phone: '',
    dni: '',
    specialConditions: '',
    deposit: 240, // 2 months
    acceptedTerms: false,
    acceptedPrivacy: false,
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const updateContractData = useCallback((field: string, value: any) => {
    setContractData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    setErrors(prev => {
      if (prev[field]) {
        const { [field]: removed, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!contractData.startDate) {
          newErrors.startDate = 'La fecha de inicio es obligatoria';
        }
        if (!contractData.endDate) {
          newErrors.endDate = 'La fecha de fin es obligatoria';
        }
        if (contractData.startDate && contractData.endDate && 
            new Date(contractData.startDate) >= new Date(contractData.endDate)) {
          newErrors.endDate = 'La fecha de fin debe ser posterior al inicio';
        }
        break;
      case 2:
        if (!contractData.fullName.trim()) {
          newErrors.fullName = 'El nombre completo es obligatorio';
        }
        if (!contractData.email.trim()) {
          newErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contractData.email)) {
          newErrors.email = 'El email no tiene un formato válido';
        }
        if (!contractData.phone.trim()) {
          newErrors.phone = 'El teléfono es obligatorio';
        }
        if (!contractData.dni.trim()) {
          newErrors.dni = 'El DNI/NIE es obligatorio';
        }
        break;
      case 3:
        if (!contractData.acceptedTerms) {
          newErrors.acceptedTerms = 'Debes aceptar los términos del contrato';
        }
        if (!contractData.acceptedPrivacy) {
          newErrors.acceptedPrivacy = 'Debes aceptar la política de privacidad';
        }
        break;
      case 4:
        if (!contractData.cardName.trim()) {
          newErrors.cardName = 'El nombre del titular es obligatorio';
        }
        if (!contractData.cardNumber.trim()) {
          newErrors.cardNumber = 'El número de tarjeta es obligatorio';
        } else if (contractData.cardNumber.replace(/\s/g, '').length < 16) {
          newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
        }
        if (!contractData.cardExpiry.trim()) {
          newErrors.cardExpiry = 'La fecha de caducidad es obligatoria';
        }
        if (!contractData.cardCVC.trim()) {
          newErrors.cardCVC = 'El código CVC es obligatorio';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleContractSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard');
    }
  };

  const handleContractSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track success
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'contract_signed', {
          event_category: userType,
          value: contractData.price + contractData.deposit + 29.95
        });
      }
      
      toast.success('¡Contrato firmado exitosamente!');
      onNavigate('contract-success', { contractData });
      
    } catch (error) {
      toast.error('Error al procesar el contrato. Inténtalo de nuevo.');
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SummaryStep contractData={contractData} updateContractData={updateContractData} errors={errors} />;
      case 2:
        return <PersonalDataStep contractData={contractData} updateContractData={updateContractData} errors={errors} />;
      case 3:
        return <TermsStep contractData={contractData} updateContractData={updateContractData} errors={errors} />;
      case 4:
        return <PaymentStep contractData={contractData} updateContractData={updateContractData} errors={errors} />;
      case 5:
        return <ConfirmationStep contractData={contractData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-6 max-w-4xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="btn-ghost btn-md"
              aria-label="Volver"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            
            <Badge variant="outline" className="px-3 py-1">
              Paso {currentStep} de {steps.length}
            </Badge>
          </div>

          <div className="mb-6">
            <Progress 
              value={(currentStep / steps.length) * 100} 
              className="h-2"
            />
          </div>

          <SimpleStepper 
            steps={steps.map((step, index) => ({
              ...step,
              status: index < currentStep ? 'completed' : index === currentStep ? 'current' : 'pending'
            }))}
            currentStep={currentStep}
            variant="default"
          />
        </div>

        <main id="main-content">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center pb-8 px-8 pt-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center">
                {steps[currentStep - 1] && 
                  React.createElement(steps[currentStep - 1].icon, { 
                    className: "w-8 h-8 text-brand-primary" 
                  })
                }
              </div>
              <CardTitle className="font-poppins text-2xl font-bold text-gray-900 mb-2">
                {currentStep === 1 && 'Resumen del contrato'}
                {currentStep === 2 && 'Datos personales'}
                {currentStep === 3 && 'Términos y condiciones'}
                {currentStep === 4 && 'Información de pago'}
                {currentStep === 5 && 'Confirmación final'}
              </CardTitle>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                {currentStep === 1 && 'Revisa los detalles de tu plaza y período de alquiler'}
                {currentStep === 2 && 'Completa tus datos para el contrato'}
                {currentStep === 3 && 'Acepta los términos y condiciones'}
                {currentStep === 4 && 'Realiza el pago único por contrato'}
                {currentStep === 5 && 'Última revisión antes de confirmar'}
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {renderStepContent()}
            </CardContent>

            {/* Navigation */}
            <div className="px-8 pb-8">
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="btn-ghost btn-md"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 1 ? 'Cancelar' : 'Anterior'}
                </Button>

                <Button
                  onClick={handleNext}
                  className="btn-primary btn-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Procesando...
                    </>
                  ) : currentStep === 5 ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Firmar contrato
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}