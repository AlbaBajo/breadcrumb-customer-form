
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ContactInfoForm = ({ data, onUpdate }: ContactInfoFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Contact Information</h3>
      <p className="text-sm text-gray-500">Enter the customer's contact details</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="e.g., +1 (555) 123-4567"
            value={data.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            placeholder="e.g., +1 (555) 987-6543"
            value={data.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workPhone">Work Phone</Label>
          <Input
            id="workPhone"
            name="workPhone"
            placeholder="e.g., +1 (555) 456-7890"
            value={data.workPhone}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alternativeEmail">Alternative Email</Label>
          <Input
            id="alternativeEmail"
            name="alternativeEmail"
            type="email"
            placeholder="e.g., john.work@example.com"
            value={data.alternativeEmail}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
          <Select 
            value={data.preferredContactMethod} 
            onValueChange={(value) => handleSelectChange("preferredContactMethod", value)}
          >
            <SelectTrigger id="preferredContactMethod">
              <SelectValue placeholder="Select contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="mail">Mail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="socialMedia1">Social Media 1</Label>
          <Input
            id="socialMedia1"
            name="socialMedia1"
            placeholder="e.g., Twitter: @johndoe"
            value={data.socialMedia1}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="socialMedia2">Social Media 2</Label>
          <Input
            id="socialMedia2"
            name="socialMedia2"
            placeholder="e.g., Instagram: @johndoe"
            value={data.socialMedia2}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            placeholder="e.g., www.johndoe.com"
            value={data.website}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="faxNumber">Fax Number</Label>
          <Input
            id="faxNumber"
            name="faxNumber"
            placeholder="e.g., +1 (555) 123-4560"
            value={data.faxNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            name="emergencyContact"
            placeholder="Name and phone number"
            value={data.emergencyContact}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
