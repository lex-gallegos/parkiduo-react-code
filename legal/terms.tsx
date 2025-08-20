import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, FileText, Download } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  const lastUpdated = '15 de noviembre de 2024';

  const handleDownloadPDF = () => {
    // Mock PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,Términos y Condiciones de Parkiduo...';
    element.download = 'terminos-condiciones-parkiduo.pdf';
    element.click();
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
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-gray-600">
              Última actualización: {lastUpdated}
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                className="btn-md"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
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
                  Bienvenido a Parkiduo, una plataforma digital que conecta propietarios de plazas de garaje (Parker) 
                  con conductores que buscan alquilar dichas plazas (Driver). Estos términos y condiciones regulan 
                  el uso de nuestros servicios.
                </p>
                <p>
                  Al acceder y utilizar Parkiduo, aceptas estar sujeto a estos términos y condiciones. 
                  Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestros servicios.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle>2. Descripción del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Parkiduo ofrece los siguientes servicios:</p>
                <ul>
                  <li>Plataforma para publicar plazas de garaje disponibles para alquiler</li>
                  <li>Sistema de búsqueda y filtrado de plazas de garaje</li>
                  <li>Herramientas de comunicación entre Parker y Driver</li>
                  <li>Modelos de contrato de alquiler recomendados</li>
                  <li>Sistema de gestión de solicitudes y reservas</li>
                </ul>
                <p>
                  <strong>Importante:</strong> Parkiduo actúa únicamente como intermediario. 
                  Los contratos de alquiler se establecen directamente entre Parker y Driver.
                </p>
              </CardContent>
            </Card>

            {/* User Obligations */}
            <Card>
              <CardHeader>
                <CardTitle>3. Obligaciones de los Usuarios</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>3.1 Obligaciones Generales</h4>
                <ul>
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                  <li>Usar el servicio de manera responsable y legal</li>
                  <li>Respetar los derechos de otros usuarios</li>
                  <li>No publicar contenido fraudulento, ofensivo o ilegal</li>
                </ul>

                <h4>3.2 Obligaciones del Parker</h4>
                <ul>
                  <li>Verificar su derecho legal a subarrendar la plaza</li>
                  <li>Proporcionar descripción e imágenes precisas de la plaza</li>
                  <li>Mantener la plaza en condiciones de uso adecuadas</li>
                  <li>Cumplir con los términos del contrato acordado con el Driver</li>
                </ul>

                <h4>3.3 Obligaciones del Driver</h4>
                <ul>
                  <li>Usar la plaza únicamente para los fines acordados</li>
                  <li>Pagar puntualmente las rentas acordadas</li>
                  <li>Mantener la plaza en buen estado</li>
                  <li>Respetar las normas del garaje y del edificio</li>
                </ul>
              </CardContent>
            </Card>

            {/* Fees and Payments */}
            <Card>
              <CardHeader>
                <CardTitle>4. Tarifas y Pagos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h4>4.1 Comisión de Parkiduo</h4>
                <p>
                  Parkiduo cobra una comisión única de <strong>29,95€</strong> por cada contrato de alquiler 
                  exitoso completado a través de la plataforma. Esta comisión se cobra al momento de confirmar 
                  el acuerdo entre Parker y Driver.
                </p>

                <h4>4.2 Pagos entre Usuarios</h4>
                <p>
                  Los pagos de renta, fianza y otros conceptos se realizan directamente entre Parker y Driver. 
                  Parkiduo no gestiona estos pagos ni actúa como intermediario financiero.
                </p>

                <h4>4.3 Servicios Premium</h4>
                <ul>
                  <li><strong>Prioridad 24h:</strong> 1,99€ por 15 días de prueba, después 2,99€/mes</li>
                  <li>Acceso prioritario a nuevas plazas publicadas</li>
                  <li>Notificaciones instantáneas</li>
                  <li>Soporte prioritario</li>
                </ul>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card>
              <CardHeader>
                <CardTitle>5. Limitación de Responsabilidad</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Parkiduo actúa únicamente como plataforma de intermediación. No somos responsables de:
                </p>
                <ul>
                  <li>El cumplimiento de los contratos entre Parker y Driver</li>
                  <li>La veracidad de la información proporcionada por los usuarios</li>
                  <li>Daños o perjuicios derivados del uso de las plazas de garaje</li>
                  <li>Problemas de acceso, seguridad o mantenimiento de las plazas</li>
                  <li>Disputas entre usuarios</li>
                </ul>
                <p>
                  Recomendamos encarecidamente el uso de contratos escritos y la verificación 
                  de la legitimidad de las ofertas antes de proceder con cualquier acuerdo.
                </p>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>6. Protección de Datos</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  El tratamiento de datos personales se rige por nuestra{' '}
                  <button 
                    onClick={() => onNavigate('privacy')}
                    className="text-brand-primary hover:underline"
                  >
                    Política de Privacidad
                  </button>
                  , que forma parte integral de estos términos.
                </p>
                <p>
                  Al usar nuestros servicios, consientes el tratamiento de tus datos según lo establecido 
                  en dicha política y la normativa vigente de protección de datos.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>7. Terminación del Servicio</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Tanto tú como Parkiduo podemos terminar el uso del servicio en cualquier momento:
                </p>
                <ul>
                  <li><strong>Por parte del usuario:</strong> Eliminando tu cuenta desde el perfil</li>
                  <li><strong>Por parte de Parkiduo:</strong> En caso de incumplimiento de estos términos</li>
                </ul>
                <p>
                  La terminación no afecta a los contratos ya establecidos entre Parker y Driver, 
                  ni a las obligaciones de pago pendientes.
                </p>
              </CardContent>
            </Card>

            {/* Modifications */}
            <Card>
              <CardHeader>
                <CardTitle>8. Modificaciones</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Las modificaciones serán notificadas a través de:
                </p>
                <ul>
                  <li>Email a todos los usuarios registrados</li>
                  <li>Notificación en la plataforma</li>
                  <li>Actualización de la fecha en esta página</li>
                </ul>
                <p>
                  El uso continuado del servicio tras la notificación constituye aceptación de los nuevos términos.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>9. Contacto</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p>Para cualquier duda sobre estos términos y condiciones, puedes contactarnos:</p>
                <ul>
                  <li><strong>Email:</strong> legal@parkiduo.com</li>
                  <li><strong>WhatsApp:</strong> +34 666 666 666</li>
                  <li><strong>Dirección:</strong> Calle Ejemplo, 123, 28001 Madrid, España</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}