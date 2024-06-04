import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../Components/FormContainer";
import api from "../../api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import { useNavigate, useLocation } from "react-router";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useParams } from "react-router";

function EditProductPage() {
  const { id } = useParams();
  const productId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [discount, setDiscount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { state: { from: "/admin/productlist" } });
    } else if (!userInfo.isAdmin) {
      navigate("/");
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== Number(productId)) {
        console.log("product id", productId);
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setDiscount(product.discount);
      }
    }
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }, [
    dispatch,
    product,
    productId,
    userInfo.isAdmin,
    userInfo,
    navigate,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        discount,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await api.post("api/products/upload/", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  let imageName = "";
  if (!loading && product && product.image) {
    imageName = product.image.split("/").pop();
    console.log(imageName);
    console.log(product);
  }

  return (
    <div className="m-5">
     <LinkContainer to="/admin/productlist">
    <button
    className="bg-mainColor text-white absolute left-12 top-[150px]   flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"

  >
    <FaArrowLeft />
  </button>
  </LinkContainer>
      <FormContainer>
        <h1 className="text-2xl font-bold mb-3 ">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Name
              </Form.Label>
              <Form.Control
                className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Price
              </Form.Label>
              <Form.Control
                className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Image
              </Form.Label>
              <Form.Control
                className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
                type="text"
                placeholder="Enter image"
                value={imageName}
                onChange={(e) =>
                  setImage(
                    "http://localhost:8000//media/".concat(e.target.value)
                  )
                }
              ></Form.Control>
              <input
                id="image-file"
                label="Choose File"
                type="file"
                custom
                className="my-3"
                onChange={uploadFileHandler}
              />

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Brand
              </Form.Label>
              <Form.Control
                className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>

            </Form.Group> <Form.Group controlId="discount" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Discount
              </Form.Label>
              <Form.Control
                className="p-[10px] border-mainColor focus:border-blue-300  rounded-4  "
                type="number"
                
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countinstock" className="mt-2">
              <Form.Label className="text-[16px] font-semibold">
                Stock
              </Form.Label>
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
        )}
      </FormContainer>
    </div>
  );
}

export default EditProductPage;
