import { CartItemContainer, ItemDetailsContainer } from './cart-item.styles';
import { BaseSpan }  from '../checkout-item/checkout-item.styles';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
       <CartItemContainer>
       <img src={imageUrl} alt={`${name}`}/>
        <ItemDetailsContainer>
            <BaseSpan>{ name }</BaseSpan>
            <BaseSpan>{ quantity } x ${price}</BaseSpan>
        </ItemDetailsContainer>
       </CartItemContainer> 
    );
};

export default CartItem;