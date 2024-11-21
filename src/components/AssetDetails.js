import React from "react";
import { useParams } from "react-router-dom";
import { assets } from "./mockData"; // Importing mock assets data
import "./AssetDetails.css";

const AssetDetails = () => {
  const { id } = useParams();
  const asset = assets.find((asset) => asset.id === id);

  if (!asset) {
    return (
      <div className="asset-not-found">
        <h1>Asset Not Found</h1>
        <p>We couldn't find an asset with the specified ID.</p>
      </div>
    );
  }

  return (
    <div className="asset-details">
      <h1>Asset Details</h1>
      <div className="asset-card">
        <div className="asset-info">
          <p><strong>Asset ID:</strong> {asset.id}</p>
          <p><strong>Name:</strong> {asset.name}</p>
          <p><strong>Manufacturer:</strong> {asset.manufacturer}</p>
          <p><strong>Status:</strong> {asset.status}</p>
          <p><strong>Location:</strong> {asset.location}</p>
          <p><strong>Last Serviced:</strong> {asset.lastServiced}</p>
          <p><strong>Document:</strong> {asset.document}</p>
        </div>
        <div className="asset-document">
          
          <button className="upload-btn">Upload Document</button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
