
import { ReactNode } from "react";

interface ReviewItemProps {
  label: string;
  value: string | number | boolean | ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

// Helper function to format boolean values for display
const formatValue = (value: string | number | boolean | ReactNode): ReactNode => {
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No";
  }
  return value || "N/A";
};

const ReviewItem = ({ label, value, icon, fullWidth = false }: ReviewItemProps) => {
  return (
    <div className={`flex justify-between py-1 ${fullWidth ? "col-span-2" : ""}`}>
      <span className="font-medium flex items-center gap-1.5 text-gray-800">
        {icon && <span className="text-purple-600">{icon}</span>}
        {label}:
      </span>
      <span className="text-gray-600 font-medium">{formatValue(value)}</span>
    </div>
  );
};

export default ReviewItem;
