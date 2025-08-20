import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Car, Home, Users, ArrowRight } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect?: (role: 'parker' | 'driver') => void;
  onNavigate: (page: string) => void;
  className?: string;
}

export function RoleSelector({ onRoleSelect, onNavigate, className = '' }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<'parker' | 'driver' | null>(null);

  const handleRoleChange = (role: 'parker' | 'driver') => {
    setSelectedRole(role);
    onRoleSelect?.(role);
  };

  const handleCTAClick = () => {
    if (selectedRole === 'driver') {
      onNavigate('driver-onboarding');
    } else if (selectedRole === 'parker') {
      onNavigate('parker-onboarding');
    } else {
      // Default fallback - could open a modal to select role first
      onNavigate('driver-onboarding');
    }
  };

  const getCTAText = () => {
    if (selectedRole === 'driver') return 'Solicitar garaje';
    if (selectedRole === 'parker') return 'Publicar garaje';
    return 'Empezar ahora';
  };

  const getDescription = () => {
    if (selectedRole === 'driver') return 'Encuentra tu plaza perfecta con contratos seguros';
    if (selectedRole === 'parker') return 'Monetiza tu garaje vacío sin complicaciones';
    return 'Conecta con conductores compatibles y reduce gastos';
  };

  const getStats = () => {
    if (selectedRole === 'driver') return { primary: '+1,200', secondary: 'plazas disponibles' };
    if (selectedRole === 'parker') return { primary: '€120', secondary: 'media mensual' };
    return { primary: '+2,500', secondary: 'usuarios activos' };
  };

  const stats = getStats();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Role Selector */}
      <div className="space-y-4">
        <p className="text-gray-600 text-center">Selecciona tu perfil:</p>
        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => handleRoleChange('driver')}
            className={`flex items-center justify-center gap-2 p-4 rounded-md transition-all duration-200 ${
              selectedRole === 'driver'
                ? 'bg-white shadow-sm text-brand-primary border border-brand-primary/20'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-pressed={selectedRole === 'driver'}
          >
            <Car className="w-5 h-5" />
            <span className="font-medium">Conductor</span>
          </button>
          <button
            onClick={() => handleRoleChange('parker')}
            className={`flex items-center justify-center gap-2 p-4 rounded-md transition-all duration-200 ${
              selectedRole === 'parker'
                ? 'bg-white shadow-sm text-brand-primary border border-brand-primary/20'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-pressed={selectedRole === 'parker'}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Propietario</span>
          </button>
        </div>
      </div>

      {/* Dynamic Description */}
      <p className="text-xl text-gray-600 text-center leading-relaxed min-h-[3.5rem] flex items-center justify-center">
        {getDescription()}
      </p>

      {/* Primary CTA */}
      <div className="text-center space-y-4">
        <Button
          size="lg"
          onClick={handleCTAClick}
          className="bg-brand-primary hover:bg-blue-600 text-white px-12 py-6 text-xl font-bold hover-lift h-16 min-w-[280px]"
        >
          {selectedRole === 'driver' && <Car className="mr-3 h-6 w-6" />}
          {selectedRole === 'parker' && <Home className="mr-3 h-6 w-6" />}
          {!selectedRole && <ArrowRight className="mr-3 h-6 w-6" />}
          {getCTAText()}
        </Button>

        {/* Dynamic Stats */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
            <span className="text-gray-600">
              <strong className="text-brand-primary text-lg">{stats.primary}</strong> {stats.secondary}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-secondary" />
            <span className="text-gray-600">Verificado</span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-semantic-success/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
          </div>
          <span>Contratos legales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-semantic-success/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
          </div>
          <span>Pagos seguros</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-semantic-success/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-semantic-success rounded-full"></div>
          </div>
          <span>Sin intermediarios</span>
        </div>
      </div>

      {/* Context-aware microcopy */}
      {selectedRole && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {selectedRole === 'driver' 
              ? '✓ Match en menos de 48h en zonas con alta demanda'
              : '✓ Publicar es gratis. Solo pagas si cierras contrato (€29,95)'
            }
          </p>
        </div>
      )}
    </div>
  );
}