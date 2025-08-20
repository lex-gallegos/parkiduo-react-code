import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { FileUploader } from '../ui/file-uploader';
import { VEHICLE_BRANDS, VEHICLE_COLORS } from './profile-constants';
import { 
  Edit, 
  Save, 
  X, 
  Car, 
  Plus, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Camera
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VehicleSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface VehicleData {
  plate: string;
  brand: string;
  model: string;
  color: string;
  photo?: string;
  isDefault: boolean;
}

export function VehicleSection({ profile, onUpdate, onUnsavedChanges }: VehicleSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleData>(
    profile.vehicle || {
      plate: '',
      brand: '',
      model: '',
      color: '',
      isDefault: true
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(vehicle) !== JSON.stringify(profile.vehicle || {});
    setHasChanges(changed);
    onUnsavedChanges(changed && isEditing);
  }, [vehicle, profile.vehicle, isEditing, onUnsavedChanges]);

  const validatePlate = (plate: string): boolean => {
    // Spanish plate format: 1234 ABC or 0000-ABC-XX (new format)
    const oldFormat = /^[0-9]{4}\s?[A-Z]{3}$/;
    const newFormat = /^[0-9]{4}-?[A-Z]{3}-?[A-Z]{2}$/;
    return oldFormat.test(plate.toUpperCase()) || newFormat.test(plate.toUpperCase());
  };

  const formatPlate = (plate: string): string => {
    const cleaned = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    if (cleaned.length <= 4) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    } else {
      // New format: 0000-ABC-XX
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}`;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!vehicle.plate.trim()) {
      newErrors.plate = 'La matrícula es obligatoria';
    } else if (!validatePlate(vehicle.plate)) {
      newErrors.plate = 'Formato de matrícula no válido (ej: 1234 ABC)';
    }
    
    if (!vehicle.brand) {
      newErrors.brand = 'La marca es obligatoria';
    }
    
    if (!vehicle.model.trim()) {
      newErrors.model = 'El modelo es obligatorio';
    }
    
    if (!vehicle.color) {
      newErrors.color = 'El color es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      onUpdate({ ...profile, vehicle });
      setIsEditing(false);
      setHasChanges(false);
      toast.success('Datos del vehículo actualizados');
    } catch (error) {
      toast.error('Error al actualizar los datos del vehículo');
    }
  };

  const handleCancel = () => {
    setVehicle(profile.vehicle || {
      plate: '',
      brand: '',
      model: '',
      color: '',
      isDefault: true
    });
    setErrors({});
    setIsEditing(false);
    setHasChanges(false);
  };

  const updateField = (field: keyof VehicleData, value: any) => {
    setVehicle(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlate(e.target.value);
    updateField('plate', formatted);
  };

  const handlePhotoUpload = (files: File[]) => {
    if (files.length > 0) {
      // Mock upload
      const photoUrl = URL.createObjectURL(files[0]);
      updateField('photo', photoUrl);
      toast.success('Foto del vehículo subida');
    }
  };

  const removePhoto = () => {
    updateField('photo', undefined);
    toast.success('Foto eliminada');
  };

  const hasVehicle = profile.vehicle && profile.vehicle.plate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Mi vehículo
              {hasVehicle && (
                <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Configurado
                </Badge>
              )}
              {!hasVehicle && (
                <Badge variant="outline" className="text-gray-500">
                  Sin configurar
                </Badge>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Información de tu vehículo para solicitudes de garaje
            </p>
          </div>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              {hasVehicle ? 'Editar' : 'Añadir'}
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
        {!isEditing && !hasVehicle && (
          <div className="text-center py-8">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No has añadido ningún vehículo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Añade tu vehículo para que los propietarios sepan qué tipo de plaza necesitas
            </p>
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir vehículo
            </Button>
          </div>
        )}

        {!isEditing && hasVehicle && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs text-gray-500">Matrícula</Label>
                <p className="font-medium">{profile.vehicle.plate}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Marca</Label>
                <p className="font-medium">{profile.vehicle.brand}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Modelo</Label>
                <p className="font-medium">{profile.vehicle.model}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Color</Label>
                <p className="font-medium">{profile.vehicle.color}</p>
              </div>
            </div>
            
            {profile.vehicle.photo && (
              <div>
                <Label className="text-xs text-gray-500 mb-2 block">Foto del vehículo</Label>
                <img 
                  src={profile.vehicle.photo} 
                  alt="Vehículo" 
                  className="w-32 h-24 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <div className="space-y-6">
            {/* Plate */}
            <div className="space-y-2">
              <Label htmlFor="plate">Matrícula *</Label>
              <div className="space-y-1">
                <Input
                  id="plate"
                  value={vehicle.plate}
                  onChange={handlePlateChange}
                  placeholder="1234 ABC"
                  className={errors.plate ? 'border-semantic-danger' : ''}
                />
                {errors.plate && (
                  <p className="text-sm text-semantic-danger flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.plate}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Formato español: 1234 ABC o 0000-ABC-XX
                </p>
              </div>
            </div>

            {/* Brand and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca *</Label>
                <Select
                  value={vehicle.brand}
                  onValueChange={(value) => updateField('brand', value)}
                >
                  <SelectTrigger className={errors.brand ? 'border-semantic-danger' : ''}>
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLE_BRANDS.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand && (
                  <p className="text-sm text-semantic-danger flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.brand}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modelo *</Label>
                <Input
                  id="model"
                  value={vehicle.model}
                  onChange={(e) => updateField('model', e.target.value)}
                  placeholder="Golf, Focus, Corolla..."
                  className={errors.model ? 'border-semantic-danger' : ''}
                />
                {errors.model && (
                  <p className="text-sm text-semantic-danger flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.model}
                  </p>
                )}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color">Color *</Label>
              <Select
                value={vehicle.color}
                onValueChange={(value) => updateField('color', value)}
              >
                <SelectTrigger className={`w-full md:w-64 ${errors.color ? 'border-semantic-danger' : ''}`}>
                  <SelectValue placeholder="Seleccionar color" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_COLORS.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.color && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.color}
                </p>
              )}
            </div>

            {/* Photo */}
            <div className="space-y-3">
              <Label>Foto del vehículo (opcional)</Label>
              {vehicle.photo ? (
                <div className="flex items-start gap-4">
                  <img 
                    src={vehicle.photo} 
                    alt="Vehículo" 
                    className="w-32 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Foto actual del vehículo</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={removePhoto}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar foto
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <FileUploader
                    onFilesChange={handlePhotoUpload}
                    maxFiles={1}
                    acceptedTypes={['image/*']}
                    maxSize={5 * 1024 * 1024} // 5MB
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ayuda a los propietarios a identificar tu vehículo
                  </p>
                </div>
              )}
            </div>

            {/* Default Vehicle */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={vehicle.isDefault}
                onCheckedChange={(checked) => updateField('isDefault', checked)}
              />
              <Label htmlFor="isDefault" className="text-sm">
                Usar como vehículo por defecto
              </Label>
            </div>
          </div>
        )}

        {!hasVehicle && !isEditing && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-semantic-warn flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Añade tu vehículo</h4>
                <p className="text-sm text-amber-800">
                  Los propietarios necesitan saber qué tipo de vehículo tienes para ofrecerte plazas compatibles.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}