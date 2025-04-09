
import { Phone, Smartphone, Briefcase, Mail, MessageSquare } from "lucide-react";
import ReviewSection from "./ReviewSection";
import ReviewItem from "./ReviewItem";

interface ContactInfoReviewProps {
  data: any;
}

const ContactInfoReview = ({ data }: ContactInfoReviewProps) => {
  return (
    <ReviewSection title="Contact Information">
      <ReviewItem 
        label="Phone Number" 
        value={data.phoneNumber} 
        icon={<Phone size={16} />}
      />
      <ReviewItem 
        label="Mobile Number" 
        value={data.mobileNumber} 
        icon={<Smartphone size={16} />}
      />
      <ReviewItem 
        label="Work Phone" 
        value={data.workPhone} 
        icon={<Briefcase size={16} />}
      />
      <ReviewItem 
        label="Alternative Email" 
        value={data.alternativeEmail} 
        icon={<Mail size={16} />}
      />
      <ReviewItem 
        label="Preferred Contact" 
        value={data.preferredContactMethod} 
        icon={<MessageSquare size={16} />}
      />
      {data.socialMedia1 && (
        <ReviewItem label="Social Media 1" value={data.socialMedia1} />
      )}
      {data.socialMedia2 && (
        <ReviewItem label="Social Media 2" value={data.socialMedia2} />
      )}
      {data.website && (
        <ReviewItem label="Website" value={data.website} />
      )}
      {data.faxNumber && (
        <ReviewItem label="Fax Number" value={data.faxNumber} />
      )}
      {data.emergencyContact && (
        <ReviewItem label="Emergency Contact" value={data.emergencyContact} />
      )}
    </ReviewSection>
  );
};

export default ContactInfoReview;
