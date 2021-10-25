import React, { Fragment, useEffect, useState, useCallback } from "react";
import classes from "./Home.module.css";
import product from "./product.jpg";
import Product from "./../components/Product";
import { Link } from "react-router-dom";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [productarr, setProductarr] = useState([]);
  const getData = useCallback(async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    setProductarr(arr);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Fragment>
      <div className={classes.body}>
        <div className={classes.container}>
          <div className={classes.heading}>
            <p>Welcome to</p>
            <h1 className={classes.primary__heading}>NETZ-GEN</h1>
            <h2 className={classes.secondary__heading}>YOUR One-stop-shop</h2>
            <Link to="/products">
              <button className={classes.btn}>EXPLORE</button>
            </Link>
          </div>
          <img
            src={product}
            className={classes.main__image1}
            alt="main_content"
          ></img>
        </div>
        <section className={classes.section}>
          <h1 className={classes.secondary__heading}>Popular Products </h1>
        </section>
        <section className={classes.section}>
          {productarr.slice(0, 3).map((p, index) => {
            return (
              <div className={classes.outer} key={p.id}>
                <div className={classes.inner}>
                  <Product
                    title={p.name}
                    price={p.price}
                    image={p.image}
                    key={p.id}
                    id={p.id}
                  ></Product>
                </div>
              </div>
            );
          })}
        </section>
        <section className={classes.section}>
          {productarr.slice(3, 5).map((p, index) => {
            return (
              <div className={classes.outer} key={p.id}>
                <div className={classes.inner}>
                  <Product
                    title={p.name}
                    price={p.price}
                    image={p.image}
                    key={p.id}
                    id={p.id}
                  ></Product>
                </div>
              </div>
            );
          })}
        </section>
        <section className={classes.section}>
          {productarr.slice(5).map((p, index) => {
            return (
              <div className={classes.outer} key={p.id}>
                <div className={classes.inner}>
                  <Product
                    title={p.name}
                    price={p.price}
                    image={p.image}
                    key={p.id}
                    id={p.id}
                  ></Product>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </Fragment>
  );
}

export default Home;
