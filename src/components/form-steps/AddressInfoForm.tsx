
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

interface AddressInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const AddressInfoForm = ({ data, onUpdate }: AddressInfoFormProps) => {
  const [billingAddressSame, setBillingAddressSame] = useState(data.billingAddressSame);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });
  };

  const handleBillingAddressSameChange = (checked: boolean) => {
    setBillingAddressSame(checked);
    onUpdate({ billingAddressSame: checked });
    
    if (checked) {
      // Copy shipping address to billing address
      onUpdate({
        billingStreet: data.streetAddress,
        billingCity: data.city,
        billingState: data.state,
        billingPostalCode: data.postalCode,
        billingCountry: data.country
      });
    }
  };

  // Update billing address when shipping address changes if they're set to be the same
  useEffect(() => {
    if (billingAddressSame) {
      onUpdate({
        billingStreet: data.streetAddress,
        billingCity: data.city,
        billingState: data.state,
        billingPostalCode: data.postalCode,
        billingCountry: data.country
      });
    }
  }, [data.streetAddress, data.city, data.state, data.postalCode, data.country, billingAddressSame]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Address Information</h3>
      <p className="text-sm text-gray-500">Enter the customer's address details</p>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-4">Physical Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="streetAddress">Street Address</Label>
              <Input
                id="streetAddress"
                name="streetAddress"
                placeholder="e.g., 123 Main St, Apt 4B"
                value={data.streetAddress}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="e.g., New York"
                value={data.city}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                name="state"
                placeholder="e.g., NY"
                value={data.state}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                placeholder="e.g., 10001"
                value={data.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="e.g., USA"
                value={data.country}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressType">Address Type</Label>
              <Select 
                value={data.addressType} 
                onValueChange={(value) => handleSelectChange("addressType", value)}
              >
                <SelectTrigger id="addressType">
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 my-6">
          <Switch 
            id="billingAddressSame"
            checked={billingAddressSame}
            onCheckedChange={handleBillingAddressSameChange}
          />
          <Label htmlFor="billingAddressSame" className="cursor-pointer">
            Billing address is the same as physical address
          </Label>
        </div>

        {!billingAddressSame && (
          <div>
            <h4 className="font-medium mb-4">Billing Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="billingStreet">Street Address</Label>
                <Input
                  id="billingStreet"
                  name="billingStreet"
                  placeholder="e.g., 456 Business Ave"
                  value={data.billingStreet}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingCity">City</Label>
                <Input
                  id="billingCity"
                  name="billingCity"
                  placeholder="e.g., Chicago"
                  value={data.billingCity}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingState">State/Province</Label>
                <Input
                  id="billingState"
                  name="billingState"
                  placeholder="e.g., IL"
                  value={data.billingState}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingPostalCode">Postal Code</Label>
                <Input
                  id="billingPostalCode"
                  name="billingPostalCode"
                  placeholder="e.g., 60601"
                  value={data.billingPostalCode}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingCountry">Country</Label>
                <Input
                  id="billingCountry"
                  name="billingCountry"
                  placeholder="e.g., USA"
                  value={data.billingCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInfoForm;
