import React from "react";
import classes from "./CartItem.module.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const CartItem = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={props.image} alt="cart item"></img>
      </div>
      <div className={classes.detail}>
        <h1>{props.name}</h1>
        <p className={classes.mrp}>M.R.P. : &#8377;{props.price}</p>
      </div>
      <div className={classes.item_details}>
        <p>Total Amount : &#8377;{props.totalAmount}</p>
        <div className={classes.quantity}>
          <p>Total Quantity :</p>
          <button onClick={props.remove}>
            <RemoveCircleIcon></RemoveCircleIcon>
          </button>
          <p className={classes.quantity__value}> {props.quantity}</p>
          <button onClick={props.add}>
            <AddCircleIcon></AddCircleIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
