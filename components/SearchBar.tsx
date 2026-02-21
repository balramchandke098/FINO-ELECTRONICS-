
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from './Icons';

interface SearchBarProps {
    onSearch?: () => void;
    isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isMobile = false }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery('');
            if (onSearch) {
                onSearch();
            }
        }
    };

    if (isMobile) {
        return (
            <form onSubmit={handleSearch} className="relative mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-royal-purple focus:border-royal-purple text-charcoal-black"
                    aria-label="Search for products"
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-cool-gray" aria-label="Submit search">
                    <SearchIcon className="w-5 h-5" />
                </button>
            </form>
        );
    }
    
    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-xs hidden md:block">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-light-gray border border-transparent rounded-lg py-2 pl-4 pr-10 text-charcoal-black placeholder-cool-gray focus:outline-none focus:ring-2 focus:ring-royal-purple focus:border-transparent"
                aria-label="Search"
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-cool-gray" aria-label="Submit search">
                <SearchIcon className="w-5 h-5" />
            </button>
        </form>
    );
};

export default SearchBar;
