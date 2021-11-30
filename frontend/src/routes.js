import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Error from './components/Error';
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/userListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const routes = [
    {
        path: "/order/:id",
        component: OrderScreen,
        id: 11,
        roles: []
    },
    {
        path: "/admin/:id/edit",
        component: UserEditScreen,
        id: 13,
        roles: []
    },
    { 
        path: "/admin/userlist",
        component: UserListScreen,
        id: 12,
        roles: []
    },
    {
        path: "/shipping",
        component: ShippingScreen,
        id: 8,
        roles: []
    },
    {
        path: "/placeorder",
        component: PlaceOrderScreen,
        id: 10,
        roles: []
    },
    {
        path: "/payment",
        component: PaymentScreen,
        id: 9,
        roles: []
    },
    {
        path: "/login",
        component: LoginScreen,
        id: 1,
        roles: []
    },
    {
        path: "/register",
        component: RegisterScreen,
        id: 6,
        roles: []
    },
    {
        path: "/profile",
        component: ProfileScreen,
        id: 7,
        roles: []
    },
    {
        path: "/product/:id",
        component: ProductScreen,
        id: 2,
        roles: [],
    },
    {
        path: "/cart/:id?",
        component: CartScreen,
        id: 3,
        roles: [],
    },
    {
        path: "/",
        component: HomeScreen,
        exact: true,
        id: 4,
        roles: []
    },
    {
        path: "*",
        component: Error,
        id: 5,
        roles: []
    },
];


export default function AppRouter() {
    return (
        <Switch>
            {routes.map((route) => {
                if (!route.roles[0]) {
                    return (
                        <Route
                            path={route.path}
                            key={route.id}
                            exact={route.exact}
                            component={route.component}
                        />
                    )
                }
                // else {
                //   return (
                //     <PrivateRoute key={route.id} {...route} />
                //   )
                // }
            })}
        </Switch>
    );
}

// function PrivateRoute(route) {
//   let role = localStorage.getItem('role');

//   if (route.roles.includes(role)) {
//     return (
//       <Route
//         path={route.path}
//         exact={route.exact}
//         component={route.component}
//       />
//     )
//   } else if (role) {
//     return (
//       <Redirect to='/' />
//     )
//   } else {
//     return (
//       <Redirect to="/login" />
//     );
//   }
// }

