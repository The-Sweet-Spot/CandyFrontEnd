import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Homepage from "./components/Homepage";
import IndexToHomePage from "./components/IndexToHomePage";
import Errorpage from "./components/Errorpage";
import Login from "./components/Login";

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
            }
        ]
    }
])

//version 18
const app = document.getElementById("apps")
const root = createRoot(app)
root.render(<RouterProvider router={router} />)