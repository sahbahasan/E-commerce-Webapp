import React, { useState } from "react";

import db from "./../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import AuthContext from "./auth-context";
const AuthContextProvider = (props) => {
  const defaultToken = localStorage.getItem("token");
  const [token, setToken] = useState(defaultToken);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const isUserLogged = !!token;

  const signinHandler = (token, id, docId, username) => {
    setToken(token);
    setId(id);
    setUsername(username.split("@")[0]);

    localStorage.setItem("token", token);
    //localStorage.setItem("userId", id);
    //const cartVal = JSON.parse(localStorage.getItem("cartState"));
    localStorage.setItem("newuserCart", docId);
  };
  const loginHandler = async (token, id, username) => {
    setToken(token);
    setId(id);

    setUsername(username.split("@")[0]);
    localStorage.setItem("token", token);

    ///////////////////////////////////////

    //////////////////////////////////////
    const q = query(collection(db, "cart"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let data;
    let dataId;
    querySnapshot.forEach((doc) => {
      data = doc.data();
      dataId = doc.id;
    });

    localStorage.setItem(
      "userCart",
      JSON.stringify({
        items: data.items,
        totalPrice: data.totalPrice,
        id: dataId,
      })
    );
    return data.items;
    // data.items.forEach((item) => {
    //   cartCtx.addItem(item);
    //   console.log(item);
    // });
  };
  const logoutHandler = async () => {
    let docId = "";
    if (localStorage.getItem("newuserCart")) {
      docId = localStorage.getItem("newuserCart");
    } else if (localStorage.getItem("userCart")) {
      docId = JSON.parse(localStorage.getItem("userCart")).id;
    }

    const requiredDoc = doc(db, "cart", docId);

    const cartVal = JSON.parse(localStorage.getItem("cartState"));
    await updateDoc(requiredDoc, {
      items: cartVal.items,
      totalPrice: cartVal.totalPrice,
    });

    setToken(null);

    localStorage.removeItem("newuserCart");
    localStorage.removeItem("userCart");
    localStorage.removeItem("token");
    localStorage.removeItem("cartState");
  };

  const contextval = {
    token: token,
    loggedIn: isUserLogged,
    login: loginHandler,
    logout: logoutHandler,
    signin: signinHandler,
    id: id,
    username: username,
  };

  return (
    <AuthContext.Provider value={contextval}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
