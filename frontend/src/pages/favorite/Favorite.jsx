"use client";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWish, removeFromWish } from "../../actions/wishActions";

import { useState } from "react";
import { FaArrowRight, FaRegHeart, FaTrash } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import cameraImage from "./camera.jpg";
import airpodsImage from "./airpods.jpg";
import alexaImage from "./alexa.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const products = [
  {
    id: 1,
    name: "Camera",
    price: 180,
    quantity: "in stock",
    image: cameraImage,
  },
  {
    id: 2,
    name: "AirPods",
    price: 250,
    quantity: "out of stock",
    image: airpodsImage,
  },
  {
    id: 3,
    name: "Alexa",
    price: 99,
    quantity: "bieng restord",
    image: alexaImage,
  },
  {
    id: 2,
    name: "AirPods",
    price: 250,
    quantity: "in stock",
    image: airpodsImage,
  },
  { id: 3, name: "Alexa", price: 99, quantity: "in stock", image: alexaImage },
];

export default function Favorite() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = id;

  console.log("productId: ", productId);

  const wish = useSelector((state) => state.wish);
  const { wishItems } = wish;

  console.log("wishItems: ", wishItems);
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (productId) {
      dispatch(addToWish(productId));
    }
    navigate("/wish");
  }, [dispatch, productId]);
  console.log("wishItems: ", wishItems);

  const [state, setState] = useState(wishItems.length > 0 ? true : false);

  return (
    <>
      {wishItems.length > 0 ? (
        <>
          <div className="wish">
            <LinkContainer to="/shop">
              <button className="bg-mainColor text-white absolute left-12 mt-2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed">
                <FaArrowLeft />
              </button>
            </LinkContainer>
            <p className="my-6 mt-12 text-center text-xl font-bold">
              My Wish list
            </p>
            <table className="mb-24 mt-12 w-screen">
              <thead className="bg-mainColor py-2 text-white">
                <tr>
                  <th>
                    <center>Product img</center>
                  </th>
                  <th>
                    <center>Name</center>
                  </th>
                  <th>
                    <center>Price</center>
                  </th>
                  <th>
                    <center>Quantity</center>
                  </th>
                  <th>
                    <center>Action</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((product) => (
                  <tr key={product.product} className="wish-img relative">
                    <td>
                      <div className="mx-auto w-fit">
                        <img
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                        />
                      </div>
                    </td>
                    <td>
                      <p>{product.name}</p>
                    </td>
                    <td>${product.price}</td>
                    <td className="">
                      <div>{product.countInStock}</div>
                    </td>

                    <td>
                      <div
                        className="mx-auto w-fit cursor-pointer text-bgColorDanger"
                        onClick={() => {
                          dispatch(removeFromWish(product.product));
                          navigate("/wish");
                        }}
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="bg-bgColorCartFooter py-6">
            <div className="container my-6 flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-xl font-bold">Discount Codes</p>
                <p className="opacity-60">Enter your coupon code if you have one</p>
                <div className="my-2 flex border-solid border-mainColor">
                  <input
                    placeholder="enter your coupon"
                    className="rounded-l-xl py-2 pl-3 focus:outline-none"
                    type="text"
                  />
                  <button className="rounded-r-xl bg-mainColor px-4 text-white">
                    Apply Coupon
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 rounded-xl border-2 border-mainColor px-9 py-3">
                <p className="font-bold">Order Summary</p>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2">
                    <p>Sub Total</p>
                    <p>Shipping</p>
                    <p>Grand Total</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>$2004</p>
                    <p className="">Free</p>
                    <p>$2004</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="animation-right-arrow-father mx-auto flex items-center gap-2 rounded-xl bg-mainColor px-4 py-2 text-sm text-white">
              <p>Proceed To Checkout</p>
              <div className="animation-right-arrow">
                <FaArrowRight />
              </div>
            </button>
          </div> */}
        </>
      ) : (
        <>
          <div
            className="container flex flex-col items-center justify-center py-14"
            style={{ minHeight: `calc(100vh - 70.94px)` }}
          >
            <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#F0F9F4]">
              <FaRegHeart className="h-1/2 w-1/2" />
            </div>
            <p className="my-6 mb-2 text-3xl font-bold">
              Your wishlist is empty
            </p>
            <p className="opacity-60">
              You don’t have any products in the wishlist yet. You will find a
              lot of interesting products on our Shop page.
            </p>
            <button className="mt-6 rounded-xl bg-mainColor px-6 py-2 text-white">
              <Link to="/shop">Continue Shopping</Link>
            </button>
          </div>
        </>
      )}
    </>
  );
}
