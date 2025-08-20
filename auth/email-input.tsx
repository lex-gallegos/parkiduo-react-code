import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertCircle, Check } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function EmailInput({ 
  value, 
  onChange, 
  error, 
  disabled, 
  placeholder = "tu@correo.com",
  label = "Correo electrónico",
  required = true
}: EmailInputProps) {
  const [touched, setTouched] = useState(false);
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const showError = touched && error;
  const showSuccess = touched && value && isValidEmail(value) && !error;
  
  return (
    <div className="form-field">
      <Label htmlFor="email">
        {label}
        {required && <span className="text-semantic-danger ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id="email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`pr-10 ${showError ? 'border-semantic-danger bg-semantic-danger/5' : ''} ${showSuccess ? 'border-semantic-success bg-semantic-success/5' : ''}`}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={error ? 'email-error' : undefined}
        />
        
        {showError && (
          <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-semantic-danger" />
        )}
        
        {showSuccess && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-semantic-success" />
        )}
      </div>
      
      {showError && (
        <div className="error-text" id="email-error" role="alert">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
      
      {!showError && !showSuccess && (
        <div className="help-text">
          Ejemplo: {placeholder}
        </div>
      )}
    </div>
  );
}