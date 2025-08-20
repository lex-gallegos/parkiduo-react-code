import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { ProfileHeader } from './profile-header';
import { PersonalDataSection } from './personal-data-section';
import { ContactDataSection } from './contact-data-section';
import { ContractDataSection } from './contract-data-section';
import { VehicleSection } from './vehicle-section';
import { IdentityVerificationSection } from './identity-verification-section';
import { NotificationsSection } from './notifications-section';
import { PrivacySecuritySection } from './privacy-security-section';
import { PaymentsBillingSection } from './payments-billing-section';
import { DataAccountSection } from './data-account-section';
import { UnsavedChangesDialog } from './unsaved-changes-dialog';
import { 
  User, 
  Phone, 
  FileText, 
  Car, 
  Shield, 
  Bell, 
  Lock, 
  CreditCard, 
  Database,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userType: 'parker' | 'driver' | 'admin' | null;
  initialSection?: string;
}

interface UserProfile {
  // Personal data
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  language: string;
  timezone: string;
  
  // Contact data
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
  
  // Contract data
  dni: string;
  legalName: string;
  nif: string;
  
  // Vehicle data (Driver only)
  vehicle?: {
    plate: string;
    brand: string;
    model: string;
    color: string;
    photo?: string;
    isDefault: boolean;
  };
  
  // Verification status
  verification: {
    phone: boolean;
    email: boolean;
    identity: 'pending' | 'verified' | 'rejected';
    identityReason?: string;
  };
  
  // Settings
  notifications: {
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
  };
  
  privacy: {
    phoneVisibility: 'hidden_until_approval' | 'always_hidden' | 'visible_for_matches';
    twoFactorEnabled: boolean;
    twoFactorMethod: 'whatsapp' | 'email';
  };
  
  // Meta
  completenessPercentage: number;
  avatar?: string;
}

export function ProfilePage({ onNavigate, userType, initialSection }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user profile data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Ana',
    lastName: 'García López',
    dateOfBirth: '1990-03-15',
    gender: 'femenino',
    language: 'ES',
    timezone: 'Europe/Madrid',
    phone: '+34 612 345 678',
    email: 'ana.garcia@email.com',
    addresses: {
      fiscal: {
        street: 'Calle Gran Vía',
        number: '28',
        floor: '4º A',
        postalCode: '28013',
        city: 'Madrid',
        province: 'Madrid',
        country: 'España'
      }
    },
    dni: '12345678Z',
    legalName: 'Ana García López',
    nif: '',
    verification: {
      phone: true,
      email: true,
      identity: 'verified'
    },
    notifications: {
      email: true,
      whatsapp: true,
      calls: false,
      push: true,
      events: {
        newRequests: true,
        approvals: true,
        visitReminders: true,
        matches: true,
        contracts: true,
        payments: true,
        priorityRenewal: userType === 'driver'
      }
    },
    privacy: {
      phoneVisibility: 'hidden_until_approval',
      twoFactorEnabled: false,
      twoFactorMethod: 'whatsapp'
    },
    completenessPercentage: 85
  });

  // Add vehicle data if user is driver
  useEffect(() => {
    if (userType === 'driver' && !profile.vehicle) {
      setProfile(prev => ({
        ...prev,
        vehicle: {
          plate: '1234 ABC',
          brand: 'Volkswagen',
          model: 'Golf',
          color: 'Azul',
          isDefault: true
        }
      }));
    }
  }, [userType, profile.vehicle]);

  // Calculate profile completeness
  useEffect(() => {
    let completed = 0;
    let total = 10;

    if (profile.firstName && profile.lastName) completed++;
    if (profile.dateOfBirth) completed++;
    if (profile.phone && profile.verification.phone) completed++;
    if (profile.email && profile.verification.email) completed++;
    if (profile.addresses.fiscal.street) completed++;
    if (profile.dni) completed++;
    if (profile.verification.identity === 'verified') completed++;
    if (userType === 'driver' && profile.vehicle?.plate) completed++;
    
    completed += 2; // Base completeness

    const percentage = Math.round((completed / total) * 100);
    
    // Only update if percentage has actually changed
    if (percentage !== profile.completenessPercentage) {
      setProfile(prev => ({ ...prev, completenessPercentage: percentage }));
    }
  }, [
    profile.firstName,
    profile.lastName,
    profile.dateOfBirth,
    profile.phone,
    profile.verification.phone,
    profile.email,
    profile.verification.email,
    profile.addresses.fiscal.street,
    profile.dni,
    profile.verification.identity,
    profile.vehicle?.plate,
    profile.completenessPercentage,
    userType
  ]);

  // Mock loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle initial section navigation
  useEffect(() => {
    if (initialSection && initialSection !== activeTab) {
      setActiveTab(initialSection);
    }
  }, [initialSection]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
      setPendingNavigation(userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard');
    } else {
      onNavigate(userType === 'parker' ? 'parker-dashboard' : 'driver-dashboard');
    }
  };

  const handleTabChange = (tab: string) => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
      setPendingNavigation(`tab:${tab}`);
    } else {
      setActiveTab(tab);
    }
  };

  const handleUnsavedChanges = (hasChanges: boolean) => {
    setHasUnsavedChanges(hasChanges);
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedDialog(false);
    
    if (pendingNavigation) {
      if (pendingNavigation.startsWith('tab:')) {
        setActiveTab(pendingNavigation.replace('tab:', ''));
      } else {
        onNavigate(pendingNavigation);
      }
      setPendingNavigation(null);
    }
  };

  const handleSaveChanges = async () => {
    setShowUnsavedDialog(false);
    // Mock save operation
    toast.success('Cambios guardados correctamente');
    setHasUnsavedChanges(false);
    
    if (pendingNavigation) {
      if (pendingNavigation.startsWith('tab:')) {
        setActiveTab(pendingNavigation.replace('tab:', ''));
      } else {
        onNavigate(pendingNavigation);
      }
      setPendingNavigation(null);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'personal', label: 'Datos personales', icon: User },
    { id: 'contact', label: 'Datos de contacto', icon: Phone },
    { id: 'contract', label: 'Datos para contrato', icon: FileText },
    ...(userType === 'driver' ? [{ id: 'vehicle', label: 'Vehículo', icon: Car }] : []),
    { id: 'verification', label: 'Verificación', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'privacy', label: 'Privacidad', icon: Lock },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'data', label: 'Datos y cuenta', icon: Database },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al dashboard
            </Button>
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                Cambios sin guardar
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600">
            Tu perfil ayuda a generar contratos sin fricción. Completa los datos marcados.
          </p>
        </div>

        <main id="main-content" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation - Mobile Tabs / Desktop Sidebar */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{profile.firstName} {profile.lastName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {userType === 'driver' && <Badge variant="outline" className="text-xs">Conductor</Badge>}
                      {userType === 'parker' && <Badge variant="outline" className="text-xs">Propietario</Badge>}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Perfil completo</span>
                    <span className="text-sm text-gray-500">{profile.completenessPercentage}%</span>
                  </div>
                  <Progress value={profile.completenessPercentage} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {/* Mobile: Horizontal scrolling tabs */}
                <div className="lg:hidden">
                  <div className="flex overflow-x-auto space-x-1 p-4 pb-0">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                            activeTab === tab.id
                              ? 'bg-brand-primary text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop: Vertical navigation */}
                <nav className="hidden lg:block space-y-1 p-4">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <ProfileHeader 
                profile={profile} 
                userType={userType} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Personal Data Tab */}
            {activeTab === 'personal' && (
              <PersonalDataSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Contact Data Tab */}
            {activeTab === 'contact' && (
              <ContactDataSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Contract Data Tab */}
            {activeTab === 'contract' && (
              <ContractDataSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Vehicle Tab (Driver only) */}
            {activeTab === 'vehicle' && userType === 'driver' && (
              <VehicleSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Verification Tab */}
            {activeTab === 'verification' && (
              <IdentityVerificationSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <NotificationsSection 
                profile={profile} 
                userType={userType}
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <PrivacySecuritySection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Payments & Billing Tab */}
            {activeTab === 'payments' && (
              <PaymentsBillingSection 
                profile={profile} 
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}

            {/* Data & Account Tab */}
            {activeTab === 'data' && (
              <DataAccountSection 
                profile={profile} 
                onNavigate={onNavigate}
                onUpdate={setProfile}
                onUnsavedChanges={handleUnsavedChanges}
              />
            )}
          </div>
        </main>
      </div>

      {/* Unsaved Changes Dialog */}
      {showUnsavedDialog && (
        <UnsavedChangesDialog
          onSave={handleSaveChanges}
          onDiscard={handleDiscardChanges}
          onCancel={() => {
            setShowUnsavedDialog(false);
            setPendingNavigation(null);
          }}
        />
      )}
    </div>
  );
}