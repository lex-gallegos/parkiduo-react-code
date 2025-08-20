import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '../ui/dialog';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from '../ui/tabs';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '../ui/card';
import { 
  X, 
  Shield, 
  BarChart3, 
  Target, 
  Info,
  CheckCircle,
  Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CookiePreferences {
  technical: boolean;
  analytics: boolean;
  advertising: boolean;
}

interface CookiePreferencesProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate: (page: string) => void;
  trigger?: React.ReactNode;
}

export function CookiePreferences({ isOpen, onClose, onNavigate, trigger }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    technical: true, // Always true, can't be disabled
    analytics: false,
    advertising: false
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const isModalOpen = isOpen ?? internalOpen;

  useEffect(() => {
    // Load existing preferences
    const saved = localStorage.getItem('parkiduo_cookie_consent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(prev => ({
          ...prev,
          analytics: parsed.analytics || false,
          advertising: parsed.advertising || false
        }));
      } catch (e) {
        console.warn('Could not parse cookie preferences');
      }
    }
  }, [isModalOpen]);

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'technical') return; // Technical cookies can't be disabled
    
    setPreferences(prev => ({ ...prev, [category]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: preferences.analytics,
      advertising: preferences.advertising
    };
    
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
    
    // Track the event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cookie_preferences_saved', {
        analytics: preferences.analytics,
        advertising: preferences.advertising
      });
    }
    
    toast.success('Preferencias de cookies guardadas correctamente');
    handleClose();
  };

  const handleAcceptAll = () => {
    setPreferences({
      technical: true,
      analytics: true,
      advertising: true
    });
    
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: true,
      advertising: true
    };
    
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
    toast.success('Todas las cookies aceptadas');
    handleClose();
  };

  const handleRejectAll = () => {
    setPreferences({
      technical: true,
      analytics: false,
      advertising: false
    });
    
    const consent = {
      timestamp: Date.now(),
      technical: true,
      analytics: false,
      advertising: false
    };
    
    localStorage.setItem('parkiduo_cookie_consent', JSON.stringify(consent));
    toast.success('Solo cookies técnicas aceptadas');
    handleClose();
  };

  const handleClose = () => {
    setHasChanges(false);
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  };

  const CategoryCard = ({ 
    icon: Icon, 
    title, 
    description, 
    category, 
    required = false,
    details 
  }: {
    icon: any;
    title: string;
    description: string;
    category: keyof CookiePreferences;
    required?: boolean;
    details: string;
  }) => (
    <Card className="transition-colors hover:bg-gray-50">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              category === 'technical' ? 'bg-gray-100' :
              category === 'analytics' ? 'bg-brand-primary/10' :
              'bg-semantic-warn/10'
            }`}>
              <Icon className={`w-5 h-5 ${
                category === 'technical' ? 'text-gray-600' :
                category === 'analytics' ? 'text-brand-primary' :
                'text-semantic-warn'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{title}</CardTitle>
                {required && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs">
                    Obligatorias
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={preferences[category]}
            onCheckedChange={(checked) => handlePreferenceChange(category, checked)}
            disabled={required}
            aria-label={`${required ? 'Activar/desactivar' : 'Configurar'} cookies ${title.toLowerCase()}`}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 leading-relaxed">
            {details}
          </p>
          {required && (
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
              <Info className="w-3 h-3" />
              <span>Estas cookies son imprescindibles para que la web funcione correctamente</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const DialogContentComponent = () => (
    <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader className="flex-shrink-0">
        <DialogTitle className="text-2xl font-poppins">
          Preferencias de cookies
        </DialogTitle>
        <DialogDescription>
          Gestiona qué cookies quieres que utilicemos. Puedes cambiar estas preferencias en cualquier momento.
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="preferences" className="flex-1 overflow-hidden flex flex-col">
        <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
          <TabsTrigger value="preferences">Configurar Preferencias</TabsTrigger>
          <TabsTrigger value="details">Ver Detalles</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="flex-1 overflow-y-auto space-y-6 mt-6">
          <div className="space-y-4">
            <CategoryCard
              icon={Shield}
              title="Técnicas y Funcionales"
              description="Imprescindibles para el funcionamiento básico de la web"
              category="technical"
              required={true}
              details="Incluyen cookies de sesión, seguridad, zona horaria y funcionalidades básicas como formularios. No requieren tu consentimiento ya que son estrictamente necesarias."
            />

            <CategoryCard
              icon={BarChart3}
              title="Analíticas"
              description="Nos ayudan a entender qué funciona y mejorar la plataforma"
              category="analytics"
              details="Utilizamos Google Analytics y Contentsquare para medir el rendimiento de la web, entender cómo navegas y qué contenido es más útil. Activarlas es opcional pero nos ayuda mucho a mejorar."
            />

            <CategoryCard
              icon={Target}
              title="Publicitarias y Seguimiento"
              description="Sirven para medir campañas y personalizar anuncios"
              category="advertising"
              details="Incluyen cookies de Facebook, TikTok y otras plataformas publicitarias. Se usan para medir la efectividad de nuestras campañas y personalizar anuncios. Activarlas es totalmente opcional."
            />
          </div>

          {/* Impact info */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-brand-primary mb-1">Impacto en tu experiencia</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Con cookies analíticas:</strong> Podemos mejorar la velocidad y usabilidad</li>
                  <li>• <strong>Con cookies publicitarias:</strong> Verás anuncios más relevantes en otras webs</li>
                  <li>• <strong>Sin cookies opcionales:</strong> La funcionalidad básica sigue igual</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="flex-1 overflow-y-auto mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Lista completa de cookies</h3>
              <p className="text-sm text-gray-600 mb-4">
                Esta es la lista detallada de todas las cookies que podemos utilizar en Parkiduo:
              </p>
              
              <Button
                variant="outline"
                onClick={() => onNavigate('cookies')}
                className="mb-6"
              >
                Ver tabla completa en nueva página
              </Button>
            </div>

            {/* Quick info */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <Shield className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="font-medium">5 cookies técnicas</p>
                <p className="text-sm text-gray-600">Siempre activas</p>
              </div>
              <div className="bg-brand-primary/5 p-4 rounded-md text-center">
                <BarChart3 className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                <p className="font-medium">4 cookies analíticas</p>
                <p className="text-sm text-gray-600">Opcionales</p>
              </div>
              <div className="bg-semantic-warn/5 p-4 rounded-md text-center">
                <Target className="w-8 h-8 text-semantic-warn mx-auto mb-2" />
                <p className="font-medium">4 cookies publicitarias</p>
                <p className="text-sm text-gray-600">Opcionales</p>
              </div>
            </div>

            {/* Third party info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-3">Proveedores terceros</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Google (Analytics, Ads)</span>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    Política de privacidad
                  </a>
                </div>
                <div className="flex justify-between">
                  <span>Meta/Facebook</span>
                  <a 
                    href="https://www.facebook.com/privacy/policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    Política de privacidad
                  </a>
                </div>
                <div className="flex justify-between">
                  <span>TikTok</span>
                  <a 
                    href="https://www.tiktok.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-primary hover:underline"
                  >
                    Política de privacidad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t flex-shrink-0">
        <Button
          variant="ghost"
          onClick={handleRejectAll}
          className="btn btn-md order-3 sm:order-1"
        >
          Rechazar todo
        </Button>
        
        <Button
          variant="outline"
          onClick={handleAcceptAll}
          className="btn btn-md order-2"
        >
          Aceptar todo
        </Button>
        
        <Button
          onClick={handleSave}
          className="btn btn-primary btn-md order-1 sm:order-3"
          disabled={!hasChanges}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Guardar preferencias
        </Button>
      </div>
    </DialogContent>
  );

  if (isOpen !== undefined) {
    // Controlled mode
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContentComponent />
      </Dialog>
    );
  }

  // Uncontrolled mode with trigger
  return (
    <Dialog open={internalOpen} onOpenChange={setInternalOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="btn btn-md">
            <Settings className="w-4 h-4 mr-2" />
            Preferencias de cookies
          </Button>
        )}
      </DialogTrigger>
      <DialogContentComponent />
    </Dialog>
  );
}