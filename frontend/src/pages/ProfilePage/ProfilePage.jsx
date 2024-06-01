import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";
import Message from "../../Components/Message";
import {
  getUserDetails,
  updateUserProfile,
} from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { listMyOrders } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  console.log("orders", orderListMy);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h1>{user.username}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <LoadingIndicator />}
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder={user.name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder={user.username}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button type="submit">Update</button>
      </form>
      <br></br>
      <h1>orders list</h1>
      {loadingOrders ? (
                    <LoadingIndicator />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>
                                            <td>
                                                {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                <button type='button' className='small' onClick={() => { navigate(`/order/${order._id}`) }}>Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

    </div>
  );
}

export default ProfilePage;
