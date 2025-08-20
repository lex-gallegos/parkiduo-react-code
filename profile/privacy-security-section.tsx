import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { PRIVACY_PHONE_OPTIONS, TWO_FACTOR_METHODS, MOCK_ACTIVE_SESSIONS } from './profile-constants';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  Smartphone, 
  Monitor, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Key
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { formatDistanceToNow, parseISO } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';

interface PrivacySecuritySectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

export function PrivacySecuritySection({ profile, onUpdate, onUnsavedChanges }: PrivacySecuritySectionProps) {
  const [privacySettings, setPrivacySettings] = useState(profile.privacy);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [activeSessions, setActiveSessions] = useState(MOCK_ACTIVE_SESSIONS);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = JSON.stringify(privacySettings) !== JSON.stringify(profile.privacy);
    setHasChanges(changed);
    onUnsavedChanges(changed);
  }, [privacySettings, profile.privacy, onUnsavedChanges]);

  // Auto-save privacy settings
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        handleSavePrivacySettings();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [privacySettings, hasChanges]);

  const handleSavePrivacySettings = async () => {
    if (!hasChanges) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      onUpdate({ 
        ...profile, 
        privacy: privacySettings 
      });
      setHasChanges(false);
      toast.success('Configuración de privacidad guardada', { duration: 2000 });
    } catch (error) {
      toast.error('Error al guardar la configuración');
    }
  };

  const updatePrivacySetting = (setting: string, value: any) => {
    setPrivacySettings((prev: any) => ({ ...prev, [setting]: value }));
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 2) return { strength, label: 'Débil', color: 'text-semantic-danger' };
    if (strength < 4) return { strength, label: 'Media', color: 'text-semantic-warn' };
    return { strength, label: 'Fuerte', color: 'text-semantic-success' };
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast.error('Completa todos los campos');
      return;
    }

    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(passwordForm.new)) {
      toast.error('La contraseña no cumple los requisitos mínimos');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordForm({ current: '', new: '', confirm: '' });
      setShowPasswordForm(false);
      toast.success('Contraseña actualizada correctamente');
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  const toggleTwoFactor = async (enabled: boolean) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      updatePrivacySetting('twoFactorEnabled', enabled);
      toast.success(enabled ? '2FA activado' : '2FA desactivado');
    } catch (error) {
      toast.error('Error al actualizar 2FA');
    }
  };

  const handleCloseSession = async (sessionId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveSessions(prev => prev.filter(s => s.id !== sessionId));
      toast.success('Sesión cerrada');
    } catch (error) {
      toast.error('Error al cerrar la sesión');
    }
  };

  const handleCloseAllSessions = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveSessions(prev => prev.filter(s => s.current));
      toast.success('Todas las sesiones cerradas');
    } catch (error) {
      toast.error('Error al cerrar las sesiones');
    }
  };

  const passwordStrength = getPasswordStrength(passwordForm.new);

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Configuración de privacidad
          </CardTitle>
          <p className="text-sm text-gray-600">
            Controla qué información es visible para otros usuarios
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Phone Visibility */}
          <div className="space-y-3">
            <Label htmlFor="phoneVisibility">Visibilidad del teléfono</Label>
            <Select
              value={privacySettings.phoneVisibility}
              onValueChange={(value) => updatePrivacySetting('phoneVisibility', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIVACY_PHONE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              {PRIVACY_PHONE_OPTIONS.find(o => o.value === privacySettings.phoneVisibility)?.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Configuración de seguridad
          </CardTitle>
          <p className="text-sm text-gray-600">
            Protege tu cuenta con medidas de seguridad adicionales
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Two Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">Autenticación en dos pasos (2FA)</h4>
                  {privacySettings.twoFactorEnabled && (
                    <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Activo
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Añade una capa extra de seguridad a tu cuenta
                </p>
              </div>
              <Switch
                checked={privacySettings.twoFactorEnabled}
                onCheckedChange={toggleTwoFactor}
              />
            </div>

            {privacySettings.twoFactorEnabled && (
              <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-3">
                <Label htmlFor="twoFactorMethod">Método de verificación</Label>
                <Select
                  value={privacySettings.twoFactorMethod}
                  onValueChange={(value) => updatePrivacySetting('twoFactorMethod', value)}
                >
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TWO_FACTOR_METHODS.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Separator />

          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Cambiar contraseña</h4>
                <p className="text-sm text-gray-600">
                  Actualiza tu contraseña regularmente para mayor seguridad
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                <Key className="mr-2 h-4 w-4" />
                {showPasswordForm ? 'Cancelar' : 'Cambiar'}
              </Button>
            </div>

            {showPasswordForm && (
              <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña actual *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                    placeholder="Introduce tu contraseña actual"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva contraseña *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                    placeholder="Introduce una nueva contraseña"
                  />
                  {passwordForm.new && (
                    <div className="flex items-center gap-2">
                      <div className={`text-xs ${passwordStrength.color}`}>
                        Seguridad: {passwordStrength.label}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all ${
                            passwordStrength.strength < 2 ? 'bg-semantic-danger' :
                            passwordStrength.strength < 4 ? 'bg-semantic-warn' : 'bg-semantic-success'
                          }`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar nueva contraseña *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                    placeholder="Confirma la nueva contraseña"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Requisitos de contraseña:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Mínimo 8 caracteres</li>
                    <li>• Al menos una letra mayúscula</li>
                    <li>• Al menos una letra minúscula</li>
                    <li>• Al menos un número</li>
                  </ul>
                </div>

                <Button onClick={handlePasswordChange} className="w-full md:w-auto">
                  Actualizar contraseña
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Sesiones activas
              </CardTitle>
              <p className="text-sm text-gray-600">
                Gestiona los dispositivos con acceso a tu cuenta
              </p>
            </div>
            {activeSessions.filter(s => !s.current).length > 0 && (
              <Button variant="outline" size="sm" onClick={handleCloseAllSessions}>
                <Trash2 className="mr-2 h-4 w-4" />
                Cerrar todas
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {session.device.includes('iPhone') || session.device.includes('Android') ? (
                      <Smartphone className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Monitor className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{session.device}</h4>
                      {session.current && (
                        <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                          Actual
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <p className="text-xs text-gray-500">
                      Última actividad: {formatDistanceToNow(parseISO(session.lastActive), { 
                        addSuffix: true,
                        locale: es 
                      })}
                    </p>
                  </div>
                </div>
                
                {!session.current && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCloseSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {activeSessions.length === 1 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Solo tienes una sesión activa (la actual)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}