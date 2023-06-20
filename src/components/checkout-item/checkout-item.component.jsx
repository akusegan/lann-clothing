import { useContext } from 'react';
import { CartContext } from '../context/cart.context';

import { CheckoutItemContainer, CheckoutItemImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from "./checkout-item.styles"

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem; 

    const { clearItemFromCart, addItemToCart, removeItemToCart  } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </CheckoutItemImageContainer>
            <BaseSpan>{ name }</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{ quantity }</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{ price }</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;