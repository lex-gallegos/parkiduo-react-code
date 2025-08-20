import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  onSubmit: (phone: string) => void;
  onCancel: () => void;
}

export function PhoneInput({ value, onChange, onSubmit, onCancel }: PhoneInputProps) {
  const [formattedPhone, setFormattedPhone] = useState(value);
  const [error, setError] = useState('');

  // Format phone number as user types
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits except + at the start
    const cleaned = input.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +34 for Spanish numbers
    let formatted = cleaned;
    if (!formatted.startsWith('+34')) {
      if (formatted.startsWith('34')) {
        formatted = '+' + formatted;
      } else if (formatted.startsWith('+')) {
        // Keep existing country code
      } else {
        formatted = '+34' + formatted;
      }
    }
    
    // Format Spanish numbers: +34 xxx xxx xxx
    if (formatted.startsWith('+34')) {
      const digits = formatted.slice(3);
      if (digits.length <= 3) {
        formatted = '+34 ' + digits;
      } else if (digits.length <= 6) {
        formatted = '+34 ' + digits.slice(0, 3) + ' ' + digits.slice(3);
      } else {
        formatted = '+34 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 9);
      }
    }
    
    return formatted;
  };

  const validatePhone = (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    if (!cleaned.startsWith('+34')) {
      return 'El número debe ser español (+34)';
    }
    
    const digits = cleaned.slice(3);
    if (digits.length !== 9) {
      return 'El número debe tener 9 dígitos';
    }
    
    // Basic Spanish mobile number validation (6xx, 7xx, 9xx)
    const firstDigit = digits[0];
    if (!['6', '7', '9'].includes(firstDigit)) {
      return 'Número de teléfono no válido';
    }
    
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormattedPhone(formatted);
    onChange(formatted.replace(/\s/g, '')); // Send without spaces
    
    // Clear error on change
    if (error) {
      setError('');
    }
  };

  const handleSubmit = () => {
    const validationError = validatePhone(formattedPhone);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onSubmit(formattedPhone.replace(/\s/g, ''));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Nuevo número de teléfono</Label>
        <div className="space-y-1">
          <Input
            id="phone"
            type="tel"
            value={formattedPhone}
            onChange={handlePhoneChange}
            placeholder="+34 612 345 678"
            className={error ? 'border-semantic-danger' : ''}
          />
          {error && (
            <p className="text-sm text-semantic-danger flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Te enviaremos un código de verificación por SMS
        </p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={!!error || !formattedPhone}>
          Verificar número
        </Button>
      </div>
    </div>
  );
}