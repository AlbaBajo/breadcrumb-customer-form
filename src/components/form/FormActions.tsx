
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  currentStep: number;
  isEditing: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

const FormActions = ({ currentStep, isEditing, onPrevious, onNext, onCancel }: FormActionsProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 5;

  return (
    <div className="mt-8 flex justify-between">
      <Button 
        variant="outline" 
        onClick={isFirstStep ? onCancel : onPrevious}
      >
        {isFirstStep ? "Cancel" : "Previous"}
      </Button>

      <Button 
        className="bg-purple-600 hover:bg-purple-700"
        onClick={onNext}
      >
        {isLastStep ? (isEditing ? "Update" : "Submit") : "Next"}
      </Button>
    </div>
  );
};

export default FormActions;
