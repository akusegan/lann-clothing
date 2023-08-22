import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                : cartItem
        ); 
    }

   return [...cartItems, { ...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemtoRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemtoRemove.id
    );

    // check if quantity is equal to 1, if it is, remove the item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemtoRemove.id);
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemtoRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem
    ); 
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext ({
    isCartOpen: false,
    setCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
}); 

const INITIAL_STATE = {
    isCartOpen: true, 
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error (`Unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] =
        useReducer(cartReducer, INITIAL_STATE);
    
    const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 
        0
    );

    const newCartTotal = newCartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    );

    dispatch ({
        type: 'SET_CART_ITEMS',
        payload: { 
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount
        }
    });
};

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemtoRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemtoRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemtoRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemtoRemove);
        updateCartItemsReducer(newCartItems);
    };

    const value = { 
        isCartOpen,
        setCartOpen: () => [],
        addItemToCart,
        cartItems,
        cartCount,
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    };

    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}