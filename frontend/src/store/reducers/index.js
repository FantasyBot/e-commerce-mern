import { productListReducer, productDetailsReducer } from "./productReducers";
import { combineReducers } from "redux";

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
});
