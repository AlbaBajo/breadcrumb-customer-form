
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomerForm from "@/components/CustomerForm";
import CustomerList from "@/components/CustomerList";
import { Link } from "react-router-dom";
import { BookUser, FileSpreadsheet, Plus, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [customerToEdit, setCustomerToEdit] = useState<any>(null);

  const handleEditCustomer = (customer: any) => {
    setCustomerToEdit(customer);
    setShowForm(true);
    setActiveTab("form");
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCustomerToEdit(null);
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white shadow-sm py-6 w-full">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700 flex items-center">
            <BookUser className="mr-2" />
            Customer Database
          </h1>
          {!showForm && (
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => {
                setShowForm(true);
                setActiveTab("form");
              }}
            >
              <Plus className="mr-2" size={16} />
              Add New Customer
            </Button>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Users size={16} />
              Customer List
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileSpreadsheet size={16} />
              {customerToEdit ? "Edit Customer" : "New Customer"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CustomerList onEditCustomer={handleEditCustomer} />
          </TabsContent>
          
          <TabsContent value="form">
            {(showForm || activeTab === "form") && (
              <CustomerForm 
                onCancel={handleFormCancel} 
                initialData={customerToEdit} 
                isEditing={!!customerToEdit}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white shadow-sm py-4 mt-auto w-full">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Customer Database System
        </div>
      </footer>
    </div>
  );
};

export default Index;
