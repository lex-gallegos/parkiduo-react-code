import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { 
  Bell, 
  Mail, 
  MessageCircle, 
  Phone, 
  Smartphone,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface NotificationsSectionProps {
  profile: any;
  userType: 'parker' | 'driver' | 'admin' | null;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

interface NotificationSettings {
  email: boolean;
  whatsapp: boolean;
  calls: boolean;
  push: boolean;
  events: {
    newRequests: boolean;
    approvals: boolean;
    visitReminders: boolean;
    matches: boolean;
    contracts: boolean;
    payments: boolean;
    priorityRenewal: boolean;
  };
}

export function NotificationsSection({ profile, userType, onUpdate, onUnsavedChanges }: NotificationsSectionProps) {
  const [settings, setSettings] = useState<NotificationSettings>(profile.notifications);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check for changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(profile.notifications);
    setHasChanges(changed);
    onUnsavedChanges(changed);
  }, [settings, profile.notifications, onUnsavedChanges]);

  // Auto-save after 1 second of no changes
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [settings, hasChanges]);

  const handleAutoSave = async () => {
    if (!hasChanges) return;
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onUpdate({ 
        ...profile, 
        notifications: settings 
      });
      setHasChanges(false);
      toast.success('Preferencias guardadas', { duration: 2000 });
    } catch (error) {
      toast.error('Error al guardar preferencias');
    } finally {
      setIsSaving(false);
    }
  };

  const updateChannelSetting = (channel: keyof Omit<NotificationSettings, 'events'>, value: boolean) => {
    setSettings(prev => ({ ...prev, [channel]: value }));
  };

  const updateEventSetting = (event: keyof NotificationSettings['events'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: value
      }
    }));
  };

  const getChannelStatus = (channel: keyof Omit<NotificationSettings, 'events'>) => {
    return settings[channel];
  };

  const eventLabels = {
    newRequests: {
      label: userType === 'parker' ? 'Nuevas solicitudes de garaje' : 'Nuevos garajes disponibles',
      description: userType === 'parker' 
        ? 'Cuando alguien solicite tu garaje'
        : 'Cuando aparezcan garajes que coincidan con tu búsqueda'
    },
    approvals: {
      label: userType === 'parker' ? 'Aprobaciones de solicitudes' : 'Solicitudes aprobadas/rechazadas',
      description: userType === 'parker'
        ? 'Cuando apruebes o rechaces una solicitud'
        : 'Cuando un propietario responda a tu solicitud'
    },
    visitReminders: {
      label: 'Recordatorios de visita',
      description: 'Antes de visitas programadas al garaje'
    },
    matches: {
      label: 'Matches confirmados',
      description: 'Cuando se confirme un acuerdo entre las partes'
    },
    contracts: {
      label: 'Generación de contratos',
      description: 'Cuando se genere un contrato automáticamente'
    },
    payments: {
      label: 'Pagos y recibos',
      description: 'Recordatorios de pago y confirmaciones de recibos'
    },
    priorityRenewal: {
      label: 'Renovación de prioridad 24h',
      description: 'Recordatorio para renovar tu acceso prioritario',
      driverOnly: true
    }
  };

  const channels = [
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      description: 'Notificaciones por correo electrónico',
      status: profile.verification.email ? 'verified' : 'unverified'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      description: 'Mensajes por WhatsApp',
      status: profile.verification.phone ? 'verified' : 'unverified'
    },
    {
      id: 'calls',
      label: 'Llamadas',
      icon: Phone,
      description: 'Llamadas telefónicas para casos urgentes',
      status: profile.verification.phone ? 'verified' : 'unverified'
    },
    {
      id: 'push',
      label: 'Push',
      icon: Smartphone,
      description: 'Notificaciones en el navegador',
      status: 'available'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Channels Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Canales de notificación
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Elige cómo quieres recibir notificaciones
              </p>
            </div>
            {isSaving && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-1" />
                Guardando
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isEnabled = getChannelStatus(channel.id as keyof Omit<NotificationSettings, 'events'>);
            const isVerified = channel.status === 'verified';
            
            return (
              <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isEnabled ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{channel.label}</h4>
                      {isVerified && (
                        <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {!isVerified && channel.status === 'unverified' && (
                        <Badge variant="outline" className="text-semantic-warn border-semantic-warn/20">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Sin verificar
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                    {!isVerified && channel.status === 'unverified' && (
                      <p className="text-xs text-semantic-warn mt-1">
                        {channel.id === 'email' ? 'Verifica tu email' : 'Verifica tu teléfono'} para activar este canal
                      </p>
                    )}
                  </div>
                </div>
                
                <Switch
                  checked={isEnabled}
                  onCheckedChange={(value) => updateChannelSetting(channel.id as keyof Omit<NotificationSettings, 'events'>, value)}
                  disabled={!isVerified && channel.status === 'unverified'}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Tipos de notificación
          </CardTitle>
          <p className="text-sm text-gray-600">
            Configura qué eventos quieres que te notifiquemos
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {Object.entries(eventLabels).map(([eventKey, eventData], index) => {
            // Skip driver-only events for parker users
            if (eventData.driverOnly && userType !== 'driver') {
              return null;
            }

            const isEnabled = settings.events[eventKey as keyof NotificationSettings['events']];
            const hasActiveChannels = settings.email || settings.whatsapp || settings.calls || settings.push;
            
            return (
              <div key={eventKey}>
                {index > 0 && <Separator className="mb-4" />}
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {eventData.label}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {eventData.description}
                    </p>
                    {isEnabled && !hasActiveChannels && (
                      <p className="text-xs text-semantic-warn mt-1">
                        Activa al menos un canal de notificación arriba
                      </p>
                    )}
                  </div>
                  
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(value) => updateEventSetting(eventKey as keyof NotificationSettings['events'], value)}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Bell className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Resumen de notificaciones</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• Canales activos: {[
                  settings.email && 'Email',
                  settings.whatsapp && 'WhatsApp', 
                  settings.calls && 'Llamadas',
                  settings.push && 'Push'
                ].filter(Boolean).join(', ') || 'Ninguno'}</p>
                <p>• Eventos configurados: {Object.values(settings.events).filter(Boolean).length} de {Object.keys(eventLabels).length - (userType !== 'driver' ? 1 : 0)}</p>
                <p>• Las preferencias se guardan automáticamente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}