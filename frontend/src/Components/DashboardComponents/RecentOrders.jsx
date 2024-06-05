import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../../helper/getOrderStatus";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { listOrders } from "../../actions/orderActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

let recentOrderData = [];

export default function RecentOrders() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    }
  }, [dispatch, navigate, userInfo]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }


  recentOrderData = [];
  if (orders) {
    const today = new Date();
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    });

    filteredOrders.forEach((order) => {
      recentOrderData.push({
        id: order._id,
        product_id: order.orderItems[0].product,
        customer_id: order.user,
        customer_name: order.user.name,
        order_date: order.createdAt,
        order_total: order.totalPrice,
        current_order_status: order.isDelivered
          ? "DELIVERED"
          : order.isPaid
          ? "PAID"
          : order.isShipped
          ? "SHIPPED"
          : order.isConfirmed
          ? "CONFIRMED"
          : "PLACED",
        shipment_address: order.shippingAddress.address,
      });
    });
  }
  console.log("recentOrders",recentOrderData);
  
 


  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      <strong className="font-medium text-gray-700">Recent Orders</strong>
      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>Shipping Address</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>#{order.id}</Link>
                </td>
                <td>
                  <Link to={`/product/${order.product_id}`}>
                    #{order.product_id}
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/user/${order.customer_id._id}/edit`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td>{format(new Date(order.order_date), "dd MMM yyyy")}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
