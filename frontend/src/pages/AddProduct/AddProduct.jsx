import React, { useEffect, useState } from "react";
import api from "../../api";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [Brand, setBrand] = useState("");
  const [Rating, setRating] = useState("");
  const [Category, setCategory] = useState("");
  const [CountInStock, setCountInStock] = useState("");
  const [discount, setDiscount] = useState("");

  const createProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("Brand", Brand);
    formData.append("Rating", Rating);
    formData.append("Category", Category);
    formData.append("CountInStock", CountInStock);
    formData.append("discount", discount);
    


    api
      .post("/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
        } else alert("Failed to create product");
      })
      .catch((error) => alert(error));
  };

  return (
    
    <div className="max-w-md  mx-auto my-[60px] p-6 bg-white rounded-lg "  style={{ boxShadow: "rgba(0, 0, 0, 0.56) 3px -3px 20px 3px" }}>
      <form onSubmit={createProduct}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Brand" className="block text-gray-700 font-bold mb-2">
            Brand
          </label>
          <input
            id="Brand"
            type="text"
            name="Brand"
            value={Brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Rating" className="block text-gray-700 font-bold mb-2">
            Rating
          </label>
          <input
            id="Rating"
            type="number"
            name="Rating"
            value={Rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Rating"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          /> 
        </div>
        <div className="mb-4">
          <label htmlFor="Category" className="block text-gray-700 font-bold mb-2">
            Category
          </label>
          <input
            id="Category"
            type="text"
            name="Category"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          
        </div>
        <label htmlFor="CountInStock" className="block text-gray-700 font-bold mb-2">
            CountInStock
          </label>
          <input
            id="CountInStock"
            type="number"
            name="CountInStock"
            value={CountInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            placeholder="CountInStock"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">
            discount
          </label>
          <input
            id="discount"
            type="number"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="discount"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
  
  
        

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <input
          type="submit"
          value="Add Product"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
};
export default AddProduct;
