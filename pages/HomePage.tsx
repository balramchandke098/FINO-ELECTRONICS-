
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useData } from '../context/DataContext';

const HomePage: React.FC = () => {
  const { products } = useData();
  const featuredProducts = products.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550009158-94ae76552485?auto=format&fit=crop&w=1920&q=80"
            alt="Modern desk setup with electronics"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-purple/70 to-electric-blue/70 backdrop-blur-sm" aria-hidden="true"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Innovation in Your Hands
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
            Discover the latest in high-end electronics, designed to seamlessly integrate into your life.
          </p>
          <div className="mt-8">
            <Link 
              to="/products" 
              className="inline-block bg-white text-royal-purple font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-light-gray transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-light-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-charcoal-black tracking-tight">Featured Products</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
