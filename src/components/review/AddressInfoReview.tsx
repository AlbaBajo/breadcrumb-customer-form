
import { MapPin, Building, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ReviewSection from "./ReviewSection";
import ReviewItem from "./ReviewItem";

interface AddressInfoReviewProps {
  data: any;
}

const AddressInfoReview = ({ data }: AddressInfoReviewProps) => {
  return (
    <>
      <ReviewSection title="Address Information">
        <ReviewItem 
          label="Street Address" 
          value={data.streetAddress} 
          icon={<MapPin size={16} />}
        />
        <ReviewItem 
          label="City" 
          value={data.city} 
          icon={<Building size={16} />}
        />
        <ReviewItem 
          label="State/Province" 
          value={data.state}
        />
        <ReviewItem 
          label="Postal Code" 
          value={data.postalCode}
        />
        <ReviewItem 
          label="Country" 
          value={data.country} 
          icon={<Globe size={16} />}
        />
        <ReviewItem 
          label="Address Type" 
          value={data.addressType}
        />
      </ReviewSection>

      {!data.billingAddressSame && (
        <>
          <Separator className="my-4" />
          <ReviewSection title="Billing Address">
            <ReviewItem 
              label="Street Address" 
              value={data.billingStreet} 
              icon={<MapPin size={16} />}
            />
            <ReviewItem 
              label="City" 
              value={data.billingCity} 
              icon={<Building size={16} />}
            />
            <ReviewItem 
              label="State/Province" 
              value={data.billingState}
            />
            <ReviewItem 
              label="Postal Code" 
              value={data.billingPostalCode}
            />
            <ReviewItem 
              label="Country" 
              value={data.billingCountry} 
              icon={<Globe size={16} />}
            />
          </ReviewSection>
        </>
      )}
    </>
  );
};

export default AddressInfoReview;
