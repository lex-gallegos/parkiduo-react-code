import image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90 from 'figma:asset/82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90.png';
import image_c4bb859071ea1e784dcaf0102559fc75995c0ef0 from 'figma:asset/c4bb859071ea1e784dcaf0102559fc75995c0ef0.png';
import image_af6598debc61d56bb4c06bf98a6e360231169767 from 'figma:asset/af6598debc61d56bb4c06bf98a6e360231169767.png';
import exampleImage from 'figma:asset/45902a6510c0e6a7f0dfbc3664064e09c69c851b.png';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Eye,
  MessageCircle,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  User,
  Star,
  Zap,
  Phone,
  Mail,
  Settings,
  Filter,
  X,
  Car,
  Crown,
  Sparkles,
  Heart,
  Share2,
  Grid3X3,
  List
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParkingCard } from './parking-card';

interface DriverDashboardProps {
  onNavigate: (page: string) => void;
  onPriorityUpgrade?: () => void;
}

export function DriverDashboard({ onNavigate, onPriorityUpgrade }: DriverDashboardProps) {
  const [activeTab, setActiveTab] = useState('searches');
  const [isPriorityUser, setIsPriorityUser] = useState(false); // Mock state - should come from user data
  const [priorityPlan, setPriorityPlan] = useState<'trial' | 'monthly' | 'quarterly' | null>(null); // Mock state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchFilters, setSearchFilters] = useState({
    status: 'all',
    location: '',
    dateRange: 'all'
  });
  const [requestFilters, setRequestFilters] = useState({
    status: 'all',
    dateRange: 'all',
    priceRange: 'all'
  });

  // Mock parking data based on the example design
  const parkingResults = [
    {
      id: '1',
      title: 'Alquiler de Garaje en Correr dels Tarongers 15',
      address: 'Correr dels Tarongers 15, Valencia',
      price: 85,
      images: [
        exampleImage,
        image_af6598debc61d56bb4c06bf98a6e360231169767,
        image_c4bb859071ea1e784dcaf0102559fc75995c0ef0
      ],
      schedule: 'L→V 8h→20h',
      size: 'Grande',
      floor: 'Sótano -2',
      availableFrom: 'Indefinido',
      rating: 4.8,
      reviewCount: 12,
      owner: {
        name: 'Sandra',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      features: ['Acceso 24h', 'Plaza cubierta', 'Seguridad'],
      location: {
        lat: 39.4699,
        lng: -0.3763,
        neighborhood: 'Correr dels Tarongers'
      },
      distance: '0,6 km',
      isPriority: false,
      isLiked: false
    },
    {
      id: '2',
      title: 'Plaza de Garaje en Centro Madrid',
      address: 'Calle Gran Vía 42, Madrid',
      price: 120,
      images: [
        image_c4bb859071ea1e784dcaf0102559fc75995c0ef0,
        exampleImage,
        image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90
      ],
      schedule: '24h',
      size: 'Mediano',
      floor: 'Planta -1',
      availableFrom: 'Inmediato',
      rating: 4.9,
      reviewCount: 25,
      owner: {
        name: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        verified: true
      },
      features: ['24h', 'Centro ciudad', 'Fácil acceso'],
      location: {
        lat: 40.4168,
        lng: -3.7038,
        neighborhood: 'Centro'
      },
      distance: '1.2 km',
      isPriority: true,
      isLiked: true
    },
    {
      id: '3',
      title: 'Garaje Cubierto Salamanca',
      address: 'Calle Serrano 88, Madrid',
      price: 95,
      images: [
        image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90,
        image_af6598debc61d56bb4c06bf98a6e360231169767,
        exampleImage
      ],
      schedule: 'L→V 7h→22h',
      size: 'Grande',
      floor: 'Sótano -3',
      availableFrom: '1 Feb 2024',
      rating: 4.7,
      reviewCount: 8,
      owner: {
        name: 'Ana Martín',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        verified: false
      },
      features: ['Plaza cubierta', 'Seguridad', 'Ascensor'],
      location: {
        lat: 40.4259,
        lng: -3.6866,
        neighborhood: 'Salamanca'
      },
      distance: '2.1 km',
      isPriority: false,
      isLiked: false
    }
  ];

  // Parking card handlers
  const handleRequestVisit = (garageId: string) => {
    // Mock request visit functionality
    console.log(`Requesting visit for garage ${garageId}`);
    // In real app, this would send a request to the owner
  };

  const handleContact = (garageId: string) => {
    // Mock contact functionality
    console.log(`Contacting owner of garage ${garageId}`);
    // In real app, this would open a chat or contact modal
  };

  const handleToggleLike = (garageId: string) => {
    // Mock toggle like functionality
    console.log(`Toggling like for garage ${garageId}`);
    // In real app, this would update the user's favorites
  };

  const handleShare = (garageId: string) => {
    // Mock share functionality
    console.log(`Sharing garage ${garageId}`);
    // In real app, this would open a share modal or copy link
  };

  const handleViewDetails = (garageId: string) => {
    // Mock view details functionality
    console.log(`Viewing details for garage ${garageId}`);
    // In real app, this would navigate to a detailed view
  };

  const searches = [
    {
      id: 1,
      location: 'Centro Madrid',
      radius: 2,
      schedule: '24h',
      budget: 80,
      status: 'active',
      matches: 3,
      created: '2024-01-15'
    },
    {
      id: 2,
      location: 'Salamanca',
      radius: 1.5,
      schedule: 'Diurno',
      budget: 100,
      status: 'paused',
      matches: 1,
      created: '2024-01-10'
    }
  ];

  const requests = [
    {
      id: 1,
      garage: {
        address: 'Calle Alcalá 42, Madrid',
        owner: 'María González',
        ownerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=64&h=64&fit=crop&crop=face',
        price: 85,
        type: '24h',
        rating: 4.8,
        image: image_af6598debc61d56bb4c06bf98a6e360231169767
      },
      status: 'approved',
      requestDate: '2024-01-16',
      visitDate: '2024-01-18 18:00',
      ownerContact: '+34 666 123 456'
    },
    {
      id: 2,
      garage: {
        address: 'Gran Vía 28, Madrid',
        owner: 'Carlos Ruiz',
        ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        price: 90,
        type: '24h',
        rating: 4.9,
        image: image_c4bb859071ea1e784dcaf0102559fc75995c0ef0
      },
      status: 'pending',
      requestDate: '2024-01-17',
      visitDate: null,
      ownerContact: null
    },
    {
      id: 3,
      garage: {
        address: 'Calle Serrano 15, Madrid',
        owner: 'Ana Martín',
        ownerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        price: 95,
        type: 'Diurno',
        rating: 4.7,
        image: image_82db8a3f2b5c9f1e717c65fac7eee51e1c2efb90
      },
      status: 'visited',
      requestDate: '2024-01-12',
      visitDate: '2024-01-15 17:00',
      ownerContact: '+34 666 789 012'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Aprobada</Badge>;
      case 'visited':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Visitado</Badge>;
      case 'matched':
        return <Badge className="bg-semantic-success/10 text-semantic-success border-green-200">Match!</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rechazada</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getSearchStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-semantic-success/10 text-semantic-success border-green-200">Activa</Badge>;
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-600 border-gray-200">Pausada</Badge>;
      default:
        return <Badge variant="outline">Inactiva</Badge>;
    }
  };

  const filteredSearches = searches.filter(search => {
    if (searchFilters.status !== 'all' && search.status !== searchFilters.status) return false;
    if (searchFilters.location && !search.location.toLowerCase().includes(searchFilters.location.toLowerCase())) return false;
    return true;
  });

  const filteredRequests = requests.filter(request => {
    if (requestFilters.status !== 'all' && request.status !== requestFilters.status) return false;
    return true;
  });

  const clearSearchFilters = () => {
    setSearchFilters({ status: 'all', location: '', dateRange: 'all' });
  };

  const clearRequestFilters = () => {
    setRequestFilters({ status: 'all', dateRange: 'all', priceRange: 'all' });
  };

  const hasActiveSearchFilters = searchFilters.status !== 'all' || searchFilters.location !== '' || searchFilters.dateRange !== 'all';
  const hasActiveRequestFilters = requestFilters.status !== 'all' || requestFilters.dateRange !== 'all' || requestFilters.priceRange !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full border border-brand-primary/20">
                  <Car className="h-4 w-4" />
                  <span className="text-sm font-medium">Driver</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900">
                  Mi Dashboard
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Gestiona tus búsquedas y solicitudes de garaje
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => onNavigate('driver-onboarding')}
                size="lg"
                className="bg-brand-primary hover:bg-blue-600 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Nueva búsqueda
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('profile')}
              >
                <User className="mr-2 h-5 w-5" />
                Mi perfil
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-brand-primary mb-1">2</div>
              <div className="text-sm text-gray-600">Búsquedas activas</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-semantic-success mb-1">4</div>
              <div className="text-sm text-gray-600">Matches totales</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Visita pendiente</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Visitado</div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Status / Upgrade Section */}
        {!isPriorityUser ? (
          /* Upgrade Banner for non-priority users */
          <Card className="border-brand-primary/30 bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            <CardContent className="p-6 relative">
              <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900">
                        Consigue garaje 3x más rápido
                      </h3>
                      <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/30 text-xs px-2 py-1">
                        Más popular
                      </Badge>
                    </div>
                    <p className="text-gray-600 max-w-2xl">
                      Accede a nuevas plazas <strong>24 horas antes</strong> que otros conductores, recibe notificaciones instantáneas y aumenta tus posibilidades de éxito.
                    </p>
                    
                    {/* Benefits mini-list */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Eye className="h-4 w-4 text-brand-primary" />
                        <span>Vista prioritaria</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Sparkles className="h-4 w-4 text-brand-secondary" />
                        <span>Notificaciones 24h antes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Crown className="h-4 w-4 text-semantic-warn" />
                        <span>Soporte prioritario</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row xl:flex-col gap-3 xl:w-auto">
                  <div className="text-center xl:text-right">
                    <div className="text-sm text-gray-500 line-through">Antes: 29,95€/mes</div>
                    <div className="text-2xl font-bold text-brand-primary">15€/mes</div>
                    <div className="text-xs text-semantic-success font-medium">Ahorra un 50%</div>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[200px]"
                    onClick={onPriorityUpgrade}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Activar Prioridad
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Priority Status Card for active users */
          <Card className="border-semantic-success/30 bg-gradient-to-r from-semantic-success/5 to-semantic-success/10 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-semantic-success/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Crown className="h-6 w-6 text-semantic-success" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-poppins font-semibold text-gray-900">
                        ¡Prioridad activa!
                      </h3>
                      <Badge className="bg-semantic-success text-white text-xs px-2 py-1">
                        {priorityPlan === 'trial' ? 'Prueba' : priorityPlan === 'monthly' ? 'Mensual' : 'Trimestral'}
                      </Badge>
                    </div>
                    <p className="text-gray-600">
                      Tienes acceso prioritario a nuevas plazas. Tu plan se renueva automáticamente.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-semantic-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>24h acceso anticipado</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-semantic-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>Notificaciones instantáneas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-semantic-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>Soporte prioritario</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('profile')}
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Gestionar plan
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-brand-primary hover:bg-blue-600 text-white"
                    onClick={() => onNavigate('explore-garages')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver plazas prioritarias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
            <TabsTrigger value="searches" className="flex items-center gap-2 text-base">
              <Search className="h-4 w-4" />
              Mis búsquedas
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2 text-base">
              <MessageCircle className="h-4 w-4" />
              Mis solicitudes
            </TabsTrigger>
          </TabsList>

          {/* Searches Tab */}
          <TabsContent value="searches" className="space-y-6">
            {/* Search Filters */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtros de búsqueda
                  </CardTitle>
                  {hasActiveSearchFilters && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearSearchFilters}
                      className="self-start sm:self-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <Select 
                      value={searchFilters.status} 
                      onValueChange={(value) => setSearchFilters(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="active">Activas</SelectItem>
                        <SelectItem value="paused">Pausadas</SelectItem>
                        <SelectItem value="inactive">Inactivas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ubicación</label>
                    <Input
                      placeholder="Buscar por ubicación..."
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Fecha</label>
                    <Select 
                      value={searchFilters.dateRange} 
                      onValueChange={(value) => setSearchFilters(prev => ({ ...prev, dateRange: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las fechas</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mes</SelectItem>
                        <SelectItem value="3months">Últimos 3 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveSearchFilters && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {searchFilters.status !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Estado: {searchFilters.status}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSearchFilters(prev => ({ ...prev, status: 'all' }))}
                        />
                      </Badge>
                    )}
                    {searchFilters.location && (
                      <Badge variant="secondary" className="gap-1">
                        Ubicación: {searchFilters.location}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSearchFilters(prev => ({ ...prev, location: '' }))}
                        />
                      </Badge>
                    )}
                    {searchFilters.dateRange !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Fecha: {searchFilters.dateRange}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSearchFilters(prev => ({ ...prev, dateRange: 'all' }))}
                        />
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="space-y-6">
              {filteredSearches.map((search) => (
                <Card key={search.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Búsqueda en {search.location}
                          </h3>
                          <Badge className="bg-semantic-success/10 text-semantic-success border-green-200">{getSearchStatusBadge(search.status)}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{search.radius} km</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{search.schedule}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">Hasta {search.budget}€</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{search.matches} matches</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">
                              Tienes 3 garajes compatibles disponibles
                            </span>
                          </div>
                          <Button size="sm" variant="link" className="text-blue-600 p-0 h-auto">
                            Ver resultados →
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-auto">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          Editar
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          Pausar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Parking Results Section */}
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Garajes disponibles ({parkingResults.length})
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                        >
                          <Grid3X3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parkingResults.map((parking) => (
                          <ParkingCard
                            key={parking.id}
                            data={parking}
                            onRequestVisit={handleRequestVisit}
                            onContact={handleContact}
                            onToggleLike={handleToggleLike}
                            onShare={handleShare}
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {parkingResults.map((parking) => (
                          <ParkingCard
                            key={parking.id}
                            data={parking}
                            onRequestVisit={handleRequestVisit}
                            onContact={handleContact}
                            onToggleLike={handleToggleLike}
                            onShare={handleShare}
                            onViewDetails={handleViewDetails}
                            compact={true}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {filteredSearches.length === 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {hasActiveSearchFilters ? 'No se encontraron búsquedas' : 'No tienes búsquedas activas'}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {hasActiveSearchFilters 
                        ? 'Intenta cambiar los filtros para ver más resultados'
                        : 'Crea tu primera búsqueda para encontrar el garaje perfecto'
                      }
                    </p>
                    {!hasActiveSearchFilters && (
                      <Button 
                        onClick={() => onNavigate('driver-onboarding')}
                        size="lg"
                        className="bg-brand-primary hover:bg-blue-600 text-white"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Nueva búsqueda
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Request Filters */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtros de solicitudes
                  </CardTitle>
                  {hasActiveRequestFilters && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearRequestFilters}
                      className="self-start sm:self-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <Select 
                      value={requestFilters.status} 
                      onValueChange={(value) => setRequestFilters(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="approved">Aprobadas</SelectItem>
                        <SelectItem value="visited">Visitados</SelectItem>
                        <SelectItem value="rejected">Rechazadas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Fecha</label>
                    <Select 
                      value={requestFilters.dateRange} 
                      onValueChange={(value) => setRequestFilters(prev => ({ ...prev, dateRange: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las fechas</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mes</SelectItem>
                        <SelectItem value="3months">Últimos 3 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Precio</label>
                    <Select 
                      value={requestFilters.priceRange} 
                      onValueChange={(value) => setRequestFilters(prev => ({ ...prev, priceRange: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los precios</SelectItem>
                        <SelectItem value="0-50">0€ - 50€</SelectItem>
                        <SelectItem value="50-100">50€ - 100€</SelectItem>
                        <SelectItem value="100+">100€+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveRequestFilters && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {requestFilters.status !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Estado: {requestFilters.status}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setRequestFilters(prev => ({ ...prev, status: 'all' }))}
                        />
                      </Badge>
                    )}
                    {requestFilters.dateRange !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Fecha: {requestFilters.dateRange}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setRequestFilters(prev => ({ ...prev, dateRange: 'all' }))}
                        />
                      </Badge>
                    )}
                    {requestFilters.priceRange !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Precio: {requestFilters.priceRange}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setRequestFilters(prev => ({ ...prev, priceRange: 'all' }))}
                        />
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request Results */}
            <div className="space-y-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Garage Image */}
                      <div className="w-full lg:w-64 flex-shrink-0">
                        <ImageWithFallback
                          src={request.garage.image}
                          alt={`Garaje en ${request.garage.address}`}
                          className="w-full h-48 lg:h-40 object-cover rounded-lg"
                          width={256}
                          height={160}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {request.garage.address}
                            </h3>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span className="font-medium">{request.garage.price}€/mes</span>
                              <span>•</span>
                              <span>{request.garage.type}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                <span>{request.garage.rating}</span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        {/* Owner Info */}
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={request.garage.ownerAvatar} alt={request.garage.owner} />
                            <AvatarFallback>{request.garage.owner.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900">
                            {request.garage.owner}
                          </span>
                        </div>

                        {/* Status specific content */}
                        {request.status === 'pending' && (
                          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-900">
                                Esperando respuesta del propietario
                              </span>
                            </div>
                            <p className="text-xs text-yellow-700">
                              Solicitud enviada el {new Date(request.requestDate).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        )}

                        {request.status === 'approved' && (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex items-center space-x-2 mb-3">
                              <CheckCircle className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-900">
                                ¡Solicitud aprobada!
                              </span>
                            </div>
                            <div className="space-y-2 text-sm mb-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-800">
                                  Visita: {new Date(request.visitDate!).toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-800">{request.ownerContact}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button size="sm" variant="outline">
                                <MessageCircle className="mr-1 h-3 w-3" />
                                Contactar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="mr-1 h-3 w-3" />
                                Reagendar
                              </Button>
                            </div>
                          </div>
                        )}

                        {request.status === 'visited' && (
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center space-x-2 mb-2">
                              <CheckCircle className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-900">
                                Visita realizada
                              </span>
                            </div>
                            <p className="text-xs text-purple-700 mb-4">
                              Visitado el {new Date(request.visitDate!).toLocaleDateString('es-ES')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                size="sm" 
                                className="bg-semantic-success hover:bg-green-600 text-white"
                                onClick={() => onNavigate('contract-wizard')}
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Me interesa - Generar contrato
                              </Button>
                              <Button size="sm" variant="outline">
                                <XCircle className="mr-1 h-3 w-3" />
                                No me convence
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredRequests.length === 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {hasActiveRequestFilters ? 'No se encontraron solicitudes' : 'No tienes solicitudes'}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {hasActiveRequestFilters 
                        ? 'Intenta cambiar los filtros para ver más resultados'
                        : 'Las solicitudes aparecerán aquí cuando envíes peticiones de visita'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}