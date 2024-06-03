/**
 * Renders the CartPage component.
 * This component displays the user's cart items and allows them to modify the quantity or remove items.
 * If the cart is empty, it displays a message and a button to continue shopping.
 *
 * @component
 * @example
 * return <CartPage />;
 */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidTrashAlt } from "react-icons/bi";
import { LinkContainer } from "react-router-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

function CartPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productId = id;
  let qty = new URLSearchParams(window.location.search).get("qty");
  if (!qty) {
    qty = 1;
  } else {
    qty = Number(qty);
  }

  console.log("qty: ", qty);
  console.log("productId: ", productId);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log("cartItems: ", cartItems);
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  console.log("cartItems: ", cartItems);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div
          className="container flex flex-col items-center justify-center py-14"
          style={{ minHeight: `calc(100vh - 70.94px)` }}
        >
          <img 
            className="rounded-[20px]"
            src="/empty.png"
            alt="cart-empty"
            width={300}
            height={300}
          />
          <p className="my-6 mb-2 text-3xl font-bold">
            Your cart is empty and sad :(
          </p>
          <p className="opacity-60">Add something to make it happy!</p>
          <button
            className="mt-6 rounded-xl bg-mainColor px-6 py-2 text-white"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
          
          
          <div className="cart mt-[100px]">
              <LinkContainer to="/shop">
        <button
        className="bg-mainColor text-white absolute left-12 top-[150px]   flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"
       
      >
        <FaArrowLeft />
      </button>
      </LinkContainer>
       
            <div className="container">
          
            <h1 className="text-4xl font-bold">Your Cart</h1>
            <div className="cart-holder pt-[20px] pb-[40px] flex justify-between">
              <div className="cart-wrapper border border-[#ddd] p-[15px] w-[70%] rounded-[8px]">
                {cartItems.map((item) => item.countInStock > 0 && (
                  <div className="mt-[8px]" key={item.product}>
                    <div className="flex justify-between">
                      <div className="flex items-center mb-[10px]">
                        <div className="bg-[#eee] p-[10px] mr-[15px] rounded-[6px]">
                          <img
                            className="w-[80px]"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col justify-between">
                          <h4 className="text-lg font-bold">{item.name}</h4>
                          <p className="mb-[15px] pt-4 text-[32px] font-semibold">
                            ${(item.price * item.qty).toFixed(2)}{" "}
                            <del className="text-[16px] text-[#EA4B48]">
                              ${(item.price * item.qty * 1.2).toFixed(2)}
                            </del>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <BiSolidTrashAlt
                          className="flex relative left-[80%] text-[#EA4B48] cursor-pointer text-[22px]"
                          onClick={() => dispatch(removeFromCart(item.product))}
                        />
                        <div className="mb-[20px] border border-[#909090] rounded-[50px] flex">
                          <button
                            className="cursor-pointer w-[40px] h-[40px] text-[20px] rounded-full p-[5px] bg-[#909090] outline-none border-none"
                            disabled={item.qty === 1}
                            onClick={() =>
                              navigate(
                                `/cart/${item.product}?qty=${item.qty - 1}`
                              )
                            }
                          >
                            -
                          </button>
                          <input
                            className="text-center text-[17px] font-medium border-[none] outline-[none]"
                            type="number"
                            min="1"
                            max={item.countInStock}
                            value={item.qty}
                            onChange={(e) => {
                              if (e.target.value > item.countInStock) {
                                navigate(
                                  `/cart/${item.product}?qty=${item.countInStock}`
                                );
                              } else if (e.target.value < 1) {
                                navigate(`/cart/${item.product}?qty=1`);
                              } else {
                                navigate(
                                  `/cart/${item.product}?qty=${e.target.value}`
                                );
                              }
                            }}
                          />
                          <button
                            className="cursor-pointer w-[40px] h-[40px] text-[20px] rounded-full p-[5px] bg-[#909090] outline-none border-none"
                            disabled={item.qty === item.countInStock}
                            onClick={() =>
                              navigate(
                                `/cart/${item.product}?qty=${item.qty + 1}`
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div className="cart-summary rounded-[12px] h-auto p-[10px] w-[250px] border border-[#ddd]">
                <h3 className="mb-[10px] text-lg font-bold">Order Summary</h3>
                <div className="cart-sum-box">
                  <div className="mb-[10px] flex justify-between">
                    Subtotal:{" "}
                    <span>
                      $
                      {cartItems
                        .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-[10px]">
                    Shipping: <span>Free</span>
                  </div>
                  <hr />
                  <div className="mt-[10px]">
                    Total:{" "}
                    <span>
                      $
                      {cartItems
                        .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <button 
                  onClick={() => navigate("/shipping")}
                  className="bg-[#00acff] border-none text-white p-[10px] rounded-[50px] mt-[10px] cursor-pointer w-full transition-opacity duration-300 hover:opacity-80"
                  >
                     Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;