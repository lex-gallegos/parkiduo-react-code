import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import parkiduoLogo from 'figma:asset/93b4fbbfb3db383e44ab8c7a1758731f76f35f4c.png';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showLogo?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

export function AuthCard({ 
  title, 
  subtitle, 
  children, 
  showLogo = true, 
  showBackButton = false,
  onBack,
  backLabel = 'Volver'
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Back button - Similar to onboarding style */}
        {showBackButton && onBack && (
          <div className="mb-8">
            <div className="flex justify-start">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 flex-shrink-0"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
              </Button>
            </div>
          </div>
        )}

        {/* Logo section - More compact */}
        {showLogo && (
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 flex items-center justify-center">
              <img 
                src={parkiduoLogo} 
                alt="Parkiduo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        )}
        
        {/* Main card - Similar to onboarding style */}
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-poppins font-bold text-gray-900">
              {title}
            </CardTitle>
            {subtitle && (
              <CardDescription className="text-gray-600 mt-2">
                {subtitle}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}