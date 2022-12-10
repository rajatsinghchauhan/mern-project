import React, { Fragment, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import ProductCard from "../home/productCard";
import Loading from "../layout/Loading/loading";
import Paginatation from "react-js-pagination";

const products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, productcount, products, error, resultperpage } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;
  const [currentPage, setcurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);
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
          <div className="paginationBox">
            <Paginatation
              activePage={currentPage}
              itemsCountPerPage={resultperpage}
              totalItemsCount={productcount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="link-item"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default products;
