import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { listOrders } from "../../actions/orderActions";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { listUsers } from "../../actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
const data = [
  { name: "payed", value: 540 },
  { name: "delevered", value: 620 },
  { name: "placed", value: 210 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BuyerProfilePieChart() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  
  let payed = 0;
  let delevered = 0;
  let placed = 0;
  if (orders) {
    orders.forEach((order) => {
      if (order.isDelivered) {
        delevered++;
      } else if (order.isPaid) {
        payed++;
      } else {
        placed++;
      }
    });
  }

  const orderdata = [
    { name: "payed", value: payed },
    { name: "delevered", value: delevered },
    { name: "placed", value: placed },
  ];

  useEffect(() => {
    dispatch(listUsers());
    dispatch(listOrders());
  }, [dispatch]);
  return (
    <div className="w-[20rem] h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="font-medium text-gray-700">Orders Profile</strong>
      <div className="flex-1 w-full mt-3 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={orderdata}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
