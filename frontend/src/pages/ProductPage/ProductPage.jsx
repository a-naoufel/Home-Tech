import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToCart } from "../../reducers/slices/cartSlice";
import { addToWISH_List } from "../../reducers/slices/favSlice";
import { Spinner } from "../../Components/spinner/Spinner";
import ReactImageMagnify from "react-image-magnify";
import Rating from "../../Components/Rating";

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

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [favClicked, setFavClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  console.log("product", product);
  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        navigate("/*")
      ) : (
        <div>
          <div className="container my-[30px] ">
            <div className="single-product  grid grid-cols-2 py-[40px] ">
              <div className=" img w-[80%] h-[100%] ">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product?.name,
                      isFluidWidth: true,
                      src: product?.image,
                    },
                    largeImage: {
                      src: product?.image,
                      width: 1800,
                      height: 1200,
                    },
                    isHintEnabled: true,
                  }}
                />
              </div>
                <div className="product-info">
                <h3 className="text-[32px]">{product?.name}</h3>
                <div className="rating flex items-center text-[20px] my-[8px]">
                  <p className="flex items-center mr-[10px]">
                    <AiFillStar className="text-yellow-300 text-[25px]" /> {""}{" "}
                    {product?.rating}
                  </p>
                  <p className="text-[#909090] text-[16px]">
                    {product?.rating} review
                  </p>
                </div>
                <div className="pricing font-bold text-[26px]">
                  ${product?.price}{" "}
                  <del className="text-bgColorDanger ml-[10px] text-[22px]">
                    ${(product?.price * 1.2).toFixed(2)}
                  </del>
                </div>
                <p className="desc leading-[1.5] text-[#909090] my-[10px]">
                  {product?.description}
                </p>
                  {product?.countInStock > 0 && (
                <div className="btns flex items-center justify-between border-t-[1px] border-t-[#eee] border-b-[1px] border-b-[#eee]">
                  <div className="qty mt-[15px] mb-[15px] border-[1px] border-[#909090] rounded-[50px] flex ">
                    <button
                      className="controls bg-gray-200 cursor-pointer w-[40px] h-[40px] text-[20px] rounded-full p-[5px] outline-none border-none"
                      disabled={qty == 1}
                      onClick={() => qty != 1 && setQty(qty - 1)}
                    >
                      -
                    </button>
                    <input
                      className="text-center text-[17px] font-medium border-[none] outline-[none]"
                      type="number"
                      min="1"
                      max={product.countInStock}
                      value={qty}
                      onChange={(e) => {
                        if (e.target.value > product.countInStock) {
                          setQty(product.countInStock);
                        } else if (e.target.value < 1) {
                          setQty(1);
                        } else {
                          setQty(+e.target.value);
                        }
                      }}
                    />
                    <button
                      className="controls bg-gray-200 cursor-pointer w-[40px] h-[40px] text-[20px] rounded-full p-[5px] outline-none border-none"
                      disabled={qty > product.countInStock}
                      onClick={() => setQty(qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="buy w-[60%]">
                    <button
                      // onClick={() =>
                      //   dispatch(
                        //     addToCart({
                      //       id: product.id,
                      //       title: product.title,
                      //       price: product.price,
                      //       quantity: qty,
                      //       image: product.image,
                      //     })
                      //   )
                      // }
                      onClick={addToCartHandler}
                      className="buy w-full py-[10px] rounded-[50px] cursor-pointer bg-mainColor text-white text-[18px] shadow-[0px 1px 4px 0px #00b207] transition-[0.5s] border-none hover:bg-blue-400"
                      disabled={product.countInStock == 0}
                      type="button"
                      >
                      Add to Cart
                    </button>
                  </div>
                  <div
                    className="fav bg-[#e9f8e9] cursor-pointer p-[10px] flex rounded-full"
                    //   onClick={() => (
                      //     setFavClicked(!favClicked),
                    //     dispatch(
                    //       addToWISH_List({
                      //         id: product.id,
                      //         title: product.title,
                    //         price: product.price,
                    //         quantity: qty,
                    //         image: product.image,
                    //       })
                    //     )
                    //   )}
                  >
                    {favClicked ? (
                      <AiFillHeart className="icon text-[22px] text-bgColorDanger " />
                    ) : (
                      <AiOutlineHeart className="icon  text-[22px] text-bgColorBlack" />
                      )}
                  </div>
                </div>
                    )} 
                <div className="category mt-[12px]">
                  Status:{" "}
                  <span className="text-[#909090]">
                    {product.countInStock > 0
                      ? `Disponibale only ${product.countInStock}`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
            {/* <div>
            <h2>Customer Reviews</h2>
            {product?.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                product.map((review, index) => (
                    <div key={index} className="review">
                        <strong>Rating: {product?.rating}</strong>
                        <p>{product?.comment}</p>
                    </div>
                ))
            )}
        </div> */}
              </div>
              <div className="m-4 flex flex-col ">

                <h1 className="text-2xl font-bold mb-4">Reviews</h1>
                <div className="flex ">
                  
                  {product.reviews.length === 0 && (
            <Message variant="info">No Reviews</Message>
                  )}
                 
                  {product.reviews.map((review) => (
             <div key={review._id} className="flex justify-between mx-3 p-3 border border-mainColor rounded-[20px] ">
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value='5' color='#f8e825' />
              <h1 className="font-minbold">  rating : {review.rating} stars</h1>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
                      </ListGroup.Item>
                      
            </div>
          ))}
                  
               
                </div>
          

          <h4 className="tex-lg font-bold my-3" >Write a review</h4>
          {loadingProductReview && <LoadingIndicator />}
          {successProductReview && (
            <Message variant="success">Review Submitted</Message>
          )}
          {errorProductReview && (
            <Message variant="danger">{errorProductReview}</Message>
          )}

          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <Form.Label className="tex-lg font-bold mb-2" >Rating</Form.Label>
                    <Form.Control
                  className="w-[20%]"
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="comment" className="w-[50%]">
                <Form.Label className="tex-lg font-bold my-2">Review</Form.Label>
                <Form.Control
                  as="textarea"
                  row="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>

                    <Button
                      className=' bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 p-[12px] w-[100px] rounded-[50px]'
                disabled={loadingProductReview}
                type="submit"
                variant="primary"
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Message variant="info">
              Please <Link to="/login">login</Link> to write a review
            </Message>
                )}
                </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;