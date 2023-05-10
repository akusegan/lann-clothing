import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from "../../components/context/user.context";
import { CartContext } from "../../components/context/cart.context";
import { signOutUser } from '../../utils/firebase/firebase.utils'

import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
         <LogoContainer to='/'>
            <CrownLogo className='logo'/>
         </LogoContainer>
          <NavLinksContainer>
            <NavLink to='/shop'>SHOP</NavLink>
          
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              ) : (
                
              <NavLink to='/auth'>SIGN IN</NavLink>
              )}
              <CartIcon/>
          </NavLinksContainer>
          {isCartOpen && <CartDropdown/>}
          </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation;