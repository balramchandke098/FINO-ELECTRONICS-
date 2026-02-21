
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBagIcon, UserCircleIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from './Icons';
import SearchBar from './SearchBar';

const FinoLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="currentColor"/>
        <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="19" fontWeight="bold" fill="white">
            Fe
        </text>
    </svg>
);


const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section: Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-charcoal-black">
                <FinoLogo className="w-8 h-8 text-charcoal-black"/>
                <span className="hidden sm:inline">Fino Electronics</span>
              </Link>
            </div>
            
            {/* Center Section: Navigation */}
            <nav className="hidden md:flex md:space-x-8 items-center">
              <Link to="/products" className="text-gray-500 hover:text-royal-purple transition-colors">All Products</Link>
              <Link to="#" className="text-gray-500 hover:text-royal-purple transition-colors">Smartphones</Link>
              <Link to="#" className="text-gray-500 hover:text-royal-purple transition-colors">Laptops</Link>
              <Link to="#" className="text-gray-500 hover:text-royal-purple transition-colors">Accessories</Link>
              {currentUser && currentUser.role === 'admin' && (
                  <Link to="/admin" className="text-sm font-semibold text-royal-purple hover:text-electric-blue transition-colors">Admin Panel</Link>
              )}
            </nav>

            {/* Right Section: Actions */}
            <div className="flex items-center justify-end gap-2 md:gap-4">
               <SearchBar />
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link to="/cart" className="relative group">
                  <ShoppingBagIcon className="w-6 h-6 text-gray-500 group-hover:text-royal-purple transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-royal-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  {currentUser ? (
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-1 text-gray-500 hover:text-royal-purple transition-colors">
                      <UserCircleIcon className="w-6 h-6" />
                      <span className="hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/admin/login" className="text-sm text-gray-500 hover:text-royal-purple">Admin</Link>
                        <Link to="/login" className="bg-royal-purple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                          Login
                        </Link>
                    </div>
                  )}
                  {dropdownOpen && currentUser && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-light-gray" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-light-gray">Logout</button>
                    </div>
                  )}
                </div>
                {/* Hamburger Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMobileMenuOpen(true)} className="text-gray-500 hover:text-royal-purple">
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon className="w-6 h-6"/>
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" onClick={closeMobileMenu}></div>
            
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-lg p-6">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2 text-lg font-bold text-charcoal-black">
                      <FinoLogo className="w-7 h-7 text-charcoal-black" />
                      Fino Electronics
                    </Link>
                    <button onClick={closeMobileMenu} className="text-gray-500 hover:text-royal-purple">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="w-6 h-6"/>
                    </button>
                </div>
                <SearchBar onSearch={closeMobileMenu} isMobile={true} />
                <nav className="flex flex-col space-y-2">
                    <Link to="/products" onClick={closeMobileMenu} className="text-lg py-2 text-gray-700 hover:text-royal-purple transition-colors">All Products</Link>
                    <Link to="#" onClick={closeMobileMenu} className="text-lg py-2 text-gray-700 hover:text-royal-purple transition-colors">Smartphones</Link>
                    <Link to="#" onClick={closeMobileMenu} className="text-lg py-2 text-gray-700 hover:text-royal-purple transition-colors">Laptops</Link>
                    <Link to="#" onClick={closeMobileMenu} className="text-lg py-2 text-gray-700 hover:text-royal-purple transition-colors">Accessories</Link>
                    {currentUser && currentUser.role === 'admin' && (
                        <Link to="/admin" onClick={closeMobileMenu} className="text-lg py-2 font-semibold text-royal-purple hover:text-electric-blue transition-colors">Admin Panel</Link>
                    )}
                </nav>

                {!currentUser && (
                    <div className="border-t pt-6 mt-6 space-y-4">
                        <Link to="/login" onClick={closeMobileMenu} className="block w-full text-center bg-royal-purple text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                          Login / Sign Up
                        </Link>
                        <Link to="/admin/login" onClick={closeMobileMenu} className="block text-center text-sm text-cool-gray hover:text-royal-purple">Admin Login</Link>
                    </div>
                )}
            </div>
        </div>
      )}
    </>
  );
};

export default Header;
