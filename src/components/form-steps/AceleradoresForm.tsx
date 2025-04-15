import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Trash } from "lucide-react";

interface AceleradoresFormProps {
  data: {
    aceleradores: Array<{
      artefacto: string;
      objetivo: string;
      desarrollo: string;
      technologyBase: string;
      technology: string;
      dataIngestion: boolean;
      dataTransformation: boolean;
      monitoring: boolean;
      securitization: boolean;
      dataModeling: boolean;
      mlops: boolean;
      cicd: boolean;
    }>;
  };
  onUpdate: (data: any) => void;
}

const AceleradoresForm = ({ data, onUpdate }: AceleradoresFormProps) => {
  const [aceleradores, setAceleradores] = useState(
    data.aceleradores || [
      {
        artefacto: "",
        objetivo: "",
        desarrollo: "",
        technologyBase: "",
        technology: "",
        dataIngestion: false,
        dataTransformation: false,
        monitoring: false,
        securitization: false,
        dataModeling: false,
        mlops: false,
        cicd: false
      }
    ]
  );

  const handleAddRow = () => {
    const newAceleradores = [...aceleradores, {
      artefacto: "",
      objetivo: "",
      desarrollo: "",
      technologyBase: "",
      technology: "",
      dataIngestion: false,
      dataTransformation: false,
      monitoring: false,
      securitization: false,
      dataModeling: false,
      mlops: false,
      cicd: false
    }];
    
    setAceleradores(newAceleradores);
    onUpdate({ aceleradores: newAceleradores });
  };

  const handleRemoveRow = (index: number) => {
    const newAceleradores = [...aceleradores];
    newAceleradores.splice(index, 1);
    setAceleradores(newAceleradores);
    onUpdate({ aceleradores: newAceleradores });
  };

  const handleInputChange = (index: number, field: string, value: any) => {
    const newAceleradores = [...aceleradores];
    newAceleradores[index] = {
      ...newAceleradores[index],
      [field]: value
    };
    setAceleradores(newAceleradores);
    onUpdate({ aceleradores: newAceleradores });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-purple-800">Aceleradores</h3>
          <p className="text-sm text-gray-500">Ingrese información sobre artefactos y aceleradores utilizados</p>
        </div>
        <Button 
          onClick={handleAddRow}
          className="bg-purple-700 hover:bg-purple-800"
        >
          Agregar Artefacto
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-2 border font-medium text-sm" style={{ minWidth: "150px" }}>Artefacto</th>
                <th className="p-2 border font-medium text-sm" style={{ minWidth: "200px" }}>Objetivo</th>
                <th className="p-2 border font-medium text-sm" style={{ minWidth: "180px" }}>¿Desarrollado de cero o adaptado?</th>
                <th className="p-2 border font-medium text-sm" style={{ minWidth: "200px" }}>
                  <div className="flex items-center gap-1">
                    Main Technology del prototipo base
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Si estamos partiendo de un artefactado de Data Tech, la tecnología sobre la que está diseñado.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="p-2 border font-medium text-sm" style={{ minWidth: "200px" }}>
                  <div className="flex items-center gap-1">
                    Main Technology del prototipo
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Puede que el artefacto adaptado esté diseñado en una tecnologia, pero en nuestro proyecto se haya cambiado a otra</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </th>
                <th className="p-2 border font-medium text-sm w-24">Data Ingestion</th>
                <th className="p-2 border font-medium text-sm w-24">Data Transformation</th>
                <th className="p-2 border font-medium text-sm w-24">Monitoring</th>
                <th className="p-2 border font-medium text-sm w-24">Securitization</th>
                <th className="p-2 border font-medium text-sm w-24">Data Modeling</th>
                <th className="p-2 border font-medium text-sm w-24">MLOps</th>
                <th className="p-2 border font-medium text-sm w-24">CICD</th>
                <th className="p-2 border font-medium text-sm w-20">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {aceleradores.map((acelerador, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                  <td className="p-2 border">
                    <Input
                      value={acelerador.artefacto}
                      onChange={(e) => handleInputChange(index, "artefacto", e.target.value)}
                      placeholder="Nombre del artefacto"
                    />
                  </td>
                  <td className="p-2 border">
                    <Textarea
                      value={acelerador.objetivo}
                      onChange={(e) => handleInputChange(index, "objetivo", e.target.value)}
                      placeholder="Objetivo del artefacto"
                      className="min-h-[80px]"
                    />
                  </td>
                  <td className="p-2 border">
                    <Select
                      value={acelerador.desarrollo}
                      onValueChange={(value) => handleInputChange(index, "desarrollo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desarrollado">Desarrollado</SelectItem>
                        <SelectItem value="Desde Cero">Desde Cero</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2 border">
                    <Input
                      value={acelerador.technologyBase}
                      onChange={(e) => handleInputChange(index, "technologyBase", e.target.value)}
                      placeholder="Ingrese la tecnología base"
                    />
                  </td>
                  <td className="p-2 border">
                    <Input
                      value={acelerador.technology}
                      onChange={(e) => handleInputChange(index, "technology", e.target.value)}
                      placeholder="Ingrese la tecnología"
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.dataIngestion}
                      onCheckedChange={(value) => handleInputChange(index, "dataIngestion", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.dataTransformation}
                      onCheckedChange={(value) => handleInputChange(index, "dataTransformation", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.monitoring}
                      onCheckedChange={(value) => handleInputChange(index, "monitoring", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.securitization}
                      onCheckedChange={(value) => handleInputChange(index, "securitization", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.dataModeling}
                      onCheckedChange={(value) => handleInputChange(index, "dataModeling", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.mlops}
                      onCheckedChange={(value) => handleInputChange(index, "mlops", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Checkbox 
                      className="mx-auto"
                      checked={acelerador.cicd}
                      onCheckedChange={(value) => handleInputChange(index, "cicd", !!value)}
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveRow(index)}
                      disabled={aceleradores.length === 1}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AceleradoresForm;
