
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EventFormStep } from '../types';

interface FormStepperProps {
  steps: EventFormStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const FormStepper: React.FC<FormStepperProps> = ({ 
  steps, 
  currentStep,
  onStepClick 
}) => {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => (
          <li 
            key={index} 
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : "",
              index < currentStep ? "text-primary" : "text-gray-500"
            )}
            onClick={() => onStepClick && index <= currentStep && onStepClick(index)}
          >
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors cursor-pointer",
                  index < currentStep 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : index === currentStep 
                      ? "border-primary text-primary" 
                      : "border-gray-300"
                )}
              >
                {index < currentStep ? (
                  <Check size={18} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-sm text-center">{step.title}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "w-full h-0.5 transition-colors", 
                  index < currentStep ? "bg-primary" : "bg-gray-300"
                )}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FormStepper;
