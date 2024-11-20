import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Link, Outlet } from 'react-router-dom';
import Logout from '../components/Logout';

export default function AdminPortal() {
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    const fetchPendingPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'postRequests'));
      const posts = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => post.status === 'pending');
      setPendingPosts(posts);
    };

    fetchPendingPosts();
  }, []);

  const handleApprove = async (postId) => {
    const postRef = doc(db, 'postRequests', postId);
    await updateDoc(postRef, { status: 'approved' });
    setPendingPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#6CBE02] p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Account</h1>
        <ul className="flex space-x-6 text-white font-semibold">
          <Link to="/adminportal/postrequests">
            <li className="hover:bg-black px-4 py-2 rounded-md cursor-pointer transition">POST REQUESTS</li>
          </Link>
          <Logout />
        </ul>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Pending Post Requests</h2>
        {pendingPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p><strong>Organization:</strong> {post.organizationName}</p>
                <p><strong>Description:</strong> {post.description}</p>
                <p><strong>Price:</strong> R{post.price}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <button
                  onClick={() => handleApprove(post.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition mt-4"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No pending posts.</p>
        )}
      </div>

      <Outlet />
    </div>
  );
}
