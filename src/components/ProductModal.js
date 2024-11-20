import React from 'react';
import { useCart } from '../components/CartContext'; // Import the Cart context

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart(); // Destructure the addToCart function from the context

  const handleAddToCart = () => {
    addToCart(product); // Add the current product to the cart
    onClose(); // Optionally close the modal after adding to cart
    alert("Your prodcut has been successfully Added")
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-2xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
        <div className="product-details">
          <img
            src={product.imageUrl}
            alt="product"
            className="w-full h-auto mb-4"
          />
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> R {product.price}</p>
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
