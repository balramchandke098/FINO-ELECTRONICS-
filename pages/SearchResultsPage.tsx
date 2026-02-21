
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useData();

  const searchResults = query ? products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  ) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-charcoal-black tracking-tight">Search Results</h1>
        {query && <p className="mt-2 text-lg text-cool-gray">Showing results for: <span className="font-semibold text-charcoal-black">"{query}"</span></p>}
      </div>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl shadow-soft">
            <h2 className="text-2xl font-semibold text-charcoal-black">No products found</h2>
            <p className="text-cool-gray mt-2">We couldn't find anything matching your search. Try a different term.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
