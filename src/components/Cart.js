import React from 'react';
import { useCart } from '../components/CartContext';

export const Cart = () => {
const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

// Calculate the total price of the items in the cart
const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

const handleQuantityChange = (id, newQuantity) => {
updateQuantity(id, newQuantity);
};

return (
<div className="max-w-4xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
    {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
    ) : (
    <div>
        <ul>
        {cartItems.map((item) => (
            <li key={item.id} className="mb-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover" />
                <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>{item.category}</p>
                    <p>{item.description}</p>
                    <p>R {item.price}</p>
                </div>
                </div>
                <div className="flex items-center space-x-4">
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="bg-gray-300 text-black py-1 px-2 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="bg-gray-300 text-black py-1 px-2 rounded">+</button>
                </div>
                <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
                >
                Remove
                </button>
            </div>
            </li>
        ))}
        </ul>
        <button
        onClick={clearCart}
        className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
        >
        Clear Cart
        </button>

        {/* Display the total amount */}
        <div className="mt-6 text-xl font-semibold">
        <p>Total: R {totalAmount.toFixed(2)}</p>
        </div>
    </div>
    )}
</div>
);
};

export default Cart;
