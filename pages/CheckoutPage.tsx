
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger payment processing and order creation in the backend.
        alert('Thank you for your order! (This is a demo)');
        clearCart();
        navigate('/profile');
    };
    
    if (cartItems.length === 0) {
        navigate('/products');
        return null;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-charcoal-black tracking-tight mb-8 text-center">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-soft p-8 order-last md:order-first">
                    <h2 className="text-2xl font-bold text-charcoal-black mb-6">Order Summary</h2>
                    <ul className="divide-y divide-gray-200">
                        {cartItems.map(({ product, quantity }) => (
                            <li key={product.id} className="flex items-center py-4">
                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                <div className="ml-4 flex-grow">
                                    <p className="font-semibold text-charcoal-black">{product.name}</p>
                                    <p className="text-sm text-cool-gray">Qty: {quantity}</p>
                                </div>
                                <p className="font-semibold">${((product.discountPrice || product.price) * quantity).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 border-t pt-6">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="bg-white rounded-xl shadow-soft p-8">
                    <h2 className="text-2xl font-bold text-charcoal-black mb-6">Shipping & Payment</h2>
                    <form onSubmit={handlePlaceOrder}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" defaultValue={currentUser?.email} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring-royal-purple sm:text-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" defaultValue={currentUser?.name} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring-royal-purple sm:text-sm p-2" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring-royal-purple sm:text-sm p-2" />
                            </div>
                            {/* Dummy payment fields */}
                             <div>
                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input type="text" id="card-number" placeholder="**** **** **** 1234" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring-royal-purple sm:text-sm p-2" />
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-8 bg-royal-purple text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
