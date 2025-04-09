
import { User, Calendar, List, Cloud, Radio, MessageSquare } from "lucide-react";
import ReviewSection from "./ReviewSection";
import ReviewItem from "./ReviewItem";
import { Separator } from "@/components/ui/separator";

interface ArquitecturaReviewProps {
  data: any;
}

const ArquitecturaReview = ({ data }: ArquitecturaReviewProps) => {
  return (
    <>
      <ReviewSection title="Arquitectura">
        <ReviewItem 
          label="Customer Name" 
          value={data.customerName} 
          icon={<User size={16} />} 
        />
        <ReviewItem 
          label="Antiguedad" 
          value={data.antiguedad} 
          icon={<Calendar size={16} />}
        />
      </ReviewSection>

      <Separator className="my-4" />
      
      <ReviewSection title="Edition Snowflake">
        <ReviewItem 
          label="Tipo Licencia" 
          value={data.tipoLicencia} 
          icon={<List size={16} />}
        />
        <ReviewItem 
          label="Cloud" 
          value={data.cloud} 
          icon={<Cloud size={16} />}
        />
        <ReviewItem 
          label="Tallaje" 
          value={data.tallaje} 
          icon={<Radio size={16} />}
        />
        <ReviewItem 
          label="Comments" 
          value={data.comments} 
          icon={<MessageSquare size={16} />}
          fullWidth
        />
      </ReviewSection>
    </>
  );
};

export default ArquitecturaReview;
