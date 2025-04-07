
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReviewScreenProps {
  data: any;
}

// Helper function to format boolean values for display
const formatBoolean = (value: boolean): string => (value ? "Yes" : "No");

const ReviewScreen = ({ data }: ReviewScreenProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Review Information</h3>
      <p className="text-sm text-gray-500 mb-6">
        Please review all the information below before submitting
      </p>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-700 mb-3">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex justify-between py-1">
              <span className="font-medium">Name:</span>
              <span className="text-gray-600">{data.firstName} {data.lastName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Email:</span>
              <span className="text-gray-600">{data.email}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Date of Birth:</span>
              <span className="text-gray-600">{data.dateOfBirth}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Gender:</span>
              <span className="text-gray-600">{data.gender}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Nationality:</span>
              <span className="text-gray-600">{data.nationality}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">ID Number:</span>
              <span className="text-gray-600">{data.idNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Occupation:</span>
              <span className="text-gray-600">{data.occupation}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Company:</span>
              <span className="text-gray-600">{data.company}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Job Title:</span>
              <span className="text-gray-600">{data.title}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-700 mb-3">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex justify-between py-1">
              <span className="font-medium">Phone Number:</span>
              <span className="text-gray-600">{data.phoneNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Mobile Number:</span>
              <span className="text-gray-600">{data.mobileNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Work Phone:</span>
              <span className="text-gray-600">{data.workPhone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Alternative Email:</span>
              <span className="text-gray-600">{data.alternativeEmail}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Preferred Contact:</span>
              <span className="text-gray-600">{data.preferredContactMethod}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Social Media 1:</span>
              <span className="text-gray-600">{data.socialMedia1}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Social Media 2:</span>
              <span className="text-gray-600">{data.socialMedia2}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Website:</span>
              <span className="text-gray-600">{data.website}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Fax Number:</span>
              <span className="text-gray-600">{data.faxNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Emergency Contact:</span>
              <span className="text-gray-600">{data.emergencyContact}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-700 mb-3">Address Information</h4>
          <div className="grid grid-cols-1 gap-y-2 mb-4">
            <div className="flex justify-between py-1">
              <span className="font-medium">Street Address:</span>
              <span className="text-gray-600">{data.streetAddress}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">City:</span>
              <span className="text-gray-600">{data.city}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">State/Province:</span>
              <span className="text-gray-600">{data.state}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Postal Code:</span>
              <span className="text-gray-600">{data.postalCode}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Country:</span>
              <span className="text-gray-600">{data.country}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Address Type:</span>
              <span className="text-gray-600">{data.addressType}</span>
            </div>
          </div>

          {!data.billingAddressSame && (
            <>
              <Separator className="my-4" />
              <h4 className="font-medium text-blue-700 mb-3">Billing Address</h4>
              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex justify-between py-1">
                  <span className="font-medium">Street Address:</span>
                  <span className="text-gray-600">{data.billingStreet}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">City:</span>
                  <span className="text-gray-600">{data.billingCity}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">State/Province:</span>
                  <span className="text-gray-600">{data.billingState}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Postal Code:</span>
                  <span className="text-gray-600">{data.billingPostalCode}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium">Country:</span>
                  <span className="text-gray-600">{data.billingCountry}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-700 mb-3">Business Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex justify-between py-1">
              <span className="font-medium">Company Name:</span>
              <span className="text-gray-600">{data.companyName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Business Type:</span>
              <span className="text-gray-600">{data.businessType}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Industry:</span>
              <span className="text-gray-600">{data.industry}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Annual Revenue:</span>
              <span className="text-gray-600">{data.annualRevenue}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Number of Employees:</span>
              <span className="text-gray-600">{data.numberOfEmployees}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Tax ID Number:</span>
              <span className="text-gray-600">{data.taxIdNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Registration Number:</span>
              <span className="text-gray-600">{data.registrationNumber}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Year Established:</span>
              <span className="text-gray-600">{data.yearEstablished}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Website URL:</span>
              <span className="text-gray-600">{data.websiteUrl}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">LinkedIn Profile:</span>
              <span className="text-gray-600">{data.linkedInProfile}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-medium text-blue-700 mb-3">Preferences</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex justify-between py-1">
              <span className="font-medium">Preferred Language:</span>
              <span className="text-gray-600">{data.preferredLanguage}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Communication Frequency:</span>
              <span className="text-gray-600">{data.communicationFrequency}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Subscribe to Newsletter:</span>
              <span className="text-gray-600">{formatBoolean(data.subscribeNewsletter)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Marketing Consent:</span>
              <span className="text-gray-600">{formatBoolean(data.marketingConsent)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Preferred Payment Method:</span>
              <span className="text-gray-600">{data.preferredPaymentMethod}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Credit Limit:</span>
              <span className="text-gray-600">{data.creditLimit}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Preferred Currency:</span>
              <span className="text-gray-600">{data.currency}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Timezone:</span>
              <span className="text-gray-600">{data.timezone}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Account Type:</span>
              <span className="text-gray-600">{data.accountType}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium">Tags:</span>
              <span className="text-gray-600">{data.tags}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewScreen;
