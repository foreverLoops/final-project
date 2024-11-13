import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/products" className="text-base text-gray-500 hover:text-gray-900">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=new" className="text-base text-gray-500 hover:text-gray-900">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?category=sale" className="text-base text-gray-500 hover:text-gray-900">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Account</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/profile" className="text-base text-gray-500 hover:text-gray-900">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-base text-gray-500 hover:text-gray-900">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-base text-gray-500 hover:text-gray-900">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-base text-gray-500 hover:text-gray-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Newsletter
              </h3>
              <p className="mt-4 text-base text-gray-500">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
              <form className="mt-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 flex-1 rounded-l-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 rounded-r-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} EcoMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}