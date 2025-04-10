
import ReviewSection from "./ReviewSection";

interface ArquitecturaReviewProps {
  data: any;
}

const ArquitecturaReview = ({ data }: ArquitecturaReviewProps) => {
  return (
    <ReviewSection title="Arquitectura">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Customer Name</span>
          <span className="font-medium">{data.customerName || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Antiguedad</span>
          <span className="font-medium">{data.antiguedad || "N/A"}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h5 className="font-medium text-purple-700 mb-3">Edition Snowflake</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Tipo Licencia</span>
            <span className="font-medium">{data.tipoLicencia || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Cloud</span>
            <span className="font-medium">{data.cloud || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Tallaje</span>
            <span className="font-medium">{data.tallaje || "N/A"}</span>
          </div>
        </div>
        <div className="mt-3 flex flex-col">
          <span className="text-sm text-gray-500">Comments</span>
          <span className="font-medium">{data.comments || "N/A"}</span>
        </div>
      </div>

      {/* Additional sections from ArquitecturaForm could be added here */}
    </ReviewSection>
  );
};

export default ArquitecturaReview;
