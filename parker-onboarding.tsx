import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { WizardHeader, createParkerStepper } from './ui/stepper-inline';
import { FileUploader } from './ui/file-uploader';
import { AddressAutocomplete } from './ui/address-autocomplete';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  ArrowRight,
  Home,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Car,
  Bike,
  Truck,
  User,
  MapPin,
  Camera,
  Shield,
  Settings,
  Eye,
  Save
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ParkerOnboardingProps {
  onNavigate: (page: string) => void;
}

interface FormData {
  // Step 0: Location and details
  address: string;
  plazaNumber: string;
  floor: string;
  accessType: string;
  vehicleSize: string[];
  photos: any[];
  
  // Step 1: Availability
  availabilityType: string; // '24h' | 'diurno' | 'nocturno' | 'compartido'
  sharedSchedule?: {
    tenant1: { start: string; end: string; };
    tenant2: { start: string; end: string; };
  };
  blockedDates: string[];
  
  // Step 2: Price
  price: number[];
  wantAdvice: boolean;
  
  // Step 3: Rules and review
  rules: string;
  securityFeatures: string[];
  finalReview: boolean;
  
  // Step 4: User Data
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface StepProps {
  formData: FormData;
  errors: Record<string, string>;
  updateFormData: (field: string, value: any) => void;
  toggleVehicleSize: (size: string) => void;
  toggleSecurityFeature: (feature: string) => void;
  marketData?: any;
}

// Step components
const LocationStep = ({ formData, errors, updateFormData, toggleVehicleSize }: StepProps) => (
  <div className="space-y-8">
    <div className="form-field">
      <Label htmlFor="address" className="flex items-center gap-2">
        <Home className="w-4 h-4 text-brand-primary" />
        Dirección de tu garaje *
      </Label>
      <AddressAutocomplete
        id="address"
        value={formData.address}
        onChange={(value) => updateFormData('address', value)}
        placeholder="Ej: Calle Gran Vía 28, Madrid"
        required
        error={errors.address}
      />
      {errors.address && (
        <p className="error-text">
          <AlertCircle className="w-4 h-4" />
          {errors.address}
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="form-field">
        <Label htmlFor="plazaNumber">Número de plaza</Label>
        <Input
          id="plazaNumber"
          placeholder="Ej: 15, A3"
          value={formData.plazaNumber}
          onChange={(e) => updateFormData('plazaNumber', e.target.value)}
        />
        <p className="help-text">Opcional</p>
      </div>

      <div className="form-field">
        <Label htmlFor="floor">Planta</Label>
        <Input
          id="floor"
          placeholder="Ej: -1, Sótano 2"
          value={formData.floor}
          onChange={(e) => updateFormData('floor', e.target.value)}
        />
      </div>

      <div className="form-field">
        <Label htmlFor="accessType">Tipo de acceso</Label>
        <Select
          value={formData.accessType}
          onValueChange={(value) => updateFormData('accessType', value)}
        >
          <SelectTrigger id="accessType">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="llave">Llave física</SelectItem>
            <SelectItem value="mando">Mando a distancia</SelectItem>
            <SelectItem value="codigo">Código digital</SelectItem>
            <SelectItem value="tarjeta">Tarjeta de acceso</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="form-field">
      <Label>Tamaño de vehículo compatible</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        {[
          { 
            id: 'moto', 
            label: 'Moto', 
            icon: Bike, 
            dimensions: '2.0m × 0.8m',
            description: 'Motocicletas y scooters'
          },
          { 
            id: 'compacto', 
            label: 'Compacto', 
            icon: Car, 
            dimensions: '4.0m × 1.8m',
            description: 'Utilitarios pequeños'
          },
          { 
            id: 'berlina', 
            label: 'Berlina', 
            icon: Car, 
            dimensions: '4.5m × 1.8m',
            description: 'Sedanes y familiares'
          },
          { 
            id: 'suv', 
            label: 'SUV/Furgoneta', 
            icon: Truck, 
            dimensions: '5.0m × 2.0m',
            description: 'Todoterrenos y furgonetas'
          }
        ].map(({ id, label, icon: Icon, dimensions, description }) => (
          <Button
            key={id}
            type="button"
            variant={formData.vehicleSize.includes(id) ? "default" : "outline"}
            onClick={() => toggleVehicleSize(id)}
            className={`btn btn-md h-auto p-4 flex flex-col items-center gap-2 min-h-[90px] ${
              formData.vehicleSize.includes(id)
                ? 'btn-primary'
                : 'btn-secondary hover:border-brand-primary/50'
            }`}
            aria-pressed={formData.vehicleSize.includes(id)}
            aria-label={`${label} - ${dimensions}`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <div className="text-center">
              <span className={`text-sm font-semibold block leading-tight ${
                formData.vehicleSize.includes(id) ? 'text-white' : 'text-gray-900'
              }`}>{label}</span>
              <span className={`text-xs font-medium block mt-1 leading-tight ${
                formData.vehicleSize.includes(id) ? 'text-white/90' : 'text-gray-600'
              }`}>
                {dimensions}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>

    <div className="form-field">
      <div className="flex items-center gap-2">
        <Label>Fotos del garaje *</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="btn btn-sm p-1 w-6 h-6 text-gray-400 hover:text-brand-primary"
          title="Consejos de fotos"
          aria-label="Información sobre consejos de fotos"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>
      <FileUploader
        id="photos"
        onFilesChange={(files) => updateFormData('photos', files)}
        maxFiles={5}
        required
      />
      {errors.photos && (
        <p className="error-text">
          <AlertCircle className="w-4 h-4" />
          {errors.photos}
        </p>
      )}
      <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-md p-4 mt-4">
        <p className="text-sm text-brand-primary">
          💡 <strong>Consejos:</strong> Incluye fotos del acceso, la plaza marcada y el entorno. 
          Buena iluminación mejora las solicitudes un 40%.
        </p>
      </div>
    </div>
  </div>
);

const AvailabilityStep = ({ formData, errors, updateFormData }: StepProps) => (
  <div className="space-y-8">
    <div className="form-field">
      <Label className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-brand-primary" />
        Modalidad de disponibilidad *
      </Label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[
          { 
            id: '24h', 
            title: '24 horas', 
            desc: 'Acceso completo todo el día',
            price: '+0€',
            popular: true
          },
          { 
            id: 'diurno', 
            title: 'Diurno', 
            desc: '8:00 - 20:00',
            price: '-15€'
          },
          { 
            id: 'nocturno', 
            title: 'Nocturno', 
            desc: '20:00 - 8:00',
            price: '-10€'
          },
          { 
            id: 'compartido', 
            title: 'Compartido 24h', 
            desc: '2 inquilinos, horarios definidos',
            price: '+30€',
            premium: true
          }
        ].map(({ id, title, desc, price, popular, premium }) => (
          <div key={id} className="relative">
            {popular && (
              <Badge className="absolute -top-2 left-4 z-10 bg-brand-primary text-white text-xs">
                Más popular
              </Badge>
            )}
            {premium && (
              <Badge className="absolute -top-2 left-4 z-10 bg-semantic-success text-white text-xs">
                Máximos ingresos
              </Badge>
            )}
            <Button
              type="button"
              variant={formData.availabilityType === id ? "default" : "outline"}
              onClick={() => updateFormData('availabilityType', id)}
              className={`btn w-full p-4 h-auto flex flex-col text-left min-h-[100px] ${
                formData.availabilityType === id
                  ? 'btn-primary'
                  : 'btn-secondary hover:border-brand-primary/50'
              }`}
              aria-pressed={formData.availabilityType === id}
            >
              <div className="flex justify-between items-start w-full mb-2">
                <span className="font-semibold text-[16px]">{title}</span>
                <Badge 
                  className={`text-xs ${
                    formData.availabilityType === id 
                      ? 'bg-white/20 text-white border-white/30' 
                      : 'bg-semantic-success/10 text-semantic-success border-semantic-success/30'
                  }`}
                >
                  {price}
                </Badge>
              </div>
              <span className="text-xs opacity-80 text-[14px]">{desc}</span>
            </Button>
          </div>
        ))}
      </div>
      
      {errors.availabilityType && (
        <p className="error-text mt-3">
          <AlertCircle className="w-4 h-4" />
          {errors.availabilityType}
        </p>
      )}
    </div>

    {formData.availabilityType === 'compartido' && (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Horarios para cada inquilino</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="font-medium">Inquilino 1</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-field">
                  <Label htmlFor="tenant1-start" className="text-xs">Inicio</Label>
                  <Input
                    id="tenant1-start"
                    type="time"
                    value={formData.sharedSchedule?.tenant1.start || ''}
                    onChange={(e) => updateFormData('sharedSchedule', {
                      ...formData.sharedSchedule,
                      tenant1: {
                        ...formData.sharedSchedule?.tenant1,
                        start: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="tenant1-end" className="text-xs">Fin</Label>
                  <Input
                    id="tenant1-end"
                    type="time"
                    value={formData.sharedSchedule?.tenant1.end || ''}
                    onChange={(e) => updateFormData('sharedSchedule', {
                      ...formData.sharedSchedule,
                      tenant1: {
                        ...formData.sharedSchedule?.tenant1,
                        end: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-medium">Inquilino 2</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-field">
                  <Label htmlFor="tenant2-start" className="text-xs">Inicio</Label>
                  <Input
                    id="tenant2-start"
                    type="time"
                    value={formData.sharedSchedule?.tenant2.start || ''}
                    onChange={(e) => updateFormData('sharedSchedule', {
                      ...formData.sharedSchedule,
                      tenant2: {
                        ...formData.sharedSchedule?.tenant2,
                        start: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="form-field">
                  <Label htmlFor="tenant2-end" className="text-xs">Fin</Label>
                  <Input
                    id="tenant2-end"
                    type="time"
                    value={formData.sharedSchedule?.tenant2.end || ''}
                    onChange={(e) => updateFormData('sharedSchedule', {
                      ...formData.sharedSchedule,
                      tenant2: {
                        ...formData.sharedSchedule?.tenant2,
                        end: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {errors.sharedSchedule && (
            <p className="error-text mt-4">
              <AlertCircle className="w-4 h-4" />
              {errors.sharedSchedule}
            </p>
          )}
        </CardContent>
      </Card>
    )}

    <Card className="bg-semantic-success/5 border-semantic-success/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-semantic-success" />
          <h4 className="font-semibold text-semantic-success">Optimización de ingresos</h4>
        </div>
        <p className="text-sm text-green-800">
          {formData.availabilityType === 'compartido' 
            ? '¡La modalidad compartida puede generar hasta 30€ más al mes!'
            : formData.availabilityType === '24h'
            ? 'Disponibilidad 24h maximiza las solicitudes'
            : 'Considera la modalidad compartida para mayores ingresos'
          }
        </p>
      </CardContent>
    </Card>
  </div>
);

const PriceStep = ({ formData, errors, updateFormData, marketData }: StepProps) => (
  <div className="space-y-8">
    <div className="form-field">
      <Label className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-brand-primary" />
        Precio mensual: <span className="font-bold text-brand-primary text-[16px]">{formData.price[0]}€</span>
      </Label>
      
      <div className="space-y-4 mt-4">
        <Slider
          id="price"
          value={formData.price}
          onValueChange={(value) => updateFormData('price', value)}
          max={200}
          min={30}
          step={5}
          className="w-full"
          aria-label="Precio del garaje"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>30€</span>
          <span className="font-medium">{marketData?.averagePrice || 95}€ (media zona)</span>
          <span>200€</span>
        </div>
      </div>

      {errors.price && (
        <p className="error-text mt-3">
          <AlertCircle className="w-4 h-4" />
          {errors.price}
        </p>
      )}
    </div>

    {/* Market insight */}
    <Card className={`border-2 ${
      marketData?.demand === 'alta' 
        ? 'border-semantic-success/30 bg-semantic-success/5' 
        : marketData?.demand === 'baja'
        ? 'border-semantic-warn/30 bg-semantic-warn/5'
        : 'border-brand-secondary/30 bg-brand-secondary/5'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
            marketData?.demand === 'alta' 
              ? 'bg-semantic-success/20' 
              : marketData?.demand === 'baja'
              ? 'bg-semantic-warn/20'
              : 'bg-brand-secondary/20'
          }`}>
            {marketData?.demand === 'alta' ? (
              <TrendingUp className="w-6 h-6 text-semantic-success" />
            ) : marketData?.demand === 'baja' ? (
              <TrendingDown className="w-6 h-6 text-semantic-warn" />
            ) : (
              <Minus className="w-6 h-6 text-brand-secondary" />
            )}
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold mb-2 ${
              marketData?.demand === 'alta' 
                ? 'text-semantic-success' 
                : marketData?.demand === 'baja'
                ? 'text-semantic-warn'
                : 'text-brand-secondary'
            }`}>
              Demanda {marketData?.demand || 'media'} en tu zona
            </h4>
            <p className="text-sm text-gray-600 mb-3 text-[14px]">
              El precio medio en tu zona es <strong>{marketData?.averagePrice || 95}€/mes</strong>. 
              Tu precio actual está {formData.price[0] > (marketData?.averagePrice || 95) ? 'por encima' : 'por debajo'} de la media.
            </p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="text-center p-2 bg-white/50 rounded-md">
                <div className="font-medium text-gray-700">Mín. recomendado</div>
                <div className="font-bold text-gray-900">{marketData?.minPrice || 70}€</div>
              </div>
              <div className="text-center p-2 bg-white/50 rounded-md">
                <div className="font-medium text-gray-700">Media zona</div>
                <div className="font-bold text-gray-900">{marketData?.averagePrice || 95}€</div>
              </div>
              <div className="text-center p-2 bg-white/50 rounded-md">
                <div className="font-medium text-gray-700">Máx. competitivo</div>
                <div className="font-bold text-gray-900">{marketData?.maxPrice || 120}€</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Pricing advice */}
    <div className="form-field">
      <div className="flex items-start gap-3">
        <Checkbox
          id="wantAdvice"
          checked={formData.wantAdvice}
          onCheckedChange={(checked) => updateFormData('wantAdvice', checked)}
        />
        <div>
          <Label htmlFor="wantAdvice" className="cursor-pointer">
            Quiero que Parkiduo me ayude a optimizar el precio según la demanda
          </Label>
          <p className="help-text text-[10px]">
            Nuestro equipo analizará tu zona y te sugerirá ajustes para maximizar tus ingresos.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ReviewStep = ({ formData, errors, updateFormData, toggleSecurityFeature, marketData }: StepProps) => (
  <div className="space-y-8">
    {/* Summary Cards */}
    <div className="grid gap-6">
      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-primary" />
            Ubicación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">{formData.address}</p>
            {formData.plazaNumber && <p className="text-sm text-gray-600">Plaza: {formData.plazaNumber}</p>}
            {formData.floor && <p className="text-sm text-gray-600">Planta: {formData.floor}</p>}
            {formData.accessType && <p className="text-sm text-gray-600">Acceso: {formData.accessType}</p>}
            {formData.vehicleSize.length > 0 && (
              <p className="text-sm text-gray-600">Vehículos: {formData.vehicleSize.join(', ')}</p>
            )}
            <p className="text-sm text-gray-600">Fotos: {formData.photos.length} subidas</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-primary" />
            Disponibilidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium capitalize">{formData.availabilityType}</p>
          {formData.availabilityType === 'compartido' && formData.sharedSchedule && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Inquilino 1: {formData.sharedSchedule.tenant1.start} - {formData.sharedSchedule.tenant1.end}</p>
              <p>Inquilino 2: {formData.sharedSchedule.tenant2.start} - {formData.sharedSchedule.tenant2.end}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-brand-primary" />
            Precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-brand-primary">{formData.price[0]}€<span className="text-base font-normal text-gray-600">/mes</span></p>
          <p className="text-sm text-gray-600 mt-1">
            {formData.price[0] > (marketData?.averagePrice || 95) ? 'Por encima' : 'Por debajo'} de la media de zona ({marketData?.averagePrice || 95}€)
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Rules and Security */}
    <div className="form-field">
      <Label htmlFor="rules">Normas adicionales (opcional)</Label>
      <Textarea
        id="rules"
        placeholder="Ej: No fumar, respetar horarios de descanso, mantener limpieza..."
        value={formData.rules}
        onChange={(e) => updateFormData('rules', e.target.value)}
        rows={3}
      />
      <p className="help-text">Normas específicas que quieres que respete quien alquile tu plaza.</p>
    </div>

    <div className="form-field">
      <Label>Características de seguridad</Label>
      <div className="grid grid-cols-2 gap-3 mt-3">
        {[
          'Cámaras de seguridad',
          'Acceso controlado',
          'Vigilancia 24h',
          'Iluminación nocturna',
          'Puerta automática',
          'Barrera de entrada'
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <Checkbox
              id={feature}
              checked={formData.securityFeatures.includes(feature)}
              onCheckedChange={() => toggleSecurityFeature(feature)}
            />
            <Label htmlFor={feature} className="text-sm cursor-pointer">
              {feature}
            </Label>
          </div>
        ))}
      </div>
    </div>

    {/* Final confirmation */}
    <Card className="bg-brand-primary/5 border-brand-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="finalReview"
            checked={formData.finalReview}
            onCheckedChange={(checked) => updateFormData('finalReview', checked)}
            required
          />
          <div>
            <Label htmlFor="finalReview" className="cursor-pointer font-medium">
              He revisado toda la información y quiero publicar mi garaje
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Al publicar, tu garaje será visible para conductores compatibles en tu zona.
            </p>
          </div>
        </div>
        {errors.finalReview && (
          <p className="error-text mt-3">
            <AlertCircle className="w-4 h-4" />
            {errors.finalReview}
          </p>
        )}
      </CardContent>
    </Card>
  </div>
);

const ContactStep = ({ formData, errors, updateFormData }: StepProps) => (
  <div className="space-y-8">
    <div className="text-center mb-6">
      <h3 className="font-semibold text-lg text-gray-900 mb-2">¡Último paso!</h3>
      <p className="text-gray-600">
        Completa tus datos de contacto para que los conductores puedan contactar contigo.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="form-field">
        <Label htmlFor="firstName" className="flex items-center gap-2">
          <User className="w-4 h-4 text-brand-primary" />
          Nombre *
        </Label>
        <Input
          id="firstName"
          placeholder="Tu nombre"
          value={formData.firstName}
          onChange={(e) => updateFormData('firstName', e.target.value)}
          required
        />
        {errors.firstName && (
          <p className="error-text">
            <AlertCircle className="w-4 h-4" />
            {errors.firstName}
          </p>
        )}
      </div>

      <div className="form-field">
        <Label htmlFor="lastName">Apellidos *</Label>
        <Input
          id="lastName"
          placeholder="Tus apellidos"
          value={formData.lastName}
          onChange={(e) => updateFormData('lastName', e.target.value)}
          required
        />
        {errors.lastName && (
          <p className="error-text">
            <AlertCircle className="w-4 h-4" />
            {errors.lastName}
          </p>
        )}
      </div>
    </div>

    <div className="form-field">
      <Label htmlFor="email">Email *</Label>
      <Input
        id="email"
        type="email"
        placeholder="tu@email.com"
        value={formData.email}
        onChange={(e) => updateFormData('email', e.target.value)}
        required
      />
      {errors.email && (
        <p className="error-text">
          <AlertCircle className="w-4 h-4" />
          {errors.email}
        </p>
      )}
      <p className="help-text">
        Usaremos este email para enviarte notificaciones sobre solicitudes.
      </p>
    </div>

    <div className="form-field">
      <Label htmlFor="phone">Teléfono *</Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+34 600 000 000"
        value={formData.phone}
        onChange={(e) => updateFormData('phone', e.target.value)}
        required
      />
      {errors.phone && (
        <p className="error-text">
          <AlertCircle className="w-4 h-4" />
          {errors.phone}
        </p>
      )}
      <p className="help-text">
        Los conductores podrán contactar contigo directamente por WhatsApp.
      </p>
    </div>

    <Card className="bg-semantic-success/5 border-semantic-success/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-semantic-success" />
          <div>
            <p className="font-medium text-semantic-success">¡Tu garaje está listo para publicar!</p>
            <p className="text-sm text-gray-600 mt-1">
              Una vez publiques, empezarás a recibir solicitudes de conductores interesados.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export function ParkerOnboarding({ onNavigate }: ParkerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed for stepper
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);
  const [errorSteps, setErrorSteps] = useState<number[]>([]);
  const [errorMessages, setErrorMessages] = useState<Record<number, string>>({});
  const [formData, setFormData] = useState<FormData>({
    address: '',
    plazaNumber: '',
    floor: '',
    accessType: '',
    vehicleSize: [],
    photos: [],
    availabilityType: '',
    blockedDates: [],
    price: [95],
    wantAdvice: false,
    rules: '',
    securityFeatures: [],
    finalReview: false,
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock market data
  const marketData = {
    averagePrice: 95,
    minPrice: 70,
    maxPrice: 125,
    demand: 'alta' as const
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const toggleVehicleSize = (size: string) => {
    const current = formData.vehicleSize;
    if (current.includes(size)) {
      updateFormData('vehicleSize', current.filter(s => s !== size));
    } else {
      updateFormData('vehicleSize', [...current, size]);
    }
  };

  const toggleSecurityFeature = (feature: string) => {
    const current = formData.securityFeatures;
    if (current.includes(feature)) {
      updateFormData('securityFeatures', current.filter(f => f !== feature));
    } else {
      updateFormData('securityFeatures', [...current, feature]);
    }
  };

  const validateCurrentStep = () => {
    const newErrors: string[] = [];
    let isValid = true;

    switch (currentStep) {
      case 0: // Location
        if (!formData.address.trim()) {
          newErrors.push('La dirección es obligatoria');
          isValid = false;
        }
        if (formData.photos.length === 0) {
          newErrors.push('Debes subir al menos una foto del garaje');
          isValid = false;
        }
        break;
      case 1: // Availability
        if (!formData.availabilityType) {
          newErrors.push('Debes seleccionar una modalidad de disponibilidad');
          isValid = false;
        }
        if (formData.availabilityType === 'compartido' && 
            (!formData.sharedSchedule?.tenant1.start || !formData.sharedSchedule?.tenant1.end ||
             !formData.sharedSchedule?.tenant2.start || !formData.sharedSchedule?.tenant2.end)) {
          newErrors.push('Debes completar los horarios para ambos inquilinos');
          isValid = false;
        }
        break;
      case 2: // Price
        if (formData.price[0] < 30) {
          newErrors.push('El precio mínimo es de 30€');
          isValid = false;
        }
        break;
      case 3: // Review
        if (!formData.finalReview) {
          newErrors.push('Debes confirmar que quieres publicar el garaje');
          isValid = false;
        }
        break;
      case 4: // Contact
        if (!formData.firstName.trim()) {
          newErrors.push('El nombre es obligatorio');
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.push('Los apellidos son obligatorios');
          isValid = false;
        }
        if (!formData.email.trim()) {
          newErrors.push('El email es obligatorio');
          isValid = false;
        }
        if (!formData.phone.trim()) {
          newErrors.push('El teléfono es obligatorio');
          isValid = false;
        }
        break;
    }

    // Update error states
    if (!isValid) {
      setErrorSteps([...errorSteps.filter(s => s !== currentStep), currentStep]);
      setErrorMessages({
        ...errorMessages,
        [currentStep]: newErrors[0]
      });
    } else {
      setErrorSteps(errorSteps.filter(s => s !== currentStep));
      const newErrorMessages = { ...errorMessages };
      delete newErrorMessages[currentStep];
      setErrorMessages(newErrorMessages);
    }

    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 4) {
      // Mark current step as visited
      if (!visitedSteps.includes(currentStep)) {
        setVisitedSteps([...visitedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      toast.success('¡Garaje publicado exitosamente!');
      onNavigate('parker-success');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onNavigate('home');
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on visited steps or current step
    if (stepIndex <= currentStep || visitedSteps.includes(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      errors,
      updateFormData,
      toggleVehicleSize,
      toggleSecurityFeature,
      marketData
    };

    switch (currentStep) {
      case 0:
        return <LocationStep {...stepProps} />;
      case 1:
        return <AvailabilityStep {...stepProps} />;
      case 2:
        return <PriceStep {...stepProps} />;
      case 3:
        return <ReviewStep {...stepProps} />;
      case 4:
        return <ContactStep {...stepProps} />;
      default:
        return <LocationStep {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Ubicación del garaje',
      'Disponibilidad',
      'Precio',
      'Revisión',
      'Datos de contacto'
    ];
    return titles[currentStep] || '';
  };

  const getStepDescription = () => {
    const descriptions = [
      'Indica dónde está tu garaje y qué características tiene',
      'Define cuándo estará disponible tu plaza',
      'Establece el precio mensual de tu garaje',
      'Revisa toda la información antes de publicar',
      'Completa tus datos para que los conductores puedan contactarte'
    ];
    return descriptions[currentStep] || '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Wizard Header - Simple inline stepper */}
        <div className="mb-8">
          <WizardHeader
            onBack={handleBack}
            steps={createParkerStepper(currentStep, visitedSteps, errorSteps, errorMessages)}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            backLabel="Volver"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-poppins font-bold text-gray-900 text-[24px]">
                {getStepTitle()}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {getStepDescription()}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {renderCurrentStep()}
            </CardContent>

            <div className="px-6 pb-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 0 ? 'Volver al inicio' : 'Anterior'}
                </Button>

                <Button
                  onClick={handleNext}
                  className="bg-brand-primary hover:bg-blue-600 text-white px-6"
                  disabled={
                    (currentStep === 0 && (!formData.address || formData.photos.length === 0)) ||
                    (currentStep === 1 && !formData.availabilityType) ||
                    (currentStep === 3 && !formData.finalReview) ||
                    (currentStep === 4 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
                  }
                >
                  {currentStep === 4 ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Publicar garaje
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda? {' '}
              <button className="text-brand-primary hover:underline">
                Chatea con nosotros
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}