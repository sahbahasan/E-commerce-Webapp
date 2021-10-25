import React, { useEffect, useState, useCallback } from "react";
// aOfi9xZEhNBqE9cf8Ou8
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import CartContext from "../store/cart-context";
import { useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

// const DummyData = [
//   {
//     id: "item1",
//     name: "ASUS VivoBook 14 (2020) Intel Core i3-1005G1 10th Gen 14-inch (35.56 cms) FHD Thin and Light Laptop (4GB/256GB NVMe SSD/Integrated Graphics/Windows 10/MS Office 2019/Silver/1.6 kg), X415JA-EK312TS",
//     image:
//       "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1901&q=80",
//     price: "69,000",
//   },
//   {
//     id: "item2",
//     name: "Apple iMac with Retina 5K Display (27-inch/68.58 cm, 8GB RAM, 3.3GHz 6-core 10th-Generation Intel Core i5 Processor, 512GB SSD Storage) - Silver",
//     image:
//       "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
//     price: "1,39,000",
//   },
//   {
//     id: "item3",
//     name: "Sony WH-CH710N Noise Cancelling Wireless Headphones : Bluetooth Over The Ear Headset with Mic for Phone-Call, 35 Hours Battery Life, Quick Charge and Google Assitant - Black",
//     image:
//       "https://images.unsplash.com/photo-1585298723682-7115561c51b7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80",
//     price: "7,900",
//   },
//   {
//     id: "item4",
//     name: "Apple iPad 8th Gen 25.90 cm (10.2 inch) ",
//     image:
//       "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1878&q=80",
//     price: "90,000",
//   },
// ];
function ProductDetail() {
  // Logic to fetch data of param id from firestore

  /////////////////////////////////////////////////////////////
  const [product, setProduct] = useState({});
  const params = useParams();
  const docRef = doc(db, "products", params.id);
  const getData = useCallback(async () => {
    let p = [];
    const dataItem = await getDoc(docRef);
    p = dataItem.data();
    setProduct(p);
  }, [docRef]);

  useEffect(() => {
    getData();
  }, [getData]);
  const cartCtx = useContext(CartContext);
  const onAddToCartHandler = () => {
    const numPrice = +product.price.split(",").join("");
    cartCtx.addItem({
      id: params.id,
      name: product.name,
      price: numPrice,
      amount: 1,
      image: product.image,
    });
  };
  //////////////////////////////////////////////////////////
  // const params = useParams();
  // const product = DummyData.filter((item) => {
  //   return params.id === item.id;
  // });
  // const cartCtx = useContext(CartContext);
  // const onAddToCartHandler = () => {
  //   const numPrice = +product[0].price.split(",").join("");
  //   cartCtx.addItem({
  //     id: product[0].id,
  //     name: product[0].name,
  //     price: numPrice,
  //     amount: 1,
  //     image: product[0].image,
  //   });
  // };
  ////////////////////////////////////////////////////////////////
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.image}>
          <img src={product.image} alt="product"></img>
        </div>
        <div className={classes.detail}>
          <h1>{product.name}</h1>
          <p className={classes.mrp}>M.R.P. : &#8377;{product.price}</p>
          <div className={classes.description__outer}>
            <h2>Product Description</h2>
            <p className={classes.description}>
              A random paragraph can also be an excellent way for a writer to
              tackle writers' block. Writing block can often happen due to being
              stuck with a current project that the writer is trying to
              complete. By inserting a completely random paragraph from which to
              begin, it can take down some of the issues that may have been
              causing the writers' block in the first place.Generating random
              paragraphs can be an excellent way for writers to get their
              creative flow going at the beginning of the day. The writer has no
              idea what topic the random paragraph will be about when it
              appears. This forces the writer to use creativity to complete one
              of three common writing challenges. The writer can use the
              paragraph as the first one of a short story and build upon it. A
              second option is to use the random paragraph somewhere in a short
              story they create.
            </p>
          </div>
          <button className={classes.buynow} onClick={onAddToCartHandler}>
            <span>Add to cart</span>
            <span>
              <ShoppingCartRoundedIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
