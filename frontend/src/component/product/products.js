import React, { Fragment, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import ProductCard from "../home/productCard";
import Loading from "../layout/Loading/loading";
import Paginatation from "react-js-pagination";
import { Slider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Metadata from "../layout/metadata";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const products = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, productcount, products, error, resultperpage } = useSelector(
    (state) => state.products
  );
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const keyword = match.params.keyword;
  const [currentPage, setcurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Metadata title="Products" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-label="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultperpage < productcount && (
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default products;
