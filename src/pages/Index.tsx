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
    <div className="min-h-screen flex flex-col bg-background">
      <div className="banner">
        <div className="banner-content">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <BookUser className="mr-2" />
            Radar de Alianzas
          </h1>
          <p className="text-cyan-300">Sistema de Gestión de Información de Clientes</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-muted">
            <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users size={16} />
              Customer List
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileSpreadsheet size={16} />
              {customerToEdit ? "Edit Customer" : "New Customer"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CustomerList onEditCustomer={handleEditCustomer} />
            </Card>
          </TabsContent>
          
          <TabsContent value="form">
            {(showForm || activeTab === "form") && (
              <Card className="bg-card/50 backdrop-blur border-border">
                <CustomerForm 
                  onCancel={handleFormCancel} 
                  initialData={customerToEdit} 
                  isEditing={!!customerToEdit}
                />
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-4 mt-auto w-full">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} SDG Group - Radar de Alianzas
        </div>
      </footer>
    </div>
  );
};

export default Index;
