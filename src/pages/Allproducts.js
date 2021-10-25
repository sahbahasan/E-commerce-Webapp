import React, { useState, useCallback } from "react";
import classes from "./Allproducts.module.css";
import ProductCon from "../components/ProductCon";

import { useEffect } from "react";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

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
function Allproducts() {
  ///////////////////////////////////////////////////////////////////
  // const [productarr, setProductarr] = useState([]);
  // useEffect(() => {
  //   setProductarr(DummyData);
  // }, []);
  ////////////////////////////////////////////////////////////////
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
    <div className={classes.parent}>
      {/* <div className={classes.sidebar}></div> */}
      <div className={classes.main_content}>
        <div className={classes.heading}>
          <h1>Explore All Products</h1>
        </div>
        <div className={classes.product__wrapper}>
          {productarr.map((p) => {
            return (
              <ProductCon
                name={p.name}
                price={p.price}
                rating={p.rating}
                image={p.image}
                key={p.id}
                id={p.id}
              ></ProductCon>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Allproducts;
