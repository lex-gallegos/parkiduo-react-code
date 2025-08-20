export const LANGUAGES = [
  { value: 'ES', label: 'Español' },
  { value: 'EN', label: 'English' },
  { value: 'NL', label: 'Nederlands' },
];

export const GENDERS = [
  { value: 'not_specified', label: 'Prefiero no decirlo' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },  
  { value: 'no_binario', label: 'No binario' },
  { value: 'otro', label: 'Otro' },
];

export const TIMEZONES = [
  { value: 'Europe/Madrid', label: 'Europa/Madrid (CET)' },
  { value: 'Europe/London', label: 'Europa/Londres (GMT)' },
  { value: 'Europe/Paris', label: 'Europa/París (CET)' },
  { value: 'America/New_York', label: 'América/Nueva York (EST)' },
];

export const VEHICLE_BRANDS = [
  'Audi', 'BMW', 'Citroën', 'Fiat', 'Ford', 'Honda', 'Hyundai', 
  'Kia', 'Mercedes-Benz', 'Nissan', 'Opel', 'Peugeot', 'Renault', 
  'SEAT', 'Škoda', 'Toyota', 'Volkswagen', 'Volvo', 'Otro'
];

export const VEHICLE_COLORS = [
  'Blanco', 'Negro', 'Gris', 'Plata', 'Azul', 'Rojo', 
  'Verde', 'Amarillo', 'Naranja', 'Marrón', 'Otro'
];

export const SECURITY_FEATURES = [
  'Extintor disponible',
  'Buena iluminación', 
  'Cámaras de vigilancia',
  'Acceso controlado',
  'Vigilante/Portero',
  'Alarma activada'
];

export const NOTIFICATION_CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    description: 'Notificaciones por correo electrónico',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Mensajes por WhatsApp',
  },
  {
    id: 'calls',
    label: 'Llamadas',
    description: 'Llamadas telefónicas para casos urgentes',
  },
  {
    id: 'push',
    label: 'Push',
    description: 'Notificaciones en el navegador',
  }
];

export const PRIVACY_PHONE_OPTIONS = [
  { 
    value: 'hidden_until_approval', 
    label: 'Oculto hasta aprobar solicitud',
    description: 'Tu teléfono solo será visible después de aprobar una solicitud'
  },
  { 
    value: 'always_hidden', 
    label: 'Siempre oculto',
    description: 'Tu teléfono nunca será visible para otros usuarios'
  },
  { 
    value: 'visible_for_matches', 
    label: 'Visible para matches',
    description: 'Visible para usuarios con los que hayas hecho match'
  }
];

export const TWO_FACTOR_METHODS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' }
];

export const PAYMENT_METHODS = [
  {
    id: 'card_123',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
    status: 'active'
  }
];

export const MOCK_PAYMENT_HISTORY = [
  {
    id: 'pay_001',
    date: '2024-01-15',
    description: 'Contrato mensual - Plaza Garaje Centro',
    amount: 85,
    status: 'completed',
    receipt: 'receipt_001.pdf'
  },
  {
    id: 'pay_002', 
    date: '2024-01-10',
    description: 'Servicio prioritario 24h',
    amount: 15,
    status: 'completed',
    receipt: 'receipt_002.pdf'
  },
  {
    id: 'pay_003',
    date: '2024-01-05',
    description: 'Contrato mensual - Plaza Garaje Salamanca',
    amount: 95,
    status: 'pending',
    receipt: null
  }
];

export const MOCK_ACTIVE_SESSIONS = [
  {
    id: 'session_1',
    device: 'Chrome en Windows',
    location: 'Madrid, España',
    lastActive: '2024-01-15T10:30:00Z',
    current: true
  },
  {
    id: 'session_2', 
    device: 'Safari en iPhone',
    location: 'Madrid, España',
    lastActive: '2024-01-14T18:45:00Z',
    current: false
  },
  {
    id: 'session_3',
    device: 'Chrome en Android',
    location: 'Barcelona, España', 
    lastActive: '2024-01-12T12:15:00Z',
    current: false
  }
];