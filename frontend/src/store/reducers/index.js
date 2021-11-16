import { productListReducer, productDetailsReducer } from "./productReducers";
import { combineReducers } from "redux";
import { cartReducer } from './cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './userReducers';
import { orderCreateReducer } from "./orderReducers";

export const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer
});
