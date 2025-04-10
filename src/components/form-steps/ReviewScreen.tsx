
import { Card, CardContent } from "@/components/ui/card";
import ReviewSection from "@/components/review/ReviewSection";
import ArquitecturaReview from "@/components/review/ArquitecturaReview";
import ContactInfoReview from "@/components/review/ContactInfoReview";
import AddressInfoReview from "@/components/review/AddressInfoReview";
import PreferencesReview from "@/components/review/PreferencesReview";
import AceleradoresReview from "@/components/review/AceleradoresReview";
import FeaturesReview from "@/components/review/FeaturesReview";

interface ReviewScreenProps {
  data: any;
}

const ReviewScreen = ({ data }: ReviewScreenProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Information</h3>
      <p className="text-sm text-gray-500 mb-6">
        Please review all the information below before submitting
      </p>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <ArquitecturaReview data={data} />
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <ContactInfoReview data={data} />
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <AddressInfoReview data={data} />
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <FeaturesReview data={data} />
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <AceleradoresReview data={data} />
        </CardContent>
      </Card>

      <Card className="border-purple-200">
        <CardContent className="pt-6">
          <PreferencesReview data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewScreen;
