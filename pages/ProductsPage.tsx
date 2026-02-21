
import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useData } from '../context/DataContext';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const { products } = useData();
  const [filters, setFilters] = useState({
    category: 'All',
    sortBy: 'popularity',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }
    return result;
  }, [products, filters]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-charcoal-black tracking-tight">Our Collection</h1>
        <p className="mt-2 text-lg text-cool-gray">Explore the full range of Fino electronics.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-soft p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm font-medium text-cool-gray">Category:</label>
          <select 
            id="category" 
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring focus:ring-royal-purple focus:ring-opacity-50"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="sortBy" className="text-sm font-medium text-cool-gray">Sort by:</label>
          <select 
            id="sortBy" 
            name="sortBy"
            value={filters.sortBy}
            onChange={handleFilterChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-royal-purple focus:ring focus:ring-royal-purple focus:ring-opacity-50"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
