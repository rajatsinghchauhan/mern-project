// import React, { Fragment } from "react";

// import { Link } from "react-router-dom";
// import "./home.css";

// const productCard = ({ product }) => {
//   const options = {
//     edit: false,
//     color: "rgb(20,20,20,0.1)",
//     activeColor: "tomato",
//     size: window.innerHeight < 200 ? 20 : 25,
//     value: Number(product.rating),
//     isHalf: true,
//   };
//   return (
//     <Link className="productCard" to={`/product/${product._id}`}>
//       <img src={product.images[0].url} alt="product" />
//       <p>{product.name}</p>
//       <div>
//         <ReactStars {...options} />
//         <span>{product.numofreviews} reviews</span>
//       </div>
//       <span>{`₹ ${product.price}`}</span>
//     </Link>
//   );
// };

// export default productCard;

import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const productCard = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numofreviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default productCard;
