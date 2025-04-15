
import { ChevronRight, Check } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { formSteps } from "@/utils/formSteps";

interface FormNavigationProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormNavigation = ({ currentStep, setCurrentStep }: FormNavigationProps) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {formSteps.map((step, index) => (
          <BreadcrumbItem key={step.id} className="flex items-center">
            <BreadcrumbLink 
              onClick={() => currentStep > step.id ? setCurrentStep(step.id) : null}
              className={`flex items-center ${
                currentStep >= step.id ? 'text-purple-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-sm ${
                currentStep > step.id ? 'bg-green-500 text-white' : 
                currentStep === step.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? <Check size={14} /> : step.id}
              </span>
              {step.name}
            </BreadcrumbLink>
            {index < formSteps.length - 1 && <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default FormNavigation;
