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
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/ConfirmOrder.js";
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
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/login" component={Loginsignup} />
      <ProtectedRoute
        exact
        path="/userprofile/update"
        component={UpdateProfile}
      />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

      <Footer />
    </Router>
  );
}

export default App;
