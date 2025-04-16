
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ReviewScreen from "@/components/form-steps/ReviewScreen";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CustomerListProps {
  onEditCustomer: (customerData: any) => void;
}

const CustomerList = ({ onEditCustomer }: CustomerListProps) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const itemsPerPage = 5;
  
  // Fetch customer data from local storage or API
  useEffect(() => {
    const fetchCustomers = () => {
      try {
        // For web app, fetch from localStorage
        const storedCustomers = localStorage.getItem("customers") 
          ? JSON.parse(localStorage.getItem("customers") as string) 
          : [];
        setCustomers(storedCustomers);
        
        // For App Script, we'll use the server function instead
        if (typeof window !== 'undefined' && 
            typeof (window as any).google !== 'undefined' && 
            (window as any).google.script) {
          (window as any).google.script.run
            .withSuccessHandler((data: any[]) => {
              setCustomers(data);
            })
            .withFailureHandler((error: Error) => {
              console.error("Error fetching customers:", error);
              toast({
                title: "Error fetching customers",
                description: error.message,
                variant: "destructive",
              });
            })
            .getAllCustomers();
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    
    fetchCustomers();
  }, [toast]);
  
  // Filter customers by search term
  const filteredCustomers = customers.filter(customer => 
    customer.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  
  // Handle view customer details
  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setShowReview(true);
  };
  
  // Handle edit customer
  const handleEditCustomer = (customer: any) => {
    onEditCustomer(customer);
    navigate("/");
    toast({
      title: "Editing customer",
      description: `Now editing ${customer.customerName || "customer"}`,
    });
  };
  
  // Back to list view from review
  const handleBackToList = () => {
    setShowReview(false);
    setSelectedCustomer(null);
  };

  // Get formatted date string
  const getFormattedDate = (timestamp: string | undefined) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleDateString();
    } catch (error) {
      return "N/A";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-cyan-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Customer List
        </CardTitle>
        {!showReview && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {showReview ? (
          <div>
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={handleBackToList}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
            <ReviewScreen data={selectedCustomer} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            {filteredCustomers.length > 0 ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Update Date</TableHead>
                      <TableHead>Contact Email</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedCustomers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{customer.customerName || 'N/A'}</TableCell>
                        <TableCell>{getFormattedDate(customer.updateDate || customer.timestamp)}</TableCell>
                        <TableCell>{customer.email || customer.contactEmail || 'N/A'}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleViewCustomer(customer)}
                            title="View customer details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEditCustomer(customer)}
                            title="Edit customer"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center mt-4 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCaption>
                </Table>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No customers found</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerList;
