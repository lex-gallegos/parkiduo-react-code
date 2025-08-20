import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search,
  MapPin,
  Clock,
  Euro,
  Car,
  Star,
  Filter,
  Heart,
  Share2,
  Calendar,
  User,
  Shield,
  Camera,
  Zap
} from 'lucide-react';

interface ExploreGaragesPageProps {
  onNavigate: (page: string, options?: any) => void;
  onPriorityUpgrade: () => void;
}

interface Garage {
  id: string;
  title: string;
  address: string;
  distance: string;
  price: number;
  availability: string;
  rating: number;
  reviews: number;
  photos: number;
  features: string[];
  vehicleTypes: string[];
  isPriority?: boolean;
  isNew?: boolean;
  owner: {
    name: string;
    verified: boolean;
    responseTime: string;
  };
}

export function ExploreGaragesPage({ onNavigate, onPriorityUpgrade }: ExploreGaragesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock garage data
  const garages: Garage[] = [
    {
      id: '1',
      title: 'Plaza céntrica Malasaña',
      address: 'Calle Fuencarral, 45, Madrid',
      distance: '0.2 km',
      price: 120,
      availability: '24h',
      rating: 4.8,
      reviews: 24,
      photos: 5,
      features: ['Acceso controlado', 'Cámaras de seguridad', 'Iluminación LED'],
      vehicleTypes: ['compacto', 'berlina'],
      isPriority: true,
      isNew: true,
      owner: {
        name: 'María S.',
        verified: true,
        responseTime: '< 1 hora'
      }
    },
    {
      id: '2',
      title: 'Garaje Chamberí',
      address: 'Calle Alonso Martínez, 12, Madrid',
      distance: '0.8 km',
      price: 95,
      availability: 'nocturno',
      rating: 4.6,
      reviews: 18,
      photos: 3,
      features: ['Vigilancia 24h', 'Acceso mando'],
      vehicleTypes: ['compacto', 'berlina', 'suv'],
      owner: {
        name: 'Carlos R.',
        verified: true,
        responseTime: '< 2 horas'
      }
    },
    {
      id: '3',
      title: 'Plaza compartida Retiro',
      address: 'Calle Alcalá, 89, Madrid',
      distance: '1.2 km',
      price: 80,
      availability: 'diurno',
      rating: 4.9,
      reviews: 31,
      photos: 7,
      features: ['Cerca del metro', 'Limpieza incluida'],
      vehicleTypes: ['compacto'],
      owner: {
        name: 'Ana L.',
        verified: true,
        responseTime: '< 30 min'
      }
    },
    {
      id: '4',
      title: 'Parking Salamanca',
      address: 'Calle Serrano, 156, Madrid',
      distance: '2.1 km',
      price: 140,
      availability: '24h',
      rating: 4.7,
      reviews: 42,
      photos: 4,
      features: ['Acceso privado', 'Altura libre 2.1m'],
      vehicleTypes: ['compacto', 'berlina', 'suv'],
      isPriority: true,
      owner: {
        name: 'Roberto M.',
        verified: true,
        responseTime: '< 3 horas'
      }
    }
  ];

  const filteredGarages = garages.filter(garage => {
    const matchesSearch = garage.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         garage.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = garage.price >= priceRange[0] && garage.price <= priceRange[1];
    const matchesAvailability = selectedAvailability === 'all' || garage.availability === selectedAvailability;
    const matchesVehicle = selectedVehicle === 'all' || garage.vehicleTypes.includes(selectedVehicle);
    
    return matchesSearch && matchesPrice && matchesAvailability && matchesVehicle;
  });

  const priorityGarages = filteredGarages.filter(g => g.isPriority);
  const regularGarages = filteredGarages.filter(g => !g.isPriority);

  const toggleFavorite = (garageId: string) => {
    setFavorites(prev => 
      prev.includes(garageId) 
        ? prev.filter(id => id !== garageId)
        : [...prev, garageId]
    );
  };

  const handleRequestVisit = (garage: Garage) => {
    onNavigate('contract-wizard', { 
      garageId: garage.id,
      garageTitle: garage.title,
      analytics: 'visit_requested' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
            Explorar garajes
          </h1>
          <p className="text-gray-600">
            Encuentra la plaza perfecta para tu vehículo en Madrid
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              {/* Search */}
              <div className="form-field lg:col-span-2">
                <Label htmlFor="search">Buscar por zona o dirección</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Ej: Malasaña, Calle Fuencarral..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-md"
                aria-label="Abrir filtros de búsqueda"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>

              {/* Priority Upgrade */}
              <Button
                onClick={onPriorityUpgrade}
                className="btn-primary btn-md bg-semantic-warn hover:bg-yellow-600"
              >
                <Zap className="w-4 h-4 mr-2" />
                Prioridad 24h
              </Button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div className="form-field">
                  <Label>Precio (€/mes)</Label>
                  <div className="mt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={30}
                      max={200}
                      step={5}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <Label>Disponibilidad</Label>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="24h">24 horas</SelectItem>
                      <SelectItem value="diurno">Diurno (8h-20h)</SelectItem>
                      <SelectItem value="nocturno">Nocturno (20h-8h)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-field">
                  <Label>Tipo de vehículo</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="compacto">Compacto</SelectItem>
                      <SelectItem value="berlina">Berlina</SelectItem>
                      <SelectItem value="suv">SUV/Furgoneta</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-field">
                  <Label>Zona</Label>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="centro">Centro</SelectItem>
                      <SelectItem value="chamberi">Chamberí</SelectItem>
                      <SelectItem value="malasana">Malasaña</SelectItem>
                      <SelectItem value="retiro">Retiro</SelectItem>
                      <SelectItem value="salamanca">Salamanca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <main id="main-content">
          {/* Priority Section */}
          {priorityGarages.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-semantic-warn" />
                <h2 className="font-poppins text-xl font-semibold text-gray-900">
                  Acceso prioritario
                </h2>
                <Badge className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/30">
                  Solo para miembros Priority
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {priorityGarages.map((garage) => (
                  <GarageCard 
                    key={garage.id} 
                    garage={garage} 
                    isFavorite={favorites.includes(garage.id)}
                    onToggleFavorite={() => toggleFavorite(garage.id)}
                    onRequestVisit={() => handleRequestVisit(garage)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Results */}
          <div className="mb-8">
            <h2 className="font-poppins text-xl font-semibold text-gray-900 mb-4">
              Todas las plazas ({regularGarages.length})
            </h2>
            
            {regularGarages.length === 0 ? (
              <Card className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-poppins text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron plazas
                </h3>
                <p className="text-gray-600 mb-6">
                  Prueba a ajustar tus filtros o ampliar la zona de búsqueda.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([30, 200]);
                    setSelectedZone('all');
                    setSelectedAvailability('all');
                    setSelectedVehicle('all');
                  }}
                >
                  Limpiar filtros
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularGarages.map((garage) => (
                  <GarageCard 
                    key={garage.id} 
                    garage={garage} 
                    isFavorite={favorites.includes(garage.id)}
                    onToggleFavorite={() => toggleFavorite(garage.id)}
                    onRequestVisit={() => handleRequestVisit(garage)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Upgrade CTA */}
          {!priorityGarages.length && (
            <Card className="bg-gradient-to-r from-semantic-warn/10 to-semantic-warn/5 border-semantic-warn/20">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-semantic-warn mx-auto mb-4" />
                <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">
                  ¿Quieres ver más plazas primero?
                </h3>
                <p className="text-gray-600 mb-6">
                  Con Prioridad 24h verás las nuevas plazas 24 horas antes que otros conductores.
                </p>
                <Button onClick={onPriorityUpgrade} className="btn-primary btn-lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Activar Prioridad por 1,99€
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

// Garage Card Component
interface GarageCardProps {
  garage: Garage;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRequestVisit: () => void;
}

function GarageCard({ garage, isFavorite, onToggleFavorite, onRequestVisit }: GarageCardProps) {
  return (
    <Card className="hover-lift overflow-hidden">
      {/* Header with badges */}
      <div className="relative p-4 pb-0">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            {garage.isNew && (
              <Badge className="bg-semantic-success text-white text-xs">Nuevo</Badge>
            )}
            {garage.isPriority && (
              <Badge className="bg-semantic-warn text-white text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Priority
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
              aria-label="Compartir plaza"
            >
              <Share2 className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>

        <h3 className="font-poppins font-semibold text-gray-900 mb-1">
          {garage.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{garage.address}</span>
          <span className="text-gray-400">•</span>
          <span>{garage.distance}</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 pt-0">
        {/* Price and Rating */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-2xl font-bold text-brand-primary">
              {garage.price}€
              <span className="text-sm font-normal text-gray-500">/mes</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-3 h-3" />
              <span className="capitalize">{garage.availability}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{garage.rating}</span>
            </div>
            <div className="text-xs text-gray-500">{garage.reviews} reseñas</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          <div className="flex flex-wrap gap-1">
            {garage.features.slice(0, 2).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {garage.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{garage.features.length - 2} más
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Camera className="w-3 h-3" />
            <span>{garage.photos} fotos</span>
            <span className="text-gray-400">•</span>
            <Car className="w-3 h-3" />
            <span>{garage.vehicleTypes.join(', ')}</span>
          </div>
        </div>

        {/* Owner info */}
        <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">{garage.owner.name}</span>
            {garage.owner.verified && (
              <Shield className="w-3 h-3 text-semantic-success" />
            )}
          </div>
          <div className="text-xs text-gray-500">
            Responde en {garage.owner.responseTime}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          <Button 
            onClick={onRequestVisit}
            className="w-full btn-primary btn-md"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Solicitar visita
          </Button>
          <Button 
            variant="outline" 
            className="w-full btn-md"
            aria-label="Ver detalles de la plaza"
          >
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}