import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import FormNavigation from "@/components/form/FormNavigation";
import FormActions from "@/components/form/FormActions";
import StepContent from "@/components/form/StepContent";

interface CustomerFormProps {
  onCancel: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const CustomerForm = ({ onCancel, initialData = null, isEditing = false }: CustomerFormProps) => {
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
    
    // Features Info
    sources: [],
    readFromSAP: false,
    rangeVolumentria: "",
    sourceFormat: "",
    usage: [],
    specificTableTypes: "",
    canAdminPlatform: "",
    hasDwhByProcessing: "",
    pushdownOperations: "",
    dynamicScaling: "",
    multiclustering: "",
    notebooksUsage: "",
    storedProcedures: "",
    cteUsage: "",
    snowflakeApi: "",
    snowpark: "",
    snowflakeOrchestrator: "",
    kafkaConnector: "",
    snowpipe: "",
    cortexIA: "",
    projectType: "",
    streamlitApps: "",
    snowparkTraining: "",
    developmentPotential: "",
    environmentReplication: "",
    zeroCopyCloning: "",
    timeTravel: "",
    dataCopyStrategy: "",
    infraTeamExists: "",
    networkControls: "",
    rolesManagement: "",
    maskingPolicies: "",
    mfaActive: "",
    authPolicies: "",
    serviceUsersAuth: "",
    encryptionMeasures: "",
    
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
    
    // Aceleradores
    aceleradores: [
      {
        artefacto: "",
        objetivo: "",
        desarrollo: "",
        technologyBase: [],
        technology: [],
        dataIngestion: false,
        dataTransformation: false,
        monitoring: false,
        securitization: false,
        dataModeling: false,
        mlops: false,
        cicd: false
      }
    ]
  });

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData(initialData);
    }
  }, [initialData, isEditing]);

  const handleFormUpdate = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
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
    
    try {
      const existingCustomers = localStorage.getItem("customers") 
        ? JSON.parse(localStorage.getItem("customers") as string) 
        : [];
      
      if (isEditing) {
        const updatedCustomers = existingCustomers.map((customer: any) => {
          if (customer.customerName === initialData.customerName) {
            return formData;
          }
          return customer;
        });
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      } else {
        const updatedCustomers = [...existingCustomers, formData];
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
      }
      
      toast({
        title: isEditing ? "Customer updated successfully!" : "Customer added successfully!",
        description: `${formData.customerName || "Customer"} has been ${isEditing ? 'updated in' : 'added to'} the database.`,
        variant: "default",
      });
      
      if (typeof window !== 'undefined' && 
          typeof (window as any).google !== 'undefined' && 
          (window as any).google.script) {
        toast({
          title: "Saving data...",
          description: "Please wait while we save your data.",
        });
        
        (window as any).google.script.run
          .withSuccessHandler((response: any) => {
            if (response.success) {
              toast({
                title: isEditing ? "Customer updated successfully!" : "Customer added successfully!",
                description: response.message,
                variant: "default",
              });
              onCancel();
            } else {
              toast({
                title: "Error",
                description: response.message,
                variant: "destructive",
              });
            }
          })
          .withFailureHandler((error: Error) => {
            toast({
              title: "Error saving customer data",
              description: error.message,
              variant: "destructive",
            });
          })
          .saveCustomerData(formData, isEditing);
      } else {
        onCancel();
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast({
        title: "Error",
        description: "Failed to save customer data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full mx-auto">
      <Card className="p-6 shadow-md bg-white">
        <FormNavigation 
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        <div className="mt-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? `Edit Customer: ${initialData?.customerName}` : formSteps[currentStep - 1].name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {currentStep < 5 ? `Step ${currentStep} of 4` : "Review your information"}
          </p>
        </div>

        <StepContent 
          currentStep={currentStep}
          formData={formData}
          onUpdate={handleFormUpdate}
        />

        <FormActions 
          currentStep={currentStep}
          isEditing={isEditing}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onCancel={onCancel}
        />
      </Card>
    </div>
  );
};

export default CustomerForm;
