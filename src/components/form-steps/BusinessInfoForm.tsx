
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const BusinessInfoForm = ({ data, onUpdate }: BusinessInfoFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Business Information</h3>
      <p className="text-sm text-gray-500">Enter the customer's business details</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="e.g., Acme Corporation"
            value={data.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select 
            value={data.businessType} 
            onValueChange={(value) => handleSelectChange("businessType", value)}
          >
            <SelectTrigger id="businessType">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
              <SelectItem value="non-profit">Non-Profit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            name="industry"
            placeholder="e.g., Technology"
            value={data.industry}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="annualRevenue">Annual Revenue</Label>
          <Input
            id="annualRevenue"
            name="annualRevenue"
            placeholder="e.g., $1,000,000"
            value={data.annualRevenue}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfEmployees">Number of Employees</Label>
          <Input
            id="numberOfEmployees"
            name="numberOfEmployees"
            placeholder="e.g., 50"
            type="number"
            value={data.numberOfEmployees}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxIdNumber">Tax ID Number</Label>
          <Input
            id="taxIdNumber"
            name="taxIdNumber"
            placeholder="e.g., 12-3456789"
            value={data.taxIdNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            name="registrationNumber"
            placeholder="e.g., ABC123456"
            value={data.registrationNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearEstablished">Year Established</Label>
          <Input
            id="yearEstablished"
            name="yearEstablished"
            placeholder="e.g., 2010"
            value={data.yearEstablished}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            placeholder="e.g., https://www.acme.com"
            value={data.websiteUrl}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedInProfile">LinkedIn Company Profile</Label>
          <Input
            id="linkedInProfile"
            name="linkedInProfile"
            placeholder="e.g., linkedin.com/company/acme"
            value={data.linkedInProfile}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoForm;
