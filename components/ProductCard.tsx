
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, category, price, discountPrice, images, status } = product;

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${id}`} className="block">
        <div className="relative">
          <img src={images[0]} alt={name} className="w-full h-56 object-cover" />
          {status === 'Out of Stock' && (
            <div className="absolute top-3 left-3 bg-error-red text-white text-xs font-bold px-2 py-1 rounded-full">SOLD OUT</div>
          )}
          {discountPrice && (
             <div className="absolute top-3 right-3 bg-royal-purple text-white text-xs font-bold px-2 py-1 rounded-full">SALE</div>
          )}
        </div>
        <div className="p-4">
          <p className="text-sm text-cool-gray">{category}</p>
          <h3 className="mt-1 text-lg font-semibold text-charcoal-black group-hover:text-royal-purple transition-colors">{name}</h3>
          <div className="mt-2 flex items-baseline space-x-2">
            <p className={`text-xl font-bold ${discountPrice ? 'text-royal-purple' : 'text-charcoal-black'}`}>
              ${discountPrice ? discountPrice.toLocaleString() : price.toLocaleString()}
            </p>
            {discountPrice && (
              <p className="text-sm text-cool-gray line-through">${price.toLocaleString()}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
