import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProviderCRUD.css";

const BASE_URL = "http://localhost:3000/api";
const ProviderCRUD = () => {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    providerName: "",
    providerAddress: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/providers`);
      setProviders(response.data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProvider = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/providers`, form);
      fetchProviders();
      setForm({ providerName: "", providerAddress: "" });
      closeForm();
    } catch (error) {
      console.error("Error adding provider:", error);
    }
  };

  const handleEditProvider = (provider) => {
    setIsEditing(true);
    setEditingId(provider.providerId);
    setForm(provider);
    setShowModal(true);
  };

  const handleUpdateProvider = async () => {
    try {
      await axios.put(`${BASE_URL}/providers/${editingId}`, form);
      setProviders(
        providers.map((provider) =>
          provider.providerId === editingId
            ? { ...provider, ...form }
            : provider
        )
      );
      closeForm();
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  const handleDeleteProvider = async (providerId) => {
    try {
      await axios.delete(`${BASE_URL}/providers/${providerId}`);
      setProviders(
        providers.filter((provider) => provider.providerId !== providerId)
      );
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  const openForm = () => {
    setIsEditing(false);
    setForm({ providerName: "", providerAddress: "" });
    setShowModal(true);
  };

  const closeForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredProviders = providers.filter(
    (provider) =>
      provider.providerName &&
      provider.providerName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="crud-container">
      <h1>Provider Management</h1>
      <div className="searchandbutton">
        <input
          type="text"
          id="search-barinput"
          placeholder="🔍 Search by Provider Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn-add" onClick={openForm}>
          Add New Provider
        </button>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Provider Name</th>
            <th>Provider Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProviders.map((provider) => (
            <tr key={provider.providerId}>
              <td>{provider.providerName}</td>
              <td>{provider.providerAddress}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditProvider(provider)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteProvider(provider.providerId)}
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
            <h2>{isEditing ? "Edit Provider" : "Add Provider"}</h2>
            <label htmlFor="providerName">Provider Name:</label>
            <input
              type="text"
              id="providerName"
              name="providerName"
              value={form.providerName}
              onChange={handleInputChange}
            />
            <label htmlFor="providerAddress">Provider Address:</label>
            <input
              type="text"
              id="providerAddress"
              name="providerAddress"
              value={form.providerAddress}
              onChange={handleInputChange}
            />
            <div className="modalbuttons">
              <button
                className="btn-submit"
                onClick={isEditing ? handleUpdateProvider : handleAddProvider}
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
  );
};

export default ProviderCRUD;
