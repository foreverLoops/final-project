import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, Product } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'businesses' | 'products'>('businesses');
  const [pendingBusinesses, setPendingBusinesses] = useState<User[]>([]);
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingItems();
  }, [activeTab]);

  async function fetchPendingItems() {
    setLoading(true);
    try {
      if (activeTab === 'businesses') {
        const businessesQuery = query(
          collection(db, 'users'),
          where('role', '==', 'business'),
          where('businessApproved', '==', false)
        );
        const snapshot = await getDocs(businessesQuery);
        setPendingBusinesses(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User))
        );
      } else {
        const productsQuery = query(
          collection(db, 'products'),
          where('approved', '==', false)
        );
        const snapshot = await getDocs(productsQuery);
        setPendingProducts(
          snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
        );
      }
    } catch (error) {
      console.error('Error fetching pending items:', error);
      toast.error('Failed to load pending items');
    } finally {
      setLoading(false);
    }
  }

  async function handleBusinessApproval(businessId: string, approved: boolean) {
    try {
      await updateDoc(doc(db, 'users', businessId), {
        businessApproved: approved
      });
      setPendingBusinesses(prev => prev.filter(business => business.id !== businessId));
      toast.success(`Business ${approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error updating business status:', error);
      toast.error('Failed to update business status');
    }
  }

  async function handleProductApproval(productId: string, approved: boolean) {
    try {
      await updateDoc(doc(db, 'products', productId), {
        approved
      });
      setPendingProducts(prev => prev.filter(product => product.id !== productId));
      toast.success(`Product ${approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error updating product status:', error);
      toast.error('Failed to update product status');
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('businesses')}
            className={`${
              activeTab === 'businesses'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pending Businesses
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`${
              activeTab === 'products'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pending Products
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {activeTab === 'businesses' ? (
            <ul className="divide-y divide-gray-200">
              {pendingBusinesses.length === 0 ? (
                <li className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    No pending business approvals
                  </div>
                </li>
              ) : (
                pendingBusinesses.map((business) => (
                  <li key={business.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {business.businessName}
                        </h3>
                        <p className="text-sm text-gray-500">{business.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBusinessApproval(business.id, true)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleBusinessApproval(business.id, false)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <ul className="divide-y divide-gray-200">
              {pendingProducts.length === 0 ? (
                <li className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    No pending product approvals
                  </div>
                </li>
              ) : (
                pendingProducts.map((product) => (
                  <li key={product.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleProductApproval(product.id, true)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleProductApproval(product.id, false)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}