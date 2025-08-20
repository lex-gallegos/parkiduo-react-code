import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { 
  Home, 
  Plus,
  MessageCircle,
  User,
  Filter,
  X,
  Car,
  MapPin,
  Clock,
  DollarSign,
  Eye
} from 'lucide-react';
import { GarageCard } from './parker/garage-card';
import { RequestCard } from './parker/request-card';
import { mockGarages, mockRequests } from './constants/parker-data';
import { 
  calculateTotalViews, 
  countPendingRequests, 
  countVisitedRequests 
} from './utils/parker-utils';

interface ParkerDashboardProps {
  onNavigate: (page: string) => void;
}

export function ParkerDashboard({ onNavigate }: ParkerDashboardProps) {
  const [activeTab, setActiveTab] = useState('garages');
  const [garageFilters, setGarageFilters] = useState({
    status: 'all',
    type: 'all',
    location: '',
    priceRange: 'all'
  });
  const [requestFilters, setRequestFilters] = useState({
    status: 'all',
    dateRange: 'all',
    garage: 'all'
  });

  const garages = mockGarages;
  const requests = mockRequests;

  const approveRequest = (requestId: number) => {
    console.log('Approving request:', requestId);
    // In real app, update state and API
  };

  const rejectRequest = (requestId: number) => {
    console.log('Rejecting request:', requestId);
    // In real app, update state and API
  };

  const generateContract = (requestId: number) => {
    onNavigate('contract-wizard');
  };

  const filteredGarages = garages.filter(garage => {
    if (garageFilters.status !== 'all' && garage.status !== garageFilters.status) return false;
    if (garageFilters.type !== 'all' && garage.type !== garageFilters.type) return false;
    if (garageFilters.location && !garage.address.toLowerCase().includes(garageFilters.location.toLowerCase())) return false;
    if (garageFilters.priceRange !== 'all') {
      const price = garage.price;
      switch (garageFilters.priceRange) {
        case '0-50':
          if (price > 50) return false;
          break;
        case '50-100':
          if (price <= 50 || price > 100) return false;
          break;
        case '100+':
          if (price <= 100) return false;
          break;
      }
    }
    return true;
  });

  const filteredRequests = requests.filter(request => {
    if (requestFilters.status !== 'all' && request.status !== requestFilters.status) return false;
    if (requestFilters.garage !== 'all' && request.garageId.toString() !== requestFilters.garage) return false;
    return true;
  });

  const clearGarageFilters = () => {
    setGarageFilters({ status: 'all', type: 'all', location: '', priceRange: 'all' });
  };

  const clearRequestFilters = () => {
    setRequestFilters({ status: 'all', dateRange: 'all', garage: 'all' });
  };

  const hasActiveGarageFilters = garageFilters.status !== 'all' || garageFilters.type !== 'all' || garageFilters.location !== '' || garageFilters.priceRange !== 'all';
  const hasActiveRequestFilters = requestFilters.status !== 'all' || requestFilters.dateRange !== 'all' || requestFilters.garage !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full border border-brand-secondary/20">
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium">Parker</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900">
                  Mis Garajes
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Gestiona tus anuncios y solicitudes de alquiler
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => onNavigate('parker-onboarding')}
                size="lg"
                className="bg-brand-primary hover:bg-blue-600 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Publicar garaje
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
              <div className="text-3xl font-bold text-brand-primary mb-1">{garages.length}</div>
              <div className="text-sm text-gray-600">Garajes activos</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-semantic-success mb-1">
                {countPendingRequests(requests)}
              </div>
              <div className="text-sm text-gray-600">Solicitudes pendientes</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {calculateTotalViews(garages)}
              </div>
              <div className="text-sm text-gray-600">Visualizaciones</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {countVisitedRequests(requests)}
              </div>
              <div className="text-sm text-gray-600">Visitas realizadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
            <TabsTrigger value="garages" className="flex items-center gap-2 text-base">
              <Home className="h-4 w-4" />
              Mis garajes
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2 text-base">
              <MessageCircle className="h-4 w-4" />
              Solicitudes ({countPendingRequests(requests)})
            </TabsTrigger>
          </TabsList>

          {/* Garages Tab */}
          <TabsContent value="garages" className="space-y-6">
            {/* Garage Filters */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtros de garajes
                  </CardTitle>
                  {hasActiveGarageFilters && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearGarageFilters}
                      className="self-start sm:self-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <Select 
                      value={garageFilters.status} 
                      onValueChange={(value) => setGarageFilters(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="active">Activos</SelectItem>
                        <SelectItem value="paused">Pausados</SelectItem>
                        <SelectItem value="inactive">Inactivos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tipo</label>
                    <Select 
                      value={garageFilters.type} 
                      onValueChange={(value) => setGarageFilters(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="24h">24 horas</SelectItem>
                        <SelectItem value="Diurno">Diurno</SelectItem>
                        <SelectItem value="Nocturno">Nocturno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ubicación</label>
                    <Input
                      placeholder="Buscar por ubicación..."
                      value={garageFilters.location}
                      onChange={(e) => setGarageFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Precio</label>
                    <Select 
                      value={garageFilters.priceRange} 
                      onValueChange={(value) => setGarageFilters(prev => ({ ...prev, priceRange: value }))}
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
                {hasActiveGarageFilters && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {garageFilters.status !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Estado: {garageFilters.status}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setGarageFilters(prev => ({ ...prev, status: 'all' }))}
                        />
                      </Badge>
                    )}
                    {garageFilters.type !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Tipo: {garageFilters.type}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setGarageFilters(prev => ({ ...prev, type: 'all' }))}
                        />
                      </Badge>
                    )}
                    {garageFilters.location && (
                      <Badge variant="secondary" className="gap-1">
                        Ubicación: {garageFilters.location}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setGarageFilters(prev => ({ ...prev, location: '' }))}
                        />
                      </Badge>
                    )}
                    {garageFilters.priceRange !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Precio: {garageFilters.priceRange}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setGarageFilters(prev => ({ ...prev, priceRange: 'all' }))}
                        />
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Garage Results */}
            <div className="space-y-6">
              {filteredGarages.map((garage) => (
                <GarageCard 
                  key={garage.id} 
                  garage={garage}
                  onRequestsClick={() => setActiveTab('requests')}
                />
              ))}

              {filteredGarages.length === 0 && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {hasActiveGarageFilters ? 'No se encontraron garajes' : 'No tienes garajes publicados'}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {hasActiveGarageFilters 
                        ? 'Intenta cambiar los filtros para ver más resultados'
                        : 'Publica tu primer garaje y empieza a generar ingresos extra'
                      }
                    </p>
                    {!hasActiveGarageFilters && (
                      <Button 
                        onClick={() => onNavigate('parker-onboarding')}
                        size="lg"
                        className="bg-brand-primary hover:bg-blue-600 text-white"
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Publicar garaje
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
                        <SelectItem value="visited">Visitadas</SelectItem>
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
                    <label className="text-sm font-medium text-gray-700">Garaje</label>
                    <Select 
                      value={requestFilters.garage} 
                      onValueChange={(value) => setRequestFilters(prev => ({ ...prev, garage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los garajes</SelectItem>
                        {garages.map((garage) => (
                          <SelectItem key={garage.id} value={garage.id.toString()}>
                            {garage.address.substring(0, 30)}...
                          </SelectItem>
                        ))}
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
                    {requestFilters.garage !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Garaje específico
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setRequestFilters(prev => ({ ...prev, garage: 'all' }))}
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
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={approveRequest}
                  onReject={rejectRequest}
                  onGenerateContract={generateContract}
                />
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
                        : 'Las solicitudes aparecerán aquí cuando los conductores se interesen por tus garajes'
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