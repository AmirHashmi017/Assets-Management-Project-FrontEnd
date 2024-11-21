import React from "react";
import { stations } from "./workstationsdata";
import "./Workstation.css";

const Workstation = () => {
  const colors = ["#ffcccc", "#ffe0b3", "#ffffb3", "#d9f2d9", "#cce0ff", "#f5ccff"];

  return (
    <div className="workstation">
      <h1>Workstations</h1>
      <div className="station-grid">
        {stations.map((station, index) => (
          <div
            key={index}
            className="station-card"
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <h3>{station}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workstation;
