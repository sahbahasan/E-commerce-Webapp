import React from "react";
import classes from "./Menu.module.css";

function Menu(props) {
  return (
    <div className={props.className}>
      <div className={classes.group}>
        <h1>Electronics</h1>
        <ul>
          <li>Mobiles</li>
          <li>Laptops</li>
          <li>Desktops</li>
          <li>...more</li>
        </ul>
      </div>
      <div className={classes.group}>
        <h1>Kitchen Appliances</h1>
        <ul>
          <li>Juicer & Mixers</li>
          <li>Toasters</li>
          <li>Microwaves </li>
          <li>...more</li>
        </ul>
      </div>
      <div className={classes.group}>
        <h1>Furniture and Home decor</h1>
        <ul>
          <li>Sofa</li>
          <li>Dining Table set</li>
          <li>Paintings</li>
          <li>...more</li>
        </ul>
      </div>
      <div className={classes.group}>
        <h1>Fashion</h1>
        <ul>
          <li>Men's Fashion</li>
          <li>Women's Fashion</li>
          <li>Kid's Fashion</li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
