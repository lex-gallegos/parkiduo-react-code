import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Edit3,
  Save,
  Search,
  Settings,
  ImageIcon,
  MapPin,
  Eye,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CityImageEditor } from './city-image-editor';
import { toast } from 'sonner@2.0.3';

interface City {
  name: string;
  status: 'Activo' | 'Próximamente';
  districts: string[];
  stats: {
    activeGarages: number;
    avgPrice: number;
    satisfaction: number;
    demand: string;
  };
  image: string;
}

interface CityManagementProps {
  isAdminMode?: boolean;
  onCityUpdate?: (cities: City[]) => void;
}

export function CityManagement({ isAdminMode = false, onCityUpdate }: CityManagementProps) {
  const [cities, setCities] = useState<City[]>([
    {
      name: 'Madrid',
      status: 'Activo',
      districts: ['Centro', 'Chamberí', 'Salamanca', 'Retiro', 'Malasaña'],
      stats: {
        activeGarages: 156,
        avgPrice: 120,
        satisfaction: 4.8,
        demand: 'Alta'
      },
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80'
    },
    {
      name: 'Barcelona',
      status: 'Activo',
      districts: ['Eixample', 'Gràcia', 'Sarrià', 'Gótico', 'Born'],
      stats: {
        activeGarages: 143,
        avgPrice: 110,
        satisfaction: 4.7,
        demand: 'Alta'
      },
      image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&q=80'
    },
    {
      name: 'Valencia',
      status: 'Activo',
      districts: ['Centro', 'Ruzafa', 'Benimaclet', 'Campanar'],
      stats: {
        activeGarages: 89,
        avgPrice: 85,
        satisfaction: 4.9,
        demand: 'Media'
      },
      image: 'https://images.unsplash.com/photo-1544068751-9ad0b79ad48e?w=500&q=80'
    },
    {
      name: 'Sevilla',
      status: 'Próximamente',
      districts: ['Centro', 'Triana', 'Nervión', 'Macarena'],
      stats: {
        activeGarages: 0,
        avgPrice: 70,
        satisfaction: 0,
        demand: 'Estimada Alta'
      },
      image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&q=80'
    },
    {
      name: 'Bilbao',
      status: 'Próximamente',
      districts: ['Casco Viejo', 'Ensanche', 'Deusto', 'Indautxu'],
      stats: {
        activeGarages: 0,
        avgPrice: 95,
        satisfaction: 0,
        demand: 'Estimada Media'
      },
      image: 'https://images.unsplash.com/photo-1544963950-2023b25de3d9?w=500&q=80'
    },
    {
      name: 'Zaragoza',
      status: 'Próximamente',
      districts: ['Centro', 'Delicias', 'Universidad', 'Actur'],
      stats: {
        activeGarages: 0,
        avgPrice: 65,
        satisfaction: 0,
        demand: 'Estimada Baja'
      },
      image: 'https://images.unsplash.com/photo-1587217820888-7ebb3a5b5600?w=500&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  // Filter cities based on search term
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.districts.some(district => 
      district.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleImageUpdate = (cityName: string, newImageUrl: string) => {
    const updatedCities = cities.map(city =>
      city.name === cityName
        ? { ...city, image: newImageUrl }
        : city
    );
    setCities(updatedCities);
    onCityUpdate?.(updatedCities);
    
    // Close the editor
    setIsImageEditorOpen(false);
    setEditingCity(null);
  };

  const handleEditImage = (city: City) => {
    setEditingCity(city);
    setIsImageEditorOpen(true);
  };

  const handleBulkImageUpdate = () => {
    // Update all cities with fresh Unsplash images
    const updatedCities = cities.map(city => {
      const searchTerm = `${city.name} spain city architecture`;
      const randomParam = Math.floor(Math.random() * 1000);
      return {
        ...city,
        image: `https://source.unsplash.com/800x450/?${encodeURIComponent(searchTerm)}&${randomParam}`
      };
    });
    
    setCities(updatedCities);
    onCityUpdate?.(updatedCities);
    toast.success('Todas las imágenes han sido actualizadas');
  };

  const getDemandColor = (demand: string) => {
    if (demand.includes('Alta')) return 'text-semantic-success bg-semantic-success/10 border-semantic-success/20';
    if (demand.includes('Media')) return 'text-semantic-warn bg-semantic-warn/10 border-semantic-warn/20';
    return 'text-semantic-danger bg-semantic-danger/10 border-semantic-danger/20';
  };

  return (
    <div className="space-y-6">
      {/* Header with search and admin actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar ciudades o distritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {isAdminMode && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleBulkImageUpdate}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar todas las imágenes
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Añadir ciudad
            </Button>
          </div>
        )}
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <Card key={city.name} className="overflow-hidden hover:shadow-lg transition-all duration-200">
            {/* Image Section */}
            <div className="relative h-48 group">
              <ImageWithFallback
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover"
                width={400}
                height={200}
              />
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge className={city.status === 'Activo' ? 
                  'bg-semantic-success text-white border-semantic-success' : 
                  'bg-semantic-warn text-white border-semantic-warn'
                }>
                  {city.status}
                </Badge>
              </div>

              {/* Rating for active cities */}
              {city.status === 'Activo' && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                    <span className="text-sm font-medium">{city.stats.satisfaction}</span>
                  </div>
                </div>
              )}

              {/* Edit overlay for admin mode */}
              {isAdminMode && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    onClick={() => handleEditImage(city)}
                    className="bg-white/90 hover:bg-white text-gray-900 hover:text-gray-900"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Editar imagen
                  </Button>
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-poppins text-xl">{city.name}</span>
                <Badge 
                  variant="outline"
                  className={getDemandColor(city.stats.demand)}
                >
                  {city.stats.demand}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Districts */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Distritos disponibles:</p>
                <div className="flex flex-wrap gap-1">
                  {city.districts.slice(0, 3).map((district) => (
                    <Badge key={district} variant="secondary" className="text-xs">
                      {district}
                    </Badge>
                  ))}
                  {city.districts.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{city.districts.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              {city.status === 'Activo' ? (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-brand-primary">{city.stats.activeGarages}</div>
                    <div className="text-xs text-gray-600">Garajes</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-brand-secondary">{city.stats.avgPrice}€</div>
                    <div className="text-xs text-gray-600">Precio medio</div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Próximamente disponible</p>
                  <p className="text-xs text-gray-500">Precio estimado: {city.stats.avgPrice}€/mes</p>
                </div>
              )}

              {/* Admin Actions */}
              {isAdminMode && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditImage(city)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    Editar imagen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              )}

              {/* User View Actions */}
              {!isAdminMode && (
                <div className="space-y-2">
                  {city.status === 'Activo' ? (
                    <>
                      <Button className="w-full bg-brand-primary hover:bg-blue-600 text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Solicitar garaje
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        Publicar garaje
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Notificarme cuando esté disponible
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredCities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron ciudades
            </h3>
            <p className="text-gray-600">
              Intenta buscar con términos diferentes o verifica la ortografía.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Image Editor Modal */}
      {editingCity && (
        <CityImageEditor
          city={editingCity}
          isOpen={isImageEditorOpen}
          onClose={() => {
            setIsImageEditorOpen(false);
            setEditingCity(null);
          }}
          onSave={handleImageUpdate}
        />
      )}
    </div>
  );
}