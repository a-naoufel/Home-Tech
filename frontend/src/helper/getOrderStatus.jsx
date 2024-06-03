export function getOrderStatus(status) {
	switch (status) {
		case 'PLACED':
			return (
				<span className="px-2 py-1 text-xs capitalize rounded-md text-sky-600 bg-sky-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'CONFIRMED':
			return (
				<span className="px-2 py-1 text-xs text-orange-600 capitalize bg-orange-100 rounded-md">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'SHIPPED':
			return (
				<span className="px-2 py-1 text-xs text-teal-600 capitalize bg-teal-100 rounded-md">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'OUT_FOR_DELIVERY':
			return (
				<span className="px-2 py-1 text-xs text-yellow-600 capitalize bg-yellow-100 rounded-md">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'DELIVERED':
			return (
				<span className="px-2 py-1 text-xs text-green-600 capitalize bg-green-100 rounded-md">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="px-2 py-1 text-xs text-gray-600 capitalize bg-gray-100 rounded-md">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}