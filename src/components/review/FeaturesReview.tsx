
import ReviewSection from "./ReviewSection";

interface FeaturesReviewProps {
  data: any;
}

const FeaturesReview = ({ data }: FeaturesReviewProps) => {
  return (
    <ReviewSection title="Features Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data Integration */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Sources</span>
          <span className="font-medium">{data.sources?.join(", ") || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Read From SAP</span>
          <span className="font-medium">{data.readFromSAP ? "Yes" : "No"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Range Volumentría</span>
          <span className="font-medium">{data.rangeVolumentria || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Source Format</span>
          <span className="font-medium">{data.sourceFormat || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Usage</span>
          <span className="font-medium">{data.usage?.join(", ") || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Specific Table Types</span>
          <span className="font-medium">{data.specificTableTypes || "N/A"}</span>
        </div>

        {/* Query Processing */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Admin Platform</span>
          <span className="font-medium">{data.canAdminPlatform || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">DWH by Processing</span>
          <span className="font-medium">{data.hasDwhByProcessing || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Pushdown Operations</span>
          <span className="font-medium">{data.pushdownOperations || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Dynamic Scaling</span>
          <span className="font-medium">{data.dynamicScaling || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Multiclustering</span>
          <span className="font-medium">{data.multiclustering || "N/A"}</span>
        </div>

        {/* ETL */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Notebooks Usage</span>
          <span className="font-medium">{data.notebooksUsage || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Stored Procedures</span>
          <span className="font-medium">{data.storedProcedures || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">CTE Usage</span>
          <span className="font-medium">{data.cteUsage || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Snowflake API</span>
          <span className="font-medium">{data.snowflakeApi || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Snowpark</span>
          <span className="font-medium">{data.snowpark || "N/A"}</span>
        </div>

        {/* Data Pipelines */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Snowflake Orchestrator</span>
          <span className="font-medium">{data.snowflakeOrchestrator || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Kafka Connector</span>
          <span className="font-medium">{data.kafkaConnector || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Snowpipe</span>
          <span className="font-medium">{data.snowpipe || "N/A"}</span>
        </div>
      </div>
    </ReviewSection>
  );
};

export default FeaturesReview;
