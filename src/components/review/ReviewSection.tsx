
import { Card, CardContent } from "@/components/ui/card";

interface ReviewSectionProps {
  title: string;
  children: React.ReactNode;
}

const ReviewSection = ({ title, children }: ReviewSectionProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg text-purple-800">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

export default ReviewSection;
