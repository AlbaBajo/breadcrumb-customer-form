
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CustomerForm from "@/components/CustomerForm";
import CustomerList from "@/components/CustomerList";
import DashboardReports from "@/components/DashboardReports";
import { BookUser, FileSpreadsheet, Plus, Users, BarChart } from "lucide-react";
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
      <header className="bg-[#221F26] text-white shadow-sm py-6 w-full">
        <div className="container mx-auto px-4">
          {/* Banner with SDG logo and Radar de Alianzas text */}
          <div className="w-full bg-[#221F26] relative overflow-hidden rounded-lg p-4 flex items-center">
            <img 
              src="/lovable-uploads/84f140f9-cccb-44da-b539-1cfe1189aa89.png"
              alt="SDG Radar de Alianzas" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-2xl font-bold text-cyan-400 flex items-center">
              <BookUser className="mr-2" />
              Customer Database
            </h1>
            {!showForm && (
              <Button 
                variant="outline" 
                className="flex items-center bg-transparent text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white"
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
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <Users size={16} />
              Customer List
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart size={16} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileSpreadsheet size={16} />
              {customerToEdit ? "Edit Customer" : "New Customer"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CustomerList onEditCustomer={handleEditCustomer} />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <DashboardReports />
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
      
      <footer className="bg-[#221F26] text-white shadow-sm py-4 mt-auto w-full">
        <div className="container mx-auto px-4 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} SDG Group - Customer Database System
        </div>
      </footer>
    </div>
  );
};

export default Index;
