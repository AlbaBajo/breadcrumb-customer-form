
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PreferencesForm = ({ data, onUpdate }: PreferencesFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    onUpdate({ [name]: checked });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Customer Preferences</h3>
      <p className="text-sm text-gray-500">Enter the customer's preferences and settings</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="preferredLanguage">Preferred Language</Label>
          <Select 
            value={data.preferredLanguage} 
            onValueChange={(value) => handleSelectChange("preferredLanguage", value)}
          >
            <SelectTrigger id="preferredLanguage">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="communicationFrequency">Communication Frequency</Label>
          <Select 
            value={data.communicationFrequency} 
            onValueChange={(value) => handleSelectChange("communicationFrequency", value)}
          >
            <SelectTrigger id="communicationFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="subscribeNewsletter" 
            checked={data.subscribeNewsletter}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                handleSwitchChange("subscribeNewsletter", checked);
              }
            }}
          />
          <Label htmlFor="subscribeNewsletter" className="cursor-pointer">
            Subscribe to newsletter
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="marketingConsent" 
            checked={data.marketingConsent}
            onCheckedChange={(checked) => {
              if (typeof checked === 'boolean') {
                handleSwitchChange("marketingConsent", checked);
              }
            }}
          />
          <Label htmlFor="marketingConsent" className="cursor-pointer">
            Marketing consent
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredPaymentMethod">Preferred Payment Method</Label>
          <Select 
            value={data.preferredPaymentMethod} 
            onValueChange={(value) => handleSelectChange("preferredPaymentMethod", value)}
          >
            <SelectTrigger id="preferredPaymentMethod">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="creditLimit">Credit Limit</Label>
          <Input
            id="creditLimit"
            name="creditLimit"
            placeholder="e.g., $5,000"
            value={data.creditLimit}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Preferred Currency</Label>
          <Select 
            value={data.currency} 
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
              <SelectItem value="jpy">JPY</SelectItem>
              <SelectItem value="cad">CAD</SelectItem>
              <SelectItem value="aud">AUD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Select 
            value={data.timezone} 
            onValueChange={(value) => handleSelectChange("timezone", value)}
          >
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="et">Eastern Time (ET)</SelectItem>
              <SelectItem value="ct">Central Time (CT)</SelectItem>
              <SelectItem value="mt">Mountain Time (MT)</SelectItem>
              <SelectItem value="pt">Pacific Time (PT)</SelectItem>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="gmt">GMT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <Select 
            value={data.accountType} 
            onValueChange={(value) => handleSelectChange("accountType", value)}
          >
            <SelectTrigger id="accountType">
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            name="tags"
            placeholder="e.g., important, new, enterprise"
            value={data.tags}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesForm;
