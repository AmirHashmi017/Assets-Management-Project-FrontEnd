import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "./mockData"; // Importing mock assets data
import "./Dashboard.css";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  // Filter assets based on search term (ID or name)
  const filteredAssets = assets.filter(
    (asset) =>
      asset.id.toLowerCase().includes(search.toLowerCase()) ||
      asset.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <h1>Asset Management System</h1>
      <input
        type="text"
        placeholder="Search by Asset ID or Name"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="asset-cards-container">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => (
            <div key={asset.id} className="asset-card">
              <h3>{asset.name}</h3>
              <p>
                <strong>ID:</strong> {asset.id}
              </p>
              <p>
                <strong>Status:</strong> {asset.status}
              </p>
              <p>
                <strong>Location:</strong> {asset.location}
              </p>
              <Link to={`/asset/${asset.id}`} className="details-link">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="no-assets">No assets found.</p>
        )}
      </div>
      <div className="dashboard-buttons">
        <Link to="/productscrud">
          <button className="btn">Manage Assets</button>
        </Link>
        <Link to="/customerCrud">
          <button className="btn">Manage Customers</button>
        </Link>
        <Link to="/workstation">
          <button className="btn">Workstations</button>
        </Link>
        <Link to="/scan">
          <button className="btn">Scan QR Code</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
