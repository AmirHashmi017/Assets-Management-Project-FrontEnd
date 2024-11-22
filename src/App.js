import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssetDetails from "./components/AssetDetails";
import Dashboard from "./components/Dashboard";
import Scan from "./components/Scan";
import Workstation from "./components/Workstation";
import ProductsCRUD from "./components/ProductCRUD";

import "./index.css";
import CustomerCRUD from "./components/CustomerCRUD";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workstation" element={<Workstation />} />
          <Route path="/asset/:id" element={<AssetDetails />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/productscrud" element={<ProductsCRUD />} />
          <Route path="customerCrud" element={<CustomerCRUD />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
