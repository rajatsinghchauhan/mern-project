import React, { Fragment } from "react";
import "./home.css";
import { CgMouse } from "react-icons/cg";
import Product from "./productCard.js";
import Metadata from "../layout/metadata";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../layout/Loading/loading";
import { useAlert } from "react-alert";
const home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="Ecommerce" />
          <div className="banner">
            <p>Welcome to Ecommerce </p>
            <h1>Find Amazing products below</h1>
            <a href="#container">
              <button>
                scroll <CgMouse />{" "}
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default home;
