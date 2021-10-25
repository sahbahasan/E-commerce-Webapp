import React from "react";

const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
  deleteAll: () => {},
});

export default CartContext;
