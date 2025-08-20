import image_05e64153936202147f51b32693045f11fed778b0 from 'figma:asset/05e64153936202147f51b32693045f11fed778b0.png';
import image_ba298a358e3e109492524a9aff1d5fda04fa6b0e from 'figma:asset/ba298a358e3e109492524a9aff1d5fda04fa6b0e.png';
import image_878662c1a7d1df1db00e90aec4204e8c27acf2f2 from 'figma:asset/878662c1a7d1df1db00e90aec4204e8c27acf2f2.png';
import image_e6dd74a71c465491f28943177bb2bc2f116b47d2 from 'figma:asset/e6dd74a71c465491f28943177bb2bc2f116b47d2.png';
import image_28f7565b5a722167ff249729f110628f98bd0ad9 from 'figma:asset/28f7565b5a722167ff249729f110628f98bd0ad9.png';
import image_f104ec799c5f59af329f9df82c31f76710f6cb21 from 'figma:asset/f104ec799c5f59af329f9df82c31f76710f6cb21.png';
import image_17004a5f5fb66f28ec9f55050595a77dfbba451e from 'figma:asset/17004a5f5fb66f28ec9f55050595a77dfbba451e.png';
import image_17004a5f5fb66f28ec9f55050595a77dfbba451e from 'figma:asset/17004a5f5fb66f28ec9f55050595a77dfbba451e.png';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Footer } from './footer';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  Star,
  Search,
  Settings,
  Edit3,
  ImageIcon
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CityImageEditor } from './city-image-editor';

interface CitiesPageProps {
  onNavigate: (page: string, options?: any) => void;
  isAdminMode?: boolean;
}

export function CitiesPage({ onNavigate, isAdminMode = false }: CitiesPageProps) {
  const [cities, setCities] = useState([
    {
      name: 'Alicante',
      status: 'Activo',
      districts: ['Centro', 'Ensanche-Diputación', 'Benalúa', 'Carolinas Bajas', 'Playa San Juan'],
      stats: {
        activeGarages: 189,
        avgPrice: 95,
        satisfaction: 4.9,
        demand: 'Muy Alta'
      },
      image: image_ba298a358e3e109492524a9aff1d5fda04fa6b0e,
      featured: true,
      headquarters: true
    },
    {
      name: 'Elche',
      status: 'Activo',
      districts: ['Centro', 'Sector Quinto', 'Altabix', 'Carrús', 'Polígono Industrial'],
      stats: {
        activeGarages: 167,
        avgPrice: 78,
        satisfaction: 4.8,
        demand: 'Alta'
      },
      image: image_05e64153936202147f51b32693045f11fed778b0,
      featured: true,
      headquarters: false
    },
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
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80',
      featured: false,
      headquarters: false
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
      image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&q=80',
      featured: false,
      headquarters: false
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
      image: image_f104ec799c5f59af329f9df82c31f76710f6cb21,
      featured: false,
      headquarters: false
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
      image: image_28f7565b5a722167ff249729f110628f98bd0ad9
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
      image: image_e6dd74a71c465491f28943177bb2bc2f116b47d2
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
      image: image_878662c1a7d1df1db00e90aec4204e8c27acf2f2
    }
  ]);

  const [editingCity, setEditingCity] = useState<typeof cities[0] | null>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const handleImageUpdate = (cityName: string, newImageUrl: string) => {
    const updatedCities = cities.map(city =>
      city.name === cityName
        ? { ...city, image: newImageUrl }
        : city
    );
    setCities(updatedCities);
    setIsImageEditorOpen(false);
    setEditingCity(null);
  };

  const handleEditImage = (city: typeof cities[0]) => {
    setEditingCity(city);
    setIsImageEditorOpen(true);
  };

  const activeStats = cities.filter(city => city.status === 'Activo').reduce((acc, city) => ({
    totalGarages: acc.totalGarages + city.stats.activeGarages,
    avgSatisfaction: (acc.avgSatisfaction + city.stats.satisfaction) / 2,
    avgPrice: (acc.avgPrice + city.stats.avgPrice) / 2
  }), { totalGarages: 0, avgSatisfaction: 0, avgPrice: 0 });

  return (
    <div className="min-h-screen bg-background py-20 m-[0px] p-[0px] pt-[70px] pr-[0px] pb-[0px] pl-[0px]">
      <div className="container mx-auto px-6 mx-[146px] my-[50px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-6">
            Ciudades Parkiduo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Conectamos conductores y propietarios de garajes en las principales ciudades españolas
          </p>
          
          {/* Destacar origen */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 px-4 py-2 rounded-full mb-8">
            <span className="text-sm text-brand-primary font-medium">🏢 Empresa con origen en Alicante</span>
          </div>
          
          {/* Stats globales */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary">{activeStats.totalGarages}+</div>
              <div className="text-sm text-gray-600">Garajes activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-secondary">{activeStats.avgSatisfaction.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Satisfacción media</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-semantic-success">{Math.round(activeStats.avgPrice)}€</div>
              <div className="text-sm text-gray-600">Precio medio/mes</div>
            </div>
          </div>
        </div>

        {/* Ciudades activas */}
        <div className="mb-16">
          <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-8 text-center">
            Ciudades disponibles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cities.filter(city => city.status === 'Activo').map((city) => (
              <CityCard 
                key={city.name} 
                city={city} 
                onNavigate={onNavigate}
                onEditImage={isAdminMode ? handleEditImage : undefined}
                isActive={true}
                isAdminMode={isAdminMode}
              />
            ))}
          </div>
        </div>

        {/* Ciudades próximamente */}
        <div className="mb-16">
          <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-8 text-center">
            Próximas ciudades
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cities.filter(city => city.status === 'Próximamente').map((city) => (
              <CityCard 
                key={city.name} 
                city={city} 
                onNavigate={onNavigate}
                onEditImage={isAdminMode ? handleEditImage : undefined}
                isActive={false}
                isAdminMode={isAdminMode}
              />
            ))}
          </div>
        </div>

        {/* CTA solicitar ciudad */}
        <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-12 text-center">
          <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-4">
            ¿Tu ciudad no está en la lista?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Estamos expandiéndonos constantemente. Déjanos saber qué ciudad te interesa y te avisaremos cuando esté disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary btn-lg">
              <MapPin className="w-5 h-5 mr-2" />
              Solicitar mi ciudad
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => onNavigate('how-it-works')}
            >
              <Search className="w-5 h-5 mr-2" />
              Cómo funciona
            </Button>
          </div>
        </div>
      </div>

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

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface CityCardProps {
  city: {
    name: string;
    status: string;
    districts: string[];
    stats: {
      activeGarages: number;
      avgPrice: number;
      satisfaction: number;
      demand: string;
    };
    image: string;
    featured?: boolean;
    headquarters?: boolean;
  };
  onNavigate: (page: string, options?: any) => void;
  isActive: boolean;
  onEditImage?: (city: typeof cities[0]) => void;
  isAdminMode?: boolean;
}

function CityCard({ city, onNavigate, isActive, onEditImage, isAdminMode }: CityCardProps) {
  const getDemandColor = (demand: string) => {
    if (demand.includes('Muy Alta')) return 'text-brand-primary bg-brand-primary/10 border-brand-primary/20';
    if (demand.includes('Alta')) return 'text-semantic-success bg-semantic-success/10 border-semantic-success/20';
    if (demand.includes('Media')) return 'text-semantic-warn bg-semantic-warn/10 border-semantic-warn/20';
    return 'text-semantic-danger bg-semantic-danger/10 border-semantic-danger/20';
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-150 ${!isActive && 'opacity-75'} ${city.featured ? 'ring-2 ring-brand-primary/20 shadow-lg' : ''}`}>
      <div className="relative h-48 group">
        <img 
          src={city.image} 
          alt={city.name}
          className="w-full h-full object-cover"
        />
        
        {/* Edit overlay for admin mode */}
        {isAdminMode && onEditImage && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              onClick={() => onEditImage(city)}
              className="bg-white/90 hover:bg-white text-gray-900 hover:text-gray-900"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Editar imagen
            </Button>
          </div>
        )}
        
        {/* Status and special badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className={isActive ? 
            'bg-semantic-success text-white border-semantic-success' : 
            'bg-semantic-warn text-white border-semantic-warn'
          }>
            {city.status}
          </Badge>
          
          {/* Headquarters badge */}
          {city.headquarters && (
            <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-none shadow-sm">
              🏢 Sede Central
            </Badge>
          )}
          
          {/* Featured city badge */}
          {city.featured && !city.headquarters && (
            <Badge className="bg-brand-secondary text-white border-none shadow-sm">
              ⭐ Ciudad Principal
            </Badge>
          )}
        </div>
        
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{city.stats.satisfaction}</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-xl">{city.name}</span>
          </div>
          <Badge 
            variant="outline"
            className={getDemandColor(city.stats.demand)}
          >
            {city.stats.demand}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Distritos */}
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
        {isActive ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
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
          <div className="text-center p-4 bg-gray-50 rounded-lg mb-6">
            <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Próximamente disponible</p>
            <p className="text-xs text-gray-500">Precio estimado: {city.stats.avgPrice}€/mes</p>
          </div>
        )}

        {/* CTAs */}
        <div className="space-y-2">
          {isActive ? (
            <>
              <Button 
                className={`w-full ${city.featured ? 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-blue-600 hover:to-teal-600 text-white shadow-lg' : 'btn-primary'}`}
                onClick={() => onNavigate('driver-onboarding', { 
                  city: city.name,
                  analytics: `cities_${city.name.toLowerCase()}_request_clicked` 
                })}
              >
                <Search className="w-4 h-4 mr-2" />
                Solicitar garaje
              </Button>
              <Button 
                variant="outline" 
                className={`w-full ${city.featured ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white' : ''}`}
                onClick={() => onNavigate('parker-onboarding', { 
                  city: city.name,
                  analytics: `cities_${city.name.toLowerCase()}_publish_clicked` 
                })}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Publicar garaje
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              disabled
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Notificarme cuando esté disponible
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}