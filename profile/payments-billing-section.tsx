import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { PAYMENT_METHODS, MOCK_PAYMENT_HISTORY } from './profile-constants';
import { 
  CreditCard, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Receipt,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { format, parseISO } from 'date-fns@4.1.0';
import { es } from 'date-fns@4.1.0/locale';

interface PaymentsBillingSectionProps {
  profile: any;
  onUpdate: (profile: any) => void;
  onUnsavedChanges: (hasChanges: boolean) => void;
}

export function PaymentsBillingSection({ profile, onUpdate, onUnsavedChanges }: PaymentsBillingSectionProps) {
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHODS);
  const [paymentHistory] = useState(MOCK_PAYMENT_HISTORY);
  const [showAddCard, setShowAddCard] = useState(false);

  const handleAddPaymentMethod = () => {
    setShowAddCard(true);
    // In real app, this would open Stripe modal or similar
    setTimeout(() => {
      toast.success('Método de pago añadido correctamente');
      setShowAddCard(false);
    }, 2000);
  };

  const handleRemovePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== methodId));
    toast.success('Método de pago eliminado');
  };

  const handleDownloadReceipt = (receiptId: string) => {
    // Mock download
    toast.success('Descargando recibo...');
    setTimeout(() => {
      toast.success('Recibo descargado');
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completado
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-semantic-danger/10 text-semantic-danger border-semantic-danger/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Fallido
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatCardNumber = (last4: string, brand: string) => {
    return `•••• •••• •••• ${last4}`;
  };

  const getCardIcon = (brand: string) => {
    return <CreditCard className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Métodos de pago
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Gestiona tus tarjetas y métodos de pago
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir tarjeta
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No hay métodos de pago</h3>
              <p className="text-sm text-gray-500 mb-4">
                Añade una tarjeta para realizar pagos automáticos
              </p>
              <Button onClick={handleAddPaymentMethod}>
                <Plus className="mr-2 h-4 w-4" />
                Añadir primera tarjeta
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      {getCardIcon(method.brand)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          {method.brand} {formatCardNumber(method.last4, method.brand)}
                        </h4>
                        {method.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Predeterminada
                          </Badge>
                        )}
                        {method.status === 'active' && (
                          <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Activa
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Expira {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button variant="ghost" size="sm">
                        Predeterminada
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showAddCard && (
            <div className="mt-4 p-4 border-2 border-dashed border-brand-primary rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="font-medium text-brand-primary">Procesando...</p>
                  <p className="text-sm text-blue-700">Redirigiendo a la pasarela de pago segura</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Historial de pagos
          </CardTitle>
          <p className="text-sm text-gray-600">
            Consulta y descarga tus recibos y facturas
          </p>
        </CardHeader>

        <CardContent>
          {paymentHistory.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No hay pagos registrados</h3>
              <p className="text-sm text-gray-500">
                Aquí aparecerán tus pagos cuando realices transacciones
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Importe</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {format(parseISO(payment.date), 'dd/MM/yyyy', { locale: es })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{payment.description}</p>
                          <p className="text-xs text-gray-500">ID: {payment.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{payment.amount}€</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.receipt && payment.status === 'completed' ? (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadReceipt(payment.receipt!)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        ) : (
                          <span className="text-xs text-gray-400">
                            {payment.status === 'pending' ? 'Pendiente' : 'No disponible'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-semantic-success/10 rounded-lg mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-semantic-success" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Pagos completados</h4>
              <p className="text-2xl font-bold text-semantic-success">
                {paymentHistory.filter(p => p.status === 'completed').length}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-lg mx-auto mb-2">
                <DollarSign className="h-6 w-6 text-brand-primary" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Total pagado</h4>
              <p className="text-2xl font-bold text-brand-primary">
                {paymentHistory
                  .filter(p => p.status === 'completed')
                  .reduce((sum, p) => sum + p.amount, 0)}€
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-semantic-warn/10 rounded-lg mx-auto mb-2">
                <AlertCircle className="h-6 w-6 text-semantic-warn" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Pagos pendientes</h4>
              <p className="text-2xl font-bold text-semantic-warn">
                {paymentHistory.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}