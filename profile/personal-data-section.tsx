import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format, parseISO } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';
import { Edit, Save, X, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PersonalDataSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  language: string;
  timezone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export function PersonalDataSection({ profile, onUpdate, onUnsavedChanges }: PersonalDataSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender || 'not_specified',
    language: profile.language,
    timezone: profile.timezone,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    profile.dateOfBirth ? parseISO(profile.dateOfBirth) : undefined
  );

  // Check for changes
  useEffect(() => {
    const changed = Object.keys(formData).some(key => {
      const formValue = formData[key as keyof FormData];
      const profileValue = key === 'gender' ? (profile[key] || 'not_specified') : profile[key];
      return formValue !== profileValue;
    });
    setHasChanges(changed);
    onUnsavedChanges(changed && isEditing);
  }, [formData, profile, isEditing, onUnsavedChanges]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Los apellidos son obligatorios';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'La fecha de nacimiento es obligatoria';
    } else {
      const birthDate = parseISO(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        // age--;
      }
      
      if (age < 18) {
        newErrors.dateOfBirth = 'Debes ser mayor de 18 años';
      }
      
      if (birthDate > today) {
        newErrors.dateOfBirth = 'La fecha de nacimiento no puede ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onUpdate({ ...profile, ...formData });
      setIsEditing(false);
      setHasChanges(false);
      toast.success('Datos personales actualizados');
    } catch (error) {
      toast.error('Error al actualizar los datos');
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender || 'not_specified',
      language: profile.language,
      timezone: profile.timezone,
    });
    setSelectedDate(profile.dateOfBirth ? parseISO(profile.dateOfBirth) : undefined);
    setErrors({});
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const isoString = format(date, 'yyyy-MM-dd');
      setFormData(prev => ({ ...prev, dateOfBirth: isoString }));
      setSelectedDate(date);
      
      // Clear error if date is selected
      if (errors.dateOfBirth) {
        setErrors(prev => ({ ...prev, dateOfBirth: undefined }));
      }
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const languages = [
    { value: 'ES', label: 'Español' },
    { value: 'EN', label: 'English' },
    { value: 'NL', label: 'Nederlands' },
  ];

  const genders = [
    { value: 'not_specified', label: 'Prefiero no decirlo' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'no_binario', label: 'No binario' },
    { value: 'otro', label: 'Otro' },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Datos personales</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Información básica que aparece en tu perfil
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">
              Nombre *
            </Label>
            {isEditing ? (
              <div className="space-y-1">
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="Tu nombre"
                  className={errors.firstName ? 'border-semantic-danger' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-semantic-danger flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.firstName}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-900 py-2">
                {profile.firstName || <span className="text-gray-400 italic">No especificado</span>}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Apellidos *
            </Label>
            {isEditing ? (
              <div className="space-y-1">
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Tus apellidos"
                  className={errors.lastName ? 'border-semantic-danger' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-semantic-danger flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.lastName}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-900 py-2">
                {profile.lastName || <span className="text-gray-400 italic">No especificado</span>}
              </p>
            )}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">
            Fecha de nacimiento *
          </Label>
          {isEditing ? (
            <div className="space-y-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dateOfBirth"
                    variant="outline"
                    className={`w-full md:w-64 justify-start text-left font-normal ${
                      !selectedDate ? 'text-muted-foreground' : ''
                    } ${errors.dateOfBirth ? 'border-semantic-danger' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: es }) : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.dateOfBirth}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Formato: DD/MM/AAAA. Debes ser mayor de 18 años.
              </p>
            </div>
          ) : (
            <p className="text-gray-900 py-2">
              {profile.dateOfBirth ? 
                format(parseISO(profile.dateOfBirth), 'dd/MM/yyyy', { locale: es }) : 
                <span className="text-gray-400 italic">No especificado</span>
              }
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">
            Género <span className="text-gray-400">(opcional)</span>
          </Label>
          {isEditing ? (
            <Select
              value={formData.gender}
              onValueChange={(value) => updateField('gender', value)}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-900 py-2">
              {profile.gender && profile.gender !== 'not_specified' ? 
                genders.find(g => g.value === profile.gender)?.label || profile.gender :
                <span className="text-gray-400 italic">No especificado</span>
              }
            </p>
          )}
        </div>

        {/* Language */}
        <div className="space-y-2">
          <Label htmlFor="language">
            Idioma preferido *
          </Label>
          {isEditing ? (
            <Select
              value={formData.language}
              onValueChange={(value) => updateField('language', value)}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Seleccionar idioma" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-900 py-2">
              {languages.find(l => l.value === profile.language)?.label || profile.language}
            </p>
          )}
        </div>

        {/* Timezone */}
        <div className="space-y-2">
          <Label htmlFor="timezone">
            Zona horaria *
          </Label>
          {isEditing ? (
            <Select
              value={formData.timezone}
              onValueChange={(value) => updateField('timezone', value)}
            >
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Seleccionar zona horaria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Europe/Madrid">Europa/Madrid (CET)</SelectItem>
                <SelectItem value="Europe/London">Europa/Londres (GMT)</SelectItem>
                <SelectItem value="Europe/Paris">Europa/París (CET)</SelectItem>
                <SelectItem value="America/New_York">América/Nueva York (EST)</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-900 py-2">
              {profile.timezone === 'Europe/Madrid' ? 'Europa/Madrid (CET)' : profile.timezone}
            </p>
          )}
          {!isEditing && (
            <p className="text-xs text-gray-500">
              Detectado automáticamente según tu ubicación
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}