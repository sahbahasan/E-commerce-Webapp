import React from "react";
import classes from "./Cart.module.css";
import CartContext from "../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Cart = () => {
  const authctx = useContext(AuthContext);
  const history = useHistory();
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalPrice;
  let itemsInCart = 0;
  if (cartCtx.items.length > 0) {
    itemsInCart = cartCtx.items.reduce((curr, item) => {
      return curr + item.amount;
    }, 0);
  }

  const addItemHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };
  const removeItemHandler = (id) => {
    cartCtx.deleteItem(id);
  };
  const onOrderHandler = () => {
    if (authctx.loggedIn && cartCtx.items.length) {
      history.replace("/orderpage");
    } else {
      history.replace("/signup");
    }
  };

  return (
    <div className={classes.outer}>
      <h1 className={classes.mainheading}>YOUR SHOPPING CART</h1>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          {cartCtx.items.map((item) => {
            return (
              <CartItem
                name={item.name}
                quantity={item.amount}
                key={item.id}
                price={item.price}
                totalAmount={item.price * item.amount}
                image={item.image}
                add={addItemHandler.bind(null, item)}
                remove={removeItemHandler.bind(null, item.id)}
              />
            );
          })}
        </div>
        <div className={classes.order_summary}>
          <h1>Order summary</h1>
          <p>Total number of items : {itemsInCart}</p>
          <p>Subtotal : &#8377;{totalPrice}</p>
          <button onClick={onOrderHandler}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
