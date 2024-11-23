import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationCRUD.css";
import Navbar from './Navbar';

const BASE_URL = "http://localhost:3000/api";

const LocationCRUD = () => {
    const [locations, setLocations] = useState([]);
    const [form, setForm] = useState({
      locationName: "",
      LocationAddress: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [showModal, setShowModal] = useState(false);
  
    useEffect(() => {
      fetchLocations();
    }, []);
  
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/locations`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleAddLocation = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/locations`, form);
        fetchLocations();
        setForm({ locationName: "", locationAddress: "" });
        closeForm();
      } catch (error) {
        console.error("Error adding Location:", error);
      }
  
    };
  
    const handleEditLocation = (location) => {
      setIsEditing(true);
      setEditingId(location.locationId);
      setForm(location);
      setShowModal(true);
    };
  
    const handleUpdateLocation = async () => {
      try {
        await axios.put(`${BASE_URL}/locations/${editingId}`, form);
        setLocations(
            locations.map((location) =>
            location.locationId === editingId
              ? { ...location, ...form }
              : location
          )
        );
        closeForm();
      } catch (error) {
        console.error("Error updating Location:", error);
      }
    };
  
    const handleDeleteLocation = async (locationId) => {
      try {
        await axios.delete(`${BASE_URL}/locations/${locationId}`);
        setLocations(
            locations.filter((location) => location.locationId !== locationId)
        );
      } catch (error) {
        console.error("Error deleting Location:", error);
      }
    };
  
    const openForm = () => {
      setIsEditing(false);
      setForm({ locationName: "", locationAddress: "" });
      setShowModal(true);
    };
  
    const closeForm = () => {
      setShowModal(false);
      setIsEditing(false);
      setEditingId(null);
    };
  
    const filteredLocations = locations.filter(
      (location) =>
        location.locationName &&
      location.locationName.toLowerCase().includes(searchName.toLowerCase())
    );

  return (
    <div><Navbar />
    <div className="crud-container">
      <h1>Locations Management</h1>
      <div className="searchandbutton">
        <input
          type="text"
          id="search-barinput"
          placeholder="🔍 Search by Location Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn-add" onClick={openForm}>
          Add New Location
        </button>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Location Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map((location) => (
            <tr key={location.locationId}>
              <td>{location.locationName}</td>
              <td>{location.locationAddress}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditLocation(location)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteLocation(location.locationId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeForm}>
              &times;
            </span>
            <h2>{isEditing ? "Edit Location" : "Add Location"}</h2>
            <label htmlFor="locationName">Location Name:</label>
            <input
              type="text"
              id="locationName"
              name="locationName"
              value={form.locationName}
              onChange={handleInputChange}
            />
            <label htmlFor="locationAddress">Location Address:</label>
            <input
              type="text"
              id="locationAddress"
              name="locationAddress"
              value={form.locationAddress}
              onChange={handleInputChange}
            />
            <div className="modalbuttons">
              <button
                className="btn-submit"
                onClick={isEditing ? handleUpdateLocation : handleAddLocation}
              >
                {isEditing ? "Update" : "Add"}
              </button>
              <button className="btn-close" onClick={closeForm}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default LocationCRUD;