import { useState } from 'react';
import { AuthCard } from './auth-card';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Smartphone, 
  KeyRound, 
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AuthDemoPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export function AuthDemoPage({ onNavigate }: AuthDemoPageProps) {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

  const authFlows = [
    {
      id: 'login',
      title: 'Iniciar Sesión',
      description: 'Acceso con magic link o contraseña',
      icon: LogIn,
      color: 'bg-brand-primary',
      pages: ['login', 'verify-email'],
      features: ['Magic Link', 'SSO (Google/Apple)', 'Contraseña', 'Remember me']
    },
    {
      id: 'register',
      title: 'Registro',
      description: 'Crear cuenta nueva',
      icon: UserPlus,
      color: 'bg-brand-secondary',
      pages: ['register', 'verify-email', 'complete-profile'],
      features: ['Selección de rol', 'Verificación email', 'Onboarding guiado']
    },
    {
      id: 'verification',
      title: 'Verificaciones',
      description: 'OTP y validaciones',
      icon: Smartphone,
      color: 'bg-semantic-success',
      pages: ['otp-verification'],
      features: ['SMS OTP', 'Auto-advance', 'Reenvío inteligente']
    },
    {
      id: 'recovery',
      title: 'Recuperación',
      description: 'Restablecer contraseña',
      icon: KeyRound,
      color: 'bg-semantic-warn',
      pages: ['forgot-password', 'reset-password'],
      features: ['Enlace seguro', 'Validación token', 'Medidor seguridad']
    },
    {
      id: 'security',
      title: 'Seguridad',
      description: 'Protecciones y bloqueos',
      icon: Shield,
      color: 'bg-semantic-danger',
      pages: ['account-blocked', 'captcha', 'session-expired'],
      features: ['Rate limiting', 'CAPTCHA', 'Sesiones expiradas']
    }
  ];

  const demoScenarios = [
    {
      title: 'Flujo completo de registro',
      description: 'Desde registro hasta dashboard',
      steps: ['register', 'verify-email', 'complete-profile', 'driver-dashboard'],
      duration: '~3 min'
    },
    {
      title: 'Login con problemas',
      description: 'Credenciales incorrectas → bloqueo',
      steps: ['login', 'account-blocked', 'forgot-password'],
      duration: '~1 min'
    },
    {
      title: 'Verificación OTP',
      description: 'Proceso de verificación móvil',
      steps: ['otp-verification'],
      duration: '~30 seg'
    }
  ];

  return (
    <AuthCard
      title="Sistema de Autenticación"
      subtitle="Demo completo de todos los flujos implementados"
      showLogo={false}
    >
      <div className="space-y-8">
        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-primary">12</div>
            <div className="text-sm text-gray-600">Pantallas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-secondary">5</div>
            <div className="text-sm text-gray-600">Flujos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-semantic-success">100%</div>
            <div className="text-sm text-gray-600">Accesible</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-semantic-warn">AA</div>
            <div className="text-sm text-gray-600">Contraste</div>
          </div>
        </div>

        {/* Auth Flows */}
        <div>
          <h3 className="font-medium mb-4">Flujos de Autenticación</h3>
          <div className="grid gap-3">
            {authFlows.map((flow) => (
              <Card 
                key={flow.id} 
                className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                  selectedFlow === flow.id ? 'border-brand-primary bg-blue-50' : 'border-transparent'
                }`}
                onClick={() => setSelectedFlow(selectedFlow === flow.id ? null : flow.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${flow.color} flex items-center justify-center text-white`}>
                      <flow.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{flow.title}</div>
                      <div className="text-sm text-gray-600">{flow.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{flow.pages.length} páginas</Badge>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {selectedFlow === flow.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {flow.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-3 h-3 text-semantic-success" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        {flow.pages.map((page) => (
                          <Button
                            key={page}
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate(page);
                            }}
                          >
                            {page.replace('-', ' ')}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Scenarios */}
        <div>
          <h3 className="font-medium mb-4">Escenarios de Demo</h3>
          <div className="space-y-3">
            {demoScenarios.map((scenario, index) => (
              <Card key={index} className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{scenario.title}</div>
                      <div className="text-sm text-gray-600">{scenario.description}</div>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{scenario.duration}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onNavigate(scenario.steps[0])}
                    >
                      Probar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Características Implementadas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Passwordless-first (magic links)
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              SSO con Google y Apple
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Verificación OTP por SMS
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Rate limiting y bloqueos
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Accesibilidad AA/AAA
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Redirección inteligente
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Persistencia de sesión
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-semantic-success" />
              Manejo completo de errores
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onNavigate('login')} className="flex-1">
            <LogIn className="w-4 h-4 mr-2" />
            Iniciar Demo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="flex-1"
          >
            Volver al Home
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}