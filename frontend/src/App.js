import "./App.css";
import Header from "./component/layout/Header/header.js";
import Footer from "./component/layout/Footer/footer.js";
import React from "react";
import ProductDetails from "./component/product/productDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/home/home.js";
import Products from "./component/product/products.js";
import Search from "./component/search/search.js";
function App() {
  return (
    <Router>
      <Header />
      <Route exact path={"/"} component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Footer />
    </Router>
  );
}

export default App;
