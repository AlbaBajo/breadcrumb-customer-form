
import ReviewSection from "./ReviewSection";

interface ContactInfoReviewProps {
  data: any;
}

const ContactInfoReview = ({ data }: ContactInfoReviewProps) => {
  return (
    <ReviewSection title="Contact Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Phone Number</span>
          <span className="font-medium">{data.phoneNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Mobile Number</span>
          <span className="font-medium">{data.mobileNumber || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Work Phone</span>
          <span className="font-medium">{data.workPhone || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Alternative Email</span>
          <span className="font-medium">{data.alternativeEmail || "N/A"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Preferred Contact Method</span>
          <span className="font-medium">{data.preferredContactMethod || "N/A"}</span>
        </div>
      </div>
    </ReviewSection>
  );
};

export default ContactInfoReview;
