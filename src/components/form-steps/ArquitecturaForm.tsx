import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";

interface ArquitecturaFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ArquitecturaForm = ({ data, onUpdate }: ArquitecturaFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onUpdate({ [name]: value });
  };

  // Initialize open state for each section
  const [openSections, setOpenSections] = useState({
    snowflake: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Arquitectura</h3>
      <p className="text-sm text-gray-500">Enter the customer architecture details</p>
      
      {/* Required fields at the top */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name <span className="text-red-500">*</span></Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="Enter customer name"
            value={data.customerName || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="antiguedad">Antiguedad <span className="text-red-500">*</span></Label>
          <Input
            id="antiguedad"
            name="antiguedad"
            placeholder="Enter antiguedad"
            value={data.antiguedad || ""}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Collapsible sections */}
      {/* Section 1 - Edition Snowflake */}
      <Collapsible open={openSections.snowflake} onOpenChange={() => toggleSection("snowflake")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Edition Snowflake</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.snowflake ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="tipoLicencia">Tipo Licencia</Label>
              <Select 
                value={data.tipoLicencia || ""} 
                onValueChange={(value) => handleSelectChange("tipoLicencia", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="BusinessCritical">Business Critical</SelectItem>
                  <SelectItem value="VPS">VPS</SelectItem>
                  <SelectItem value="Desconocido">Desconocido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cloud">Cloud</Label>
              <Select 
                value={data.cloud || ""} 
                onValueChange={(value) => handleSelectChange("cloud", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select cloud provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AWS">AWS</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="AZURE">AZURE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="tallaje">Tallaje</Label>
              <RadioGroup 
                value={data.tallaje || ""} 
                onValueChange={(value) => handleSelectChange("tallaje", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="XS" id="tallaje-xs" />
                  <Label htmlFor="tallaje-xs">XS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="S" id="tallaje-s" />
                  <Label htmlFor="tallaje-s">S</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="M" id="tallaje-m" />
                  <Label htmlFor="tallaje-m">M</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="L" id="tallaje-l" />
                  <Label htmlFor="tallaje-l">L</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="XL" id="tallaje-xl" />
                  <Label htmlFor="tallaje-xl">XL</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                placeholder="Add any additional comments"
                value={data.comments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 2 */}
      <Collapsible open={openSections.section2} onOpenChange={() => toggleSection("section2")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 2</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section2 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section2Field1">Field 1</Label>
              <Input
                id="section2Field1"
                name="section2Field1"
                placeholder="Enter field 1"
                value={data.section2Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section2Field2">Field 2</Label>
              <Input
                id="section2Field2"
                name="section2Field2"
                placeholder="Enter field 2"
                value={data.section2Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 3 */}
      <Collapsible open={openSections.section3} onOpenChange={() => toggleSection("section3")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 3</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section3 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section3Field1">Field 1</Label>
              <Input
                id="section3Field1"
                name="section3Field1"
                placeholder="Enter field 1"
                value={data.section3Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section3Field2">Field 2</Label>
              <Input
                id="section3Field2"
                name="section3Field2"
                placeholder="Enter field 2"
                value={data.section3Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 4 */}
      <Collapsible open={openSections.section4} onOpenChange={() => toggleSection("section4")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 4</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section4 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section4Field1">Field 1</Label>
              <Input
                id="section4Field1"
                name="section4Field1"
                placeholder="Enter field 1"
                value={data.section4Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section4Field2">Field 2</Label>
              <Input
                id="section4Field2"
                name="section4Field2"
                placeholder="Enter field 2"
                value={data.section4Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 5 */}
      <Collapsible open={openSections.section5} onOpenChange={() => toggleSection("section5")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 5</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section5 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section5Field1">Field 1</Label>
              <Input
                id="section5Field1"
                name="section5Field1"
                placeholder="Enter field 1"
                value={data.section5Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section5Field2">Field 2</Label>
              <Input
                id="section5Field2"
                name="section5Field2"
                placeholder="Enter field 2"
                value={data.section5Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 6 */}
      <Collapsible open={openSections.section6} onOpenChange={() => toggleSection("section6")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 6</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section6 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section6Field1">Field 1</Label>
              <Input
                id="section6Field1"
                name="section6Field1"
                placeholder="Enter field 1"
                value={data.section6Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section6Field2">Field 2</Label>
              <Input
                id="section6Field2"
                name="section6Field2"
                placeholder="Enter field 2"
                value={data.section6Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 7 */}
      <Collapsible open={openSections.section7} onOpenChange={() => toggleSection("section7")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 7</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section7 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section7Field1">Field 1</Label>
              <Input
                id="section7Field1"
                name="section7Field1"
                placeholder="Enter field 1"
                value={data.section7Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section7Field2">Field 2</Label>
              <Input
                id="section7Field2"
                name="section7Field2"
                placeholder="Enter field 2"
                value={data.section7Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 8 */}
      <Collapsible open={openSections.section8} onOpenChange={() => toggleSection("section8")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Section 8</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.section8 ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="section8Field1">Field 1</Label>
              <Input
                id="section8Field1"
                name="section8Field1"
                placeholder="Enter field 1"
                value={data.section8Field1 || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section8Field2">Field 2</Label>
              <Input
                id="section8Field2"
                name="section8Field2"
                placeholder="Enter field 2"
                value={data.section8Field2 || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ArquitecturaForm;
