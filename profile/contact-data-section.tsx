import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { AddressAutocomplete } from '../ui/address-autocomplete';
import { PhoneInput } from './phone-input';
import { EmailChangeDialog } from './email-change-dialog';
import { PhoneVerificationDialog } from './phone-verification-dialog';
import { 
  Edit, 
  Save, 
  X, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle, 
  MapPin,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactDataSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface FormData {
  phone: string;
  email: string;
  addresses: {
    fiscal: {
      street: string;
      number: string;
      floor: string;
      postalCode: string;
      city: string;
      province: string;
      country: string;
    };
    work?: {
      street: string;
      number: string;
      floor: string;
      postalCode: string;
      city: string;
      province: string;
      country: string;
    };
  };
}

export function ContactDataSection({ profile, onUpdate, onUnsavedChanges }: ContactDataSectionProps) {
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phone: profile.phone,
    email: profile.email,
    addresses: profile.addresses,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');

  // Check for changes
  useEffect(() => {
    const phoneChanged = formData.phone !== profile.phone;
    const emailChanged = formData.email !== profile.email;
    const addressesChanged = JSON.stringify(formData.addresses) !== JSON.stringify(profile.addresses);
    
    const changed = phoneChanged || emailChanged || addressesChanged;
    setHasChanges(changed);
    onUnsavedChanges(changed && (isEditingPhone || isEditingEmail || isEditingAddresses));
  }, [formData, profile, isEditingPhone, isEditingEmail, isEditingAddresses, onUnsavedChanges]);

  const handlePhoneChange = (newPhone: string) => {
    if (newPhone !== profile.phone) {
      setPendingPhone(newPhone);
      setShowPhoneDialog(true);
    }
  };

  const handlePhoneVerified = () => {
    onUpdate({
      ...profile,
      phone: pendingPhone,
      verification: { ...profile.verification, phone: true }
    });
    setFormData(prev => ({ ...prev, phone: pendingPhone }));
    setIsEditingPhone(false);
    setShowPhoneDialog(false);
    toast.success('Teléfono verificado y actualizado');
  };

  const handleEmailChange = () => {
    setShowEmailDialog(true);
  };

  const handleEmailUpdated = (newEmail: string) => {
    onUpdate({
      ...profile,
      email: newEmail,
      verification: { ...profile.verification, email: true }
    });
    setFormData(prev => ({ ...prev, email: newEmail }));
    setIsEditingEmail(false);
    setShowEmailDialog(false);
  };

  const handleSaveAddresses = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onUpdate({ ...profile, addresses: formData.addresses });
      setIsEditingAddresses(false);
      toast.success('Direcciones actualizadas');
    } catch (error) {
      toast.error('Error al actualizar las direcciones');
    }
  };

  const handleCancelAddresses = () => {
    setFormData(prev => ({ ...prev, addresses: profile.addresses }));
    setIsEditingAddresses(false);
  };

  const addWorkAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        work: {
          street: '',
          number: '',
          floor: '',
          postalCode: '',
          city: '',
          province: '',
          country: 'España'
        }
      }
    }));
  };

  const removeWorkAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: {
        fiscal: prev.addresses.fiscal
      }
    }));
  };

  const updateAddress = (type: 'fiscal' | 'work', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        [type]: {
          ...prev.addresses[type],
          [field]: value
        }
      }
    }));
  };

  const formatAddress = (address: any) => {
    if (!address || !address.street) return 'No especificado';
    
    const parts = [
      address.street,
      address.number,
      address.floor,
      address.postalCode,
      address.city,
      address.province
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Phone Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Teléfono
                {profile.verification.phone && (
                  <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                {!profile.verification.phone && (
                  <Badge variant="outline" className="text-semantic-warn border-semantic-warn/20">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Sin verificar
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Para contacto directo y notificaciones importantes
              </p>
            </div>
            {!isEditingPhone && (
              <Button variant="outline" size="sm" onClick={() => setIsEditingPhone(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Cambiar
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {isEditingPhone ? (
            <div className="space-y-4">
              <PhoneInput
                value={formData.phone}
                onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
                onSubmit={handlePhoneChange}
                onCancel={() => {
                  setFormData(prev => ({ ...prev, phone: profile.phone }));
                  setIsEditingPhone(false);
                }}
              />
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
              {profile.verification.phone && (
                <p className="text-sm text-semantic-success mt-1">
                  Número confirmado y verificado
                </p>
              )}
              {!profile.verification.phone && (
                <p className="text-sm text-semantic-warn mt-1">
                  Este número necesita verificación
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email
                {profile.verification.email && (
                  <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                {!profile.verification.email && (
                  <Badge variant="outline" className="text-semantic-warn border-semantic-warn/20">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Sin verificar
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Para notificaciones por email y recuperación de cuenta
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleEmailChange}>
              <Edit className="mr-2 h-4 w-4" />
              Cambiar
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-lg font-medium text-gray-900">{profile.email}</p>
          {profile.verification.email && (
            <p className="text-sm text-semantic-success mt-1">
              Correo confirmado y verificado
            </p>
          )}
          {!profile.verification.email && (
            <p className="text-sm text-semantic-warn mt-1">
              Este correo necesita verificación
            </p>
          )}
        </CardContent>
      </Card>

      {/* Addresses Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Direcciones
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Domicilio fiscal y direcciones de contacto
              </p>
            </div>
            {!isEditingAddresses ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditingAddresses(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCancelAddresses}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSaveAddresses}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Fiscal Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-medium text-gray-900">Domicilio fiscal *</h4>
              <Badge variant="outline" className="text-xs">Requerido para contrato</Badge>
            </div>
            
            {isEditingAddresses ? (
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fiscal-street">Calle *</Label>
                    <Input
                      id="fiscal-street"
                      value={formData.addresses.fiscal.street}
                      onChange={(e) => updateAddress('fiscal', 'street', e.target.value)}
                      placeholder="Nombre de la calle"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fiscal-number">Número *</Label>
                    <Input
                      id="fiscal-number"
                      value={formData.addresses.fiscal.number}
                      onChange={(e) => updateAddress('fiscal', 'number', e.target.value)}
                      placeholder="Nº"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fiscal-floor">Piso/Puerta</Label>
                    <Input
                      id="fiscal-floor"
                      value={formData.addresses.fiscal.floor}
                      onChange={(e) => updateAddress('fiscal', 'floor', e.target.value)}
                      placeholder="Ej: 3º A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fiscal-postal">Código Postal *</Label>
                    <Input
                      id="fiscal-postal"
                      value={formData.addresses.fiscal.postalCode}
                      onChange={(e) => updateAddress('fiscal', 'postalCode', e.target.value)}
                      placeholder="28000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fiscal-city">Ciudad *</Label>
                    <Input
                      id="fiscal-city"
                      value={formData.addresses.fiscal.city}
                      onChange={(e) => updateAddress('fiscal', 'city', e.target.value)}
                      placeholder="Ciudad"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fiscal-province">Provincia *</Label>
                    <Input
                      id="fiscal-province"
                      value={formData.addresses.fiscal.province}
                      onChange={(e) => updateAddress('fiscal', 'province', e.target.value)}
                      placeholder="Provincia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fiscal-country">País *</Label>
                    <Input
                      id="fiscal-country"
                      value={formData.addresses.fiscal.country}
                      onChange={(e) => updateAddress('fiscal', 'country', e.target.value)}
                      placeholder="España"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                {formatAddress(profile.addresses.fiscal)}
              </p>
            )}
          </div>

          <Separator />

          {/* Work Address */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-gray-900">Dirección de trabajo</h4>
                <Badge variant="outline" className="text-xs">Opcional</Badge>
              </div>
              
              {isEditingAddresses && (
                <div className="flex gap-2">
                  {!formData.addresses.work ? (
                    <Button variant="outline" size="sm" onClick={addWorkAddress}>
                      <Plus className="mr-2 h-4 w-4" />
                      Añadir
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={removeWorkAddress}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  )}
                </div>
              )}
            </div>

            {isEditingAddresses && formData.addresses.work ? (
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="work-street">Calle</Label>
                    <Input
                      id="work-street"
                      value={formData.addresses.work.street}
                      onChange={(e) => updateAddress('work', 'street', e.target.value)}
                      placeholder="Nombre de la calle"
                    />
                  </div>
                  <div>
                    <Label htmlFor="work-number">Número</Label>
                    <Input
                      id="work-number"
                      value={formData.addresses.work.number}
                      onChange={(e) => updateAddress('work', 'number', e.target.value)}
                      placeholder="Nº"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="work-floor">Piso/Puerta</Label>
                    <Input
                      id="work-floor"
                      value={formData.addresses.work.floor}
                      onChange={(e) => updateAddress('work', 'floor', e.target.value)}
                      placeholder="Ej: 3º A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="work-postal">Código Postal</Label>
                    <Input
                      id="work-postal"
                      value={formData.addresses.work.postalCode}
                      onChange={(e) => updateAddress('work', 'postalCode', e.target.value)}
                      placeholder="28000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="work-city">Ciudad</Label>
                    <Input
                      id="work-city"
                      value={formData.addresses.work.city}
                      onChange={(e) => updateAddress('work', 'city', e.target.value)}
                      placeholder="Ciudad"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="work-province">Provincia</Label>
                    <Input
                      id="work-province"
                      value={formData.addresses.work.province}
                      onChange={(e) => updateAddress('work', 'province', e.target.value)}
                      placeholder="Provincia"
                    />
                  </div>
                  <div>
                    <Label htmlFor="work-country">País</Label>
                    <Input
                      id="work-country"
                      value={formData.addresses.work.country}
                      onChange={(e) => updateAddress('work', 'country', e.target.value)}
                      placeholder="España"
                    />
                  </div>
                </div>
              </div>
            ) : profile.addresses.work ? (
              <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                {formatAddress(profile.addresses.work)}
              </p>
            ) : (
              <p className="text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                No se ha añadido dirección de trabajo
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {showEmailDialog && (
        <EmailChangeDialog
          currentEmail={profile.email}
          onEmailUpdated={handleEmailUpdated}
          onCancel={() => setShowEmailDialog(false)}
        />
      )}

      {showPhoneDialog && (
        <PhoneVerificationDialog
          phone={pendingPhone}
          onVerified={handlePhoneVerified}
          onCancel={() => {
            setShowPhoneDialog(false);
            setFormData(prev => ({ ...prev, phone: profile.phone }));
          }}
        />
      )}
    </div>
  );
}