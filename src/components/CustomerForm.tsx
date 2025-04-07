import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ArquitecturaForm from "@/components/form-steps/ArquitecturaForm";
import ContactInfoForm from "@/components/form-steps/ContactInfoForm";
import AddressInfoForm from "@/components/form-steps/AddressInfoForm";
import BusinessInfoForm from "@/components/form-steps/BusinessInfoForm";
import PreferencesForm from "@/components/form-steps/PreferencesForm";
import ReviewScreen from "@/components/form-steps/ReviewScreen";

interface CustomerFormProps {
  onCancel: () => void;
}

const CustomerForm = ({ onCancel }: CustomerFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Arquitectura Info
    customerName: "",
    antiguedad: "",
    
    // Snowflake Info
    tipoLicencia: "",
    cloud: "",
    tallaje: "",
    comments: "",
    
    // Section fields
    section2Field1: "",
    section2Field2: "",
    section3Field1: "",
    section3Field2: "",
    section4Field1: "",
    section4Field2: "",
    section5Field1: "",
    section5Field2: "",
    section6Field1: "",
    section6Field2: "",
    section7Field1: "",
    section7Field2: "",
    section8Field1: "",
    section8Field2: "",
    
    // Contact Info
    phoneNumber: "",
    mobileNumber: "",
    workPhone: "",
    alternativeEmail: "",
    preferredContactMethod: "",
    socialMedia1: "",
    socialMedia2: "",
    website: "",
    faxNumber: "",
    emergencyContact: "",
    
    // Address Info
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    addressType: "",
    billingAddressSame: true,
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",
    
    // Business Info
    companyName: "",
    businessType: "",
    industry: "",
    annualRevenue: "",
    numberOfEmployees: "",
    taxIdNumber: "",
    registrationNumber: "",
    yearEstablished: "",
    websiteUrl: "",
    linkedInProfile: "",
    
    // Preferences
    preferredLanguage: "",
    communicationFrequency: "",
    subscribeNewsletter: false,
    marketingConsent: false,
    preferredPaymentMethod: "",
    creditLimit: "",
    currency: "",
    timezone: "",
    accountType: "",
    tags: "",
  });

  const steps = [
    { id: 1, name: "Arquitectura" },
    { id: 2, name: "Contact Info" },
    { id: 3, name: "Address" },
    { id: 4, name: "Business Info" },
    { id: 5, name: "Preferences" },
    { id: 6, name: "Review" }
  ];

  const handleFormUpdate = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting customer data:", formData);
    
    toast({
      title: "Customer added successfully!",
      description: `${formData.customerName || "Customer"} has been added to the database.`,
      variant: "default",
    });
    
    onCancel();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ArquitecturaForm data={formData} onUpdate={handleFormUpdate} />;
      case 2:
        return <ContactInfoForm data={formData} onUpdate={handleFormUpdate} />;
      case 3:
        return <AddressInfoForm data={formData} onUpdate={handleFormUpdate} />;
      case 4:
        return <BusinessInfoForm data={formData} onUpdate={handleFormUpdate} />;
      case 5:
        return <PreferencesForm data={formData} onUpdate={handleFormUpdate} />;
      case 6:
        return <ReviewScreen data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="p-6 shadow-md bg-white">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            {steps.map((step, index) => (
              <BreadcrumbItem key={step.id} className="flex items-center">
                <BreadcrumbLink 
                  onClick={() => currentStep > step.id ? setCurrentStep(step.id) : null}
                  className={`flex items-center ${
                    currentStep >= step.id ? 'text-blue-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 text-sm ${
                    currentStep > step.id ? 'bg-green-500 text-white' : 
                    currentStep === step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <Check size={14} /> : step.id}
                  </span>
                  {step.name}
                </BreadcrumbLink>
                {index < steps.length - 1 && <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {steps[currentStep - 1].name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {currentStep < 6 ? `Step ${currentStep} of ${steps.length - 1}` : "Review your information"}
          </p>
        </div>

        {renderStepContent()}

        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onCancel : handlePrevious}
          >
            {currentStep === 1 ? "Cancel" : "Previous"}
          </Button>

          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={currentStep === 6 ? handleSubmit : handleNext}
          >
            {currentStep === 6 ? "Submit" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CustomerForm;
