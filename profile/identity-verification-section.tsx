import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { FileUploader } from '../ui/file-uploader';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Camera,
  FileText,
  User,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface IdentityVerificationSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface VerificationDocuments {
  dniFront?: File;
  dniBack?: File;
  selfie?: File;
}

export function IdentityVerificationSection({ profile, onUpdate, onUnsavedChanges }: IdentityVerificationSectionProps) {
  const [documents, setDocuments] = useState<VerificationDocuments>({});
  const [isUploading, setIsUploading] = useState(false);
  const webcamRef = useRef<HTMLInputElement>(null);

  const getStatusBadge = () => {
    switch (profile.verification.identity) {
      case 'verified':
        return (
          <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verificado
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-semantic-danger/10 text-semantic-danger border-semantic-danger/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rechazado
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/20">
            <Clock className="w-3 h-3 mr-1" />
            En revisión
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-500">
            <AlertCircle className="w-3 h-3 mr-1" />
            Sin verificar
          </Badge>
        );
    }
  };

  const handleDocumentUpload = (type: keyof VerificationDocuments) => (files: File[]) => {
    if (files.length > 0) {
      setDocuments(prev => ({ ...prev, [type]: files[0] }));
      toast.success(`${getDocumentLabel(type)} subido correctamente`);
    }
  };

  const getDocumentLabel = (type: keyof VerificationDocuments): string => {
    switch (type) {
      case 'dniFront': return 'DNI/NIE (anverso)';
      case 'dniBack': return 'DNI/NIE (reverso)';
      case 'selfie': return 'Selfie';
      default: return 'Documento';
    }
  };

  const handleSubmitVerification = async () => {
    if (!documents.dniFront || !documents.dniBack || !documents.selfie) {
      toast.error('Debes subir todos los documentos requeridos');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate upload and verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onUpdate({
        ...profile,
        verification: {
          ...profile.verification,
          identity: 'pending'
        }
      });
      
      setDocuments({});
      toast.success('Documentos enviados para verificación');
    } catch (error) {
      toast.error('Error al enviar los documentos');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRetryVerification = () => {
    onUpdate({
      ...profile,
      verification: {
        ...profile.verification,
        identity: 'pending',
        identityReason: undefined
      }
    });
    toast.success('Verificación reiniciada');
  };

  const takeSelfie = () => {
    if (webcamRef.current) {
      webcamRef.current.click();
    }
  };

  const canSubmit = documents.dniFront && documents.dniBack && documents.selfie;
  const isVerified = profile.verification.identity === 'verified';
  const isPending = profile.verification.identity === 'pending';
  const isRejected = profile.verification.identity === 'rejected';

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verificación de identidad
              {getStatusBadge()}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Verifica tu identidad para generar contratos automáticamente
            </p>
          </div>
          {isRejected && (
            <Button variant="outline" size="sm" onClick={handleRetryVerification}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {isVerified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-semantic-success flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">¡Identidad verificada!</h4>
                <p className="text-sm text-green-800">
                  Tu identidad ha sido verificada correctamente. Ya puedes generar contratos automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {isPending && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-semantic-warn flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Verificación en proceso</h4>
                <p className="text-sm text-amber-800">
                  Estamos revisando tus documentos. El proceso suele tardar entre 24-48 horas.
                  Te notificaremos por email cuando esté completo.
                </p>
              </div>
            </div>
          </div>
        )}

        {isRejected && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-semantic-danger flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">Verificación rechazada</h4>
                <p className="text-sm text-red-800 mb-2">
                  {profile.verification.identityReason || 'Los documentos no cumplen con los requisitos necesarios.'}
                </p>
                <p className="text-sm text-red-800">
                  Por favor, revisa los documentos y vuelve a intentarlo.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isVerified && !isPending && (
          <div className="space-y-6">
            {/* Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Documentos necesarios:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">DNI/NIE (Anverso)</h5>
                    <p className="text-sm text-blue-800">Cara frontal del documento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">DNI/NIE (Reverso)</h5>
                    <p className="text-sm text-blue-800">Cara posterior del documento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900">Selfie</h5>
                    <p className="text-sm text-blue-800">Foto tuya sosteniendo el DNI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Consejos para mejores fotos:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Usa buena iluminación natural</li>
                <li>• Mantén el documento dentro del marco</li>
                <li>• Asegúrate de que todo el texto sea legible</li>
                <li>• Evita reflejos y sombras</li>
                <li>• En el selfie, sostén el DNI junto a tu cara</li>
              </ul>
            </div>

            {/* Upload Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DNI Front */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  DNI/NIE (Anverso) *
                </Label>
                {documents.dniFront ? (
                  <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-semantic-success" />
                      <div>
                        <p className="font-medium text-green-900">{documents.dniFront.name}</p>
                        <p className="text-sm text-green-700">Archivo subido correctamente</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <FileUploader
                    onFilesChange={handleDocumentUpload('dniFront')}
                    maxFiles={1}
                    acceptedTypes={['image/*']}
                    maxSize={5 * 1024 * 1024}
                  />
                )}
              </div>

              {/* DNI Back */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  DNI/NIE (Reverso) *
                </Label>
                {documents.dniBack ? (
                  <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-semantic-success" />
                      <div>
                        <p className="font-medium text-green-900">{documents.dniBack.name}</p>
                        <p className="text-sm text-green-700">Archivo subido correctamente</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <FileUploader
                    onFilesChange={handleDocumentUpload('dniBack')}
                    maxFiles={1}
                    acceptedTypes={['image/*']}
                    maxSize={5 * 1024 * 1024}
                  />
                )}
              </div>
            </div>

            {/* Selfie */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Selfie con DNI *
              </Label>
              {documents.selfie ? (
                <div className="p-4 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-semantic-success" />
                    <div>
                      <p className="font-medium text-green-900">{documents.selfie.name}</p>
                      <p className="text-sm text-green-700">Selfie subido correctamente</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <FileUploader
                    onFilesChange={handleDocumentUpload('selfie')}
                    maxFiles={1}
                    acceptedTypes={['image/*']}
                    maxSize={5 * 1024 * 1024}
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">o</p>
                    <Button variant="outline" onClick={takeSelfie}>
                      <Camera className="mr-2 h-4 w-4" />
                      Tomar foto con cámara
                    </Button>
                    <input
                      ref={webcamRef}
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleDocumentUpload('selfie')([e.target.files[0]]);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={handleSubmitVerification}
                disabled={!canSubmit || isUploading}
                className="w-full md:w-auto"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando documentos...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Enviar para verificación
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Label({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <label className={`text-sm font-medium text-gray-900 ${className || ''}`} {...props}>
      {children}
    </label>
  );
}