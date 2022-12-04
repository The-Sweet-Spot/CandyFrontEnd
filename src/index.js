import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Homepage from "./components/Homepage";
import IndexToHomePage from "./components/IndexToHomePage";
import Errorpage from "./components/Errorpage";
import Login from "./components/Login";
import Register from "./components/Register";
import Bakery from "./components/Bakery";
import Candy from "./components/Candy";
import Profile from "./components/Profile";
import BakeryDetail from "./components/BakeryDetail";
import CandyDetail from "./components/CandyDetail";
import Cart from "./components/Cart";
import CartItems from "./components/CartItems";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <Errorpage />,
        children: [
            {
                index: true,
                element: <IndexToHomePage />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/bakery",
                element: <Bakery />
            },
            {
                path: "/bakery/:bakedId",
                element: <BakeryDetail />
            },
            {
                path: "/candy",
                element: <Candy />
            },
            {
                path: "/candy/:candyId",
                element: <CandyDetail />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/cart/:cartItemsId",
                element: <CartItems />
            }
        ]
    }
])

//version 18

const app = document.getElementById("apps")
const root = createRoot(app)
root.render(<RouterProvider router={router} />)