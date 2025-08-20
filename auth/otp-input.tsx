import { useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle } from 'lucide-react';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  label?: string;
}

export function OTPInput({ 
  value, 
  onChange, 
  length = 6, 
  error, 
  disabled,
  label = "Código de verificación"
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const digits = value.split('').slice(0, length);
  while (digits.length < length) {
    digits.push('');
  }
  
  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);
  
  const handleChange = (index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;
    
    const newDigits = [...digits];
    newDigits[index] = digit.slice(-1); // Only take the last digit
    
    const newValue = newDigits.join('');
    onChange(newValue);
    
    // Auto-advance to next input
    if (digit && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setFocusedIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setFocusedIndex(index + 1);
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    if (pastedData.length === length) {
      setFocusedIndex(length - 1);
    } else {
      setFocusedIndex(Math.min(pastedData.length, length - 1));
    }
  };
  
  return (
    <div className="form-field">
      <Label>{label}</Label>
      
      <div className="flex gap-3 justify-center">
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`w-12 h-12 text-center text-lg font-mono ${error ? 'border-semantic-danger bg-semantic-danger/5' : ''}`}
            aria-label={`Dígito ${index + 1} de ${length}`}
            aria-invalid={error ? 'true' : 'false'}
          />
        ))}
      </div>
      
      {error && (
        <div className="error-text text-center" role="alert">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
      
      <div className="help-text text-center">
        Introduce el código de {length} dígitos que te hemos enviado
      </div>
    </div>
  );
}