import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { DNIInput } from './dni-input';
import { Edit, Save, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContractDataSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface FormData {
  dni: string;
  legalName: string;
  nif: string;
}

interface FormErrors {
  dni?: string;
  legalName?: string;
  nif?: string;
}

export function ContractDataSection({ profile, onUpdate, onUnsavedChanges }: ContractDataSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    dni: profile.dni,
    legalName: profile.legalName,
    nif: profile.nif,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Check for changes
  useEffect(() => {
    const changed = Object.keys(formData).some(key => 
      formData[key as keyof FormData] !== profile[key]
    );
    setHasChanges(changed);
    onUnsavedChanges(changed && isEditing);
  }, [formData, profile, isEditing, onUnsavedChanges]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI/NIE es obligatorio para generar contratos';
    } else if (!validateDNI(formData.dni)) {
      newErrors.dni = 'Formato de DNI/NIE no válido';
    }
    
    if (!formData.legalName.trim()) {
      newErrors.legalName = 'El nombre legal es obligatorio';
    }
    
    // NIF is optional, but validate if provided
    if (formData.nif && !validateNIF(formData.nif)) {
      newErrors.nif = 'Formato de NIF/CIF no válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDNI = (dni: string): boolean => {
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    
    return dniRegex.test(dni) || nieRegex.test(dni);
  };

  const validateNIF = (nif: string): boolean => {
    const nifRegex = /^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/i;
    return nifRegex.test(nif);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onUpdate({ ...profile, ...formData });
      setIsEditing(false);
      setHasChanges(false);
      toast.success('Datos para contrato actualizados');
    } catch (error) {
      toast.error('Error al actualizar los datos');
    }
  };

  const handleCancel = () => {
    setFormData({
      dni: profile.dni,
      legalName: profile.legalName,
      nif: profile.nif,
    });
    setErrors({});
    setIsEditing(false);
    setHasChanges(false);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const isComplete = profile.dni && profile.legalName && profile.addresses?.fiscal?.street;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Datos para contrato de alquiler
              {isComplete && (
                <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completo
                </Badge>
              )}
              {!isComplete && (
                <Badge variant="outline" className="text-semantic-warn border-semantic-warn/20">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Incompleto
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Información necesaria para generar contratos de alquiler
            </p>
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* DNI/NIE */}
        <div className="space-y-2">
          <Label htmlFor="dni">
            DNI/NIE *
          </Label>
          {isEditing ? (
            <div className="space-y-1">
              <DNIInput
                id="dni"
                value={formData.dni}
                onChange={(value) => updateField('dni', value)}
                error={errors.dni}
              />
              {errors.dni && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dni}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-900 py-2">
              {profile.dni ? 
                formatDNI(profile.dni) : 
                <span className="text-gray-400 italic">No especificado</span>
              }
            </p>
          )}
          {!isEditing && (
            <p className="text-xs text-gray-500">
              Necesario para identificación en contratos
            </p>
          )}
        </div>

        {/* Legal Name */}
        <div className="space-y-2">
          <Label htmlFor="legalName">
            Nombre legal de facturación *
          </Label>
          {isEditing ? (
            <div className="space-y-1">
              <Input
                id="legalName"
                value={formData.legalName}
                onChange={(e) => updateField('legalName', e.target.value)}
                placeholder="Nombre completo como aparece en el DNI"
                className={errors.legalName ? 'border-semantic-danger' : ''}
              />
              {errors.legalName && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.legalName}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Debe coincidir exactamente con el nombre en tu DNI/NIE
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-900 py-2">
                {profile.legalName || <span className="text-gray-400 italic">No especificado</span>}
              </p>
              <p className="text-xs text-gray-500">
                Nombre que aparecerá en contratos oficiales
              </p>
            </div>
          )}
        </div>

        {/* NIF/CIF */}
        <div className="space-y-2">
          <Label htmlFor="nif">
            NIF/CIF <span className="text-gray-400">(opcional, para empresas)</span>
          </Label>
          {isEditing ? (
            <div className="space-y-1">
              <Input
                id="nif"
                value={formData.nif}
                onChange={(e) => updateField('nif', e.target.value.toUpperCase())}
                placeholder="A12345674"
                className={errors.nif ? 'border-semantic-danger' : ''}
              />
              {errors.nif && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.nif}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Solo necesario si actúas en nombre de una empresa
              </p>
            </div>
          ) : (
            <div>
              <p className="text-gray-900 py-2">
                {profile.nif || <span className="text-gray-400 italic">No especificado</span>}
              </p>
              <p className="text-xs text-gray-500">
                Para facturación empresarial
              </p>
            </div>
          )}
        </div>

        {/* Requirements Summary */}
        {!isComplete && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-semantic-warn flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-2">Para generar contratos necesitas:</h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  {!profile.dni && <li>• DNI/NIE válido</li>}
                  {!profile.legalName && <li>• Nombre legal completo</li>}
                  {!profile.addresses?.fiscal?.street && <li>• Domicilio fiscal (ver Datos de contacto)</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-semantic-success flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">¡Listo para generar contratos!</h4>
                <p className="text-sm text-green-800">
                  Tienes todos los datos necesarios para crear contratos de alquiler automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper function to format DNI for display
function formatDNI(dni: string): string {
  if (dni.length === 9) {
    return `${dni.slice(0, 8)}-${dni.slice(8)}`;
  }
  return dni;
}