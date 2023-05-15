import { useContext } from 'react';

import { CartContext } from '../context/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'; 

const CartIcon = () => {
    const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>      
    )
}

export default CartIcon;