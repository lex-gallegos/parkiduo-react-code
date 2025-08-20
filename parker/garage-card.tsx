import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Edit3,
  Share2,
  Pause,
  Play,
  Trash2,
  Eye,
  MessageCircle,
  Clock,
  Euro,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { getStatusBadge, getDemandBadge } from '../utils/parker-utils';

interface GarageCardProps {
  garage: {
    id: number;
    address: string;
    price: number;
    availability: string;
    status: string;
    views: number;
    requests: number;
    activeRequests: number;
    image: string;
    createdDate: string;
    lastActivity: string;
    demandLevel: string;
  };
  onRequestsClick: () => void;
}

export function GarageCard({ garage, onRequestsClick }: GarageCardProps) {
  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Garage Image */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <ImageWithFallback
              src={garage.image}
              alt={`Garaje en ${garage.address}`}
              className="w-full h-48 lg:h-40 object-cover rounded-lg"
              width={256}
              height={160}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {garage.address}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Euro className="h-4 w-4 mr-1" />
                    {garage.price}€/mes
                  </span>
                  <span>•</span>
                  <span>{garage.availability}</span>
                  <span>•</span>
                  <span>Desde {new Date(garage.createdDate).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(garage.status as any)}
                {getDemandBadge(garage.demandLevel as any)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-600">Visualizaciones</span>
                  <div className="font-semibold text-gray-900">{garage.views}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-600">Solicitudes totales</span>
                  <div className="font-semibold text-gray-900">{garage.requests}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-600">Última actividad</span>
                  <div className="font-semibold text-gray-900">hace {garage.lastActivity}</div>
                </div>
              </div>
            </div>

            {/* Active Requests Alert */}
            {garage.activeRequests > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Tienes {garage.activeRequests} solicitud{garage.activeRequests !== 1 ? 'es' : ''} pendiente{garage.activeRequests !== 1 ? 's' : ''}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="link" 
                  className="text-blue-600 p-0 h-auto"
                  onClick={onRequestsClick}
                >
                  Ver solicitudes →
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                <Edit3 className="mr-1 h-3 w-3" />
                Editar
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="mr-1 h-3 w-3" />
                Compartir
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className={garage.status === 'active' ? 'text-orange-600 hover:bg-orange-50' : 'text-semantic-success hover:bg-green-50'}
              >
                {garage.status === 'active' ? (
                  <>
                    <Pause className="mr-1 h-3 w-3" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="mr-1 h-3 w-3" />
                    Activar
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" className="text-semantic-danger hover:bg-red-50">
                <Trash2 className="mr-1 h-3 w-3" />
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}