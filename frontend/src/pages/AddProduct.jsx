import React, { useEffect, useState } from "react";
import api from "../api";

const AddProduct = () => {
  const [products, setProducts] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  
  const createProduct = (e) => {
    e.preventDefault();

    api
      .post("/api/products/", { name, price, description})
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        } else alert("Failed to create product");
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <form onSubmit={createProduct}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="submit"
          value="Add Product"
          className="bg-red-500 w-4 h-4 "
        />
      </form>
    </div>
  );
};
export default AddProduct;
