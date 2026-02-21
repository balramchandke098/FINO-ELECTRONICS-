
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders } = useData();
  const userOrders = orders.filter(order => order.userId === currentUser?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-success-green/20 text-success-green';
      case 'Shipped': return 'bg-electric-blue/20 text-electric-blue';
      case 'Pending': return 'bg-warning-orange/20 text-warning-orange';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  if (!currentUser) {
    return null; // Or a loading state
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-charcoal-black tracking-tight mb-8">My Profile</h1>
      <div className="bg-white rounded-xl shadow-soft p-8 mb-8">
        <h2 className="text-2xl font-bold text-charcoal-black">Account Details</h2>
        <div className="mt-4 space-y-2 text-cool-gray">
          <p><span className="font-semibold text-charcoal-black">Name:</span> {currentUser.name}</p>
          <p><span className="font-semibold text-charcoal-black">Email:</span> {currentUser.email}</p>
          <p><span className="font-semibold text-charcoal-black">Role:</span> <span className="capitalize">{currentUser.role}</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-8">
        <h2 className="text-2xl font-bold text-charcoal-black mb-6">Order History</h2>
        {userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-charcoal-black">Order ID: {order.id}</p>
                    <p className="text-sm text-cool-gray">Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-charcoal-black">${order.total.toLocaleString()}</p>
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                  </div>
                </div>
                <div className="mt-4 border-t pt-4">
                    {order.items.map(item => (
                        <div key={item.product.id} className="flex items-center space-x-4 mb-2">
                           <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-md object-cover"/>
                           <div>
                               <p className="font-medium text-charcoal-black">{item.product.name}</p>
                               <p className="text-sm text-cool-gray">Quantity: {item.quantity}</p>
                           </div>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-cool-gray">You have not placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
