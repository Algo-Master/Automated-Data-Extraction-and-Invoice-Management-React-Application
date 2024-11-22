import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InvoicesTab from './components/Tabs/InvoicesTab';
import ProductsTab from './components/Tabs/ProductsTab';
import CustomersTab from './components/Tabs/CustomersTab';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/invoices" element={<InvoicesTab />} />
          <Route path="/products" element={<ProductsTab />} />
          <Route path="/customers" element={<CustomersTab />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;