import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, Check } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}

export function PhoneInput({ 
  value, 
  onChange, 
  error, 
  disabled, 
  label = "Teléfono móvil",
  required = false
}: PhoneInputProps) {
  const [touched, setTouched] = useState(false);
  const [countryCode, setCountryCode] = useState('+34');
  
  const countryCodes = [
    { code: '+34', country: 'España', flag: '🇪🇸' },
    { code: '+33', country: 'Francia', flag: '🇫🇷' },
    { code: '+49', country: 'Alemania', flag: '🇩🇪' },
    { code: '+39', country: 'Italia', flag: '🇮🇹' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  ];
  
  const formatPhoneNumber = (number: string) => {
    // Remove all non-digits
    const digits = number.replace(/\D/g, '');
    
    if (countryCode === '+34') {
      // Spanish format: XXX XXX XXX
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    }
    
    return digits;
  };
  
  const isValidPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 9;
  };
  
  const showError = touched && error;
  const showSuccess = touched && value && isValidPhone(value) && !error;
  const fullNumber = `${countryCode} ${value}`;
  
  return (
    <div className="form-field">
      <Label htmlFor="phone">
        {label}
        {required && <span className="text-semantic-danger ml-1">*</span>}
      </Label>
      
      <div className="flex gap-2">
        <Select
          value={countryCode}
          onValueChange={setCountryCode}
          disabled={disabled}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex-1 relative">
          <Input
            id="phone"
            type="tel"
            value={value}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              onChange(formatted);
            }}
            onBlur={() => setTouched(true)}
            placeholder="600 123 456"
            disabled={disabled}
            className={`pr-10 ${showError ? 'border-semantic-danger bg-semantic-danger/5' : ''} ${showSuccess ? 'border-semantic-success bg-semantic-success/5' : ''}`}
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={error ? 'phone-error' : 'phone-help'}
          />
          
          {showError && (
            <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-semantic-danger" />
          )}
          
          {showSuccess && (
            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-semantic-success" />
          )}
        </div>
      </div>
      
      {showError && (
        <div className="error-text" id="phone-error" role="alert">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
      
      {!showError && (
        <div className="help-text" id="phone-help">
          Formato completo: {fullNumber.replace(value, value || '600 123 456')}
        </div>
      )}
    </div>
  );
}