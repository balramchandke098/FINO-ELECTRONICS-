
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '../components/Icons';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-charcoal-black tracking-tight mb-8">Your Cart</h1>
      {cartCount === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-soft">
          <h2 className="text-2xl font-semibold text-charcoal-black">Your cart is empty</h2>
          <p className="text-cool-gray mt-2">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="mt-6 inline-block bg-royal-purple text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-soft p-6">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-charcoal-black">
                        <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
                        <p className="ml-4">${((product.discountPrice || product.price) * quantity).toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-cool-gray">${(product.discountPrice || product.price).toLocaleString()} each</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-2 text-cool-gray hover:text-charcoal-black"><MinusIcon className="w-4 h-4" /></button>
                        <span className="px-3 text-base">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-2 text-cool-gray hover:text-charcoal-black"><PlusIcon className="w-4 h-4" /></button>
                      </div>
                      <div className="flex">
                        <button type="button" onClick={() => removeFromCart(product.id)} className="font-medium text-royal-purple hover:text-electric-blue flex items-center gap-1">
                          <TrashIcon className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-lg font-medium text-charcoal-black">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-cool-gray">Subtotal</p>
                  <p className="text-sm font-medium text-charcoal-black">${cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-cool-gray">Shipping</p>
                  <p className="text-sm font-medium text-charcoal-black">FREE</p>
                </div>
                 <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-charcoal-black">Order total</p>
                  <p className="text-base font-medium text-charcoal-black">${cartTotal.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6">
                <button onClick={() => navigate('/checkout')} className="w-full bg-royal-purple text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
