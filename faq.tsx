import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Footer } from './footer';
import { 
  Search,
  MessageCircle,
  HelpCircle,
  Shield,
  Euro,
  Clock,
  Users,
  FileText,
  MapPin,
  Star,
  Phone
} from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string, options?: any) => void;
}

export function FAQPage({ onNavigate }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas', icon: <HelpCircle className="w-4 h-4" />, count: 24 },
    { id: 'parker', label: 'Para Parker', icon: <MapPin className="w-4 h-4" />, count: 8 },
    { id: 'driver', label: 'Para Driver', icon: <Search className="w-4 h-4" />, count: 7 },
    { id: 'payment', label: 'Pagos', icon: <Euro className="w-4 h-4" />, count: 4 },
    { id: 'legal', label: 'Legal', icon: <Shield className="w-4 h-4" />, count: 3 },
    { id: 'technical', label: 'Técnica', icon: <Phone className="w-4 h-4" />, count: 2 }
  ];

  const faqs = [
    // Parker FAQs
    {
      id: 1,
      category: 'parker',
      question: '¿Puedo subarrendar mi plaza si soy inquilino?',
      answer: 'Sí, siempre que tengas permiso expreso del propietario. Te recomendamos verificar tu contrato de alquiler y, si es necesario, solicitar autorización por escrito. En muchos casos, los propietarios están abiertos a esta posibilidad ya que no supone ningún coste adicional para ellos.',
      tags: ['subarriendo', 'inquilino', 'propietario']
    },
    {
      id: 2,
      category: 'parker',
      question: '¿Cuánto puedo ganar con mi plaza de garaje?',
      answer: 'Depende de la ubicación, demanda y horarios. Las plazas en Madrid Centro pueden generar entre 100-180€/mes, en Barcelona 80-150€/mes, y en Valencia 60-120€/mes. Nuestra calculadora de precios te dará una estimación personalizada.',
      tags: ['precio', 'ingresos', 'madrid', 'barcelona']
    },
    {
      id: 3,
      category: 'parker',
      question: '¿Qué documentación necesito para publicar mi plaza?',
      answer: 'Necesitas: DNI/NIE, documento que acredite tu derecho sobre la plaza (escritura, contrato de alquiler con permiso de subarriendo), y fotos de la plaza. Opcionalmente, puedes añadir un croquis o plano de ubicación.',
      tags: ['documentos', 'dni', 'escritura']
    },
    {
      id: 4,
      category: 'parker',
      question: '¿Puedo elegir con quién comparto mi plaza?',
      answer: 'Absolutamente. Tú tienes control total sobre quién puede usar tu plaza. Recibirás solicitudes de conductores compatibles y podrás revisar sus perfiles antes de decidir con quién hablar.',
      tags: ['elección', 'control', 'perfiles']
    },
    {
      id: 5,
      category: 'parker',
      question: '¿Qué pasa si mi conductor no paga el alquiler?',
      answer: 'Aunque Parkiduo facilita el contacto, el contrato de alquiler es entre tú y el conductor. Recomendamos solicitar fianza (equivalente a 1-2 meses) y usar nuestro modelo de contrato que incluye cláusulas de protección.',
      tags: ['impago', 'fianza', 'contrato']
    },
    {
      id: 6,
      category: 'parker',
      question: '¿Puedo cambiar el precio de mi plaza una vez publicada?',
      answer: 'Sí, puedes modificar el precio en cualquier momento desde tu dashboard. Si ya tienes un acuerdo activo, el cambio se aplicará al siguiente período de renovación acordado en el contrato.',
      tags: ['precio', 'modificar', 'dashboard']
    },
    {
      id: 7,
      category: 'parker',
      question: '¿Qué responsabilidades tengo como Parker?',
      answer: 'Debes mantener la plaza en condiciones de uso, respetar los horarios acordados, dar acceso al conductor según lo pactado, y comunicar con antelación cualquier indisponibilidad temporal.',
      tags: ['responsabilidades', 'mantenimiento', 'horarios']
    },
    {
      id: 8,
      category: 'parker',
      question: '¿Puedo usar mi plaza ocasionalmente si la tengo alquilada?',
      answer: 'Depende del acuerdo con tu conductor. Si es un DUO (horarios complementarios), podrás usar tu plaza en tu horario asignado. Si es alquiler completo, deberás acordar excepciones previamente.',
      tags: ['uso ocasional', 'duo', 'horarios']
    },

    // Driver FAQs
    {
      id: 9,
      category: 'driver',
      question: '¿Cómo funciona el sistema de prioridad 24h?',
      answer: 'Con prioridad 24h, ves las nuevas plazas publicadas 24 horas antes que otros conductores. Cuesta 9.95€/mes y aumenta significativamente tus posibilidades de conseguir las mejores plazas.',
      tags: ['prioridad', 'coste', 'ventaja']
    },
    {
      id: 10,
      category: 'driver',
      question: '¿Qué pasa si llego tarde y mi pareja DUO está esperando?',
      answer: 'Recomendamos establecer un tiempo de cortesía de 15-30 minutos en el contrato. Para situaciones excepcionales, la comunicación previa es clave. Algunos usuarios optan por incluir una pequeña penalización económica (5-10€) para casos recurrentes.',
      tags: ['retraso', 'cortesia', 'comunicacion']
    },
    {
      id: 11,
      category: 'driver',
      question: '¿Puedo cancelar mi búsqueda de plaza?',
      answer: 'Sí, puedes pausar o cancelar tu búsqueda en cualquier momento desde tu dashboard. Si ya tienes un contrato firmado, se aplicarán las condiciones de cancelación acordadas (normalmente 30 días de preaviso).',
      tags: ['cancelar', 'pausar', 'dashboard']
    },
    {
      id: 12,
      category: 'driver',
      question: '¿Qué garantías tengo como conductor?',
      answer: 'Parkiduo facilita el contacto y proporciona modelos de contrato, pero el acuerdo es entre tú y el propietario. Recomendamos usar siempre contrato escrito y verificar la legitimidad del propietario.',
      tags: ['garantias', 'contrato', 'verificacion']
    },
    {
      id: 13,
      category: 'driver',
      question: '¿Puedo compartir mi plaza con otro conductor?',
      answer: 'Solo si el propietario lo autoriza expresamente. En ese caso, seríais corresponsables del pago y cumplimiento del contrato. No recomendamos subarrendamientos no autorizados.',
      tags: ['compartir', 'corresponsable', 'autorizacion']
    },
    {
      id: 14,
      category: 'driver',
      question: '¿Qué hago si la plaza no coincide con la descripción?',
      answer: 'Contacta inmediatamente con el propietario y con nuestro soporte. Si hay discrepancias significativas, recomendamos no firmar el contrato hasta resolverlas. Tenemos mediación gratuita para estos casos.',
      tags: ['discrepancia', 'soporte', 'mediacion']
    },
    {
      id: 15,
      category: 'driver',
      question: '¿Puedo cambiar de plaza si no estoy satisfecho?',
      answer: 'Sí, respetando el período de preaviso acordado en tu contrato (normalmente 30 días). Mientras tanto, puedes activar nuevas búsquedas desde tu dashboard.',
      tags: ['cambiar plaza', 'preaviso', 'busqueda']
    },

    // Payment FAQs
    {
      id: 16,
      category: 'payment',
      question: '¿Cuándo y cómo se cobra la comisión de 29.95€?',
      answer: 'Se cobra únicamente cuando se firma un contrato exitoso. Se puede pagar con tarjeta, PayPal o transferencia. No hay comisiones mensuales ni costes ocultos.',
      tags: ['comision', 'pago', 'tarjeta']
    },
    {
      id: 17,
      category: 'payment',
      question: '¿Quién paga la comisión, el Parker o el Driver?',
      answer: 'La comisión la paga quien inicia el proceso exitoso. Si un Parker publica y consigue inquilino, paga el Parker. Si un Driver solicita y consigue plaza, paga el Driver.',
      tags: ['quien paga', 'parker', 'driver']
    },
    {
      id: 18,
      category: 'payment',
      question: '¿Hay reembolso si el acuerdo se cancela pronto?',
      answer: 'No hay reembolso de la comisión de Parkiduo, ya que nuestro servicio se ha prestado correctamente (facilitar el contacto). Sin embargo, los pagos entre Parker y Driver se rigen por su contrato particular.',
      tags: ['reembolso', 'cancelacion', 'contrato']
    },
    {
      id: 19,
      category: 'payment',
      question: '¿Parkiduo gestiona los pagos mensuales del alquiler?',
      answer: 'No, los pagos del alquiler mensual son directamente entre Parker y Driver según lo acordado en su contrato. Parkiduo solo cobra la comisión inicial por facilitar el contacto.',
      tags: ['pagos mensuales', 'gestion', 'directo']
    },

    // Legal FAQs
    {
      id: 20,
      category: 'legal',
      question: '¿El contrato de Parkiduo es obligatorio?',
      answer: 'No es obligatorio, pero sí muy recomendable. Nuestro modelo incluye cláusulas estándar que protegen ambas partes. Puedes usarlo como base y modificarlo según vuestras necesidades específicas.',
      tags: ['contrato', 'obligatorio', 'recomendable']
    },
    {
      id: 21,
      category: 'legal',
      question: '¿Qué validez legal tiene el modelo de contrato?',
      answer: 'Nuestro modelo ha sido revisado por abogados especialistas en arrendamientos urbanos y cumple la normativa vigente. Sin embargo, recomendamos revisión legal para casos complejos.',
      tags: ['validez legal', 'abogados', 'normativa']
    },
    {
      id: 22,
      category: 'legal',
      question: '¿Qué pasa en caso de daños en la plaza?',
      answer: 'Los daños se rigen por el contrato particular entre Parker y Driver. Recomendamos hacer fotos antes del inicio del alquiler y acordar quién se responsabiliza de cada tipo de daño.',
      tags: ['daños', 'responsabilidad', 'fotos']
    },

    // Technical FAQs
    {
      id: 23,
      category: 'technical',
      question: '¿Cómo os contactáis Parker y Driver entre vosotros?',
      answer: 'Una vez que ambas partes aprueban el match, intercambiáis números de teléfono a través de nuestra plataforma. También podéis usar WhatsApp, email o cualquier método que os resulte cómodo.',
      tags: ['contacto', 'telefono', 'whatsapp']
    },
    {
      id: 24,
      category: 'technical',
      question: '¿Puedo usar Parkiduo desde el móvil?',
      answer: 'Sí, nuestra web está optimizada para móviles y tablets. Próximamente lanzaremos apps nativas para iOS y Android con funcionalidades adicionales.',
      tags: ['movil', 'app', 'responsive']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/34666666666?text=Hola%2C%20tengo%20una%20duda%20sobre%20Parkiduo', '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-6">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Encuentra respuestas a las dudas más comunes sobre Parkiduo
          </p>
          
          {/* Buscador */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar con categorías */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Categorías
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-brand-primary text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <span className="font-medium">{category.label}</span>
                        </div>
                        <Badge 
                          variant={selectedCategory === category.id ? "secondary" : "outline"}
                          className={selectedCategory === category.id ? "bg-white/20 text-white border-white/30" : ""}
                        >
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact support */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    ¿Necesitas más ayuda?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Si no encuentras la respuesta que buscas, contacta con nuestro equipo de soporte.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      onClick={handleWhatsAppContact}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = 'mailto:soporte@parkiduo.com'}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-poppins text-xl font-semibold">
                    {filteredFAQs.length} pregunta{filteredFAQs.length !== 1 ? 's' : ''} encontrada{filteredFAQs.length !== 1 ? 's' : ''}
                  </h2>
                  {searchQuery && (
                    <p className="text-sm text-gray-600 mt-1">
                      Resultados para: <strong>"{searchQuery}"</strong>
                    </p>
                  )}
                </div>
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    onClick={() => setSearchQuery('')}
                    className="text-sm"
                  >
                    Limpiar búsqueda
                  </Button>
                )}
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={`item-${faq.id}`} 
                    className="border border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {faq.category === 'parker' && <MapPin className="w-4 h-4 text-brand-primary" />}
                          {faq.category === 'driver' && <Search className="w-4 h-4 text-brand-secondary" />}
                          {faq.category === 'payment' && <Euro className="w-4 h-4 text-semantic-success" />}
                          {faq.category === 'legal' && <Shield className="w-4 h-4 text-semantic-warn" />}
                          {faq.category === 'technical' && <Phone className="w-4 h-4 text-gray-500" />}
                        </div>
                        <span className="text-left text-[14px]">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pl-7">
                      <p className="mb-4 leading-relaxed">{faq.answer}</p>
                      {faq.tags.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Tags relacionados:</p>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs cursor-pointer hover:bg-gray-100"
                                onClick={() => setSearchQuery(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-poppins text-lg font-medium text-gray-900 mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Intenta con otros términos de búsqueda o selecciona una categoría diferente.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Ver todas las preguntas
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8 text-center">
            <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-600 mb-6">
              Si ya tienes claro cómo funciona, empieza a publicar o solicitar tu plaza ahora mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="btn-primary btn-lg"
                onClick={() => onNavigate('parker-onboarding', { analytics: 'faq_publish_clicked' })}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Publicar garaje
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate('driver-onboarding', { analytics: 'faq_request_clicked' })}
              >
                <Search className="w-5 h-5 mr-2" />
                Solicitar garaje
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}