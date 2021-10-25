import React, { useReducer } from "react";
import CartContext from "./cart-context";

let defaultState;

// if (localStorage.getItem("userCart")) {
//   const data = JSON.parse(localStorage.getItem("userCart"));
//   defaultState = {
//     items: data.items,
//     totalPrice: data.totalPrice,
//   };
//   localStorage.setItem(
//     "cartState",
//     JSON.stringify({
//       items: data.items,
//       totalPrice: data.totalPrice,
//     })
//   );
// }
//else
if (!localStorage.getItem("cartState")) {
  defaultState = {
    items: [],
    totalPrice: 0,
  };
  localStorage.setItem(
    "cartState",
    JSON.stringify({
      items: [],
      totalPrice: 0,
    })
  );
} else {
  defaultState = JSON.parse(localStorage.getItem("cartState"));
}

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    //used concat and not push because we dont want to mutate the state.item array this way, and concat returns a new array
    //const currItems = state.items.concat(action.item);

    const currTotal = state.totalPrice + action.item.price * action.item.amount;

    const existingItemInd = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingItem = state.items[existingItemInd];

    let currItems;
    if (existingItem) {
      const currItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      currItems = [...state.items];
      currItems[existingItemInd] = currItem;
    } else {
      currItems = state.items.concat(action.item);
    }
    const localCart = {
      items: currItems,
      totalPrice: currTotal,
    };
    localStorage.setItem("cartState", JSON.stringify(localCart));
    console.log(localStorage.getItem("cartState"));
    return {
      items: currItems,
      totalPrice: currTotal,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemInd = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemInd];
    const currTotal = state.totalPrice - existingItem.price;
    let currItems;
    if (existingItem.amount === 1) {
      currItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const currItem = { ...existingItem, amount: existingItem.amount - 1 };
      currItems = [...state.items];
      currItems[existingItemInd] = currItem;
    }
    const localCart = {
      items: currItems,
      totalPrice: currTotal,
    };
    localStorage.setItem("cartState", JSON.stringify(localCart));
    console.log(localStorage.getItem("cartState"));
    return {
      items: currItems,
      totalPrice: currTotal,
    };
  }

  if (action.type === "REMOVE_ALL") {
    return {
      items: [],
      totalPrice: 0,
    };
  }

  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchAction] = useReducer(cartReducer, defaultState);

  const addItemHandler = (item) => {
    dispatchAction({ type: "ADD_ITEM", item: item });
  };
  const deleteItemHandler = (id) => {
    dispatchAction({ type: "REMOVE_ITEM", id: id });
  };
  const deleteAllHandler = () => {
    dispatchAction({ type: "REMOVE_ALL" });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
    deleteAll: deleteAllHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
