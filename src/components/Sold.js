import React, { useEffect, useState } from 'react';
import { db, storage } from '../components/firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Sold({ userType }) {
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    organizationName: '',
    description: '',
    title: '',
    price: '',
    category: 'Clothes',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setMessage('Please select an image.');
      return;
    }
    const storageRef = ref(storage, `images/${formData.image.name}`);
    const snapshot = await uploadBytes(storageRef, formData.image);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await addDoc(collection(db, 'postRequests'), {
      imageUrl: downloadURL,
      title: formData.title,
      organizationName: formData.organizationName,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      status: 'pending',
    });

    setMessage('Image submitted for review.');
    setFormData({
      image: null,
      organizationName: '',
      description: '',
      title: '',
      price: '',
      category: 'Clothes',
    });
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchApprovedPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'postRequests'));
        const posts = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((post) => post.status === 'approved');
        setApprovedPosts(posts);
      } catch (error) {
        setError('Failed to fetch posts');
        console.error(error);
      }
    };
    fetchApprovedPosts();
  }, []);

  return (
    <div>
      {userType !== 'organisation' && (
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Post Product to Shop
        </button>
      )}

      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Display approved posts */}
      <div className="approved-posts">
        {approvedPosts.length > 0 ? (
          approvedPosts.map((post, index) => (
            <div key={index} className="product_item">
              <img src={post.imageUrl} alt={post.title} className="product_image" />
              <h4>{post.title}</h4>
              <p>{post.organizationName}</p>
              <p>{post.description}</p>
              <p>R {post.price}</p>
              <p>Category: {post.category}</p>
            </div>
          ))
        ) : (
          <p>No approved posts available.</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Submit a Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <input
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 w-full"
                required
              >
                <option value="Clothes">Clothes</option>
                <option value="Furniture">Furniture</option>
                <option value="Decor">Decor</option>
                <option value="Skin Product">Skin Product</option>
              </select>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit for Approval
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
