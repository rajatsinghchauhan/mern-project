import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productdetailsReducer,
  productsReducer,
} from "./reducers/productReducers";
import { profileReducer, userReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  productDetails: productdetailsReducer,
  profile: profileReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
