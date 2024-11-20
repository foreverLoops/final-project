import React from 'react';

export default function PersonalInfo() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg p-8 max-w-5xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cell Number</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" value="South Africa" readOnly className="mt-1 block w-full px-3 py-2 bg-gray-300 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Suburb</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Province</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
