import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/FormContainer";

function EditProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <div className="mt-5">
      <FormContainer>
        <h1 className="text-2xl font-bold mb-3 ">Edit Product</h1>

        <Form>
          <Form.Group controlId="name" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">Name</Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">Price</Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">Image</Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">Brand</Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countinstock" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">Stock</Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">
              Category
            </Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mt-2">
            <Form.Label className="text-[16px] font-semibold">
              Description
            </Form.Label>
            <Form.Control
              className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className=" bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 p-[12px] w-[150px] rounded-[50px]"
          >
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default EditProductPage;
