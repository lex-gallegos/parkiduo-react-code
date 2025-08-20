import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  MapPin, 
  Euro, 
  Clock, 
  Bell,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  Search,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Textarea } from '../ui/textarea';

interface MySearchesPageProps {
  onNavigate: (page: string, options?: any) => void;
}

interface SearchAlert {
  id: string;
  name: string;
  zones: string[];
  maxPrice: number;
  minPrice: number;
  schedule: {
    type: 'always' | 'specific';
    times?: { start: string; end: string; days: string[] }[];
  };
  features: string[];
  urgency: 'low' | 'medium' | 'high';
  status: 'active' | 'paused';
  priority24h: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  createdAt: string;
  lastMatch: string | null;
  stats: {
    totalMatches: number;
    emailsSent: number;
    responseRate: number;
  };
}

const mockSearches: SearchAlert[] = [
  {
    id: '1',
    name: 'Garaje centro Alicante',
    zones: ['Centro', 'Ensanche-Diputación'],
    maxPrice: 100,
    minPrice: 70,
    schedule: {
      type: 'always'
    },
    features: ['Cubierto', 'Acceso 24h'],
    urgency: 'high',
    status: 'active',
    priority24h: true,
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    createdAt: '2024-02-15',
    lastMatch: '2024-02-20',
    stats: {
      totalMatches: 8,
      emailsSent: 3,
      responseRate: 37.5
    }
  },
  {
    id: '2',
    name: 'Plaza cerca universidad',
    zones: ['Benalúa', 'San Blas'],
    maxPrice: 80,
    minPrice: 50,
    schedule: {
      type: 'specific',
      times: [
        { start: '08:00', end: '20:00', days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] }
      ]
    },
    features: ['Fácil acceso'],
    urgency: 'medium',
    status: 'active',
    priority24h: false,
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    createdAt: '2024-02-10',
    lastMatch: null,
    stats: {
      totalMatches: 2,
      emailsSent: 1,
      responseRate: 50.0
    }
  },
  {
    id: '3',
    name: 'Garaje económico',
    zones: ['Carolinas Bajas', 'Playa San Juan'],
    maxPrice: 70,
    minPrice: 40,
    schedule: {
      type: 'always'
    },
    features: [],
    urgency: 'low',
    status: 'paused',
    priority24h: false,
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    createdAt: '2024-01-25',
    lastMatch: '2024-02-05',
    stats: {
      totalMatches: 5,
      emailsSent: 2,
      responseRate: 40.0
    }
  }
];

export function MySearchesPage({ onNavigate }: MySearchesPageProps) {
  const [searches, setSearches] = useState<SearchAlert[]>(mockSearches);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSearch, setEditingSearch] = useState<SearchAlert | null>(null);
  const [newSearch, setNewSearch] = useState<Partial<SearchAlert>>({
    name: '',
    zones: [],
    maxPrice: 100,
    minPrice: 50,
    schedule: { type: 'always' },
    features: [],
    urgency: 'medium',
    priority24h: false,
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const zones = [
    'Centro', 'Ensanche-Diputación', 'Benalúa', 'Carolinas Bajas', 
    'Playa San Juan', 'San Blas', 'Babel', 'Polígono Industrial'
  ];

  const features = [
    'Cubierto', 'Descubierto', 'Acceso 24h', 'Vigilancia', 'Fácil acceso', 
    'Cerca transporte', 'Plaza grande', 'Zona segura'
  ];

  const stats = {
    total: searches.length,
    active: searches.filter(s => s.status === 'active').length,
    paused: searches.filter(s => s.status === 'paused').length,
    totalMatches: searches.reduce((sum, s) => sum + s.stats.totalMatches, 0),
    avgResponseRate: searches.reduce((sum, s) => sum + s.stats.responseRate, 0) / searches.length || 0
  };

  const handleToggleStatus = (searchId: string) => {
    setSearches(prev => prev.map(search => 
      search.id === searchId 
        ? { ...search, status: search.status === 'active' ? 'paused' : 'active' }
        : search
    ));
    
    const search = searches.find(s => s.id === searchId);
    const newStatus = search?.status === 'active' ? 'pausada' : 'activada';
    toast.success(`Búsqueda ${newStatus} correctamente`);
  };

  const handleDeleteSearch = (searchId: string) => {
    setSearches(prev => prev.filter(s => s.id !== searchId));
    toast.success('Búsqueda eliminada correctamente');
  };

  const handleTogglePriority = (searchId: string) => {
    setSearches(prev => prev.map(search => 
      search.id === searchId 
        ? { ...search, priority24h: !search.priority24h }
        : search
    ));
    
    const search = searches.find(s => s.id === searchId);
    const action = search?.priority24h ? 'desactivada' : 'activada';
    toast.success(`Prioridad 24h ${action} correctamente`);
  };

  const handleSaveSearch = () => {
    if (!newSearch.name || !newSearch.zones?.length) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const searchToSave = {
      ...newSearch,
      id: editingSearch?.id || Date.now().toString(),
      createdAt: editingSearch?.createdAt || new Date().toISOString().split('T')[0],
      lastMatch: editingSearch?.lastMatch || null,
      status: editingSearch?.status || 'active',
      stats: editingSearch?.stats || {
        totalMatches: 0,
        emailsSent: 0,
        responseRate: 0
      }
    } as SearchAlert;

    if (editingSearch) {
      setSearches(prev => prev.map(s => s.id === editingSearch.id ? searchToSave : s));
      toast.success('Búsqueda actualizada correctamente');
    } else {
      setSearches(prev => [...prev, searchToSave]);
      toast.success('Nueva búsqueda creada correctamente');
    }

    setIsDialogOpen(false);
    setEditingSearch(null);
    setNewSearch({
      name: '',
      zones: [],
      maxPrice: 100,
      minPrice: 50,
      schedule: { type: 'always' },
      features: [],
      urgency: 'medium',
      priority24h: false,
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    });
  };

  const handleEditSearch = (search: SearchAlert) => {
    setEditingSearch(search);
    setNewSearch(search);
    setIsDialogOpen(true);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-semantic-danger text-white border-semantic-danger';
      case 'medium':
        return 'bg-semantic-warn text-white border-semantic-warn';
      case 'low':
        return 'bg-semantic-success text-white border-semantic-success';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return urgency;
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
                Mis búsquedas
              </h1>
              <p className="text-gray-600">
                Gestiona tus alertas y encuentra el garaje perfecto
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onNavigate('driver-dashboard')}
                className="btn-md"
              >
                <Target className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="btn-primary btn-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nueva búsqueda
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Búsquedas totales</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-brand-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Activas</p>
                    <p className="text-2xl font-bold text-semantic-success">{stats.active}</p>
                  </div>
                  <div className="w-10 h-10 bg-semantic-success/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-semantic-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Coincidencias</p>
                    <p className="text-2xl font-bold text-brand-secondary">{stats.totalMatches}</p>
                  </div>
                  <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-brand-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Respuesta media</p>
                    <p className="text-2xl font-bold text-semantic-warn">{stats.avgResponseRate.toFixed(1)}%</p>
                  </div>
                  <div className="w-10 h-10 bg-semantic-warn/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-semantic-warn" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Searches List */}
        <div className="space-y-4">
          {searches.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aún no tienes búsquedas
                </h3>
                <p className="text-gray-600 mb-6">
                  Crea tu primera búsqueda y recibe alertas cuando aparezcan garajes que coincidan
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="btn-primary btn-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear búsqueda
                </Button>
              </CardContent>
            </Card>
          ) : (
            searches.map((search) => (
              <Card key={search.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Search Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-poppins text-lg font-semibold text-gray-900">
                              {search.name}
                            </h3>
                            <Badge 
                              className={search.status === 'active' 
                                ? 'bg-semantic-success text-white border-semantic-success'
                                : 'bg-gray-500 text-white border-gray-500'
                              }
                            >
                              {search.status === 'active' ? 'Activa' : 'Pausada'}
                            </Badge>
                            <Badge className={getUrgencyColor(search.urgency)}>
                              {getUrgencyText(search.urgency)}
                            </Badge>
                            {search.priority24h && (
                              <Badge className="bg-brand-primary text-white border-brand-primary">
                                <Zap className="w-3 h-3 mr-1" />
                                24h
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {search.zones.join(', ')}
                            </span>
                            <span className="flex items-center">
                              <Euro className="w-4 h-4 mr-1" />
                              {search.minPrice}€ - {search.maxPrice}€
                            </span>
                          </div>

                          {search.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {search.features.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-900">{search.stats.totalMatches}</p>
                              <p className="text-xs text-gray-500">Coincidencias</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-900">{search.stats.emailsSent}</p>
                              <p className="text-xs text-gray-500">Solicitudes</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-900">{search.stats.responseRate.toFixed(1)}%</p>
                              <p className="text-xs text-gray-500">Respuesta</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditSearch(search)}
                              className="btn-sm flex-1"
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
                                  onClick={() => handleToggleStatus(search.id)}
                                >
                                  {search.status === 'active' ? (
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
                                  onClick={() => handleTogglePriority(search.id)}
                                >
                                  <Zap className="w-4 h-4 mr-2" />
                                  {search.priority24h ? 'Desactivar' : 'Activar'} prioridad 24h
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() => onNavigate('search-results', { searchId: search.id })}
                                >
                                  <Search className="w-4 h-4 mr-2" />
                                  Ver resultados
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
                                      <AlertDialogTitle>¿Eliminar búsqueda?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Se eliminará permanentemente 
                                        la búsqueda y dejarás de recibir alertas.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteSearch(search.id)}
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

                          {search.lastMatch ? (
                            <div className="text-xs text-gray-500 text-center">
                              Última coincidencia: {new Date(search.lastMatch).toLocaleDateString()}
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500 text-center">
                              Sin coincidencias aún
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Create/Edit Search Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSearch ? 'Editar búsqueda' : 'Nueva búsqueda'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="search-name">Nombre de la búsqueda *</Label>
                <Input
                  id="search-name"
                  placeholder="Ej: Garaje centro Alicante"
                  value={newSearch.name || ''}
                  onChange={(e) => setNewSearch(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Zones */}
              <div className="space-y-2">
                <Label>Zonas de interés *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {zones.map(zone => (
                    <label key={zone} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newSearch.zones?.includes(zone) || false}
                        onChange={(e) => {
                          const zones = newSearch.zones || [];
                          if (e.target.checked) {
                            setNewSearch(prev => ({ 
                              ...prev, 
                              zones: [...zones, zone] 
                            }));
                          } else {
                            setNewSearch(prev => ({ 
                              ...prev, 
                              zones: zones.filter(z => z !== zone) 
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{zone}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label>Rango de precio</Label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Mínimo: {newSearch.minPrice}€</span>
                      <span>Máximo: {newSearch.maxPrice}€</span>
                    </div>
                    <Slider
                      value={[newSearch.minPrice || 50, newSearch.maxPrice || 100]}
                      onValueChange={([min, max]) => {
                        setNewSearch(prev => ({ ...prev, minPrice: min, maxPrice: max }));
                      }}
                      max={200}
                      min={20}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label>Características deseadas</Label>
                <div className="grid grid-cols-2 gap-2">
                  {features.map(feature => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newSearch.features?.includes(feature) || false}
                        onChange={(e) => {
                          const currentFeatures = newSearch.features || [];
                          if (e.target.checked) {
                            setNewSearch(prev => ({ 
                              ...prev, 
                              features: [...currentFeatures, feature] 
                            }));
                          } else {
                            setNewSearch(prev => ({ 
                              ...prev, 
                              features: currentFeatures.filter(f => f !== feature) 
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Urgency */}
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgencia</Label>
                <Select 
                  value={newSearch.urgency || 'medium'} 
                  onValueChange={(value) => setNewSearch(prev => ({ ...prev, urgency: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja - Tengo tiempo</SelectItem>
                    <SelectItem value="medium">Media - En unas semanas</SelectItem>
                    <SelectItem value="high">Alta - Lo necesito ya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority 24h */}
              <div className="flex items-center justify-between p-4 border border-brand-primary/20 rounded-lg bg-brand-primary/5">
                <div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium text-gray-900">Prioridad 24h</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Recibe notificaciones antes que otros conductores
                  </p>
                </div>
                <Switch
                  checked={newSearch.priority24h || false}
                  onCheckedChange={(checked) => setNewSearch(prev => ({ ...prev, priority24h: checked }))}
                />
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <Label>Notificaciones</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Email</span>
                    </div>
                    <Switch
                      checked={newSearch.notifications?.email || false}
                      onCheckedChange={(checked) => setNewSearch(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, email: checked } 
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Notificaciones push</span>
                    </div>
                    <Switch
                      checked={newSearch.notifications?.push || false}
                      onCheckedChange={(checked) => setNewSearch(prev => ({ 
                        ...prev, 
                        notifications: { ...prev.notifications, push: checked } 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveSearch}
                  className="flex-1 btn-primary"
                >
                  {editingSearch ? 'Guardar cambios' : 'Crear búsqueda'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}