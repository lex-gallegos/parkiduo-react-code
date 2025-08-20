import exampleImage from 'figma:asset/45902a6510c0e6a7f0dfbc3664064e09c69c851b.png';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Car,
  Building,
  Calendar,
  Star,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ParkingCardData {
  id: string;
  title: string;
  address: string;
  price: number;
  images: string[];
  schedule: string;
  size: string;
  floor: string;
  availableFrom: string;
  rating: number;
  reviewCount: number;
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  features: string[];
  location: {
    lat: number;
    lng: number;
    neighborhood: string;
  };
  distance: string;
  isPriority?: boolean;
  isLiked?: boolean;
}

interface ParkingCardProps {
  data: ParkingCardData;
  onRequestVisit: (garageId: string) => void;
  onContact: (garageId: string) => void;
  onToggleLike: (garageId: string) => void;
  onShare: (garageId: string) => void;
  onViewDetails: (garageId: string) => void;
  compact?: boolean;
}

export function ParkingCard({ 
  data, 
  onRequestVisit, 
  onContact, 
  onToggleLike, 
  onShare, 
  onViewDetails,
  compact = false 
}: ParkingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === data.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  if (compact) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <ImageWithFallback
              src={data.images[currentImageIndex] || exampleImage}
              alt={data.title}
              className="w-full h-full object-cover"
              width={192}
              height={192}
            />
            
            {/* Priority Badge */}
            {data.isPriority && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-yellow-500 text-white text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Prioritario
                </Badge>
              </div>
            )}

            {/* Image Navigation */}
            {data.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 h-6 w-6"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 h-6 w-6"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {data.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <CardContent className="flex-1 p-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {data.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{data.address}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-bold text-brand-primary">{data.price}€</p>
                  <p className="text-xs text-gray-500">/mes</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{data.schedule}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="w-3 h-3 mr-1" />
                  <span>{data.floor}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1"
                    onClick={() => onToggleLike(data.id)}
                  >
                    <Heart className={`w-3 h-3 ${data.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1"
                    onClick={() => onViewDetails(data.id)}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="bg-brand-secondary hover:bg-teal-600 text-white text-xs h-6 px-3"
                  onClick={() => onRequestVisit(data.id)}
                >
                  Solicitar visita
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm mx-auto">
      {/* Header with Logo */}
      <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="font-semibold text-gray-700 text-sm">parkiduo</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onToggleLike(data.id)}
          >
            <Heart className={`w-4 h-4 ${data.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onShare(data.id)}
          >
            <Share2 className="w-4 h-4 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-48">
        <ImageWithFallback
          src={data.images[currentImageIndex] || exampleImage}
          alt={data.title}
          className="w-full h-full object-cover"
          width={400}
          height={192}
        />
        
        {/* Priority Badge */}
        {data.isPriority && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-500 text-white">
              <Zap className="w-3 h-3 mr-1" />
              Acceso prioritario
            </Badge>
          </div>
        )}

        {/* Image Navigation */}
        {data.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {data.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">
              {data.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{data.address}</p>
          </div>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-brand-primary">{data.price}€</p>
            <p className="text-sm text-gray-500">/mes</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Horario</span>
            <span className="text-sm font-medium text-gray-900">{data.schedule}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Tamaño</span>
            <span className="text-sm font-medium text-gray-900">{data.size}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Planta</span>
            <span className="text-sm font-medium text-gray-900">{data.floor}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Período de alquiler</span>
            <span className="text-sm font-medium text-gray-900">{data.availableFrom}</span>
          </div>
        </div>

        {/* Features */}
        {data.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        )}

        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
          <div className="relative z-10 text-center">
            <MapPin className="w-6 h-6 text-brand-secondary mx-auto mb-1" />
            <p className="text-xs font-medium text-gray-700">{data.title}</p>
            <p className="text-xs text-gray-500">{data.location.neighborhood}</p>
            <p className="text-xs text-gray-500">{data.distance}</p>
          </div>
          {/* Decorative map elements */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-brand-secondary/20 rounded-full"></div>
          <div className="absolute bottom-1 left-1 w-4 h-4 bg-brand-primary/20 rounded-full"></div>
        </div>

        {/* Owner and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={data.owner.avatar} alt={data.owner.name} />
              <AvatarFallback>{data.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {data.owner.name}
                {data.owner.verified && (
                  <span className="ml-1 text-xs text-brand-primary">✓</span>
                )}
              </p>
            </div>
          </div>
          
          {data.rating > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{data.rating}</span>
              <span className="text-xs text-gray-500">({data.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onContact(data.id)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contactar
          </Button>
          <Button
            className="flex-1 bg-brand-secondary hover:bg-teal-600 text-white"
            size="sm"
            onClick={() => onRequestVisit(data.id)}
          >
            Solicitar visita
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-brand-primary"
            onClick={() => onViewDetails(data.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalles completos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}