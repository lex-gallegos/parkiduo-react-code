import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AvatarUploader } from './avatar-uploader';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Camera,
  User,
  Phone,
  FileText,
  Car,
  Shield
} from 'lucide-react';

interface ProfileHeaderProps {
  profile: any;
  userType: 'parker' | 'driver' | 'admin' | null;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

export function ProfileHeader({ profile, userType, onUpdate, onUnsavedChanges }: ProfileHeaderProps) {
  const [showAvatarUploader, setShowAvatarUploader] = useState(false);

  const getVerificationBadge = (status: string, reason?: string) => {
    switch (status) {
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
            Pendiente
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

  const getNextSteps = () => {
    const steps = [];
    
    if (!profile.verification.phone) {
      steps.push({ 
        id: 'verify-phone', 
        label: 'Verificar teléfono',
        description: 'Confirma tu número para recibir notificaciones',
        tab: 'contact'
      });
    }
    
    if (!profile.verification.email) {
      steps.push({ 
        id: 'verify-email', 
        label: 'Verificar email',
        description: 'Confirma tu correo electrónico',
        tab: 'contact'
      });
    }
    
    if (profile.verification.identity !== 'verified') {
      steps.push({ 
        id: 'verify-identity', 
        label: 'Verificar identidad',
        description: 'Sube tu DNI/NIE para completar verificación',
        tab: 'verification'
      });
    }
    
    if (!profile.addresses.fiscal.street) {
      steps.push({ 
        id: 'add-address', 
        label: 'Añadir domicilio fiscal',
        description: 'Requerido para generar contratos',
        tab: 'contact'
      });
    }
    
    if (userType === 'driver' && !profile.vehicle?.plate) {
      steps.push({ 
        id: 'add-vehicle', 
        label: 'Añadir vehículo',
        description: 'Especifica tu vehículo para solicitudes',
        tab: 'vehicle'
      });
    }

    return steps.slice(0, 3); // Show max 3 next steps
  };

  const handleAvatarUpdate = (avatarUrl: string) => {
    onUpdate({ ...profile, avatar: avatarUrl });
    setShowAvatarUploader(false);
    onUnsavedChanges(true);
  };

  const nextSteps = getNextSteps();

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-brand-primary text-white text-xl">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={() => setShowAvatarUploader(true)}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {profile.firstName} {profile.lastName}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                {userType === 'driver' && <Badge variant="outline">Conductor</Badge>}
                {userType === 'parker' && <Badge variant="outline">Propietario</Badge>}
                {profile.verification.identity === 'verified' && (
                  <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Perfil completo</span>
                  <span className="text-sm text-gray-500">{profile.completenessPercentage}%</span>
                </div>
                <Progress value={profile.completenessPercentage} className="h-3" />
                {profile.completenessPercentage < 100 && (
                  <p className="text-xs text-gray-500">
                    Completa tu perfil para aumentar la confianza y acceder a más funciones
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">Teléfono</span>
              </div>
              {getVerificationBadge(profile.verification.phone ? 'verified' : 'pending')}
            </div>
            <p className="text-xs text-gray-500">
              {profile.verification.phone ? 'Número confirmado' : 'Pendiente de verificación'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">Email</span>
              </div>
              {getVerificationBadge(profile.verification.email ? 'verified' : 'pending')}
            </div>
            <p className="text-xs text-gray-500">
              {profile.verification.email ? 'Correo confirmado' : 'Pendiente de verificación'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">Identidad</span>
              </div>
              {getVerificationBadge(profile.verification.identity, profile.verification.identityReason)}
            </div>
            <p className="text-xs text-gray-500">
              {profile.verification.identity === 'verified' ? 'Documento validado' : 
               profile.verification.identity === 'rejected' ? 'Documento rechazado' :
               'Pendiente de verificación'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Siguientes pasos</CardTitle>
            <p className="text-sm text-gray-600">
              Completa estos elementos para mejorar tu experiencia en Parkiduo
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.label}</h4>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // This would trigger navigation to the relevant tab
                      // For now, just show a toast
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Completar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Avatar Uploader Modal */}
      {showAvatarUploader && (
        <AvatarUploader
          currentAvatar={profile.avatar}
          onUpload={handleAvatarUpdate}
          onCancel={() => setShowAvatarUploader(false)}
        />
      )}
    </div>
  );
}