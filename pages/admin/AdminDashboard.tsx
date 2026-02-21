
import React from 'react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { products, orders } = useData();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5);

  const StatCard: React.FC<{ title: string, value: string | number, change?: string }> = ({ title, value, change }) => (
    <div className="bg-admin-card rounded-xl p-6 shadow-lg">
      <h3 className="text-cool-gray text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      {change && <p className="text-sm text-success-green mt-1">{change}</p>}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Total Products" value={products.length} />
      </div>

      <div className="mt-10 bg-admin-card rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Low Stock Alerts</h2>
        {lowStockProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-cool-gray">
              <thead className="text-xs text-gray-400 uppercase bg-[#111318]">
                <tr>
                  <th scope="col" className="px-6 py-3">Product Name</th>
                  <th scope="col" className="px-6 py-3">SKU</th>
                  <th scope="col" className="px-6 py-3">Stock Left</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(product => (
                  <tr key={product.id} className="bg-admin-card border-b border-gray-800 hover:bg-[#2a2e37]">
                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="bg-warning-orange/20 text-warning-orange font-bold px-3 py-1 rounded-full">{product.stock}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-cool-gray">No products are currently low on stock.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
