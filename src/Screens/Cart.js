// import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Menu from '../component/Menu'
import Paypal from '../component/Paypal'

// Components
import CartItem from "../component/CartItem";

// Actions
import { addToCart, removeFromCart } from "../redux/action/CartAction";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };


  // Payment 
      const transactionSuccess = (data) => {
       
            console.log(data)
    }

        const transactionError = () => {
            console.log('Paypal error')
        }

        const transactionCanceled = () => {
            console.log('Transaction canceled')
        }

  return (
    <div className="container">
    <Menu />
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
         { getCartCount() > 0 ?
            <Paypal 
            toPay = {getCartCount()}
            onSuccess={transactionSuccess}
            transactionError={transactionError}
            transactionCanceled={transactionCanceled}/>

            :
            <div> CART IS EMPTY</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;