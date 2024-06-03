import React from "react";
import DashboardStatsGrid from "../../Components/DashboardComponents/DashboardStatsGrid";
import TransactionChart from "../../Components/DashboardComponents/TransactionChart";
import RecentOrders from "../../Components/DashboardComponents/RecentOrders";
import BuyerProfilePieChart from "../../Components/DashboardComponents/BuyerProfilePieChart";
import PopularProducts from "../../Components/DashboardComponents/PopularProducts";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Dashboard() {
  return (
    <div>
      <center><LinkContainer to="/admin/productlist">
        <Button className="bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 mx-2 p-[12px] w-auto rounded-[25px]">
          Products
        </Button>
      </LinkContainer>
      <LinkContainer to="/admin/orderlist">
      <Button className="bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 mx-2 p-[12px] w-auto rounded-[25px]">Orders</Button>
      </LinkContainer>
      <LinkContainer to="/admin/userlist">
      <Button className="bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 mx-2 p-[12px] w-auto rounded-[25px]">Users</Button>
      </LinkContainer></center>
      <div className="flex flex-col gap-4">
        <h1 className="mt-5 mb-10  text-center text-4xl font-bold">
          <center>Dashbord</center>
        </h1>
        <DashboardStatsGrid />
        <div className="flex flex-row w-full gap-4">
          <TransactionChart />
          <BuyerProfilePieChart />
        </div>
        <div className="flex flex-row w-full gap-4">
          <RecentOrders />
          <PopularProducts />
        </div>
      </div>
    </div>
  );
}
