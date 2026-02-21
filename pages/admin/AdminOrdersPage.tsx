
import React from 'react';
import { useData } from '../../context/DataContext';
import { Order } from '../../types';

const AdminOrdersPage: React.FC = () => {
    const { orders, updateOrderStatus } = useData();

    const handleStatusChange = (orderId: string, status: Order['status']) => {
        updateOrderStatus(orderId, status);
    };
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-success-green/20 text-success-green';
            case 'Shipped': return 'bg-electric-blue/20 text-electric-blue';
            case 'Pending': return 'bg-warning-orange/20 text-warning-orange';
            default: return 'bg-gray-700 text-cool-gray';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Orders</h1>
            <div className="bg-admin-card rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-cool-gray">
                        <thead className="text-xs text-gray-400 uppercase bg-[#111318]">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="bg-admin-card border-b border-gray-800 hover:bg-[#2a2e37]">
                                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer.name}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">${order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                            className="bg-[#2a2e37] border border-gray-600 text-white text-sm rounded-lg focus:ring-royal-purple focus:border-royal-purple block w-full p-2"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrdersPage;
