import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { WizardHeader, createDriverStepper } from './ui/stepper-inline';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  User,
  CalendarPlus
} from 'lucide-react';

interface DriverOnboardingProps {
  onNavigate: (page: string) => void;
}

export function DriverOnboarding({ onNavigate }: DriverOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed for stepper
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);
  const [errorSteps, setErrorSteps] = useState<number[]>([]);
  const [errorMessages, setErrorMessages] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState({
    // Step 0: Location and schedule
    address: '',
    radius: [2],
    scheduleType: '', // '24h', 'diurno', 'nocturno', 'custom'
    customHours: {
      start: '',
      end: ''
    },
    weekends: false,
    requirements: [] as string[],
    
    // Step 1: Budget & Priority
    budget: [80, 100],
    priorityNotifications: false,
    
    // Step 2: Request visit
    additionalInfo: '',
    
    // Step 3: User Data
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const neighborhoods = [
    'Centro', 'Salamanca', 'Chamberí', 'Retiro', 'Chamartín',
    'Moncloa', 'Tetuán', 'Malasaña', 'Chueca', 'Las Letras'
  ];

  const requirements = [
    'Acceso 24h',
    'Plaza cubierta',
    'Fácil maniobra',
    'Seguridad/cámaras',
    'Cerca transporte público',
    'Ascensor disponible'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCurrentStep = () => {
    const errors: string[] = [];
    let isValid = true;

    switch (currentStep) {
      case 0: // Zone and schedule
        if (!formData.address.trim()) {
          errors.push('La dirección es obligatoria');
          isValid = false;
        }
        break;
      case 1: // Budget - no validation needed
        break;
      case 2: // Request visit - no validation needed
        break;
      case 3: // Verification and contact
        if (!formData.firstName.trim()) {
          errors.push('El nombre es obligatorio');
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          errors.push('Los apellidos son obligatorios');
          isValid = false;
        }
        if (!formData.email.trim()) {
          errors.push('El email es obligatorio');
          isValid = false;
        }
        if (!formData.phone.trim()) {
          errors.push('El teléfono es obligatorio');
          isValid = false;
        }
        break;
    }

    // Update error states
    if (!isValid) {
      setErrorSteps([...errorSteps.filter(s => s !== currentStep), currentStep]);
      setErrorMessages({
        ...errorMessages,
        [currentStep]: errors[0]
      });
    } else {
      setErrorSteps(errorSteps.filter(s => s !== currentStep));
      const newErrorMessages = { ...errorMessages };
      delete newErrorMessages[currentStep];
      setErrorMessages(newErrorMessages);
    }

    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 4) {
      // Mark current step as visited
      if (!visitedSteps.includes(currentStep)) {
        setVisitedSteps([...visitedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      onNavigate('driver-success');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('home');
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on visited steps or current step
    if (stepIndex <= currentStep || visitedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const toggleRequirement = (requirement: string) => {
    const current = formData.requirements;
    if (current.includes(requirement)) {
      updateFormData('requirements', current.filter(r => r !== requirement));
    } else {
      updateFormData('requirements', [...current, requirement]);
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Define tu zona y horario',
      'Establece tu presupuesto',
      'Solicitar visita',
      'Verificación y contacto',
      'Confirmación'
    ];
    return titles[currentStep] || '';
  };

  const getStepDescription = () => {
    const descriptions = [
      'Indica dónde necesitas el garaje y cuándo lo vas a usar',
      'Define tu presupuesto mensual y servicios adicionales',
      'Configura cómo quieres solicitar visitas a garajes',
      'Completa tu perfil para contactar con propietarios',
      'Revisa y confirma tu búsqueda de garaje'
    ];
    return descriptions[currentStep] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Wizard Header - Simple inline stepper */}
        <div className="mb-8">
          <WizardHeader
            onBack={handleBack}
            steps={createDriverStepper(currentStep, visitedSteps, errorSteps, errorMessages)}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            backLabel="Volver"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900">
                {getStepTitle()}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {getStepDescription()}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 0: Zone and Schedule */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-brand-primary" />
                      Dirección de referencia
                    </Label>
                    <Input
                      id="address"
                      placeholder="Ej: Calle Gran Vía 28, Madrid"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      className="text-base"
                    />
                    <p className="text-sm text-gray-500">
                      Tu trabajo, casa o punto de referencia principal
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Radio de búsqueda: {formData.radius[0]} km</Label>
                    <Slider
                      value={formData.radius}
                      onValueChange={(value) => updateFormData('radius', value)}
                      max={10}
                      min={0.5}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.5 km</span>
                      <span>5 km</span>
                      <span>10 km</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-brand-primary" />
                      ¿Cuándo necesitas usar el garaje?
                    </Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button
                        variant={formData.scheduleType === '24h' ? "default" : "outline"}
                        onClick={() => updateFormData('scheduleType', '24h')}
                        className={`p-4 h-auto flex-col ${
                          formData.scheduleType === '24h'
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="font-semibold">24 horas</div>
                        <div className="text-xs opacity-80">Acceso completo</div>
                      </Button>
                      
                      <Button
                        variant={formData.scheduleType === 'diurno' ? "default" : "outline"}
                        onClick={() => updateFormData('scheduleType', 'diurno')}
                        className={`p-4 h-auto flex-col ${
                          formData.scheduleType === 'diurno'
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="font-semibold">Diurno</div>
                        <div className="text-xs opacity-80">8:00 - 20:00</div>
                      </Button>
                      
                      <Button
                        variant={formData.scheduleType === 'nocturno' ? "default" : "outline"}
                        onClick={() => updateFormData('scheduleType', 'nocturno')}
                        className={`p-4 h-auto flex-col ${
                          formData.scheduleType === 'nocturno'
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="font-semibold">Nocturno</div>
                        <div className="text-xs opacity-80">20:00 - 8:00</div>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weekends"
                      checked={formData.weekends}
                      onCheckedChange={(checked) => updateFormData('weekends', checked)}
                    />
                    <Label htmlFor="weekends" className="text-sm">
                      También necesito fines de semana
                    </Label>
                  </div>

                  <div className="space-y-3">
                    <Label>Características importantes (opcional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {requirements.map((requirement) => (
                        <Button
                          key={requirement}
                          variant={formData.requirements.includes(requirement) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleRequirement(requirement)}
                          className={`justify-start ${
                            formData.requirements.includes(requirement)
                              ? 'bg-brand-primary text-white'
                              : 'text-gray-700'
                          }`}
                        >
                          {requirement}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Budget */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Presupuesto mensual</Label>
                    <div className="px-3 py-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Mínimo: {formData.budget[0]}€</span>
                        <span>Máximo: {formData.budget[1]}€</span>
                      </div>
                      <Slider
                        value={formData.budget}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value as [number, number] }))}
                        max={200}
                        min={30}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>30€</span>
                        <span>200€</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="priority"
                        checked={formData.priorityNotifications}
                        onCheckedChange={(checked) => updateFormData('priorityNotifications', checked)}
                      />
                      <div className="flex-1">
                        <Label htmlFor="priority" className="flex items-center font-medium">
                          <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                          Acceso prioritario
                          <Badge className="ml-2 bg-yellow-100 text-yellow-800">15€/mes</Badge>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Recibe notificaciones 24h antes que otros usuarios cuando aparezcan nuevos garajes
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">
                            Los usuarios prioritarios consiguen garaje 3x más rápido
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Request Visit */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="additional">Información adicional para propietarios</Label>
                    <Textarea
                      id="additional"
                      placeholder="Ej: Necesito una plaza amplia para SUV, prefiero garajes con buena iluminación, disponible para visitas por las tardes..."
                      value={formData.additionalInfo}
                      onChange={(e) => updateFormData('additionalInfo', e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      Esta información ayudará a los propietarios a decidir si su garaje es compatible
                    </p>
                  </div>

                  <div className="bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <CalendarPlus className="h-5 w-5 text-brand-primary" />
                      <h4 className="font-medium text-brand-primary">¿Cómo funcionan las visitas?</h4>
                    </div>
                    <ul className="text-sm text-brand-primary/80 space-y-1 ml-7">
                      <li className="text-[rgba(8,46,97,1)]">• Te notificaremos cuando aparezcan garajes compatibles</li>
                      <li className="text-[rgba(8,46,97,1)]">• Podrás solicitar visitas directamente desde la app</li>
                      <li className="text-[rgba(8,46,97,1)]" className="text-[rgba(30,126,255,0.8)]">• Coordinarás horarios directamente con el propietario</li>
                      <li className="text-[rgba(8,46,97,1)]">• Después de la visita, podrás confirmar el match</li>
                    </ul>
                  </div>

                  <div className="bg-semantic-warn/10 p-4 rounded-lg border border-semantic-warn/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-5 w-5 text-semantic-warn" />
                      <h4 className="font-medium text-semantic-warn">Consejo</h4>
                    </div>
                    <p className="text-sm text-semantic-warn/90 text-[rgba(122,82,0,0.9)]">
                      Sé específico sobre tus necesidades. Los propietarios valoran la claridad 
                      y es más probable que respondan a solicitudes detalladas.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Verification and Contact */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        Nombre *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Tu nombre"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', e.target.value)}
                        className="text-base"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Apellidos *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Tus apellidos"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', e.target.value)}
                        className="text-base"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu.email@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="text-base"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Te enviaremos notificaciones sobre garajes compatibles
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Ej: +34 612 345 678"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="text-base"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Para contacto directo con propietarios de garajes
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-brand-primary" />
                      <h4 className="font-medium text-brand-primary">Protección de datos</h4>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1 ml-7">
                      <li>• Tus datos se usan solo para gestionar solicitudes de garaje</li>
                      <li>• No compartimos tu información con terceros sin consentimiento</li>
                      <li>• Puedes modificar o eliminar tus datos en cualquier momento</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-semantic-success/10 p-6 rounded-lg border border-semantic-success/20">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="h-6 w-6 text-semantic-success" />
                      <h4 className="text-lg font-semibold text-semantic-success">Resumen de tu búsqueda</h4>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Zona:</span>
                        <span className="font-medium">{formData.address || 'No especificada'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Radio:</span>
                        <span className="font-medium">{formData.radius[0]} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Presupuesto:</span>
                        <span className="font-medium">{formData.budget[0]}€/mes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Horario:</span>
                        <span className="font-medium">
                          {formData.scheduleType === '24h' && '24 horas'}
                          {formData.scheduleType === 'diurno' && 'Diurno (8:00-20:00)'}
                          {formData.scheduleType === 'nocturno' && 'Nocturno (20:00-8:00)'}
                          {!formData.scheduleType && 'No especificado'}
                        </span>
                      </div>
                      {formData.priorityNotifications && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Servicio:</span>
                          <span className="font-medium text-semantic-warn">Acceso prioritario (+15€/mes)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-brand-primary" />
                      <h4 className="font-medium text-brand-primary">¿Qué pasa ahora?</h4>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1 ml-7">
                      <li>• Crearemos tu búsqueda personalizada</li>
                      <li>• Te avisaremos cuando aparezcan garajes compatibles</li>
                      <li>• Podrás gestionar todas tus solicitudes desde tu dashboard</li>
                      <li>• Contactarás directamente con propietarios para coordinar visitas</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <h4 className="font-medium text-gray-900">Tu perfil</h4>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-normal text-[14px] text-[13px]"><span className="text-gray-600">Nombre:</span> {formData.firstName} {formData.lastName}</p>
                      <p className="font-normal text-[14px] text-[13px]"><span className="text-gray-600">Email:</span> {formData.email}</p>
                      <p className="font-normal text-[14px] text-[13px]"><span className="text-gray-600">Teléfono:</span> {formData.phone}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-semantic-success" />
                      <h4 className="font-medium text-semantic-success">¡Ya casi está listo!</h4>
                    </div>
                    <ul className="text-sm text-green-800 space-y-1 ml-7">
                      <li>• Crearemos tu búsqueda personalizada</li>
                      <li>• Te avisaremos cuando aparezcan garajes compatibles</li>
                      <li>• Podrás gestionar todas tus solicitudes desde tu dashboard</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>

            <div className="px-6 pb-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 0 ? 'Volver al inicio' : 'Anterior'}
                </Button>

                <Button
                  onClick={handleNext}
                  className="bg-brand-primary hover:bg-blue-600 text-white px-6"
                  disabled={
                    (currentStep === 0 && !formData.address) ||
                    (currentStep === 3 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
                  }
                >
                  {currentStep === 4 ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Crear búsqueda
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

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda? {' '}
              <button className="text-brand-primary hover:underline">
                Chatea con nosotros
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}