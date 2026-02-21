
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-black text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-cool-gray hover:text-white">Smartphones</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Laptops</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Accessories</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Wearables</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">About Fino</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-cool-gray hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Careers</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-cool-gray hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-cool-gray hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-cool-gray hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-cool-gray text-sm">&copy; {new Date().getFullYear()} Fino Electronics Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social Icons Placeholder */}
            <a href="#" className="text-cool-gray hover:text-white">Twitter</a>
            <a href="#" className="text-cool-gray hover:text-white">Instagram</a>
            <a href="#" className="text-cool-gray hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
