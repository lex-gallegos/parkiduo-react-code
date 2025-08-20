import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status?: 'pending' | 'current' | 'completed';
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  variant?: 'default' | 'compact';
  className?: string;
}

export function SimpleStepper({ steps, currentStep, variant = 'default', className = '' }: StepperProps) {
  const getStepStatus = (index: number): 'pending' | 'current' | 'completed' => {
    if (index < currentStep - 1) return 'completed';
    if (index === currentStep - 1) return 'current';
    return 'pending';
  };

  const getStepStyles = (status: 'pending' | 'current' | 'completed') => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-semantic-success border-semantic-success',
          icon: 'text-white',
          title: 'text-semantic-success font-medium',
          connector: 'bg-semantic-success'
        };
      case 'current':
        return {
          circle: 'bg-brand-primary border-brand-primary',
          icon: 'text-white',
          title: 'text-brand-primary font-semibold',
          connector: 'bg-gray-300'
        };
      case 'pending':
      default:
        return {
          circle: 'bg-gray-100 border-gray-300',
          icon: 'text-gray-500',
          title: 'text-gray-500',
          connector: 'bg-gray-300'
        };
    }
  };

  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const styles = getStepStyles(status);
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center space-y-2">
                {/* Step Circle */}
                <div className={`
                  relative flex items-center justify-center rounded-full border-2 
                  w-10 h-10 transition-all duration-200 ease-in-out
                  ${styles.circle}
                `}>
                  {status === 'completed' ? (
                    <Check className={`w-5 h-5 ${styles.icon}`} />
                  ) : (
                    <step.icon className={`w-5 h-5 ${styles.icon}`} />
                  )}
                </div>
                
                {/* Step Title */}
                <span className={`text-sm text-center ${styles.title}`}>
                  {step.title}
                </span>
              </div>
              
              {/* Connector */}
              {!isLast && (
                <div className={`h-0.5 w-16 ${styles.connector} transition-all duration-200`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}