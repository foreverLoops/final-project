import React, { useEffect, useState } from 'react';
import { db, storage } from '../components/firebase/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Shop() {
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

    try {
      const storageRef = ref(storage, `images/${formData.image.name}`);
      const { ref: storageRef2 } = await uploadBytes(storageRef, formData.image);
      const downloadURL = await getDownloadURL(storageRef2);

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
    } catch (error) {
      setError('Failed to submit post');
      console.error(error);
    }
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Post an Image to Shop</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Open Submission Form
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Shop</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {approvedPosts.length > 0 ? (
            approvedPosts.map((product) => (
              <div className="product_item" key={product.id}>
                <div className="overlay">
                  <a href="productDetails.html" className="product_thumb">
    
                    <img src={product.imageUrl} alt="product" />
                  </a>
                </div>
                <div className="product_info">
                  <span>{product.category}</span>
                  <a href="productDetails.html" className="product_title">
                    {product.title}
                  </a>
                  <h4> {product.price}</h4>
                </div>
                <ul className="icons">
                  <li><i className="bx bx-heart"></i></li>
                  <li><i className="bx bx-shopping-bag"></i></li>
                </ul>
              </div>
            ))
          ) : (
            ""
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
