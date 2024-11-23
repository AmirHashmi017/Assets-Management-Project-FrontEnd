import React, { useState, useEffect } from "react";
import "./ProductCrud.css";
import axios from "axios";
import Navbar from './Navbar';

const ProductCRUD = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    productCode: "",
    barCode: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    reorderQuantity: "",
    packedWeight: "",
    packedHeight: "",
    packedWidth: "",
    packedDepth: "",
    refrigerated: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        const validUsers = response.data.filter((product) =>product.productName); // Ensure valid data
        setUsers(validUsers);
        console.log(validUsers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Convert to float for fields that should be floats
    if (name === "packedWeight" || name === "packedHeight" || name === "packedWidth" || name === "packedDepth") {
      setForm({
        ...form,
        [name]: value === "" ? "" : parseFloat(value), // Convert to float if not empty
      });
    } else if (name === "reorderQuantity") {
      setForm({
        ...form,
        [name]: value === "" ? "" : parseInt(value, 10), // Convert to integer for reorderQuantity
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value, // Handle checkbox and other fields as normal
      });
    }
  };
  

  const handleAddUser = async () => {
    try {
      // Add the product to the backend
      await axios.post("http://localhost:3000/api/products", form);
  
      // Re-fetch products after adding a new one
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/products");
          const validUsers = response.data.filter((product) => product.productName); // Ensure valid data
          setUsers(validUsers); // Update the state with the new list
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      fetchProducts(); // Re-fetch products after adding
      closeForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  const handleEditUser = (user) => {
    setIsEditing(true);
    
    setEditingId(user.productId); // Ensure the correct ID is set
    setForm(user);
    setShowModal(true);
  };
  

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3000/api/products/${editingId}`, form);
      setUsers(users.map((user) => (user.productId === editingId ? { ...user, ...form } : user))); // Correct this line
      closeForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setUsers(users.filter((user) => user.productId !== id)); // Use productId here
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  

  const openForm = () => {
    setIsEditing(false);
    setForm({
      productCode: "",
      barCode: "",
      productName: "",
      productDescription: "",
      productCategory: "",
      reorderQuantity: "",
      packedWeight: "",
      packedHeight: "",
      packedWidth: "",
      packedDepth: "",
      refrigerated: false,
    });
    setShowModal(true);
  };

  const closeForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredUsers = users.filter((user) =>
    user.productName && user.productName.toLowerCase().includes(searchName.toLowerCase())
  );
  
  return (
    <div><Navbar />
    <div className="crud-container">
      <h1>Product Management</h1>
      <div className="searchandbutton">
        <input
          type="text"
          id="search-barinput"
          placeholder="🔍 Search by Product Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn-add" onClick={openForm}>
          Add New Product
        </button>
      </div>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Reorder Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user) => (
  <tr key={user.productId}>
    <td>{user.productCode}</td>
    <td>{user.productName}</td>
    <td>{user.productDescription}</td>
    <td>{user.reorderQuantity}</td>
    <td>
      <button className="btn-edit" onClick={() => handleEditUser(user)}>
        Edit
      </button>
      <button className="btn-delete" onClick={() => handleDeleteUser(user.productId)}>
        Delete
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="modal-close" onClick={closeForm}>&times;</span>

            <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>

            {/* Input Fields with Labels */}
            <label htmlFor="productCode">Product Code:</label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              value={form.productCode}
              onChange={handleInputChange}
            />

            <label htmlFor="barCode">Bar Code:</label>
            <input
              type="text"
              id="barCode"
              name="barCode"
              value={form.barCode}
              onChange={handleInputChange}
            />

            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={form.productName}
              onChange={handleInputChange}
            />

            <label htmlFor="productDescription">Product Description:</label>
            <input
              type="text"
              id="productDescription"
              name="productDescription"
              value={form.productDescription}
              onChange={handleInputChange}
            />

            <label htmlFor="productCategory">Product Category:</label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={form.productCategory}
              onChange={handleInputChange}
            />

            <label htmlFor="reorderQuantity">Reorder Quantity:</label>
            <input
              type="number"
              id="reorderQuantity"
              name="reorderQuantity"
              value={form.reorderQuantity}
              onChange={handleInputChange}
            />

            <label htmlFor="packedWeight">Packed Weight:</label>
            <input
              type="number"
              step="0.01"
              id="packedWeight"
              name="packedWeight"
              value={form.packedWeight}
              onChange={handleInputChange}
            />

            <label htmlFor="packedHeight">Packed Height:</label>
            <input
              type="number"
              step="0.01"
              id="packedHeight"
              name="packedHeight"
              value={form.packedHeight}
              onChange={handleInputChange}
            />

            <label htmlFor="packedWidth">Packed Width:</label>
            <input
              type="number"
              step="0.01"
              id="packedWidth"
              name="packedWidth"
              value={form.packedWidth}
              onChange={handleInputChange}
            />

            <label htmlFor="packedDepth">Packed Depth:</label>
            <input
              type="number"
              step="0.01"
              id="packedDepth"
              name="packedDepth"
              value={form.packedDepth}
              onChange={handleInputChange}
            />

            <div className="checkbox-container">
              <label htmlFor="refrigerated">Refrigerated:</label>
              <input
                type="checkbox"
                id="refrigerated"
                name="refrigerated"
                checked={form.refrigerated}
                onChange={(e) => setForm({ ...form, refrigerated: e.target.checked })}
              />
            </div>

            <div className="modalbuttons">
              <button className="btn-submit" onClick={isEditing ? handleUpdateUser : handleAddUser}>
                {isEditing ? 'Update' : 'Add'}
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

export default ProductCRUD;
