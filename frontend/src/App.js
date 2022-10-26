import "./App.css";
import Header from "./component/layout/Header/header.js";
import Footer from "./component/layout/Footer/footer.js";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./component/home/home.js";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path={"/"} component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
