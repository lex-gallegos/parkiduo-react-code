import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  MapPin, 
  Euro, 
  Clock, 
  Eye, 
  Calendar,
  Users,
  TrendingUp,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Edit3,
  Pause,
  Play,
  Trash2,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface MyGaragesPageProps {
  onNavigate: (page: string, options?: any) => void;
  action?: string;
}

interface Garage {
  id: string;
  title: string;
  address: string;
  district: string;
  price: number;
  status: 'active' | 'paused' | 'draft';
  views: number;
  requests: number;
  rating: number;
  images: string[];
  features: string[];
  description: string;
  availability: {
    type: 'always' | 'schedule';
    schedule?: { start: string; end: string }[];
  };
  createdAt: string;
  lastUpdated: string;
  metrics: {
    totalViews: number;
    totalRequests: number;
    conversionRate: number;
    avgResponseTime: string;
  };
}

const mockGarages: Garage[] = [
  {
    id: '1',
    title: 'Plaza céntrica con fácil acceso',
    address: 'Calle Explanada, 15',
    district: 'Centro',
    price: 95,
    status: 'active',
    views: 142,
    requests: 8,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80'],
    features: ['Cubierto', 'Acceso 24h', 'Vigilancia'],
    description: 'Plaza de garaje en zona céntrica, muy cómoda para aparcar.',
    availability: {
      type: 'always'
    },
    createdAt: '2024-02-15',
    lastUpdated: '2024-02-20',
    metrics: {
      totalViews: 456,
      totalRequests: 23,
      conversionRate: 5.0,
      avgResponseTime: '2h 30m'
    }
  },
  {
    id: '2',
    title: 'Garaje espacioso en Ensanche',
    address: 'Avenida Alfonso X el Sabio, 45',
    district: 'Ensanche-Diputación',
    price: 78,
    status: 'active',
    views: 89,
    requests: 5,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&q=80'],
    features: ['Cubierto', 'Fácil acceso'],
    description: 'Plaza amplia ideal para vehículos grandes.',
    availability: {
      type: 'schedule',
      schedule: [
        { start: '08:00', end: '20:00' }
      ]
    },
    createdAt: '2024-01-20',
    lastUpdated: '2024-02-18',
    metrics: {
      totalViews: 234,
      totalRequests: 12,
      conversionRate: 5.1,
      avgResponseTime: '1h 45m'
    }
  },
  {
    id: '3',
    title: 'Plaza en zona residencial',
    address: 'Calle Benalúa, 78',
    district: 'Benalúa',
    price: 65,
    status: 'paused',
    views: 23,
    requests: 1,
    rating: 0,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
    features: ['Descubierto', 'Zona tranquila'],
    description: 'Plaza en zona residencial muy tranquila.',
    availability: {
      type: 'always'
    },
    createdAt: '2024-02-01',
    lastUpdated: '2024-02-10',
    metrics: {
      totalViews: 78,
      totalRequests: 3,
      conversionRate: 3.8,
      avgResponseTime: '4h 15m'
    }
  }
];

export function MyGaragesPage({ onNavigate, action }: MyGaragesPageProps) {
  const [garages, setGarages] = useState<Garage[]>(mockGarages);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('updated');

  // Handle create action from navigation
  useEffect(() => {
    if (action === 'create') {
      // Automatically trigger the create garage flow
      handleCreateGarage();
    }
  }, [action]);

  const filteredGarages = garages.filter(garage => {
    const matchesSearch = garage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         garage.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         garage.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || garage.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'views':
        return b.views - a.views;
      case 'requests':
        return b.requests - a.requests;
      case 'price':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const stats = {
    total: garages.length,
    active: garages.filter(g => g.status === 'active').length,
    paused: garages.filter(g => g.status === 'paused').length,
    draft: garages.filter(g => g.status === 'draft').length,
    totalViews: garages.reduce((sum, g) => sum + g.views, 0),
    totalRequests: garages.reduce((sum, g) => sum + g.requests, 0),
    avgPrice: Math.round(garages.reduce((sum, g) => sum + g.price, 0) / garages.length)
  };

  const handleStatusChange = (garageId: string, newStatus: 'active' | 'paused') => {
    setGarages(prev => prev.map(garage => 
      garage.id === garageId 
        ? { ...garage, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
        : garage
    ));
    
    const statusText = newStatus === 'active' ? 'activado' : 'pausado';
    toast.success(`Garaje ${statusText} correctamente`);
  };

  const handleDeleteGarage = (garageId: string) => {
    setGarages(prev => prev.filter(g => g.id !== garageId));
    toast.success('Garaje eliminado correctamente');
  };

  const handleCreateGarage = () => {
    // Navigate to Parker Onboarding for creating a new garage
    onNavigate('parker-onboarding');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-semantic-success text-white border-semantic-success';
      case 'paused':
        return 'bg-semantic-warn text-white border-semantic-warn';
      case 'draft':
        return 'bg-gray-500 text-white border-gray-500';
      default:
        return 'bg-gray-300 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'paused':
        return 'Pausado';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
                Mis garajes
              </h1>
              <p className="text-gray-600">
                Gestiona tus plazas de garaje y solicitudes
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate('parker-dashboard')}
                className="btn-md"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={handleCreateGarage}
                className="btn-primary btn-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Añadir garaje
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total garajes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visualizaciones</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-brand-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Solicitudes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                  </div>
                  <div className="w-10 h-10 bg-semantic-success/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-semantic-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Precio medio</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgPrice}€</p>
                  </div>
                  <div className="w-10 h-10 bg-semantic-warn/10 rounded-lg flex items-center justify-center">
                    <Euro className="w-5 h-5 text-semantic-warn" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por título, dirección o distrito..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="paused">Pausados</SelectItem>
                  <SelectItem value="draft">Borradores</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updated">Última actualización</SelectItem>
                  <SelectItem value="views">Más visualizaciones</SelectItem>
                  <SelectItem value="requests">Más solicitudes</SelectItem>
                  <SelectItem value="price">Precio más alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Garages List */}
        <div className="space-y-4">
          {filteredGarages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'No se encontraron garajes' : 'Aún no tienes garajes'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'Publica tu primer garaje y empieza a ganar dinero'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button
                    onClick={handleCreateGarage}
                    className="btn-primary btn-md"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar garaje
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredGarages.map((garage) => (
              <Card key={garage.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full lg:w-48 h-32 lg:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={garage.images[0]}
                        alt={garage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-poppins text-lg font-semibold text-gray-900 truncate">
                              {garage.title}
                            </h3>
                            <Badge className={getStatusColor(garage.status)}>
                              {getStatusText(garage.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="text-sm truncate">{garage.address}, {garage.district}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Euro className="w-4 h-4 mr-1" />
                              {garage.price}€/mes
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {garage.views} vistas
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {garage.requests} solicitudes
                            </span>
                            {garage.rating > 0 && (
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {garage.rating}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigate('parker-onboarding', { mode: 'edit', garageId: garage.id })}
                            className="btn-sm"
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            Editar
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="btn-sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => onNavigate('received-requests', { garageId: garage.id })}
                              >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ver solicitudes
                              </DropdownMenuItem>
                              
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(garage.id, garage.status === 'active' ? 'paused' : 'active')}
                              >
                                {garage.status === 'active' ? (
                                  <>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pausar
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Activar
                                  </>
                                )}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => onNavigate('garage-analytics', { garageId: garage.id })}
                              >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Ver estadísticas
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-semantic-danger focus:text-semantic-danger"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>¿Eliminar garaje?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción no se puede deshacer. Se eliminarán permanentemente 
                                      el garaje y todas sus solicitudes asociadas.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteGarage(garage.id)}
                                      className="btn-danger"
                                    >
                                      Eliminar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {garage.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{garage.metrics.totalViews}</p>
                          <p className="text-xs text-gray-500">Vistas totales</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{garage.metrics.conversionRate}%</p>
                          <p className="text-xs text-gray-500">Conversión</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{garage.metrics.avgResponseTime}</p>
                          <p className="text-xs text-gray-500">Respuesta media</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-500">
                            {new Date(garage.lastUpdated).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">Última actualización</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}