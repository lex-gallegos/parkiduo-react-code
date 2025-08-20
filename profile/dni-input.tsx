import { useState } from 'react';
import { Input } from '../ui/input';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface DNIInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DNIInput({ id, value, onChange, error }: DNIInputProps) {
  const [isValid, setIsValid] = useState(false);

  const validateDNI = (dni: string): boolean => {
    // Remove any non-alphanumeric characters and convert to uppercase
    const cleanDNI = dni.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Spanish DNI format: 8 digits + letter
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    // Spanish NIE format: X/Y/Z + 7 digits + letter  
    const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    
    if (!dniRegex.test(cleanDNI) && !nieRegex.test(cleanDNI)) {
      return false;
    }

    // Validate check letter for DNI
    if (dniRegex.test(cleanDNI)) {
      const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const number = parseInt(cleanDNI.slice(0, 8));
      const letter = cleanDNI.charAt(8);
      const expectedLetter = letters[number % 23];
      return letter === expectedLetter;
    }

    // Validate check letter for NIE
    if (nieRegex.test(cleanDNI)) {
      const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const nieLetterValues = { 'X': '0', 'Y': '1', 'Z': '2' };
      const firstChar = cleanDNI.charAt(0) as 'X' | 'Y' | 'Z';
      const number = parseInt(nieLetterValues[firstChar] + cleanDNI.slice(1, 8));
      const letter = cleanDNI.charAt(8);
      const expectedLetter = letters[number % 23];
      return letter === expectedLetter;
    }

    return false;
  };

  const formatDNI = (input: string): string => {
    // Remove any non-alphanumeric characters
    const cleaned = input.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Limit to 9 characters
    const limited = cleaned.slice(0, 9);
    
    // Add hyphen before last character if we have enough characters
    if (limited.length > 8) {
      return limited.slice(0, 8) + '-' + limited.slice(8);
    } else if (limited.length > 0) {
      return limited;
    }
    
    return limited;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatDNI(rawValue);
    const cleanValue = rawValue.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Validate the clean value
    const valid = cleanValue.length === 9 && validateDNI(cleanValue);
    setIsValid(valid);
    
    // Send the clean value to parent
    onChange(cleanValue);
  };

  const getStatusIcon = () => {
    if (!value) return null;
    
    if (error) {
      return <AlertCircle className="h-4 w-4 text-semantic-danger" />;
    }
    
    if (isValid) {
      return <CheckCircle className="h-4 w-4 text-semantic-success" />;
    }
    
    if (value.length > 0) {
      return <AlertCircle className="h-4 w-4 text-semantic-warn" />;
    }
    
    return null;
  };

  const displayValue = value ? formatDNI(value) : '';
  const statusIcon = getStatusIcon();

  return (
    <div className="relative">
      <Input
        id={id}
        value={displayValue}
        onChange={handleChange}
        placeholder="12345678Z"
        maxLength={10} // 8 digits + hyphen + letter
        className={`pr-10 ${error ? 'border-semantic-danger' : 
                   isValid ? 'border-semantic-success' : ''}`}
      />
      {statusIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {statusIcon}
        </div>
      )}
      {!error && value && !isValid && value.length < 9 && (
        <p className="text-xs text-gray-500 mt-1">
          Formato: 8 dígitos + letra. Ej: 12345678Z
        </p>
      )}
      {!error && value && !isValid && value.length === 9 && (
        <p className="text-xs text-semantic-warn mt-1">
          La letra de control no es correcta
        </p>
      )}
      {isValid && (
        <p className="text-xs text-semantic-success mt-1">
          DNI/NIE válido
        </p>
      )}
    </div>
  );
}