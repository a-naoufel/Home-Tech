import React from 'react'
import DashboardStatsGrid from '../../Components/DashboardComponents/DashboardStatsGrid'
import TransactionChart from '../../Components/DashboardComponents/TransactionChart'
import RecentOrders from '../../Components/DashboardComponents/RecentOrders'
import BuyerProfilePieChart from '../../Components/DashboardComponents/BuyerProfilePieChart'
import PopularProducts from '../../Components/DashboardComponents/PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
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
	)
}