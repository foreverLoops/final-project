import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Package, CreditCard, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'payment'>('profile');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    notifications: {
      orders: true,
      promotions: false,
      updates: true
    }
  });

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  async function fetchOrders() {
    setLoading(true);
    try {
      // Fetch user orders
      const response = await fetch(`/api/orders?userId=${user?.id}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'bg-gray-50 text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50'
              } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
            >
              <UserIcon
                className={`${
                  activeTab === 'profile' ? 'text-indigo-500' : 'text-gray-400'
                } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
              />
              Profile
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'bg-gray-50 text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50'
              } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
            >
              <Package
                className={`${
                  activeTab === 'orders' ? 'text-indigo-500' : 'text-gray-400'
                } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
              />
              Orders
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`${
                activeTab === 'payment'
                  ? 'bg-gray-50 text-indigo-700'
                  : 'text-gray-900 hover:bg-gray-50'
              } group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full`}
            >
              <CreditCard
                className={`${
                  activeTab === 'payment' ? 'text-indigo-500' : 'text-gray-400'
                } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
              />
              Payment Methods
            </button>
          </nav>
        </aside>

        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profile.email}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="orders"
                            name="orders"
                            type="checkbox"
                            checked={profile.notifications.orders}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                notifications: {
                                  ...profile.notifications,
                                  orders: e.target.checked
                                }
                              })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="orders" className="font-medium text-gray-700">
                            Order updates
                          </label>
                          <p className="text-gray-500">Get notified about your order status changes.</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="promotions"
                            name="promotions"
                            type="checkbox"
                            checked={profile.notifications.promotions}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                notifications: {
                                  ...profile.notifications,
                                  promotions: e.target.checked
                                }
                              })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="promotions" className="font-medium text-gray-700">
                            Promotions
                          </label>
                          <p className="text-gray-500">Receive updates about promotions and deals.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Order History</h2>
                {loading ? (
                  <div className="animate-pulse space-y-4 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-100 rounded"></div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <p className="mt-4 text-gray-500">No orders found.</p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {/* Order list would go here */}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                <p className="mt-4 text-gray-500">
                  Payment methods management will be implemented in a future update.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}