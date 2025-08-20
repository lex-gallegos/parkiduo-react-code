import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Shield, Download, Mail } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  const lastUpdated = '15 de noviembre de 2024';

  const handleDownloadPDF = () => {
    // Mock PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Política de Privacidad de Parkiduo...';
    element.download = 'politica-privacidad-parkiduo.pdf';
    element.click();
  };

  const handleDataRequest = () => {
    window.open('mailto:privacidad@parkiduo.com?subject=Solicitud de datos personales&body=Hola%2C%0A%0ASolicito acceso a mis datos personales según el RGPD.%0A%0ANombre:%0AEmail de la cuenta:%0ADNI/NIE:%0A%0AGracias', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="btn-ghost btn-md"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        <main id="main-content" className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-semantic-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-semantic-success" />
            </div>
            <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
              Política de Privacidad
            </h1>
            <p className="text-gray-600">
              Última actualización: {lastUpdated}
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                className="btn-md"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleDataRequest}
                className="btn-md"
              >
                <Mail className="w-4 h-4 mr-2" />
                Solicitar mis datos
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>1. Introducción</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  En Parkiduo, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
                  Esta política de privacidad explica cómo recopilamos, usamos, almacenamos y protegemos 
                  tu información personal cuando utilizas nuestros servicios.
                </p>
                <p>
                  Cumplimos con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 
                  de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
                </p>
              </CardContent>
            </Card>

            {/* Data Controller */}
            <Card>
              <CardHeader>
                <CardTitle>2. Responsable del Tratamiento</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Razón Social:</strong> Parkiduo S.L.</p>
                  <p><strong>CIF:</strong> B-12345678</p>
                  <p><strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España</p>
                  <p><strong>Email:</strong> privacidad@parkiduo.com</p>
                  <p><strong>Teléfono:</strong> +34 666 666 666</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Collection */}
            <Card>
              <CardHeader>
                <CardTitle>3. Datos que Recopilamos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>3.1 Datos de Identificación</h4>
                <ul>
                  <li>Nombre y apellidos</li>
                  <li>Documento de identidad (DNI/NIE)</li>
                  <li>Fecha de nacimiento</li>
                  <li>Fotografía de perfil (opcional)</li>
                </ul>

                <h4>3.2 Datos de Contacto</h4>
                <ul>
                  <li>Dirección de email</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal</li>
                </ul>

                <h4>3.3 Datos del Vehículo (solo Drivers)</h4>
                <ul>
                  <li>Marca, modelo y matrícula del vehículo</li>
                  <li>Tipo de vehículo y dimensiones</li>
                  <li>Fotografías del vehículo (opcional)</li>
                </ul>

                <h4>3.4 Datos de la Plaza (solo Parkers)</h4>
                <ul>
                  <li>Dirección exacta de la plaza</li>
                  <li>Características y dimensiones</li>
                  <li>Fotografías de la plaza</li>
                  <li>Condiciones de uso y acceso</li>
                </ul>

                <h4>3.5 Datos de Uso y Navegación</h4>
                <ul>
                  <li>Direcciones IP</li>
                  <li>Información del navegador y dispositivo</li>
                  <li>Páginas visitadas y tiempo de permanencia</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </CardContent>
            </Card>

            {/* Legal Basis */}
            <Card>
              <CardHeader>
                <CardTitle>4. Base Legal del Tratamiento</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>4.1 Consentimiento</h4>
                <p>
                  Para el registro en la plataforma, envío de comunicaciones comerciales 
                  y uso de cookies no esenciales.
                </p>

                <h4>4.2 Ejecución de Contrato</h4>
                <p>
                  Para proporcionar nuestros servicios de intermediación entre Parker y Driver, 
                  gestión de solicitudes y soporte técnico.
                </p>

                <h4>4.3 Interés Legítimo</h4>
                <p>
                  Para la prevención del fraude, mejora de nuestros servicios y análisis estadísticos.
                </p>

                <h4>4.4 Obligación Legal</h4>
                <p>
                  Para cumplir con obligaciones fiscales, contables y de prevención de blanqueo de capitales.
                </p>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card>
              <CardHeader>
                <CardTitle>5. Cómo Utilizamos tus Datos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul>
                  <li><strong>Prestación del servicio:</strong> Conectar Parker y Driver, gestionar solicitudes</li>
                  <li><strong>Comunicación:</strong> Notificaciones, soporte técnico, actualizaciones del servicio</li>
                  <li><strong>Verificación:</strong> Confirmar identidad y prevenir fraudes</li>
                  <li><strong>Marketing:</strong> Enviar ofertas y promociones (con tu consentimiento)</li>
                  <li><strong>Mejora del servicio:</strong> Análisis de uso, desarrollo de nuevas funcionalidades</li>
                  <li><strong>Cumplimiento legal:</strong> Obligaciones fiscales y regulatorias</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>6. Compartir Datos con Terceros</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>6.1 Con otros Usuarios</h4>
                <p>
                  Compartimos datos de contacto básicos entre Parker y Driver cuando hay un match exitoso 
                  para facilitar la comunicación directa.
                </p>

                <h4>6.2 Proveedores de Servicios</h4>
                <ul>
                  <li><strong>Pasarelas de pago:</strong> Para procesar pagos de comisiones</li>
                  <li><strong>Servicios de email:</strong> Para envío de notificaciones</li>
                  <li><strong>Servicios de análisis:</strong> Google Analytics (anonimizado)</li>
                  <li><strong>Almacenamiento en la nube:</strong> AWS/Google Cloud para backup de datos</li>
                </ul>

                <h4>6.3 Autoridades</h4>
                <p>
                  Solo cuando sea requerido por ley o por orden judicial.
                </p>

                <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <strong>Importante:</strong> Nunca vendemos tus datos personales a terceros con fines comerciales.
                </p>
              </CardContent>
            </Card>

            {/* Data Storage */}
            <Card>
              <CardHeader>
                <CardTitle>7. Conservación de Datos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <ul>
                  <li><strong>Datos de cuenta activa:</strong> Mientras mantengas tu cuenta</li>
                  <li><strong>Datos de contrato:</strong> 5 años después de finalizar el contrato (obligación legal)</li>
                  <li><strong>Datos de marketing:</strong> Hasta que retires el consentimiento</li>
                  <li><strong>Datos de navegación:</strong> Máximo 25 meses (cookies)</li>
                  <li><strong>Datos de soporte:</strong> 3 años para garantizar la calidad del servicio</li>
                </ul>
                <p>
                  Tras estos períodos, los datos se eliminan de forma segura o se anonimizan para estudios estadísticos.
                </p>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle>8. Tus Derechos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>Tienes derecho a:</h4>
                <ul>
                  <li><strong>Acceso:</strong> Conocer qué datos tenemos sobre ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos incorrectos o desactualizados</li>
                  <li><strong>Supresión:</strong> Eliminar tus datos ("derecho al olvido")</li>
                  <li><strong>Limitación:</strong> Restringir el tratamiento de tus datos</li>
                  <li><strong>Portabilidad:</strong> Obtener tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al tratamiento por interés legítimo</li>
                  <li><strong>Retirar consentimiento:</strong> En cualquier momento</li>
                </ul>

                <div className="bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/20">
                  <h4 className="text-brand-primary mb-2">¿Cómo ejercer tus derechos?</h4>
                  <p>Envía un email a <strong>privacidad@parkiduo.com</strong> con:</p>
                  <ul className="mb-0">
                    <li>Copia de tu DNI/NIE</li>
                    <li>Descripción del derecho que quieres ejercer</li>
                    <li>Dirección para recibir respuesta</li>
                  </ul>
                  <p className="mb-0 mt-2">
                    <strong>Plazo de respuesta:</strong> Máximo 1 mes desde la solicitud.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle>9. Seguridad de los Datos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos:</p>
                <ul>
                  <li><strong>Cifrado:</strong> SSL/TLS para transmisión, AES-256 para almacenamiento</li>
                  <li><strong>Control de acceso:</strong> Autenticación de dos factores para empleados</li>
                  <li><strong>Auditorías:</strong> Revisiones regulares de seguridad</li>
                  <li><strong>Formación:</strong> Personal formado en protección de datos</li>
                  <li><strong>Backup:</strong> Copias de seguridad cifradas y distribuidas</li>
                  <li><strong>Monitorización:</strong> Detección automática de intentos de acceso no autorizado</li>
                </ul>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>10. Transferencias Internacionales</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico Europeo (EEE). 
                  En estos casos, garantizamos un nivel de protección adecuado mediante:
                </p>
                <ul>
                  <li>Cláusulas contractuales tipo aprobadas por la Comisión Europea</li>
                  <li>Certificaciones de adecuación (ej: Privacy Shield)</li>
                  <li>Códigos de conducta y mecanismos de certificación</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle>11. Cookies y Tecnologías Similares</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Utilizamos cookies para mejorar tu experiencia. Para más información, consulta nuestra{' '}
                  <button 
                    onClick={() => onNavigate('cookies')}
                    className="text-brand-primary hover:underline"
                  >
                    Política de Cookies
                  </button>
                  .
                </p>
                <p>
                  Puedes gestionar tus preferencias de cookies en cualquier momento desde{' '}
                  <button 
                    onClick={() => onNavigate('cookie-preferences')}
                    className="text-brand-primary hover:underline"
                  >
                    Configuración de Cookies
                  </button>
                  .
                </p>
              </CardContent>
            </Card>

            {/* Contact and Complaints */}
            <Card>
              <CardHeader>
                <CardTitle>12. Contacto y Reclamaciones</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4>Contacto Privacidad</h4>
                    <ul>
                      <li><strong>Email:</strong> privacidad@parkiduo.com</li>
                      <li><strong>Teléfono:</strong> +34 666 666 666</li>
                      <li><strong>Horario:</strong> L-V 9:00-18:00</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Autoridad de Control</h4>
                    <p>
                      Si no estás satisfecho con nuestro tratamiento de tus datos, 
                      puedes presentar una reclamación ante la Agencia Española de Protección de Datos:
                    </p>
                    <ul>
                      <li><strong>Web:</strong> www.aepd.es</li>
                      <li><strong>Teléfono:</strong> 901 100 099</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>13. Actualizaciones de la Política</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Podemos actualizar esta política para reflejar cambios en nuestras prácticas o 
                  en la legislación aplicable. Te notificaremos los cambios significativos:
                </p>
                <ul>
                  <li>Por email (cambios sustanciales)</li>
                  <li>Notificación en la plataforma</li>
                  <li>Actualización de la fecha en esta página</li>
                </ul>
                <p>
                  Te recomendamos revisar esta política periódicamente para mantenerte informado 
                  sobre cómo protegemos tus datos.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}