import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerCRUD.css";
import Navbar from './Navbar';

const BASE_URL = "http://localhost:3000/api";
const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    customerAddress: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/customers`, form);
      fetchCustomers();
      setForm({ customerName: "", customerAddress: "" });
      closeForm();
    } catch (error) {
      console.error("Error adding customer:", error);
    }

  };

  const handleEditCustomer = (customer) => {
    setIsEditing(true);
    setEditingId(customer.customerId);
    setForm(customer);
    setShowModal(true);
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`${BASE_URL}/customers/${editingId}`, form);
      setCustomers(
        customers.map((customer) =>
          customer.customerId === editingId
            ? { ...customer, ...form }
            : customer
        )
      );
      closeForm();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`${BASE_URL}/customers/${customerId}`);
      setCustomers(
        customers.filter((customer) => customer.customerId !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const openForm = () => {
    setIsEditing(false);
    setForm({ customerName: "", customerAddress: "" });
    setShowModal(true);
  };

  const closeForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName &&
      customer.customerName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div><Navbar />
    <div className="crud-container">
      <h1>Customer Management</h1>
      <div className="searchandbutton">
        <input
          type="text"
          id="search-barinput"
          placeholder="🔍 Search by Customer Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn-add" onClick={openForm}>
          Add New Customer
        </button>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerName}</td>
              <td>{customer.customerAddress}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditCustomer(customer)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteCustomer(customer.customerId)}
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
            <h2>{isEditing ? "Edit Customer" : "Add Customer"}</h2>
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
            />
            <label htmlFor="customerAddress">Customer Address:</label>
            <input
              type="text"
              id="customerAddress"
              name="customerAddress"
              value={form.customerAddress}
              onChange={handleInputChange}
            />
            <div className="modalbuttons">
              <button
                className="btn-submit"
                onClick={isEditing ? handleUpdateCustomer : handleAddCustomer}
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

export default CustomerCRUD;
