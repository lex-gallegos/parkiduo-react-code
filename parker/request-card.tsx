import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Star,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { getStatusBadge } from '../utils/parker-utils';

interface RequestCardProps {
  request: {
    id: number;
    garageId: number;
    garage: string;
    driver: {
      name: string;
      avatar: string;
      rating: number;
      vehicleInfo: string;
      joinDate: string;
    };
    requestDate: string;
    status: string;
    message: string;
    preferredVisitTimes?: string[];
    visitDateTime?: string;
    contact?: string;
  };
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onGenerateContract: (id: number) => void;
}

export function RequestCard({ request, onApprove, onReject, onGenerateContract }: RequestCardProps) {
  return (
    <Card className="hover-lift">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.driver.avatar} alt={request.driver.name} />
              <AvatarFallback>{request.driver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {request.driver.name}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span>{request.driver.rating}</span>
                <span>•</span>
                <span>{request.driver.vehicleInfo}</span>
              </div>
              <p className="text-xs text-gray-500">{request.driver.joinDate}</p>
            </div>
          </div>
          {getStatusBadge(request.status as any)}
        </div>

        {/* Garage Info */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="font-medium">Solicitud para: {request.garage}</span>
            <span className="text-gray-500">
              • {new Date(request.requestDate).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>

        {/* Driver Message */}
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-800">"{request.message}"</p>
        </div>

        {/* Status specific content */}
        {request.status === 'pending' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Horarios preferidos para visita:
              </h4>
              <div className="space-y-1">
                {request.preferredVisitTimes?.map((time, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {time}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                size="sm" 
                className="bg-semantic-success hover:bg-green-600 text-white text-[12px]"
                onClick={() => onApprove(request.id)}
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                Aprobar visita
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-semantic-danger hover:bg-red-50 text-[12px]"
                onClick={() => onReject(request.id)}
              >
                <XCircle className="mr-1 h-3 w-3" />
                Rechazar
              </Button>
            </div>
          </div>
        )}

        {request.status === 'approved' && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Visita aprobada y programada
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">
                  {new Date(request.visitDateTime!).toLocaleDateString('es-ES', {
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
                <span className="text-blue-800">{request.contact}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
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
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">
                Visita realizada
              </span>
            </div>
            <p className="text-xs text-purple-700 mb-3">
              Visitado el {new Date(request.visitDateTime!).toLocaleDateString('es-ES')}
            </p>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="bg-semantic-success hover:bg-green-600 text-white"
                onClick={() => onGenerateContract(request.id)}
              >
                <CheckCircle className="mr-1 h-3 w-3" />
                Generar contrato
              </Button>
              <Button size="sm" variant="outline">
                <XCircle className="mr-1 h-3 w-3" />
                No hubo match
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}