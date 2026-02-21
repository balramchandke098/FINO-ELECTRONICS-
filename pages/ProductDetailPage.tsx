
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon, ArrowLeftIcon } from '../components/Icons';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useData();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = getProductById(id || '');

  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-royal-purple hover:underline mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Add some feedback to the user, e.g., a toast notification
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const stockColor = product.status === 'In Stock' ? 'text-success-green' : 'text-error-red';
  const canPurchase = product.status === 'In Stock';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-cool-gray hover:text-charcoal-black mb-6">
            <ArrowLeftIcon className="w-5 h-5" />
            Back
        </button>
      <div className="bg-white rounded-xl shadow-soft p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden mb-4">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)} className={`aspect-square rounded-md overflow-hidden ring-2 ${selectedImage === img ? 'ring-royal-purple' : 'ring-transparent'}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-royal-purple font-semibold">{product.category}</p>
          <h1 className="text-4xl font-extrabold text-charcoal-black mt-2 tracking-tight">{product.name}</h1>
          <p className="mt-4 text-cool-gray">{product.shortDescription}</p>
          
          <div className="mt-6 flex items-baseline space-x-3">
            <p className={`text-3xl font-bold ${product.discountPrice ? 'text-royal-purple' : 'text-charcoal-black'}`}>
              ${product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
            </p>
            {product.discountPrice && (
              <p className="text-xl text-cool-gray line-through">${product.price.toLocaleString()}</p>
            )}
          </div>
          
          <div className="mt-6">
            <p className={`text-sm font-bold ${stockColor}`}>{product.status} {product.status === 'In Stock' && `(${product.stock} left)`}</p>
          </div>
          
          {canPurchase && (
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-cool-gray hover:text-charcoal-black"><MinusIcon className="w-4 h-4" /></button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="p-3 text-cool-gray hover:text-charcoal-black"><PlusIcon className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={handleAddToCart} disabled={!canPurchase} className="w-full bg-royal-purple text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:bg-cool-gray disabled:cursor-not-allowed">Add to Cart</button>
            <button onClick={handleBuyNow} disabled={!canPurchase} className="w-full bg-electric-blue text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:bg-cool-gray disabled:cursor-not-allowed">Buy Now</button>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-charcoal-black">Specifications</h3>
            <div className="mt-4 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="py-3 grid grid-cols-3 gap-4 text-sm">
                    <dt className="font-medium text-cool-gray">{key}</dt>
                    <dd className="col-span-2 text-charcoal-black">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

       <div className="bg-white rounded-xl shadow-soft p-8 mt-12">
          <h2 className="text-2xl font-bold text-charcoal-black">Product Details</h2>
          <p className="mt-4 text-cool-gray leading-relaxed">{product.fullDescription}</p>
       </div>
    </div>
  );
};

export default ProductDetailPage;
