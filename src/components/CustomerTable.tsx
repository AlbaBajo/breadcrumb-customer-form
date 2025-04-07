
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerTableProps {
  customers: any[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fieldsToShow, setFieldsToShow] = useState({
    customerName: true,
    antiguedad: true,
    tipoLicencia: true,
    cloud: true,
    tallaje: true,
    comments: false,
    companyName: true,
    phoneNumber: true,
    alternativeEmail: true,
    country: true,
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCustomers = customers.slice(startIndex, startIndex + itemsPerPage);
  
  // Get all field names from the first customer
  const allFieldNames = customers.length > 0 
    ? Object.keys(customers[0]).filter(key => typeof customers[0][key] !== 'boolean')
    : [];

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
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
          <TableHeader>
            <TableRow>
              {allFieldNames.map((field) => (
                <TableHead key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCustomers.map((customer, index) => (
              <TableRow key={index}>
                {allFieldNames.map((field) => (
                  <TableCell key={`${index}-${field}`}>
                    {customer[field] !== undefined ? String(customer[field]) : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
