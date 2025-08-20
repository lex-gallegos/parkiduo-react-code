import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Database, 
  Download, 
  Trash2, 
  LogOut, 
  AlertTriangle,
  Shield,
  CheckCircle,
  Monitor,
  Smartphone
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DataAccountSectionProps {
  profile: any;
  onNavigate: (page: string) => void;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

export function DataAccountSection({ profile, onNavigate, onUpdate, onUnsavedChanges }: DataAccountSectionProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock download
      const data = {
        profile: profile,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parkiduo-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Datos exportados correctamente');
    } catch (error) {
      toast.error('Error al exportar los datos');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'BORRAR') {
      toast.error('Debes escribir "BORRAR" para confirmar');
      return;
    }

    setIsDeleting(true);
    try {
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Cuenta eliminada correctamente');
      setShowDeleteDialog(false);
      
      // Navigate to home after deletion
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    } catch (error) {
      toast.error('Error al eliminar la cuenta');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Sesión cerrada en todos los dispositivos');
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    } catch (error) {
      toast.error('Error al cerrar las sesiones');
    }
  };

  const dataItems = [
    {
      category: 'Datos personales',
      description: 'Nombre, apellidos, fecha de nacimiento, contacto',
      size: '2.3 KB'
    },
    {
      category: 'Datos de vehículo',
      description: 'Información del vehículo registrado',
      size: '0.8 KB'
    },
    {
      category: 'Historial de contratos',
      description: 'Contratos de alquiler y transacciones',
      size: '15.7 KB'
    },
    {
      category: 'Preferencias',
      description: 'Configuración de notificaciones y privacidad',
      size: '1.2 KB'
    },
    {
      category: 'Documentos de verificación',
      description: 'DNI y documentos de identidad (solo metadatos)',
      size: '0.5 KB'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Exportar mis datos
          </CardTitle>
          <p className="text-sm text-gray-600">
            Descarga una copia de todos tus datos en formato JSON (RGPD)
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Datos incluidos en la exportación:</h4>
            <div className="space-y-3">
              {dataItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h5 className="font-medium text-gray-900">{item.category}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{item.size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Información importante</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• La exportación incluye todos tus datos personales</li>
                  <li>• Los documentos de verificación no se incluyen por seguridad</li>
                  <li>• El archivo se descargará en formato JSON</li>
                  <li>• Cumple con las normativas RGPD de protección de datos</li>
                </ul>
              </div>
            </div>
          </div>

          <Button onClick={handleExportData} disabled={isExporting} className="w-full md:w-auto">
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generando exportación...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Descargar mis datos
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Gestión de sesiones
          </CardTitle>
          <p className="text-sm text-gray-600">
            Controla dónde está activa tu cuenta
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Monitor className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Dispositivos conectados</h4>
                <p className="text-sm text-gray-600">
                  Cierra sesión en todos los dispositivos excepto el actual
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogoutAllDevices}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar todas las sesiones
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Tendrás que volver a iniciar sesión en todos los dispositivos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Deletion */}
      <Card className="border-semantic-danger/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-semantic-danger">
            <Trash2 className="h-5 w-5" />
            Eliminar cuenta
          </CardTitle>
          <p className="text-sm text-gray-600">
            Elimina permanentemente tu cuenta y todos los datos asociados
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-semantic-danger flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-2">¿Qué se eliminará?</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Tu perfil y datos personales</li>
                  <li>• Todos los contratos activos se cancelarán</li>
                  <li>• Historial de pagos y transacciones</li>
                  <li>• Preferencias y configuraciones</li>
                  <li>• Documentos de verificación</li>
                </ul>
                <p className="text-sm text-red-800 mt-2 font-medium">
                  Esta acción es irreversible y no se puede deshacer.
                </p>
              </div>
            </div>
          </div>

          <Button 
            variant="destructive" 
            onClick={() => setShowDeleteDialog(true)}
            className="w-full md:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar mi cuenta
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      {showDeleteDialog && (
        <Dialog open={true} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-semantic-danger">
                <AlertTriangle className="h-5 w-5" />
                Confirmar eliminación de cuenta
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900 mb-2">¡Atención!</h4>
                  <p className="text-sm text-red-800">
                    Esta acción eliminará permanentemente tu cuenta de Parkiduo. 
                    No podrás recuperar tus datos una vez confirmada la eliminación.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deleteConfirmation">
                    Para confirmar, escribe <strong>BORRAR</strong> en el campo:
                  </Label>
                  <Input
                    id="deleteConfirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Escribe BORRAR"
                    className="text-center font-mono"
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 mb-2">Antes de continuar:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• ¿Has descargado tus datos?</li>
                    <li>• ¿Has cancelado contratos activos?</li>
                    <li>• ¿Estás seguro de esta decisión?</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'BORRAR' || isDeleting}
                  className="w-full"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Eliminando cuenta...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sí, eliminar mi cuenta permanentemente
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteDialog(false);
                    setDeleteConfirmation('');
                  }}
                  disabled={isDeleting}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}