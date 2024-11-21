import React, { useState } from "react";
import "./Scan.css";

const Scan = () => {
  const [assetId, setAssetId] = useState("");

  const handleScan = () => {
    if (!assetId) {
      alert("Please enter a valid Asset ID.");
    } else {
      alert(`Asset ${assetId} scanned successfully!`);
    }
  };

  return (
    <div className="scan">
      <h1>Scan QR Code</h1>
      <input
        type="text"
        placeholder="Enter Asset ID"
        className="scan-input"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
      />
      <button className="scan-btn" onClick={handleScan}>
        Start Scanning
      </button>
    </div>
  );
};

export default Scan;
