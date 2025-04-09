
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface AceleradoresReviewProps {
  data: any;
}

const AceleradoresReview = ({ data }: AceleradoresReviewProps) => {
  const aceleradores = data.aceleradores || [];

  if (!aceleradores.length) {
    return (
      <div>
        <h4 className="font-medium text-purple-700 mb-3">Aceleradores</h4>
        <p className="text-gray-500">No aceleradores information provided</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="font-medium text-purple-700 mb-3">Aceleradores</h4>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-purple-50">
              <TableHead className="font-bold">Artefacto</TableHead>
              <TableHead className="font-bold">Objetivo</TableHead>
              <TableHead className="font-bold">Desarrollo</TableHead>
              <TableHead className="font-bold">Technology Base</TableHead>
              <TableHead className="font-bold">Technology</TableHead>
              <TableHead className="font-bold text-center">Categories</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aceleradores.map((acelerador, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "" : "bg-purple-50/50"}>
                <TableCell className="font-medium">{acelerador.artefacto || "N/A"}</TableCell>
                <TableCell>{acelerador.objetivo || "N/A"}</TableCell>
                <TableCell>{acelerador.desarrollo || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {acelerador.technologyBase && acelerador.technologyBase.length > 0 ? (
                      acelerador.technologyBase.map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tech}
                        </Badge>
                      ))
                    ) : "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {acelerador.technology && acelerador.technology.length > 0 ? (
                      acelerador.technology.map((tech, i) => (
                        <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {tech}
                        </Badge>
                      ))
                    ) : "N/A"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className="flex items-center">
                      {acelerador.dataIngestion ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      Data Ingestion
                    </div>
                    <div className="flex items-center">
                      {acelerador.dataTransformation ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      Data Transformation
                    </div>
                    <div className="flex items-center">
                      {acelerador.monitoring ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      Monitoring
                    </div>
                    <div className="flex items-center">
                      {acelerador.securitization ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      Securitization
                    </div>
                    <div className="flex items-center">
                      {acelerador.dataModeling ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      Data Modeling
                    </div>
                    <div className="flex items-center">
                      {acelerador.mlops ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      MLOps
                    </div>
                    <div className="flex items-center">
                      {acelerador.cicd ? 
                        <Check size={14} className="text-green-500 mr-1" /> : 
                        <X size={14} className="text-gray-300 mr-1" />}
                      CICD
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AceleradoresReview;
