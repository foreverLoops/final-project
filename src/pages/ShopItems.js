import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import ProductModal from '../components/ProductModal'; // Import the ProductModal component

export default function ShopItems({userType}) {
  // const [sortOption, setSortOption] = useState('1');
  const [approvedPosts, setApprovedPosts] = useState([]);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // const handleSortChange = (e) => {
  //   setSortOption(e.target.value);
  // };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
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
      <Navbar />
      <section className="section all_products">
      <h1 className='text-[3rem] text-center mb-5 text-[#16635fe8]' >Welcome to the Shop</h1>
        <div className="top container">
          <h1>Explore all Products</h1>
          {/* <form>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="1">Default Sorting</option>
              <option value="2">Sort By Price</option>
              <option value="3">Sort By Popularity</option>
              <option value="4">Sort By Sales</option>
              <option value="5">Sort By Rating</option>
            </select>
            <span><i className="bx bx-chevron-down"></i></span>
          </form> */}
        </div>

        <div className="product_center container">
          {error && <p className="text-red-500">{error}</p>}
          {approvedPosts.length > 0 ? (
            approvedPosts.map((product, index) => (
              <div className="product_item border-2 border-[#16635fe8]" key={index}>
                <div className="overlay">
                  <button className="product_thumb">
                    <img src={product.imageUrl} alt="product" />
                  </button>
                </div>
                <div className="product_info flex flex-col">
                  <span>{product.category}</span>
                  <button className="product_title">
                    {product.title}
                  </button>
                  <h4>R {product.price}</h4>
                </div>
                <ul className="icons">
                  <li><i className="bx bx-heart"></i></li>
                  <li><i className="bx bx-shopping-bag" onClick={() => openModal(product)}></i></li>
                </ul>
              </div>
            ))
          ) : (
            <p>No approved posts available.</p>
          )}
        </div>
      </section>

      {/* Show ProductModal if modal is open */}
      {modalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct} // Pass the selected product as a prop
          onClose={closeModal} // Pass the close function as a prop
        />
      )}
    </div>
  );
}
