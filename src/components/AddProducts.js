import React, { useState } from 'react';
import "./AddProducts.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productCode: '',
    barCode: '',
    productName: '',
    productDescription: '',
    productCategory: '',
    reorderQuantity: '',
    packedWeight: '',
    packedHeight: '',
    packedWidth: '',
    packedDepth: '',
    refrigerated: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can handle form submission here
  };

  return (
    <div className="container">
      <h1>Add Asset</h1>
      <form id="productForm" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productCode">Product Code</label>
            <input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="barCode">Bar Code</label>
            <input
              type="text"
              id="barCode"
              name="barCode"
              value={formData.barCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Product Category</label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="productDescription">Product Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reorderQuantity">Reorder Quantity</label>
            <input
              type="number"
              id="reorderQuantity"
              name="reorderQuantity"
              value={formData.reorderQuantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="packedWeight">Packed Weight</label>
            <input
              type="number"
              step="0.01"
              id="packedWeight"
              name="packedWeight"
              value={formData.packedWeight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="packedHeight">Packed Height</label>
            <input
              type="number"
              step="0.01"
              id="packedHeight"
              name="packedHeight"
              value={formData.packedHeight}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="packedWidth">Packed Width</label>
            <input
              type="number"
              step="0.01"
              id="packedWidth"
              name="packedWidth"
              value={formData.packedWidth}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="packedDepth">Packed Depth</label>
            <input
              type="number"
              step="0.01"
              id="packedDepth"
              name="packedDepth"
              value={formData.packedDepth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="refrigerated"
              name="refrigerated"
              checked={formData.refrigerated}
              onChange={handleChange}
            />
            <label htmlFor="refrigerated">Refrigerated</label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
