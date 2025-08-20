import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '../ui/accordion';
import { 
  Alert,
  AlertDescription 
} from '../ui/alert';
import { 
  Shield, 
  BarChart3, 
  Target, 
  ExternalLink, 
  Settings, 
  Info,
  Globe,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { CookiesTable } from './cookies-table';
import { CookiePreferences } from './cookie-preferences';

interface CookiesPageProps {
  onNavigate: (page: string) => void;
}

export function CookiesPage({ onNavigate }: CookiesPageProps) {
  const [showPreferences, setShowPreferences] = useState(false);

  const browserLinks = [
    { 
      name: 'Chrome', 
      url: 'https://support.google.com/chrome/answer/95647' 
    },
    { 
      name: 'Firefox', 
      url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-preferencias' 
    },
    { 
      name: 'Safari', 
      url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' 
    },
    { 
      name: 'Edge', 
      url: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' 
    }
  ];

  const thirdPartyProviders = [
    {
      name: 'Google Analytics / Google Ads',
      purpose: 'Análisis de comportamiento y campañas publicitarias',
      transfers: 'Estados Unidos (Adecuación)',
      policy: 'https://policies.google.com/privacy'
    },
    {
      name: 'Meta/Facebook',
      purpose: 'Píxel de seguimiento y campañas publicitarias',
      transfers: 'Estados Unidos (Adecuación)',
      policy: 'https://www.facebook.com/privacy/policy'
    },
    {
      name: 'TikTok for Business',
      purpose: 'Seguimiento de conversiones publicitarias',
      transfers: 'Singapur, Estados Unidos',
      policy: 'https://www.tiktok.com/legal/privacy-policy'
    },
    {
      name: 'Contentsquare',
      purpose: 'Análisis de experiencia de usuario',
      transfers: 'Francia (UE)',
      policy: 'https://contentsquare.com/privacy-policy/'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
              Política de Cookies
            </h1>
            <p className="text-xl leading-relaxed text-white/90 mb-8">
              Usamos cookies técnicas (imprescindibles), analíticas y publicitarias (opcionales). 
              Puedes cambiar tu elección cuando quieras desde el pie de página.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowPreferences(true)}
                className="btn btn-lg bg-white text-brand-primary hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 mr-2" />
                Configurar preferencias
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('home')}
                className="btn btn-lg border-white text-white hover:bg-white/10"
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Quick Summary */}
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="w-5 h-5 text-brand-primary" />
            <AlertDescription className="text-gray-700">
              <strong>Resumen rápido:</strong> Las cookies técnicas son obligatorias para que la web funcione. 
              Las analíticas y publicitarias requieren tu consentimiento y puedes activarlas o desactivarlas en cualquier momento.
            </AlertDescription>
          </Alert>

          {/* Introduction */}
          <section className="prose prose-lg max-w-none">
            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
              Nos permiten recordar tus preferencias, mejorar tu experiencia de navegación y entender cómo utilizas nuestros servicios.
            </p>
            <p>
              En Parkiduo utilizamos cookies para garantizar el funcionamiento de la plataforma, analizar el tráfico 
              y personalizar el contenido. Algunas son esenciales y otras requieren tu consentimiento.
            </p>
          </section>

          {/* Legal basis */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Base jurídica y consentimiento</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-semantic-success" />
                    Cookies técnicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Se basan en el <strong>interés legítimo</strong> y son estrictamente necesarias para el funcionamiento 
                    del sitio web. No requieren consentimiento según el artículo 6.1.f del RGPD.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-primary" />
                    Cookies opcionales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Requieren tu <strong>consentimiento explícito</strong> según la Ley 34/2002 de Servicios de la 
                    Sociedad de la Información. Puedes revocar este consentimiento en cualquier momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Cookie categories */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Categorías de cookies</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="technical" className="border border-gray-200 rounded-md px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Cookies técnicas y funcionales</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">Obligatorias</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-gray-700">
                    Son imprescindibles para el funcionamiento básico del sitio web. Incluyen cookies de sesión, 
                    seguridad, formularios y preferencias básicas del usuario.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Ejemplos de uso:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Mantener tu sesión iniciada mientras navegas</li>
                      <li>• Recordar la información que has introducido en formularios</li>
                      <li>• Detectar intentos de fraude o actividad sospechosa</li>
                      <li>• Guardar tu zona horaria para mostrar fechas correctas</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="analytics" className="border border-gray-200 rounded-md px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium">Cookies analíticas</span>
                    <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                      Requieren consentimiento
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-gray-700">
                    Nos permiten analizar cómo los usuarios utilizan el sitio web para mejorar la experiencia 
                    y el rendimiento. Utilizamos Google Analytics y Contentsquare.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h4 className="font-medium mb-2 text-brand-primary">¿Para qué las usamos?</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Entender qué páginas son más populares</li>
                      <li>• Identificar problemas de usabilidad</li>
                      <li>• Medir el tiempo de carga y rendimiento</li>
                      <li>• Conocer desde qué dispositivos nos visitas</li>
                    </ul>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Tu privacidad:</strong> Los datos se procesan de forma agregada y anónima. 
                    Google Analytics utiliza técnicas de anonimización de IP.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="advertising" className="border border-gray-200 rounded-md px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-semantic-warn" />
                    <span className="font-medium">Cookies publicitarias y de seguimiento</span>
                    <Badge variant="outline" className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/20">
                      Requieren consentimiento
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <p className="text-gray-700">
                    Se utilizan para crear perfiles de usuario, medir la efectividad de campañas publicitarias 
                    y mostrar anuncios personalizados en otras plataformas.
                  </p>
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <h4 className="font-medium mb-2 text-semantic-warn">Funcionalidades:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Medir conversiones de campañas publicitarias</li>
                      <li>• Crear audiencias personalizadas (remarketing)</li>
                      <li>• Personalizar anuncios en Facebook, Google y TikTok</li>
                      <li>• Evitar mostrar el mismo anuncio repetidamente</li>
                    </ul>
                  </div>
                  <Alert className="bg-amber-50 border-amber-200">
                    <Globe className="w-4 h-4 text-semantic-warn" />
                    <AlertDescription className="text-gray-700">
                      <strong>Transferencias internacionales:</strong> Algunas de estas cookies pueden implicar 
                      transferencias de datos a terceros países. Ver sección específica más abajo.
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Cookies table */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Lista completa de cookies</h2>
            <p className="text-gray-700 mb-6">
              Esta es la lista detallada de todas las cookies que utiliza Parkiduo, su finalidad y duración:
            </p>
            <CookiesTable />
          </section>

          {/* Browser settings */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Cómo deshabilitarlas en tu navegador</h2>
            <p className="text-gray-700 mb-6">
              Puedes gestionar o eliminar cookies a través de la configuración de tu navegador. 
              Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              {browserLinks.map(browser => (
                <a
                  key={browser.name}
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">{browser.name}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
          </section>

          {/* Third parties */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Cookies de terceros y transferencias internacionales</h2>
            <p className="text-gray-700 mb-6">
              Algunos de nuestros proveedores pueden establecer sus propias cookies. A continuación, 
              la lista de terceros y enlaces a sus políticas de privacidad:
            </p>
            
            <div className="space-y-4">
              {thirdPartyProviders.map(provider => (
                <Card key={provider.name}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{provider.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{provider.purpose}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Globe className="w-3 h-3" />
                          <span>Transferencias: {provider.transfers}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(provider.policy, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Política de privacidad
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="bg-blue-50 border-blue-200 mt-6">
              <Info className="w-5 h-5 text-brand-primary" />
              <AlertDescription className="text-gray-700">
                <strong>Garantías de protección:</strong> Todos nuestros proveedores cumplen con las decisiones 
                de adecuación de la UE o tienen implementadas medidas de protección adicionales (cláusulas 
                contractuales tipo, certificaciones) para garantizar un nivel de protección equivalente al europeo.
              </AlertDescription>
            </Alert>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold font-poppins mb-6">Actualizaciones de esta política</h2>
            <div className="bg-gray-50 p-6 rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Última actualización: Agosto de 2025</span>
              </div>
              <p className="text-gray-700 mb-4">
                Esta política puede actualizarse ocasionalmente para reflejar cambios en nuestras prácticas 
                o en la legislación aplicable. Te notificaremos de cualquier cambio significativo.
              </p>
              <p className="text-sm text-gray-600">
                Si tienes preguntas sobre esta política, puedes contactarnos en{' '}
                <a href="mailto:hola@parkiduo.com" className="text-brand-primary hover:underline">
                  hola@parkiduo.com
                </a>
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-poppins mb-4">
                  ¿Quieres cambiar tus preferencias?
                </h3>
                <p className="text-gray-700 mb-6">
                  Puedes modificar tu consentimiento para cookies analíticas y publicitarias en cualquier momento.
                </p>
                <Button
                  onClick={() => setShowPreferences(true)}
                  className="btn btn-primary btn-lg"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Abrir preferencias
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}