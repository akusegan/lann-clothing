import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if found, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ); 
    };

    // return new array with modified cartItems / new cart item
   return [...cartItems, { ...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemtoRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemtoRemove.id);

    // check if quantity is equal to 1, if it is, remove the item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemtoRemove.id);
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemtoRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
      setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
      }, [cartItems])
    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemtoRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemtoRemove));
    };

    const clearItemFromCart = (cartItemtoRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemtoRemove));
    };


    const value = { isCartOpen, setCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}