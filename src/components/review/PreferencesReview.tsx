
import { Languages, Clock, CreditCard, Mail } from "lucide-react";
import ReviewSection from "./ReviewSection";
import ReviewItem from "./ReviewItem";

interface PreferencesReviewProps {
  data: any;
}

const PreferencesReview = ({ data }: PreferencesReviewProps) => {
  return (
    <ReviewSection title="Preferences">
      <ReviewItem 
        label="Preferred Language" 
        value={data.preferredLanguage} 
        icon={<Languages size={16} />}
      />
      <ReviewItem 
        label="Communication Frequency" 
        value={data.communicationFrequency} 
        icon={<Clock size={16} />}
      />
      <ReviewItem 
        label="Subscribe to Newsletter" 
        value={data.subscribeNewsletter} 
        icon={<Mail size={16} />}
      />
      <ReviewItem 
        label="Marketing Consent" 
        value={data.marketingConsent}
      />
      <ReviewItem 
        label="Preferred Payment Method" 
        value={data.preferredPaymentMethod} 
        icon={<CreditCard size={16} />}
      />
      <ReviewItem 
        label="Credit Limit" 
        value={data.creditLimit}
      />
      <ReviewItem 
        label="Preferred Currency" 
        value={data.currency}
      />
      <ReviewItem 
        label="Timezone" 
        value={data.timezone}
      />
      <ReviewItem 
        label="Account Type" 
        value={data.accountType}
      />
      <ReviewItem 
        label="Tags" 
        value={data.tags}
      />
    </ReviewSection>
  );
};

export default PreferencesReview;
