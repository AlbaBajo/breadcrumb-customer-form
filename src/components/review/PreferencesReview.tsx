
import ReviewSection from "./ReviewSection";

interface PreferencesReviewProps {
  data: any;
}

const PreferencesReview = ({ data }: PreferencesReviewProps) => {
  return (
    <ReviewSection title="Preferences">
      <div className="space-y-6">
        <div>
          <h5 className="font-medium text-purple-700 mb-3">Communication Preferences</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Preferred Language</span>
              <span className="font-medium">{data.preferredLanguage || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Communication Frequency</span>
              <span className="font-medium">{data.communicationFrequency || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Subscribe to Newsletter</span>
              <span className="font-medium">{data.subscribeNewsletter ? "Yes" : "No"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Marketing Consent</span>
              <span className="font-medium">{data.marketingConsent ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-700 mb-3">Payment Preferences</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Preferred Payment Method</span>
              <span className="font-medium">{data.preferredPaymentMethod || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Credit Limit</span>
              <span className="font-medium">{data.creditLimit || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Currency</span>
              <span className="font-medium">{data.currency || "N/A"}</span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-medium text-purple-700 mb-3">Account Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Timezone</span>
              <span className="font-medium">{data.timezone || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Account Type</span>
              <span className="font-medium">{data.accountType || "N/A"}</span>
            </div>
            <div className="flex flex-col md:col-span-2">
              <span className="text-sm text-gray-500">Tags</span>
              <span className="font-medium">{data.tags || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </ReviewSection>
  );
};

export default PreferencesReview;
