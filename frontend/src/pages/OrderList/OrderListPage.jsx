import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";


function OrderListPage() {
  
    const [orders, setOrders] = useState([
        { 
          _id: '1', 
          user: { name: 'mghni' }, 
          createdAt: '2023-06-01T12:34:56Z', 
          totalPrice: 99.99, 
          isPaid: true, 
          paidAt: '2023-06-02T12:34:56Z', 
          isDelivered: false, 
          deliveredAt: null 
        },
        { 
          _id: '2', 
          user: { name: 'lhasli' }, 
          createdAt: '2023-06-05T14:20:00Z', 
          totalPrice: 49.49, 
          isPaid: false, 
          paidAt: null, 
          isDelivered: true, 
          deliveredAt: '2023-06-06T16:00:00Z' 
        },
      ]);
      
  return (
    <div>
      <h1>Orders</h1>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( */}
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      {/* )} */}
    </div>
  );
}

export default OrderListPage;
