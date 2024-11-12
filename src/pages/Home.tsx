import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[500px] object-cover"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to EcoMarket
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your premier marketplace for unique products from verified sellers. Shop with confidence
            knowing that every transaction is secure and every product is quality-assured.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Why Choose EcoMarket?
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute top-6 left-6">
              <ShoppingBag className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Curated Products</h3>
            <p className="mt-2 text-base text-gray-500">
              Every product on our platform is carefully selected to ensure quality and authenticity.
            </p>
          </div>
          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute top-6 left-6">
              <Shield className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Secure Transactions</h3>
            <p className="mt-2 text-base text-gray-500">
              Shop with confidence knowing your payments and personal information are protected.
            </p>
          </div>
          <div className="relative p-6 bg-white rounded-lg shadow-md">
            <div className="absolute top-6 left-6">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-8 text-lg font-medium text-gray-900">Seller Success</h3>
            <p className="mt-2 text-base text-gray-500">
              Our platform helps sellers grow their business with powerful tools and insights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}