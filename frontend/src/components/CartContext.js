import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (item) => {
        // Hier könntest du prüfen, ob ein ähnlicher Artikel schon existiert,
        // und dann die Menge erhöhen.
        setCartItems(prev => [...prev, item]);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
