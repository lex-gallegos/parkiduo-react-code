import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { 
  MessageSquare, 
  Clock, 
  Star,
  Calendar as CalendarIcon,
  MapPin,
  Euro,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  ArrowLeft,
  Filter,
  Search,
  MoreHorizontal,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface ReceivedRequestsPageProps {
  onNavigate: (page: string, options?: any) => void;
}

interface Request {
  id: string;
  garageId: string;
  garageName: string;
  garageAddress: string;
  driver: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    rating: number;
    verified: boolean;
    joinDate: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'visit_scheduled' | 'visit_completed' | 'contracted';
  message: string;
  requestDate: string;
  visitDate?: string;
  timeline: {
    date: string;
    action: string;
    description: string;
  }[];
  urgency: 'low' | 'medium' | 'high';
  budget: number;
  startDate: string;
  duration: string;
}

const mockRequests: Request[] = [
  {
    id: '1',
    garageId: '1',
    garageName: 'Plaza céntrica con fácil acceso',
    garageAddress: 'Calle Explanada, 15, Centro',
    driver: {
      id: 'driver1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+34 666 123 456',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b988?w=150&q=80',
      rating: 4.8,
      verified: true,
      joinDate: '2024-01-15'
    },
    status: 'pending',
    message: 'Hola, estoy interesada en tu plaza de garaje. Trabajo cerca y necesito algo estable para los próximos meses. ¿Podríamos concertar una visita?',
    requestDate: '2024-02-20T10:30:00',
    urgency: 'high',
    budget: 95,
    startDate: '2024-03-01',
    duration: '6 meses',
    timeline: [
      {
        date: '2024-02-20T10:30:00',
        action: 'Solicitud enviada',
        description: 'María ha enviado una solicitud para tu garaje'
      }
    ]
  },
  {
    id: '2',
    garageId: '2',
    garageName: 'Garaje espacioso en Ensanche',
    garageAddress: 'Avenida Alfonso X el Sabio, 45, Ensanche-Diputación',
    driver: {
      id: 'driver2',
      name: 'Carlos Martín',
      email: 'carlos.martin@email.com',
      phone: '+34 655 987 654',
      rating: 4.6,
      verified: true,
      joinDate: '2023-11-20'
    },
    status: 'approved',
    message: 'Buenos días, me interesa la plaza. Tengo un coche grande y veo que es espaciosa. ¿Cuándo podríamos verla?',
    requestDate: '2024-02-18T15:45:00',
    visitDate: '2024-02-22T18:00:00',
    urgency: 'medium',
    budget: 78,
    startDate: '2024-02-25',
    duration: '12 meses',
    timeline: [
      {
        date: '2024-02-18T15:45:00',
        action: 'Solicitud enviada',
        description: 'Carlos ha enviado una solicitud para tu garaje'
      },
      {
        date: '2024-02-19T09:20:00',
        action: 'Solicitud aprobada',
        description: 'Has aprobado la solicitud y compartido tu contacto'
      },
      {
        date: '2024-02-19T10:15:00',
        action: 'Visita programada',
        description: 'Visita programada para el 22 de febrero a las 18:00'
      }
    ]
  },
  {
    id: '3',
    garageId: '1',
    garageName: 'Plaza céntrica con fácil acceso',
    garageAddress: 'Calle Explanada, 15, Centro',
    driver: {
      id: 'driver3',
      name: 'Ana López',
      email: 'ana.lopez@email.com',
      phone: '+34 644 555 333',
      rating: 4.9,
      verified: true,
      joinDate: '2024-02-01'
    },
    status: 'visit_completed',
    message: 'Me gusta mucho la ubicación de tu garaje. ¿Está disponible para marzo?',
    requestDate: '2024-02-15T12:00:00',
    visitDate: '2024-02-19T17:30:00',
    urgency: 'low',
    budget: 95,
    startDate: '2024-03-01',
    duration: '3 meses',
    timeline: [
      {
        date: '2024-02-15T12:00:00',
        action: 'Solicitud enviada',
        description: 'Ana ha enviado una solicitud para tu garaje'
      },
      {
        date: '2024-02-16T08:30:00',
        action: 'Solicitud aprobada',
        description: 'Has aprobado la solicitud y compartido tu contacto'
      },
      {
        date: '2024-02-19T17:30:00',
        action: 'Visita completada',
        description: 'La visita se ha realizado correctamente'
      }
    ]
  }
];

export function ReceivedRequestsPage({ onNavigate }: ReceivedRequestsPageProps) {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [showContactDialog, setShowContactDialog] = useState(false);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.garageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesUrgency = urgencyFilter === 'all' || request.urgency === urgencyFilter;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    scheduled: requests.filter(r => r.status === 'visit_scheduled').length,
    completed: requests.filter(r => r.status === 'visit_completed').length
  };

  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'approved',
            timeline: [
              ...request.timeline,
              {
                date: new Date().toISOString(),
                action: 'Solicitud aprobada',
                description: 'Has aprobado la solicitud y compartido tu contacto'
              }
            ]
          }
        : request
    ));
    setShowContactDialog(true);
    toast.success('Solicitud aprobada. Se ha compartido tu contacto con el conductor.');
  };

  const handleRejectRequest = (requestId: string, reason: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'rejected',
            timeline: [
              ...request.timeline,
              {
                date: new Date().toISOString(),
                action: 'Solicitud rechazada',
                description: reason || 'Solicitud rechazada por el propietario'
              }
            ]
          }
        : request
    ));
    toast.success('Solicitud rechazada correctamente');
  };

  const handleScheduleVisit = (requestId: string, date: Date, time: string) => {
    const visitDateTime = new Date(date);
    const [hours, minutes] = time.split(':');
    visitDateTime.setHours(parseInt(hours), parseInt(minutes));

    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'visit_scheduled',
            visitDate: visitDateTime.toISOString(),
            timeline: [
              ...request.timeline,
              {
                date: new Date().toISOString(),
                action: 'Visita programada',
                description: `Visita programada para el ${date.toLocaleDateString()} a las ${time}`
              }
            ]
          }
        : request
    ));
    toast.success('Visita programada correctamente');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-semantic-warn text-white border-semantic-warn';
      case 'approved':
        return 'bg-semantic-success text-white border-semantic-success';
      case 'rejected':
        return 'bg-semantic-danger text-white border-semantic-danger';
      case 'visit_scheduled':
        return 'bg-semantic-info text-white border-semantic-info';
      case 'visit_completed':
        return 'bg-brand-primary text-white border-brand-primary';
      case 'contracted':
        return 'bg-brand-secondary text-white border-brand-secondary';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'visit_scheduled':
        return 'Visita programada';
      case 'visit_completed':
        return 'Visita realizada';
      case 'contracted':
        return 'Contratada';
      default:
        return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-semantic-danger';
      case 'medium':
        return 'text-semantic-warn';
      case 'low':
        return 'text-semantic-success';
      default:
        return 'text-gray-500';
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
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('my-garages')}
              className="btn-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a garajes
            </Button>
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
                Solicitudes recibidas
              </h1>
              <p className="text-gray-600">
                Gestiona las solicitudes de conductores interesados
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-semantic-warn">{stats.pending}</p>
                  <p className="text-sm text-gray-600">Pendientes</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-semantic-success">{stats.approved}</p>
                  <p className="text-sm text-gray-600">Aprobadas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-semantic-info">{stats.scheduled}</p>
                  <p className="text-sm text-gray-600">Programadas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-primary">{stats.completed}</p>
                  <p className="text-sm text-gray-600">Completadas</p>
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
                    placeholder="Buscar por conductor o garaje..."
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
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="approved">Aprobadas</SelectItem>
                  <SelectItem value="visit_scheduled">Programadas</SelectItem>
                  <SelectItem value="visit_completed">Completadas</SelectItem>
                  <SelectItem value="rejected">Rechazadas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Urgencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las urgencias</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron solicitudes
                </h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || urgencyFilter !== 'all'
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'Cuando recibas solicitudes aparecerán aquí'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Driver Info */}
                    <div className="flex items-start gap-4 lg:w-1/3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.driver.avatar} alt={request.driver.name} />
                        <AvatarFallback>
                          {request.driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {request.driver.name}
                          </h3>
                          {request.driver.verified && (
                            <CheckCircle className="w-4 h-4 text-semantic-success" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{request.driver.rating}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                            Urgencia: {getUrgencyText(request.urgency)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="flex-1 lg:w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-1 truncate">
                        {request.garageName}
                      </h4>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="text-sm truncate">{request.garageAddress}</span>
                      </div>

                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {request.message}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Euro className="w-4 h-4 mr-1" />
                          {request.budget}€/mes
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {request.duration}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-1/3 flex flex-col gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleApproveRequest(request.id)}
                            className="btn-primary btn-sm w-full"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprobar y compartir contacto
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleRejectRequest(request.id, '')}
                            className="btn-sm w-full"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rechazar
                          </Button>
                        </>
                      )}

                      {request.status === 'approved' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="btn-primary btn-sm w-full">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Programar visita
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Programar visita</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="visit-date">Fecha de la visita</Label>
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  disabled={(date) => date < new Date()}
                                  className="rounded-md border"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="visit-time">Hora</Label>
                                <Select value={selectedTime} onValueChange={setSelectedTime}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar hora" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: 10 }, (_, i) => i + 9).map(hour => (
                                      <SelectItem key={hour} value={`${hour}:00`}>
                                        {hour}:00
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <Button
                                onClick={() => {
                                  if (selectedDate && selectedTime) {
                                    handleScheduleVisit(request.id, selectedDate, selectedTime);
                                  }
                                }}
                                disabled={!selectedDate || !selectedTime}
                                className="w-full btn-primary"
                              >
                                Confirmar visita
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {request.status === 'visit_completed' && (
                        <Button
                          onClick={() => onNavigate('contract-wizard', { 
                            requestId: request.id,
                            garageId: request.garageId,
                            driverId: request.driver.id
                          })}
                          className="btn-primary btn-sm w-full"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Generar contrato
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        onClick={() => setSelectedRequest(request)}
                        className="btn-sm w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Shared Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contacto compartido</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-semantic-success/10 border border-semantic-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-semantic-success" />
                  <span className="font-medium text-semantic-success">¡Solicitud aprobada!</span>
                </div>
                <p className="text-sm text-gray-700">
                  Hemos compartido tu información de contacto con el conductor. 
                  Deberías recibir una llamada o mensaje pronto para coordinar la visita.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Tu información compartida:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+34 XXX XXX XXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>tu-email@ejemplo.com</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowContactDialog(false)}
                className="w-full btn-primary"
              >
                Entendido
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}