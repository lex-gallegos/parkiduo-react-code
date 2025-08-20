import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PhoneVerificationDialogProps {
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function PhoneVerificationDialog({ phone, onVerified, onCancel }: PhoneVerificationDialogProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const maxAttempts = 3;
  const correctCode = '123456'; // Mock verification code

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Auto-submit when 6 digits entered
  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    if (error) setError('');
  };

  const handleVerify = () => {
    if (code === correctCode) {
      onVerified();
      toast.success('¡Número verificado correctamente!');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= maxAttempts) {
        setError(`Código incorrecto. Has agotado los ${maxAttempts} intentos. Inténtalo más tarde.`);
      } else {
        setError(`Código incorrecto. Te quedan ${maxAttempts - newAttempts} intento${maxAttempts - newAttempts !== 1 ? 's' : ''}.`);
      }
      setCode('');
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(60);
    setCode('');
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Código reenviado');
    } catch (error) {
      toast.error('Error al reenviar el código');
    } finally {
      setIsResending(false);
    }
  };

  const formatPhone = (phone: string) => {
    // Format phone for display
    if (phone.startsWith('+34')) {
      const digits = phone.slice(3);
      if (digits.length === 9) {
        return `+34 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      }
    }
    return phone;
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Verificar número
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="h-8 w-8 text-brand-primary" />
            </div>
            <p className="text-gray-600">
              Te hemos enviado un código de verificación por SMS al número:
            </p>
            <p className="font-semibold text-lg">{formatPhone(phone)}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code">
                Código de verificación
              </Label>
              <Input
                id="verification-code"
                value={code}
                onChange={handleCodeChange}
                placeholder="123456"
                maxLength={6}
                className={`text-center text-2xl tracking-widest ${error ? 'border-semantic-danger' : ''}`}
                disabled={attempts >= maxAttempts}
              />
              {error && (
                <p className="text-sm text-semantic-danger flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <div className="text-center text-sm text-gray-500">
              {!canResend && timeLeft > 0 && (
                <p>
                  Puedes solicitar un nuevo código en {timeLeft} segundo{timeLeft !== 1 ? 's' : ''}
                </p>
              )}
              {canResend && attempts < maxAttempts && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? 'Reenviando...' : 'Reenviar código'}
                </Button>
              )}
            </div>
          </div>

          {attempts < maxAttempts && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleVerify} 
                disabled={code.length !== 6}
                className="flex-1"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Verificar
              </Button>
            </div>
          )}

          {attempts >= maxAttempts && (
            <div className="space-y-3">
              <div className="bg-semantic-danger/10 border border-semantic-danger/20 rounded-lg p-3">
                <p className="text-sm text-semantic-danger">
                  Has superado el número máximo de intentos. Por favor, inténtalo más tarde o contacta con soporte.
                </p>
              </div>
              <Button variant="outline" onClick={onCancel} className="w-full">
                Cerrar
              </Button>
            </div>
          )}

          {/* Help text */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>¿No has recibido el código?</p>
            <p>• Comprueba tu bandeja de SMS</p>
            <p>• Verifica que el número es correcto</p>
            <p>• Espera unos minutos antes de reenviar</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}