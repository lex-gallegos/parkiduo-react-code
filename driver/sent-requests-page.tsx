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
  AlertTriangle,
  RefreshCw,
  Send,
  MapPinIcon
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface SentRequestsPageProps {
  onNavigate: (page: string, options?: any) => void;
}

interface SentRequest {
  id: string;
  garageId: string;
  garage: {
    title: string;
    address: string;
    district: string;
    price: number;
    images: string[];
    features: string[];
  };
  parker: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    rating: number;
    responseTime: string;
    verified: boolean;
  };
  status: 'pending' | 'approved' | 'rejected' | 'visit_scheduled' | 'visit_completed' | 'contracted' | 'cancelled';
  message: string;
  requestDate: string;
  visitDate?: string;
  responseDate?: string;
  timeline: {
    date: string;
    action: string;
    description: string;
    type: 'sent' | 'approved' | 'rejected' | 'visit_scheduled' | 'visit_completed' | 'contracted' | 'cancelled';
  }[];
  urgency: 'low' | 'medium' | 'high';
  budget: number;
  startDate: string;
  duration: string;
  canCancel: boolean;
}

const mockRequests: SentRequest[] = [
  {
    id: '1',
    garageId: '1',
    garage: {
      title: 'Plaza céntrica con fácil acceso',
      address: 'Calle Explanada, 15',
      district: 'Centro',
      price: 95,
      images: ['https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400&q=80'],
      features: ['Cubierto', 'Acceso 24h', 'Vigilancia']
    },
    parker: {
      id: 'parker1',
      name: 'José Martínez',
      email: 'jose.martinez@email.com',
      phone: '+34 666 789 123',
      rating: 4.9,
      responseTime: '2h promedio',
      verified: true
    },
    status: 'approved',
    message: 'Hola, estoy muy interesado en tu plaza de garaje. Trabajo cerca y necesito algo estable para los próximos meses. ¿Podríamos concertar una visita esta semana?',
    requestDate: '2024-02-20T14:30:00',
    responseDate: '2024-02-20T16:45:00',
    visitDate: '2024-02-22T18:00:00',
    urgency: 'high',
    budget: 95,
    startDate: '2024-03-01',
    duration: '6 meses',
    canCancel: true,
    timeline: [
      {
        date: '2024-02-20T14:30:00',
        action: 'Solicitud enviada',
        description: 'Has enviado una solicitud para esta plaza de garaje',
        type: 'sent'
      },
      {
        date: '2024-02-20T16:45:00',
        action: 'Solicitud aprobada',
        description: 'José ha aprobado tu solicitud y compartido su contacto',
        type: 'approved'
      },
      {
        date: '2024-02-21T09:15:00',
        action: 'Visita programada',
        description: 'Visita programada para el 22 de febrero a las 18:00',
        type: 'visit_scheduled'
      }
    ]
  },
  {
    id: '2',
    garageId: '2',
    garage: {
      title: 'Garaje espacioso en Ensanche',
      address: 'Avenida Alfonso X el Sabio, 45',
      district: 'Ensanche-Diputación',
      price: 78,
      images: ['https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&q=80'],
      features: ['Cubierto', 'Fácil acceso']
    },
    parker: {
      id: 'parker2',
      name: 'Carmen López',
      rating: 4.6,
      responseTime: '4h promedio',
      verified: true
    },
    status: 'pending',
    message: 'Buenos días, me interesa mucho esta plaza. Tengo un coche grande y veo que es espaciosa. ¿Cuándo podríamos verla? Gracias.',
    requestDate: '2024-02-21T10:15:00',
    urgency: 'medium',
    budget: 78,
    startDate: '2024-02-25',
    duration: '12 meses',
    canCancel: true,
    timeline: [
      {
        date: '2024-02-21T10:15:00',
        action: 'Solicitud enviada',
        description: 'Has enviado una solicitud para esta plaza de garaje',
        type: 'sent'
      }
    ]
  },
  {
    id: '3',
    garageId: '3',
    garage: {
      title: 'Plaza en zona residencial',
      address: 'Calle Benalúa, 78',
      district: 'Benalúa',
      price: 65,
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
      features: ['Descubierto', 'Zona tranquila']
    },
    parker: {
      id: 'parker3',
      name: 'Ana Ruiz',
      rating: 4.8,
      responseTime: '1h promedio',
      verified: false
    },
    status: 'rejected',
    message: 'Hola, me gusta la ubicación y el precio. ¿Está disponible para marzo?',
    requestDate: '2024-02-19T16:20:00',
    responseDate: '2024-02-20T08:30:00',
    urgency: 'low',
    budget: 65,
    startDate: '2024-03-01',
    duration: '3 meses',
    canCancel: false,
    timeline: [
      {
        date: '2024-02-19T16:20:00',
        action: 'Solicitud enviada',
        description: 'Has enviado una solicitud para esta plaza de garaje',
        type: 'sent'
      },
      {
        date: '2024-02-20T08:30:00',
        action: 'Solicitud rechazada',
        description: 'El propietario ha rechazado tu solicitud',
        type: 'rejected'
      }
    ]
  },
  {
    id: '4',
    garageId: '4',
    garage: {
      title: 'Plaza cerca de la universidad',
      address: 'Calle San Fernando, 12',
      district: 'San Blas',
      price: 70,
      images: ['https://images.unsplash.com/photo-1590725140246-20acdee442be?w=400&q=80'],
      features: ['Cubierto', 'Cerca transporte']
    },
    parker: {
      id: 'parker4',
      name: 'Miguel García',
      email: 'miguel.garcia@email.com',
      phone: '+34 655 432 876',
      rating: 4.7,
      responseTime: '3h promedio',
      verified: true
    },
    status: 'visit_completed',
    message: 'Me interesa la plaza para aparcar durante las clases. ¿Podemos verla?',
    requestDate: '2024-02-18T11:45:00',
    responseDate: '2024-02-18T14:20:00',
    visitDate: '2024-02-20T17:00:00',
    urgency: 'medium',
    budget: 70,
    startDate: '2024-02-25',
    duration: '4 meses',
    canCancel: false,
    timeline: [
      {
        date: '2024-02-18T11:45:00',
        action: 'Solicitud enviada',
        description: 'Has enviado una solicitud para esta plaza de garaje',
        type: 'sent'
      },
      {
        date: '2024-02-18T14:20:00',
        action: 'Solicitud aprobada',
        description: 'Miguel ha aprobado tu solicitud y compartido su contacto',
        type: 'approved'
      },
      {
        date: '2024-02-20T17:00:00',
        action: 'Visita completada',
        description: 'La visita se ha realizado correctamente',
        type: 'visit_completed'
      }
    ]
  }
];

export function SentRequestsPage({ onNavigate }: SentRequestsPageProps) {
  const [requests, setRequests] = useState<SentRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<SentRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.garage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.garage.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.parker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    scheduled: requests.filter(r => r.status === 'visit_scheduled').length,
    completed: requests.filter(r => r.status === 'visit_completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const handleCancelRequest = (requestId: string, reason: string) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: 'cancelled',
            canCancel: false,
            timeline: [
              ...request.timeline,
              {
                date: new Date().toISOString(),
                action: 'Solicitud cancelada',
                description: reason || 'Has cancelado la solicitud',
                type: 'cancelled'
              }
            ]
          }
        : request
    ));
    setShowCancelDialog(false);
    setCancelReason('');
    toast.success('Solicitud cancelada correctamente');
  };

  const handleViewDetails = (request: SentRequest) => {
    setSelectedRequest(request);
    setShowDetailsDialog(true);
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
      case 'cancelled':
        return 'bg-gray-500 text-white border-gray-500';
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
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'sent':
        return <Send className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'visit_scheduled':
        return <CalendarIcon className="w-4 h-4" />;
      case 'visit_completed':
        return <MapPinIcon className="w-4 h-4" />;
      case 'contracted':
        return <FileText className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTimelineColor = (type: string) => {
    switch (type) {
      case 'sent':
        return 'text-semantic-info bg-semantic-info/10 border-semantic-info/20';
      case 'approved':
        return 'text-semantic-success bg-semantic-success/10 border-semantic-success/20';
      case 'rejected':
      case 'cancelled':
        return 'text-semantic-danger bg-semantic-danger/10 border-semantic-danger/20';
      case 'visit_scheduled':
        return 'text-brand-primary bg-brand-primary/10 border-brand-primary/20';
      case 'visit_completed':
        return 'text-brand-secondary bg-brand-secondary/10 border-brand-secondary/20';
      case 'contracted':
        return 'text-semantic-success bg-semantic-success/10 border-semantic-success/20';
      default:
        return 'text-gray-500 bg-gray-100 border-gray-200';
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
              onClick={() => onNavigate('driver-dashboard')}
              className="btn-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al dashboard
            </Button>
            <div>
              <h1 className="font-poppins text-3xl font-bold text-gray-900 mb-2">
                Solicitudes enviadas
              </h1>
              <p className="text-gray-600">
                Seguimiento de tus solicitudes de garaje
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
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

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-semantic-danger">{stats.rejected}</p>
                  <p className="text-sm text-gray-600">Rechazadas</p>
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
                    placeholder="Buscar por garaje o propietario..."
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
                  <SelectItem value="cancelled">Canceladas</SelectItem>
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
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'Aún no has enviado ninguna solicitud'
                  }
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button
                    onClick={() => onNavigate('explore-garages')}
                    className="btn-primary btn-md"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Explorar garajes
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Garage Image */}
                    <div className="w-full lg:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={request.garage.images[0]}
                        alt={request.garage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Request Info */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(request.status)}>
                              {getStatusText(request.status)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="font-poppins text-lg font-semibold text-gray-900 mb-1">
                            {request.garage.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="text-sm">{request.garage.address}, {request.garage.district}</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <Euro className="w-4 h-4 mr-1" />
                              {request.garage.price}€/mes
                            </span>
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {request.parker.name}
                            </span>
                            {request.parker.rating && (
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {request.parker.rating}
                              </span>
                            )}
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {request.garage.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>

                          {/* Contact info if approved */}
                          {(request.status === 'approved' || request.status === 'visit_scheduled' || request.status === 'visit_completed') && request.parker.phone && (
                            <div className="p-3 bg-semantic-success/10 border border-semantic-success/20 rounded-lg mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-semantic-success" />
                                <span className="text-sm font-medium text-semantic-success">Contacto compartido</span>
                              </div>
                              <div className="text-sm text-gray-700 space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  <span>{request.parker.phone}</span>
                                </div>
                                {request.parker.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3" />
                                    <span>{request.parker.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Visit info */}
                          {request.visitDate && (
                            <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 rounded-lg mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <CalendarIcon className="w-4 h-4 text-brand-primary" />
                                <span className="text-sm font-medium text-brand-primary">
                                  {request.status === 'visit_completed' ? 'Visita realizada' : 'Visita programada'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-700">
                                {new Date(request.visitDate).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 min-w-0 sm:min-w-[200px]">
                          <Button
                            variant="outline"
                            onClick={() => handleViewDetails(request)}
                            className="btn-sm w-full"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </Button>

                          {request.status === 'visit_completed' && (
                            <Button
                              onClick={() => onNavigate('contract-wizard', { 
                                requestId: request.id,
                                garageId: request.garageId,
                                parkerId: request.parker.id
                              })}
                              className="btn-primary btn-sm w-full"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Generar contrato
                            </Button>
                          )}

                          {request.canCancel && (request.status === 'pending' || request.status === 'approved') && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="btn-sm w-full text-semantic-danger hover:text-semantic-danger"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Cancelar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Cancelar solicitud?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. La solicitud será cancelada 
                                    y se notificará al propietario.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="my-4">
                                  <Label htmlFor="cancel-reason">Motivo de cancelación (opcional)</Label>
                                  <Textarea
                                    id="cancel-reason"
                                    placeholder="Explica brevemente por qué cancelas..."
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="mt-2"
                                  />
                                </div>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setCancelReason('')}>
                                    No cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelRequest(request.id, cancelReason)}
                                    className="btn-danger"
                                  >
                                    Cancelar solicitud
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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

        {/* Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalles de la solicitud</DialogTitle>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-6">
                {/* Garage Info */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Información del garaje</h4>
                  <div className="flex gap-4">
                    <div className="w-24 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={selectedRequest.garage.images[0]}
                        alt={selectedRequest.garage.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{selectedRequest.garage.title}</h5>
                      <p className="text-sm text-gray-600">{selectedRequest.garage.address}, {selectedRequest.garage.district}</p>
                      <p className="text-sm text-gray-600">{selectedRequest.garage.price}€/mes</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tu mensaje</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedRequest.message}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Historial de la solicitud</h4>
                  <div className="space-y-3">
                    {selectedRequest.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getTimelineColor(event.type)}`}>
                          {getTimelineIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{event.action}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(event.date).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parker Info */}
                {selectedRequest.parker.phone && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Información de contacto</h4>
                    <div className="p-4 bg-semantic-success/10 border border-semantic-success/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedRequest.parker.avatar} alt={selectedRequest.parker.name} />
                          <AvatarFallback>
                            {selectedRequest.parker.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{selectedRequest.parker.name}</span>
                            {selectedRequest.parker.verified && (
                              <CheckCircle className="w-4 h-4 text-semantic-success" />
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{selectedRequest.parker.rating}</span>
                            <span className="text-sm text-gray-500">• {selectedRequest.parker.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{selectedRequest.parker.phone}</span>
                        </div>
                        {selectedRequest.parker.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{selectedRequest.parker.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}