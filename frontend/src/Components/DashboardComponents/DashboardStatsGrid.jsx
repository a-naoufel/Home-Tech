import React from "react";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../actions/orderActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { listUsers } from "../../actions/userActions.js";


export default function DashboardStatsGrid() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let from = location.state ? location.state.from : "/";
  let totalUsers = 0;
  let newUsers = 0;
  
  if (users) {
		for (let i = 0; i < users.length; i++) {
			{if(users[i].isAdmin === false){
				totalUsers++;
			}
		}}
	  }

  const navigate = useNavigate();


  let totalOrders = 0;
  let todayOrders = 0;
  if (orders) {
    totalOrders = orders.length;
	todayOrders = orders.filter((order) => {
	  const date = new Date(order.createdAt);
	  const today = new Date();
	  return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	  );
	}).length;
  }

  let totalSales = 0;
  let todaySales = 0;
  if (orders) {
	orders.forEach((order) => {
	if (order.isPaid)
	  totalSales += Number(order.totalPrice);
	});
  }
  if (orders) {
	orders.forEach((order) => {
			  if (order.isPaid) {
				const date = new Date(order.paidAt);
				const today = new Date();
				if(order.paidAt){
						if(order.paidAt.substring(0, 10) === today.toISOString().substring(0, 10)){
							todaySales += Number(order.totalPrice);
						}
				}
			}
		});}

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
	  dispatch(listUsers());
    } else if (userInfo) {
      navigate("/");
    } else {
      navigate("/login", { state: { from: "/admin" } });
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <div className="flex gap-4 pt-3">
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
             {totalSales}$
            </strong>
            <span className="pl-2 text-sm text-green-500">{todaySales}</span>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalUsers}
            </strong>
            <span className="pl-2 text-sm text-red-500"></span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl font-semibold text-gray-700">
              {totalOrders}
            </strong>
            <span className="pl-2 text-sm text-red-500">{todayOrders}</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="flex items-center flex-1 p-4 bg-white border border-gray-200 rounded-sm">
      {children}
    </div>
  );
}
