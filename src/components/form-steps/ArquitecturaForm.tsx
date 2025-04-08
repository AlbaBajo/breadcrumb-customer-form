
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    onUpdate({ [name]: checked });
  };

  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    const currentValues = data[name] ? [...data[name]] : [];
    
    if (checked) {
      if (!currentValues.includes(value)) {
        onUpdate({ [name]: [...currentValues, value] });
      }
    } else {
      onUpdate({ [name]: currentValues.filter((item: string) => item !== value) });
    }
  };

  // Initialize open state for each section
  const [openSections, setOpenSections] = useState({
    snowflake: true,
    dataIngestion: false,
    explotacionDato: false,
    orquestacion: false,
    visualization: false,
    advancedAnalytics: false,
    government: false,
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

      {/* Section 1 - Edition Snowflake - Updated layout with Tallaje in same row */}
      <Collapsible open={openSections.snowflake} onOpenChange={() => toggleSection("snowflake")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Edition Snowflake</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.snowflake ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 gap-y-4 pt-4">
            {/* First row with Tipo Licencia, Cloud and Tallaje */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <div className="space-y-2">
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
            </div>
            
            <div className="space-y-2">
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

      {/* Section 2 - Data Ingestion - Updated with container for two columns */}
      <Collapsible open={openSections.dataIngestion} onOpenChange={() => toggleSection("dataIngestion")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Data Ingestion</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.dataIngestion ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          {/* Container for two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Left Column: From Sources to DL */}
            <div className="space-y-4">
              <h4 className="font-medium text-md">From Sources to DL</h4>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sourcesToDLSDG"
                  checked={data.sourcesToDLSDG || false}
                  onCheckedChange={(checked) => handleCheckboxChange("sourcesToDLSDG", checked as boolean)}
                />
                <Label htmlFor="sourcesToDLSDG">SDG</Label>
              </div>

              {/* Tech ETL and Storage DL in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tech ETL</Label>
                  <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                    {[
                      "Databricks", "Talend", "Data Factory", "Informatica (IICS)", 
                      "Confluent", "Kestra", "Aecorsoft", "Streamsets", 
                      "Capstorm", "Custom Python Scripts", "Glue Jobs", "Qlik Replicate"
                    ].map((tech) => (
                      <div key={`sourcesToDLTechETL-${tech}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sourcesToDLTechETL-${tech}`}
                          checked={(data.sourcesToDLTechETL || []).includes(tech)}
                          onCheckedChange={(checked) => 
                            handleMultiSelectChange("sourcesToDLTechETL", tech, checked as boolean)
                          }
                        />
                        <Label htmlFor={`sourcesToDLTechETL-${tech}`}>{tech}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageDL">Storage DL</Label>
                  <Select 
                    value={data.storageDL || ""} 
                    onValueChange={(value) => handleSelectChange("storageDL", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select storage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWS S3">AWS S3</SelectItem>
                      <SelectItem value="ADLS">ADLS</SelectItem>
                      <SelectItem value="Confluent">Confluent</SelectItem>
                      <SelectItem value="Snowflake">Snowflake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourcesToDLComments">Comments</Label>
                <Textarea
                  id="sourcesToDLComments"
                  name="sourcesToDLComments"
                  placeholder="Add any additional comments"
                  value={data.sourcesToDLComments || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Right Column: From DL to DWH */}
            <div className="space-y-4">
              <h4 className="font-medium text-md">From DL to DWH</h4>

              {/* SDG and Data Model in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dlToDWHSDG"
                    checked={data.dlToDWHSDG || false}
                    onCheckedChange={(checked) => handleCheckboxChange("dlToDWHSDG", checked as boolean)}
                  />
                  <Label htmlFor="dlToDWHSDG">SDG</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataModel">Data Model</Label>
                  <Select 
                    value={data.dataModel || ""} 
                    onValueChange={(value) => handleSelectChange("dataModel", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select data model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kimball">Kimball</SelectItem>
                      <SelectItem value="Data Vault">Data Vault</SelectItem>
                      <SelectItem value="Tablones">Tablones</SelectItem>
                      <SelectItem value="Desconocido">Desconocido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tech ETL and Storage DWH in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tech ETL</Label>
                  <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                    {[
                      "Databricks", "Talend", "Data Factory", "Informatica (IICS)", 
                      "Confluent", "Kestra", "Aecorsoft", "Streamsets", 
                      "Capstorm", "Custom Python Scripts", "Glue Jobs", "Qlik Replicate"
                    ].map((tech) => (
                      <div key={`dlToDWHTechETL-${tech}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dlToDWHTechETL-${tech}`}
                          checked={(data.dlToDWHTechETL || []).includes(tech)}
                          onCheckedChange={(checked) => 
                            handleMultiSelectChange("dlToDWHTechETL", tech, checked as boolean)
                          }
                        />
                        <Label htmlFor={`dlToDWHTechETL-${tech}`}>{tech}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageDWH">Storage DWH</Label>
                  <Select 
                    value={data.storageDWH || ""} 
                    onValueChange={(value) => handleSelectChange("storageDWH", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select storage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AWS S3">AWS S3</SelectItem>
                      <SelectItem value="ADLS">ADLS</SelectItem>
                      <SelectItem value="Confluent">Confluent</SelectItem>
                      <SelectItem value="Snowflake">Snowflake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dlToDWHComments">Comments</Label>
                <Textarea
                  id="dlToDWHComments"
                  name="dlToDWHComments"
                  placeholder="Add any additional comments"
                  value={data.dlToDWHComments || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 3 - Explotación del Dato - Updated to place fields in same row */}
      <Collapsible open={openSections.explotacionDato} onOpenChange={() => toggleSection("explotacionDato")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Explotación del Dato</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.explotacionDato ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label>Capa Explotación diseñada en Snowflake (Data Model - Tablones)</Label>
              <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                {["Modelo Estrella", "Tablones", "Data Model", "Otro"].map((option) => (
                  <div key={`capaExplotacion-${option}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`capaExplotacion-${option}`}
                      checked={(data.capaExplotacion || []).includes(option)}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("capaExplotacion", option, checked as boolean)
                      }
                    />
                    <Label htmlFor={`capaExplotacion-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="explotacionDatoComments">Comments</Label>
              <Textarea
                id="explotacionDatoComments"
                name="explotacionDatoComments"
                placeholder="Add any additional comments"
                value={data.explotacionDatoComments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 4 - Orquestación - Updated to place all fields in same row */}
      <Collapsible open={openSections.orquestacion} onOpenChange={() => toggleSection("orquestacion")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Orquestación</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.orquestacion ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label>Tech</Label>
              <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                {["Talend", "Kestra", "Airflow", "ADF", "GitLab", "EC2", "Snowflake", "Otro"].map((tech) => (
                  <div key={`orquestacionTech-${tech}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`orquestacionTech-${tech}`}
                      checked={(data.orquestacionTech || []).includes(tech)}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("orquestacionTech", tech, checked as boolean)
                      }
                    />
                    <Label htmlFor={`orquestacionTech-${tech}`}>{tech}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orquestacionComments">Comments</Label>
              <Textarea
                id="orquestacionComments"
                name="orquestacionComments"
                placeholder="Add any additional comments"
                value={data.orquestacionComments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 5 - Visualization - Updated layout */}
      <Collapsible open={openSections.visualization} onOpenChange={() => toggleSection("visualization")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Visualization</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.visualization ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label>Tech</Label>
              <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                {["Power", "Qlik", "Tableau", "MicroStrategy", "Otro"].map((tech) => (
                  <div key={`visualizationTech-${tech}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`visualizationTech-${tech}`}
                      checked={(data.visualizationTech || []).includes(tech)}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("visualizationTech", tech, checked as boolean)
                      }
                    />
                    <Label htmlFor={`visualizationTech-${tech}`}>{tech}</Label>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Label htmlFor="ratioDashboardsSnowflake">Ratio de dashboards leen de Snowflake</Label>
                <Input
                  id="ratioDashboardsSnowflake"
                  name="ratioDashboardsSnowflake"
                  placeholder="Enter ratio"
                  value={data.ratioDashboardsSnowflake || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visualizationComments">Comments</Label>
              <Textarea
                id="visualizationComments"
                name="visualizationComments"
                placeholder="Add any additional comments"
                value={data.visualizationComments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 6 - Advanced Analytics - Updated layout with fields in same row */}
      <Collapsible open={openSections.advancedAnalytics} onOpenChange={() => toggleSection("advancedAnalytics")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Advanced Analytics</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.advancedAnalytics ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDoingSomething"
                  checked={data.isDoingSomething || false}
                  onCheckedChange={(checked) => handleCheckboxChange("isDoingSomething", checked as boolean)}
                />
                <Label htmlFor="isDoingSomething">¿Están hacienda algo?</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Tech</Label>
                <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                  {["Databricks", "ML Flow", "Snowflake", "Sagemaker", "Datalku", "Otro"].map((tech) => (
                    <div key={`advancedAnalyticsTech-${tech}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`advancedAnalyticsTech-${tech}`}
                        checked={(data.advancedAnalyticsTech || []).includes(tech)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange("advancedAnalyticsTech", tech, checked as boolean)
                        }
                      />
                      <Label htmlFor={`advancedAnalyticsTech-${tech}`}>{tech}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="advancedAnalyticsComments">Comments</Label>
              <Textarea
                id="advancedAnalyticsComments"
                name="advancedAnalyticsComments"
                placeholder="Add any additional comments"
                value={data.advancedAnalyticsComments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section 7 - Government - Updated to place all fields in same row */}
      <Collapsible open={openSections.government} onOpenChange={() => toggleSection("government")} className="border rounded-md p-2">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 font-medium text-left">
          <span>Government</span>
          <ChevronDown className={`h-5 w-5 transition-transform ${openSections.government ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-2">
              <Label>Tech</Label>
              <div className="space-y-2 border p-3 rounded-md max-h-[200px] overflow-y-auto">
                {["Informatica", "Collibra", "Collate", "Purview", "Herramienta interna Cellnex", "Snowflake", "DBT", "Truedat", "Otro"].map((tech) => (
                  <div key={`governmentTech-${tech}`} className="flex items-center space-x-2">
                    <Checkbox
                      id={`governmentTech-${tech}`}
                      checked={(data.governmentTech || []).includes(tech)}
                      onCheckedChange={(checked) => 
                        handleMultiSelectChange("governmentTech", tech, checked as boolean)
                      }
                    />
                    <Label htmlFor={`governmentTech-${tech}`}>{tech}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="governmentComments">Comments</Label>
              <Textarea
                id="governmentComments"
                name="governmentComments"
                placeholder="Add any additional comments"
                value={data.governmentComments || ""}
                onChange={handleChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ArquitecturaForm;
