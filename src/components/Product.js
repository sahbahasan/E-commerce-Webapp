import React from "react";
// import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className={classes.product}>
      <div className={classes.product__top}>
        <h1>{props.title}</h1>
        <p>&#8377;{props.price}</p>
      </div>
      <img
        src={props.image}
        alt="dummy"
        className={classes.product__image}
      ></img>
      <button className={classes.buynow}>
        <span>
          <Link to={`/products/${props.id}`}>View Product</Link>
        </span>
        {/* <span>
          <ShoppingCartRoundedIcon />
        </span> */}
      </button>
    </div>
  );
}

export default Product;
