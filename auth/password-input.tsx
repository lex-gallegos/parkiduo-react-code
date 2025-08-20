import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { Progress } from '../ui/progress';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  showStrength?: boolean;
  placeholder?: string;
}

export function PasswordInput({ 
  value, 
  onChange, 
  error, 
  disabled, 
  label = "Contraseña",
  required = true,
  showStrength = false,
  placeholder = "Introduce tu contraseña"
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    return {
      strength,
      checks,
      percentage: (strength / 5) * 100,
      label: strength < 2 ? 'Débil' : strength < 4 ? 'Media' : 'Fuerte',
      color: strength < 2 ? 'bg-semantic-danger' : strength < 4 ? 'bg-semantic-warn' : 'bg-semantic-success'
    };
  };
  
  const passwordData = getPasswordStrength(value);
  const showError = touched && error;
  const showSuccess = touched && value && passwordData.strength >= 3 && !error;
  
  return (
    <div className="form-field">
      <Label htmlFor="password">
        {label}
        {required && <span className="text-semantic-danger ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`pr-20 ${showError ? 'border-semantic-danger bg-semantic-danger/5' : ''} ${showSuccess ? 'border-semantic-success bg-semantic-success/5' : ''}`}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={error ? 'password-error' : showStrength ? 'password-strength' : undefined}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {showError && (
            <AlertCircle className="w-4 h-4 text-semantic-danger" />
          )}
          
          {showSuccess && (
            <Check className="w-4 h-4 text-semantic-success" />
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      {showStrength && value && touched && (
        <div className="space-y-2" id="password-strength">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Seguridad:</span>
            <span className={`text-xs font-medium ${passwordData.color.replace('bg-', 'text-')}`}>
              {passwordData.label}
            </span>
          </div>
          <Progress value={passwordData.percentage} className="h-1" />
          
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${passwordData.checks.length ? 'bg-semantic-success' : 'bg-gray-300'}`} />
              Al menos 8 caracteres
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${passwordData.checks.uppercase && passwordData.checks.lowercase ? 'bg-semantic-success' : 'bg-gray-300'}`} />
              Mayúsculas y minúsculas
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${passwordData.checks.number ? 'bg-semantic-success' : 'bg-gray-300'}`} />
              Al menos un número
            </div>
          </div>
        </div>
      )}
      
      {showError && (
        <div className="error-text" id="password-error" role="alert">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
}