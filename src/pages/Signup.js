import React, { useContext, useState } from "react";
import classes from "./Signup.module.css";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import CartContext from "../store/cart-context";
import db from "./../firebase";

const Signup = () => {
  const history = useHistory();
  const authctx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSign, setShowSign] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [emailfocus, setEmailfocus] = useState(false);
  const [passfocus, setPassfocus] = useState(false);
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const enteredEmailvalid = email.trim() !== "" && email.match(mailformat);
  const enteredPassvalid = pass.length >= 8;

  const emailInvalid = !enteredEmailvalid && emailfocus;
  const passInvalid = !enteredPassvalid && passfocus;

  const passBlurHandler = (e) => {
    setPassfocus(true);
  };
  const emailBlurHandler = (e) => {
    setEmailfocus(true);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passChangeHandler = (event) => {
    setPass(event.target.value);
  };

  const switch1Handler = () => {
    setShowLogin(false);
    setShowSign(true);
  };
  const switch2Handler = () => {
    setShowLogin(true);
    setShowSign(false);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setEmailfocus(true);
    setPassfocus(true);
    if (!enteredEmailvalid || !enteredPassvalid) {
      return;
    }
    ///////////////////////////////////////////////////////////////////
    // const res = await axios.post("/api/v1/login", {
    //   email,
    //   password: pass,
    // });

    // console.log(res.status, res.data.idToken);
    /////////////////////////////////////////////////////////////////////
    // const res = await fetch("http://127.0.0.1:8000/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email,
    //     password: pass,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await res.json();
    if (showSign) {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password: pass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      let docRef;
      if (res.status === 200) {
        console.log(data);
        console.log(res);

        try {
          docRef = await addDoc(collection(db, "cart"), {
            id: data.localId,
            items: cartCtx.items,
            totalPrice: cartCtx.totalPrice,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        authctx.signin(data.idToken, data.localId, docRef.id, data.email);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        history.replace("/dashboard");
      } else {
        console.log("Some error has occured");
        console.log(res);
      }
    }

    if (showLogin) {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password: pass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        console.log(data);
        //console.log(res);
        const items = await authctx.login(
          data.idToken,
          data.localId,
          data.email
        );
        console.log(items);
        items.forEach((item) => {
          cartCtx.addItem(item);
          console.log(item);
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
        history.replace("/dashboard");
      } else {
        console.log("Some error has occured");
        console.log(res);
      }
    }

    // console.log({ email, pass });
    setEmail("");
    setPass("");
    setEmailfocus(false);
    setPassfocus(false);
  };

  const classSign = showSign
    ? `${classes.signup} ${classes.active}`
    : `${classes.signup}`;
  const classLogin = showLogin
    ? `${classes.login} ${classes.active}`
    : `${classes.login}`;

  return (
    <div className={classes.main}>
      <div className={classes.signup_container}>
        <form className={classes.sub_container} onSubmit={onSubmitHandler}>
          <div className={classes.switch}>
            <div className={classSign} onClick={switch1Handler}>
              <p>SIGN UP</p>
            </div>
            <div className={classLogin} onClick={switch2Handler}>
              <p>LOGIN</p>
            </div>
          </div>

          {showSign && <h1>SIGN UP</h1>}
          {showLogin && <h1>LOGIN</h1>}
          <input
            type="email"
            placeholder="Email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            id="email"
            value={email}
          ></input>
          {emailInvalid && <p className={classes.error}>Enter valid email!</p>}
          <input
            type="password"
            placeholder="Password"
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            id="pass"
            value={pass}
          ></input>
          {passInvalid && (
            <p className={classes.error}>Enter valid password!</p>
          )}
          {showSign && <button type="submit">SIGN UP</button>}
          {showLogin && <button type="submit">LOGIN</button>}
          {showSign && (
            <div className={classes.transition}>
              Already Signed up?&nbsp;
              <span onClick={switch2Handler}>Login</span>
            </div>
          )}
          {showLogin && (
            <div className={classes.transition}>
              Don't have an account?&nbsp;
              <span onClick={switch1Handler}>Sign Up</span>
            </div>
          )}
        </form>
      </div>
      <div className={classes.sideimage}>
        {showSign && <h2>SIGN UP &</h2>}
        {showLogin && <h2>LOGIN &</h2>}
        <h1>EXPLORE</h1>
        <h2>Over 10,000+ products</h2>
        <h2>100+ Brands</h2>
      </div>
    </div>
  );
};

export default Signup;
