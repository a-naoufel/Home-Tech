import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import RatingStars from "../../Components/ratingstars/RatingStars";

import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import Message from "../../Components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import products from "../../products";

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        navigate("/*")
      ) : (
        <div>
          <img
            src={product.image}
            width={500}
            height={500}
            alt={product.name}
          />
          {product.name}
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
