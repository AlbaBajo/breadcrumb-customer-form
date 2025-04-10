
import ReviewSection from "./ReviewSection";

interface AddressInfoReviewProps {
  data: any;
}

const AddressInfoReview = ({ data }: AddressInfoReviewProps) => {
  return (
    <ReviewSection title="Address Information">
      <div className="space-y-6">
        <div>
          <h5 className="font-medium text-purple-700 mb-3">Physical Address</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col md:col-span-2">
              <span className="text-sm text-gray-500">Street Address</span>
              <span className="font-medium">{data.streetAddress || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">City</span>
              <span className="font-medium">{data.city || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">State/Province</span>
              <span className="font-medium">{data.state || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Postal Code</span>
              <span className="font-medium">{data.postalCode || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Country</span>
              <span className="font-medium">{data.country || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Address Type</span>
              <span className="font-medium">{data.addressType || "N/A"}</span>
            </div>
          </div>
        </div>

        {!data.billingAddressSame && (
          <div>
            <h5 className="font-medium text-purple-700 mb-3">Billing Address</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:col-span-2">
                <span className="text-sm text-gray-500">Street Address</span>
                <span className="font-medium">{data.billingStreet || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">City</span>
                <span className="font-medium">{data.billingCity || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">State/Province</span>
                <span className="font-medium">{data.billingState || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Postal Code</span>
                <span className="font-medium">{data.billingPostalCode || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Country</span>
                <span className="font-medium">{data.billingCountry || "N/A"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReviewSection>
  );
};

export default AddressInfoReview;
