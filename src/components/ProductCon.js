import React from "react";
import classes from "./ProductCon.module.css";
// import StarRateIcon from "@material-ui/icons/StarRate";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/cart-context";

function ProductCon(props) {
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = () => {
    const numPrice = +props.price.split(",").join("");
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: numPrice,
      amount: 1,
      image: props.image,
    });
  };

  return (
    <div className={classes.productCon}>
      <div className={classes.productCon__top}>
        <img
          src={props.image}
          className={classes.top__image}
          alt="product"
        ></img>
      </div>
      <div className={classes.productCon__bottom}>
        <h1>{props.name}</h1>

        <div className={classes.rating}></div>
        <p>&#8377;{props.price}</p>
        {/* {arr.forEach(() => {
          return (
            <p className={classes.rating}>
              <StarRateIcon></StarRateIcon>
            </p>
          );
        })} */}
        <Link to={`/products/${props.id}`}>
          <button className={classes.buynow}>
            <span>View Product</span>
          </button>
        </Link>
        <button className={classes.buynow} onClick={onAddToCartHandler}>
          <span>Add to cart</span>

          <span>
            <ShoppingCartRoundedIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProductCon;
