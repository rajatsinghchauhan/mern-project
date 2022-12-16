import "./App.css";
import Header from "./component/layout/Header/header.js";
import Footer from "./component/layout/Footer/footer.js";
import React, { useState, useEffect } from "react";
import ProductDetails from "./component/product/productDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Payment from "./component/cart/Payment.js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path={"/"} component={Home} />
      <Route exact path="/contact" component={Contact} />

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
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />

      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      </Switch>
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products"
        component={ProductList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products/new"
        component={NewProduct}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product/:id"
        component={UpdateProduct}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/allorders"
        component={OrderList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/order/:id"
        component={ProcessOrder}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/allusers"
        component={UsersList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/user/:id"
        component={UpdateUser}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/reviews"
        component={ProductReviews}
      />
      <Footer />
    </Router>
  );
}

export default App;
