
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerTable from "@/components/CustomerTable";

// This will be coming from a prop later
const initialCustomers = localStorage.getItem("customers") 
  ? JSON.parse(localStorage.getItem("customers") as string)
  : [];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center">
            <FileSpreadsheet className="mr-2" />
            Customer Database - All Records
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
        
        <Card className="p-6 shadow-md bg-white">
          {customers.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">No customer data available</h3>
              <p className="text-gray-500 mb-4">Add customers using the form to see them listed here.</p>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Add New Customer
                </Button>
              </Link>
            </div>
          ) : (
            <CustomerTable customers={customers} />
          )}
        </Card>
      </main>
      
      <footer className="bg-white shadow-sm py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Customer Database System
        </div>
      </footer>
    </div>
  );
};

export default Customers;
