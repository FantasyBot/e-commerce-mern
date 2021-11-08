import { productListReducer, productDetailsReducer } from "./productReducers";
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { userLoginReducer } from './userReducers';

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
});
