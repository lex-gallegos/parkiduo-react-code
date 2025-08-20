import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { 
  Zap, 
  CheckCircle, 
  Star, 
  Clock, 
  Eye,
  CreditCard,
  Shield,
  X,
  Sparkles,
  Crown,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PriorityUpgradeModalProps {
  onClose: (upgraded?: boolean) => void;
  onUpgrade: (success: boolean) => void;
}

export function PriorityUpgradeModal({ onClose, onUpgrade }: PriorityUpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [step, setStep] = useState<'plans' | 'payment' | 'processing' | 'success'>('plans');

  const plans = [
    {
      id: 'trial',
      name: 'Prueba 15 días',
      subtitle: 'Perfecto para probar',
      price: 1.99,
      originalPrice: 3.99,
      period: '15 días',
      savings: '50% descuento',
      popular: false,
      recommended: false,
      features: [
        'Acceso prioritario 24h antes',
        'Ver hasta 5 plazas nuevas',
        'Notificaciones push instantáneas',
        'Sin compromiso'
      ],
      limitations: [
        'Máximo 5 plazas por búsqueda',
        'Sin soporte prioritario'
      ]
    },
    {
      id: 'monthly',
      name: 'Plan Mensual',
      subtitle: 'La opción más popular',
      price: 15,
      originalPrice: 29.95,
      period: 'mes',
      savings: '50% descuento',
      popular: true,
      recommended: true,
      features: [
        'Acceso prioritario 24h antes',
        'Plazas ilimitadas',
        'Notificaciones push instantáneas',
        'Soporte prioritario',
        'Estadísticas detalladas',
        'Chat directo con propietarios'
      ],
      limitations: []
    },
    {
      id: 'quarterly',
      name: 'Plan Trimestral',
      subtitle: 'Máximo ahorro',
      price: 35,
      originalPrice: 89.85,
      period: '3 meses',
      savings: '61% descuento',
      popular: false,
      recommended: false,
      features: [
        'Acceso prioritario 24h antes',
        'Plazas ilimitadas',
        'Notificaciones push instantáneas',
        'Soporte prioritario VIP',
        'Estadísticas detalladas',
        'Chat directo con propietarios',
        'Garantía satisfacción 100%',
        'Análisis personalizado de mercado'
      ],
      limitations: []
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const handleUpgrade = () => {
    if (!acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'priority_purchased', {
          value: selectedPlanData?.price,
          currency: 'EUR',
          plan: selectedPlan
        });
      }
      
      setTimeout(() => {
        onUpgrade(true);
        onClose(true);
      }, 2000);
    }, 2000);
  };

  const handleClose = () => {
    if (step === 'processing') return;
    onClose(false);
  };

  if (step === 'success') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-semantic-success" />
            </div>
            <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
              ¡Prioridad activada!
            </h3>
            <p className="text-gray-600 mb-6">
              Ya puedes ver las nuevas plazas 24 horas antes que otros conductores.
            </p>
            <div className="bg-semantic-success/5 border border-semantic-success/20 rounded-lg p-4">
              <div className="flex items-center gap-2 justify-center text-semantic-success">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Buscando nuevas plazas...</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === 'processing') {
    return (
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
              Procesando pago...
            </h3>
            <p className="text-gray-600">
              No cierres esta ventana. El proceso tardará unos segundos.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center shadow-sm">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="font-poppins text-2xl font-bold text-gray-900">
                  Prioridad 24h
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Encuentra garaje 3x más rápido
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="w-10 h-10 p-0 hover:bg-gray-100"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Social Proof & Benefits Summary */}
          <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl p-6 border border-brand-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-brand-primary" />
                </div>
                <div className="text-2xl font-bold text-brand-primary mb-1">3x</div>
                <div className="text-sm text-gray-600">Más rápido</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-semantic-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-semantic-success" />
                </div>
                <div className="text-2xl font-bold text-semantic-success mb-1">24h</div>
                <div className="text-sm text-gray-600">Antes que otros</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-semantic-warn/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-semantic-warn" />
                </div>
                <div className="text-2xl font-bold text-semantic-warn mb-1">95%</div>
                <div className="text-sm text-gray-600">Éxito</div>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div>
            <div className="text-center mb-6">
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
                Elige tu plan
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Todos los planes incluyen acceso prioritario 24h antes, notificaciones instantáneas y soporte especializado.
              </p>
            </div>
            
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-brand-primary text-white text-xs px-3 py-1 shadow-sm">
                        Más popular
                      </Badge>
                    </div>
                  )}
                  {plan.recommended && (
                    <div className="absolute -top-3 right-4 z-10">
                      <Badge className="bg-semantic-success text-white text-xs px-3 py-1 shadow-sm">
                        Recomendado
                      </Badge>
                    </div>
                  )}
                  
                  <Label htmlFor={plan.id} className="cursor-pointer block">
                    <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:border-brand-primary/50 ${
                      selectedPlan === plan.id 
                        ? 'border-brand-primary bg-brand-primary/5 shadow-md scale-105' 
                        : 'border-gray-200'
                    } ${plan.popular ? 'border-brand-primary/30' : ''}`}>
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <RadioGroupItem value={plan.id} id={plan.id} />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg">{plan.name}</h4>
                            <p className="text-sm text-gray-600">{plan.subtitle}</p>
                          </div>
                        </div>
                        
                        {/* Pricing */}
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-bold text-brand-primary">
                              {plan.price}€
                            </span>
                            <span className="text-gray-500">/{plan.period}</span>
                          </div>
                          {plan.originalPrice > plan.price && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400 line-through">
                                {plan.originalPrice}€
                              </span>
                              <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/30 text-xs">
                                {plan.savings}
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        {/* Features */}
                        <div className="flex-1">
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-semantic-success flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {/* Limitations */}
                          {plan.limitations.length > 0 && (
                            <div className="mt-3 p-3 bg-semantic-warn/5 border border-semantic-warn/20 rounded-lg">
                              <div className="text-xs text-semantic-warn font-medium mb-1">Limitaciones:</div>
                              <ul className="space-y-1">
                                {plan.limitations.map((limit, index) => (
                                  <li key={index} className="flex items-start gap-2 text-xs">
                                    <AlertCircle className="w-3 h-3 text-semantic-warn flex-shrink-0 mt-0.5" />
                                    <span className="text-semantic-warn">{limit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Summary */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-primary" />
                    Resumen del pago
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium text-gray-900">{selectedPlanData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Periodo:</span>
                        <span className="font-medium text-gray-900">{selectedPlanData?.period}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio original:</span>
                        <span className="text-gray-400 line-through">{selectedPlanData?.originalPrice}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio final:</span>
                        <span className="font-bold text-brand-primary text-lg">{selectedPlanData?.price}€</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-semantic-success/10 border border-semantic-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-semantic-success" />
                      <span className="text-semantic-success font-medium">
                        Ahorras {((selectedPlanData?.originalPrice || 0) - (selectedPlanData?.price || 0)).toFixed(2)}€ ({selectedPlanData?.savings})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Security */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={setAcceptTerms}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                Acepto los{' '}
                <button className="text-brand-primary hover:underline font-medium">
                  términos y condiciones
                </button>
                {' '}y la{' '}
                <button className="text-brand-primary hover:underline font-medium">
                  política de privacidad
                </button>
                . La suscripción se renovará automáticamente. Puedes cancelar en cualquier momento.
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-semantic-success/5 border border-semantic-success/20 rounded-lg">
              <Shield className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-semantic-success mb-1">Pago 100% seguro</div>
                <p className="text-sm text-gray-600">
                  Procesamos tu pago de forma segura. Cancela en cualquier momento desde tu perfil sin penalizaciones.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 h-12"
              disabled={step === 'processing'}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleUpgrade}
              disabled={!acceptTerms || step === 'processing'}
              className="flex-1 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Zap className="w-5 h-5 mr-2" />
              Activar Prioridad - {selectedPlanData?.price}€
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}