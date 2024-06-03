import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect } from "react";
import { listOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";



export default function TransactionChart() {
	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.orderList);
	const { orders } = orderList;
	let incomeJan = 0;
	let incomeFeb = 0;
	let incomeMar = 0;
	let incomeApr = 0;
	let incomeMay = 0;
	let incomeJun = 0;
	let incomeJuly = 0;
	let incomeAug = 0;
	let incomeSep = 0;
	let incomeOct = 0;
	let incomeNov = 0;
	let incomeDec = 0;
	let incomedata = [];
	if (orders) {
		orders.forEach((order) => {
			const date = new Date(order.paidAt);
			if (date.getMonth() === 0) {
				incomeJan += Number(order.totalPrice);
			} else if (date.getMonth() === 1) {
				incomeFeb += Number(order.totalPrice);
			} else if (date.getMonth() === 2) {
				incomeMar += Number(order.totalPrice);
			} else if (date.getMonth() === 3) {
				incomeApr += Number(order.totalPrice);
			} else if (date.getMonth() === 4) {
				incomeMay += Number(order.totalPrice);
			} else if (date.getMonth() === 5) {
				incomeJun += Number(order.totalPrice);
			} else if (date.getMonth() === 6) {
				incomeJuly += Number(order.totalPrice);
			} else if (date.getMonth() === 7) {
				incomeAug += Number(order.totalPrice);
			} else if (date.getMonth() === 8) {
				incomeSep += Number(order.totalPrice);
			} else if (date.getMonth() === 9) {
				incomeOct += Number(order.totalPrice);
			} else if (date.getMonth() === 10) {
				incomeNov += Number(order.totalPrice);
			} else if (date.getMonth() === 11) {
				incomeDec += Number(order.totalPrice);
			}
		});
		
		
		incomedata = [
			{
				name: 'Jan',
				// Expense: 4000,
				Income: incomeJan
			},
			{
				name: 'Feb',
				// Expense: 3000,
				Income: incomeFeb
			},
			{
				name: 'Mar',
				// Expense: 2000,
				Income: incomeMar
			},
			{
				name: 'Apr',
				// Expense: 2780,
				Income: incomeApr
			},
			{
				name: 'May',
				// Expense: 1890,
				Income: incomeMay
			},
			{
				name: 'Jun',
				// Expense: 2390,
				Income: incomeJun
			},
			{
				name: 'July',
				// Expense: 3490,
				Income: incomeJuly
			},
			{
				name: 'Aug',
				// Expense: 2000,
				Income: incomeAug
			},
			{
				name: 'Sep',
				// Expense: 2780,
				Income: incomeSep
			},
			{
				name: 'Oct',
				// Expense: 1890,
				Income: incomeOct
			},
			{
				name: 'Nov',
				// Expense: 2390,
				Income: incomeNov
			},
			{
				name: 'Dec',
				// Expense: 3490,
				Income: incomeDec
			}
		]

	}
	useEffect(() => {
		dispatch(listOrders());
	}, [dispatch]);
	return (
		<div className="h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="font-medium text-gray-700">Transactions</strong>
			<div className="flex-1 w-full mt-3 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={incomedata}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Income" fill="#0ea5e9" />
						{/* <Bar dataKey="Expense" fill="#ea580c" /> */}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}