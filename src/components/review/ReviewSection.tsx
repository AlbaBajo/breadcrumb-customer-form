
import { ReactNode } from "react";

interface ReviewSectionProps {
  title: string;
  children: ReactNode;
}

const ReviewSection = ({ title, children }: ReviewSectionProps) => {
  return (
    <div>
      <h4 className="font-medium text-purple-700 mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {children}
      </div>
    </div>
  );
};

export default ReviewSection;
