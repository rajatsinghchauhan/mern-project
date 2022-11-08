import React, { Fragment } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import ProductCard from "../home/productCard";
import Loading from "../layout/Loading/loading";

const products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, productcount, products, error } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword));
  }, [dispatch, error, alert, keyword]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default products;
