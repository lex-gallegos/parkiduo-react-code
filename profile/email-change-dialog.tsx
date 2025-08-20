import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { AlertCircle, Mail, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmailChangeDialogProps {
  currentEmail: string;
  onEmailUpdated: (newEmail: string) => void;
  onCancel: () => void;
}

export function EmailChangeDialog({ currentEmail, onEmailUpdated, onCancel }: EmailChangeDialogProps) {
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'input' | 'confirmation' | 'success'>('input');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'El email es obligatorio';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'El formato del email no es válido';
    }
    
    if (email === currentEmail) {
      return 'El nuevo email debe ser diferente al actual';
    }
    
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    if (error) setError('');
  };

  const handleSendConfirmation = async () => {
    const validationError = validateEmail(newEmail);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to send confirmation email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('confirmation');
      toast.success('Email de confirmación enviado');
    } catch (error) {
      toast.error('Error al enviar el email de confirmación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmChange = async () => {
    setIsLoading(true);
    try {
      // Simulate confirmation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('success');
      
      // Simulate auto-confirmation after a short delay
      setTimeout(() => {
        onEmailUpdated(newEmail);
      }, 1500);
    } catch (error) {
      toast.error('Error al confirmar el cambio');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Cambiar email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'input' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email actual</Label>
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <span className="text-gray-700">{currentEmail}</span>
                    <Badge className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-email">Nuevo email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                    placeholder="nuevo.email@ejemplo.com"
                    className={error ? 'border-semantic-danger' : ''}
                  />
                  {error && (
                    <p className="text-sm text-semantic-danger flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-1">¿Cómo funciona?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Te enviaremos un enlace de confirmación al nuevo email</li>
                    <li>• Haz clic en el enlace para confirmar el cambio</li>
                    <li>• Tu email se actualizará automáticamente</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onCancel} className="flex-1">
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSendConfirmation}
                  disabled={!newEmail || !!error || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar confirmación
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {step === 'confirmation' && (
            <>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-brand-primary" />
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Confirma tu nuevo email</h3>
                  <p className="text-gray-600">
                    Te hemos enviado un enlace de confirmación a:
                  </p>
                  <p className="font-medium text-brand-primary mt-1">{newEmail}</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-800">
                    <strong>Importante:</strong> Tu email actual seguirá activo hasta que confirmes el cambio.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleConfirmChange}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Confirmando...
                    </>
                  ) : (
                    'Ya he confirmado el enlace'
                  )}
                </Button>
                
                <Button variant="outline" onClick={onCancel} className="w-full">
                  Cancelar cambio
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>¿No has recibido el email?</p>
                <p>• Revisa tu carpeta de spam</p>
                <p>• Verifica que el email es correcto</p>
                <p>• El enlace expira en 24 horas</p>
              </div>
            </>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-semantic-success" />
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">¡Email actualizado!</h3>
                <p className="text-gray-600">
                  Tu nuevo email se ha configurado correctamente y está verificado.
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-semantic-success">{newEmail}</p>
                <p className="text-sm text-green-700 mt-1">Nuevo email verificado</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}