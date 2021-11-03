import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Error from './components/Error';
import CartScreen from "./screens/CartScreen";

const routes = [
    {
        path: "/",
        component: HomeScreen,
        exact: true,
        id: 1,
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
        path: "*",
        component: Error,
        id: 3,
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

