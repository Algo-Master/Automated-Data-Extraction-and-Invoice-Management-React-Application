import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import HomePage from "./components/HomePage";
import InvoicesTab from "./components/Tabs/InvoicesTab";
import ProductsTab from "./components/Tabs/ProductsTab";
import CustomersTab from "./components/Tabs/CustomersTab";

const App = () => {
  return (
    <Router>
      <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto p-4">
          <SidebarTrigger />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/invoices" element={<InvoicesTab />} />
              <Route path="/products" element={<ProductsTab />} />
              <Route path="/customers" element={<CustomersTab />} />
            </Routes>
          </main>
      </SidebarProvider>
    </Router>
  );
};

export default App;
