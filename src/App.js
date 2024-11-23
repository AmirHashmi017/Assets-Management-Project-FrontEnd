import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssetDetails from "./components/AssetDetails";
import Homepage from "./components/HomePage";
import Scan from "./components/Scan";
import Workstation from "./components/Workstation";
import ProductsCRUD from "./components/ProductCRUD";

import "./index.css";
import CustomerCRUD from "./components/CustomerCRUD";
import ProviderCRUD from "./components/ProviderCRUD";
import LocationCRUD from "./components/LocationCRUD";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/workstation" element={<Workstation />} />
          <Route path="/asset/:id" element={<AssetDetails />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/productCrud" element={<ProductsCRUD />} />
          <Route path="/customerCrud" element={<CustomerCRUD />} />
          <Route path="/providerCrud" element={<ProviderCRUD />} />
          <Route path="/locationCrud" element={<LocationCRUD />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
