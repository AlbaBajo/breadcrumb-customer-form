
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomerForm from "@/components/CustomerForm";
import { BookUser } from "lucide-react";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-700 flex items-center">
            <BookUser className="mr-2" />
            Customer Database
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {!showForm ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Card className="w-full max-w-2xl p-8 text-center shadow-md bg-white">
              <h2 className="text-2xl font-semibold mb-6">Welcome to the Customer Database</h2>
              <p className="text-gray-600 mb-8">
                Add new customers to your database by filling out a simple multi-step form.
                The information will be organized into 5 logical sections to make data entry easy.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                Add New Customer
              </Button>
            </Card>
          </div>
        ) : (
          <CustomerForm onCancel={() => setShowForm(false)} />
        )}
      </main>
      
      <footer className="bg-white shadow-sm py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Customer Database System
        </div>
      </footer>
    </div>
  );
};

export default Index;
