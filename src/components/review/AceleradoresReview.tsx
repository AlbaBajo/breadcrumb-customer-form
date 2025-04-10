
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ReviewSection from "./ReviewSection";

interface AceleradoresReviewProps {
  data: any;
}

const AceleradoresReview = ({ data }: AceleradoresReviewProps) => {
  const hasAceleradores = data.aceleradores?.length > 0;
  
  return (
    <ReviewSection title="Aceleradores">
      {hasAceleradores ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artefacto</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Desarrollo</TableHead>
                <TableHead>Tech Base</TableHead>
                <TableHead>Tech</TableHead>
                <TableHead className="text-center">Data Ingestion</TableHead>
                <TableHead className="text-center">Data Transformation</TableHead>
                <TableHead className="text-center">Monitoring</TableHead>
                <TableHead className="text-center">Securitization</TableHead>
                <TableHead className="text-center">Data Modeling</TableHead>
                <TableHead className="text-center">MLOps</TableHead>
                <TableHead className="text-center">CICD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.aceleradores.map((acelerador: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{acelerador.artefacto || "N/A"}</TableCell>
                  <TableCell>{acelerador.objetivo || "N/A"}</TableCell>
                  <TableCell>{acelerador.desarrollo || "N/A"}</TableCell>
                  <TableCell>{acelerador.technologyBase?.join(", ") || "N/A"}</TableCell>
                  <TableCell>{acelerador.technology?.join(", ") || "N/A"}</TableCell>
                  <TableCell className="text-center">{acelerador.dataIngestion ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.dataTransformation ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.monitoring ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.securitization ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.dataModeling ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.mlops ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-center">{acelerador.cicd ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No aceleradores added</p>
      )}
    </ReviewSection>
  );
};

export default AceleradoresReview;
