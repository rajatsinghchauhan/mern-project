import "./App.css";
import Header from "./component/layout/Header/header.js";
import Footer from "./component/layout/Footer/footer.js";
import React from "react";
import ProductDetails from "./component/product/productDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/home/home.js";
import Products from "./component/product/products.js";
import Search from "./component/search/search.js";
import Loginsignup from "./component/user/loginsignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path={"/"} component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <Route exact path="/login" component={Loginsignup} />
      <ProtectedRoute
        exact
        path="/userprofile/update"
        component={UpdateProfile}
      />
      <Footer />
    </Router>
  );
}

export default App;
