// CartContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebase/firebase';
import { useUserId } from './useUserId';
import { getDoc, doc, setDoc } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
const userId = useUserId();
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
if (userId) {
    const fetchCart = async () => {
    try {
        const cartDocRef = doc(db, 'users', userId, 'cart', 'cartItems');
        const cartSnapshot = await getDoc(cartDocRef);
        setCartItems(cartSnapshot.exists() ? cartSnapshot.data().items || [] : []);
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
    };
    fetchCart();
}
}, [userId]);

const addToCart = async (product) => {
if (userId) {
    // Check if the item already exists in the cart
    const itemExists = cartItems.find(item => item.id === product.id);

    // Create a new cartItems array, either updating quantity or adding a new item
    const newCartItems = itemExists
    ? cartItems.map(item =>
        item.id === product.id
            ? { ...item, quantity: item.quantity + 1 } // If the item exists, increase quantity
            : item
        )
    : [...cartItems, { ...product, quantity: 1 }]; // If item doesn't exist, add it with quantity 1

    // Update the local state
    setCartItems(newCartItems);

    // Update Firestore
    try {
    const cartDocRef = doc(db, 'users', userId, 'cart', 'cartItems');
    await setDoc(cartDocRef, { items: newCartItems });
    } catch (error) {
    console.error("Error adding to cart:", error);
    }
}
};

const updateQuantity = async (productId, newQuantity) => {
if (userId && newQuantity > 0) {
    const newCartItems = cartItems.map(item =>
    item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newCartItems);
    try {
    const cartDocRef = doc(db, 'users', userId, 'cart', 'cartItems');
    await setDoc(cartDocRef, { items: newCartItems });
    } catch (error) {
    console.error("Error updating quantity:", error);
    }
}
};

const removeFromCart = async (productId) => {
if (userId) {
    const newCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(newCartItems);
    try {
    const cartDocRef = doc(db, 'users', userId, 'cart', 'cartItems');
    await setDoc(cartDocRef, { items: newCartItems });
    } catch (error) {
    console.error("Error removing from cart:", error);
    }
}
};

const clearCart = async () => {
if (userId) {
    setCartItems([]);
    try {
    const cartDocRef = doc(db, 'users', userId, 'cart', 'cartItems');
    await setDoc(cartDocRef, { items: [] });
    } catch (error) {
    console.error("Error clearing cart:", error);
    }
}
};

return (
<CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}>
    {children}
</CartContext.Provider>
);
};
