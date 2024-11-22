import React, { useState } from "react";
import "./ProductCrud.css";

const ProductCRUD = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      productCode: "P001",
      barCode: "1234567890123",
      productName: "Apple",
      productDescription: "Fresh red apples",
      productCategory: "Fruits",
      reorderQuantity: 50,
      packedWeight: "1kg",
      packedHeight: "10cm",
      packedWidth: "10cm",
      packedDepth: "10cm",
      refrigerated: false,
    },
    {
      id: 2,
      productCode: "P002",
      barCode: "9876543210987",
      productName: "Milk",
      productDescription: "Organic whole milk",
      productCategory: "Dairy",
      reorderQuantity: 100,
      packedWeight: "1L",
      packedHeight: "25cm",
      packedWidth: "8cm",
      packedDepth: "8cm",
      refrigerated: true,
    },
    {
        id: 3,
        productCode: "P003",
        barCode: "987654321112",
        productName: "Juice",
        productDescription: "Organic Juice",
        productCategory: "Drink",
        reorderQuantity: 20,
        packedWeight: "1.5L",
        packedHeight: "35cm",
        packedWidth: "18cm",
        packedDepth: "18cm",
        refrigerated: true,
      },
  ]);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddUser = () => {
    setUsers([...users, { ...form, id: users.length + 1 }]);
    closeForm();
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditingId(user.id);
    setForm(user);
    setShowModal(true);
  };

  const handleUpdateUser = () => {
    setUsers(users.map((user) => (user.id === editingId ? form : user)));
    closeForm();
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
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
    user.productName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
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
            <tr key={user.id}>
              <td>{user.productCode}</td>
              <td>{user.productName}</td>
              <td>{user.productCategory}</td>
              <td>{user.reorderQuantity}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEditUser(user)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {/* Modal */}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
        {/* Close Icon */}
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
    <div class="modalbuttons">
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
  );
};

export default ProductCRUD;
