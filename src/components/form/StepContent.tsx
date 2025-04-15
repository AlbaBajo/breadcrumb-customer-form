
import ArquitecturaForm from "@/components/form-steps/ArquitecturaForm";
import FeaturesForm from "@/components/form-steps/FeaturesForm";
import ReviewScreen from "@/components/form-steps/ReviewScreen";
import AceleradoresForm from "@/components/form-steps/AceleradoresForm";
import ContactInfoForm from "@/components/form-steps/ContactInfoForm";

interface StepContentProps {
  currentStep: number;
  formData: any;
  onUpdate: (data: any) => void;
}

const StepContent = ({ currentStep, formData, onUpdate }: StepContentProps) => {
  switch (currentStep) {
    case 1:
      return <ArquitecturaForm data={formData} onUpdate={onUpdate} />;
    case 2:
      return <FeaturesForm data={formData} onUpdate={onUpdate} />;
    case 3:
      return <AceleradoresForm data={formData} onUpdate={onUpdate} />;
    case 4:
      return <ContactInfoForm data={formData} onUpdate={onUpdate} />;
    case 5:
      return <ReviewScreen data={formData} />;
    default:
      return null;
  }
};

export default StepContent;
