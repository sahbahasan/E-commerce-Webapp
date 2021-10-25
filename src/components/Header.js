import React, { Fragment, useContext, useState } from "react";
import classes from "./Header.module.css";
import logo from "./e-commerce-logo.png";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import Menu from "./Menu";
import CartContext from "../store/cart-context";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const authctx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  let itemsInCart = 0;
  if (cartCtx.items.length > 0) {
    itemsInCart = cartCtx.items.reduce((curr, item) => {
      return curr + item.amount;
    }, 0);
  }
  const [menu, setMenu] = useState(false);
  const menuHandler = () => {
    setMenu(!menu);
  };
  const logoutHandler = () => {
    authctx.logout();
    cartCtx.deleteAll();
    history.replace("/");
  };
  const header_classes = menu
    ? `${classes.header__elem} ${classes.focus}`
    : `${classes.header__elem}`;
  return (
    <Fragment>
      <div className={classes.header}>
        <img src={logo} alt="logo"></img>
        <h1>
          <Link to="/">NETZ-GEN</Link>
        </h1>
        <div className={classes.header__search}>
          <input type="search"></input>
        </div>
        <div className={classes.header__nav}>
          <div className={header_classes} onClick={menuHandler}>
            <h1 className={classes.header__h1}>PRODUCTS</h1>
            {menu && (
              <ArrowDropUpRoundedIcon
                className={classes.down_icon}
              ></ArrowDropUpRoundedIcon>
            )}
            {!menu && (
              <ArrowDropDownRoundedIcon
                className={classes.down_icon}
              ></ArrowDropDownRoundedIcon>
            )}
          </div>
          <div className={classes.header__elem}>
            <h1 className={classes.header__h1}>
              {!authctx.loggedIn && <Link to="/signup">SIGN UP / LOGIN</Link>}
              {authctx.loggedIn && (
                <Link to="/dashboard">{`Welcome ${authctx.username}!`}</Link>
              )}
            </h1>
          </div>
          <div className={classes.header__elem}>
            {authctx.loggedIn && (
              <h1 className={classes.header__h1} onClick={logoutHandler}>
                LOGOUT
              </h1>
            )}
          </div>
          <div className={classes.header__elem}>
            <Link to="/cart">
              <ShoppingCartRoundedIcon
                className={classes.header__icon}
              ></ShoppingCartRoundedIcon>
            </Link>
            <span>{itemsInCart}</span>
          </div>
        </div>
      </div>
      {menu && <Menu className={classes.product_menu}></Menu>}
    </Fragment>
  );
}

export default Header;
